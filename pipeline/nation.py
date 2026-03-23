"""Compute efficiency gap and seat/vote stats for all 50 states.

Uses only the MIT Election Lab returns — no boundary data required.
EG is skipped for states with fewer than 3 districts (at-large and
micro-delegations where the metric is undefined/noisy).

Outputs:
  web/static/nation_stats.json  — EG + seat/vote per state per cycle

Usage:
  uv run python -m pipeline.nation
"""

import io
import json
import math
import sys
from pathlib import Path

import pandas as pd

from .config import MIT_ELECTIONS_FILENAME, RAW_DIR

RAW = Path(RAW_DIR)
ELECTIONS_CSV = RAW / "elections" / MIT_ELECTIONS_FILENAME
DEST = Path(__file__).parent.parent / "web" / "static" / "nation_stats.json"

CYCLE_YEARS = [1992, 2002, 2012, 2022]
EG_MIN_SEATS = 3   # skip EG for states with fewer districts

# Full state name lookup
STATE_NAMES: dict[str, str] = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas",
    "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware",
    "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho",
    "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas",
    "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi",
    "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
    "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York",
    "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma",
    "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
    "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia",
    "WI": "Wisconsin", "WY": "Wyoming",
}


# ---------------------------------------------------------------------------
# Load election data
# ---------------------------------------------------------------------------

def load_elections() -> pd.DataFrame:
    with open(ELECTIONS_CSV, encoding="latin-1") as fh:
        lines = fh.readlines()
    cleaned = [lines[0]] + [
        (ln.strip()[1:-1] + "\n" if ln.strip().startswith('"') and ln.strip().endswith('"')
         else ln)
        for ln in lines[1:]
    ]
    df = pd.read_csv(io.StringIO("".join(cleaned)), low_memory=False, on_bad_lines="skip")
    df = df[
        df["stage"].eq("GEN")
        & (~df["special"].astype(bool))
        & df["office"].eq("US HOUSE")
    ].copy()
    df["party_clean"] = df["party"].str.upper().str.strip()
    df["district"] = pd.to_numeric(df["district"], errors="coerce")
    return df


# ---------------------------------------------------------------------------
# Metrics
# ---------------------------------------------------------------------------

def agg_district(grp: pd.DataFrame) -> pd.Series:
    d = grp[grp["party_clean"].isin(("DEMOCRAT", "DEMOCRATIC"))]["candidatevotes"].sum()
    r = grp[grp["party_clean"] == "REPUBLICAN"]["candidatevotes"].sum()
    total = d + r
    won_by = "D" if d > r else ("R" if r > d else "tie")
    return pd.Series({"d_votes": int(d), "r_votes": int(r),
                       "total_2party": int(total), "won_by": won_by})


def compute_efficiency_gap(results: pd.DataFrame) -> float | None:
    """Wasted-votes EG. Returns None if fewer than EG_MIN_SEATS districts."""
    valid = results[results["total_2party"] > 0]
    if len(valid) < EG_MIN_SEATS:
        return None
    wasted_d = wasted_r = total = 0
    for _, row in valid.iterrows():
        d, r = row["d_votes"], row["r_votes"]
        t = d + r
        threshold = math.floor(t / 2) + 1
        if d > r:
            wasted_d += d - threshold
            wasted_r += r
        else:
            wasted_r += r - threshold
            wasted_d += d
        total += t
    return (wasted_d - wasted_r) / total if total else None


def compute_mean_median(results: pd.DataFrame) -> float | None:
    valid = results[results["total_2party"] > 0].copy()
    if len(valid) < EG_MIN_SEATS:
        return None
    shares = valid["d_votes"] / valid["total_2party"]
    return float(shares.mean() - shares.median())


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("Loading MIT election data…")
    df = load_elections()

    nation: dict[str, list] = {}   # po → list of cycle dicts

    for year in CYCLE_YEARS:
        year_df = df[df["year"] == year]
        states_in_year = sorted(year_df["state_po"].unique())
        print(f"\n[{year}] — {len(states_in_year)} states")

        for po in states_in_year:
            state_df = year_df[year_df["state_po"] == po]
            results = state_df.groupby("district").apply(agg_district).reset_index()

            eg = compute_efficiency_gap(results)
            mm = compute_mean_median(results)
            seats = len(results)
            seats_d = int((results["won_by"] == "D").sum())
            seats_r = int((results["won_by"] == "R").sum())
            votes_d = int(results["d_votes"].sum())
            votes_r = int(results["r_votes"].sum())
            total_2party = votes_d + votes_r
            svr = (
                round((seats_d / seats) / (votes_d / total_2party), 4)
                if seats > 0 and total_2party > 0 and votes_d > 0 else None
            )

            cycle = {
                "year": year,
                "seats": seats,
                "seats_d": seats_d,
                "seats_r": seats_r,
                "votes_d": votes_d,
                "votes_r": votes_r,
                "efficiency_gap": round(eg, 4) if eg is not None else None,
                "mean_median_diff": round(mm, 4) if mm is not None else None,
                "seat_vote_ratio_d": svr,
            }

            if po not in nation:
                nation[po] = []
            nation[po].append(cycle)

        # progress summary for this year
        with_eg = [po for po, cycles in nation.items()
                   if any(c["year"] == year and c["efficiency_gap"] is not None
                          for c in cycles)]
        print(f"  EG computed for {len(with_eg)} states")

    # Build output structure
    states_out = []
    for po in sorted(nation.keys()):
        states_out.append({
            "state_po": po,
            "state_name": STATE_NAMES.get(po, po),
            "cycles": nation[po],
        })

    DEST.parent.mkdir(parents=True, exist_ok=True)
    with open(DEST, "w") as fh:
        json.dump({"states": states_out}, fh, indent=2)

    size_kb = DEST.stat().st_size / 1024
    print(f"\nWrote {DEST}  ({size_kb:.0f} KB, {len(states_out)} states)")


if __name__ == "__main__":
    main()
