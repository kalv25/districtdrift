#!/usr/bin/env python3
"""Update WORK_LOG.md from git history.

Groups commits into work sessions (gap > SESSION_GAP_HOURS = new session),
then writes a summary block at the top and appends any new sessions below.

Usage:
  python scripts/update_work_log.py            # append new sessions since last log
  python scripts/update_work_log.py --rebuild  # rebuild from scratch (all history)
  python scripts/update_work_log.py --preview  # print what would be written, no changes
  python scripts/update_work_log.py --since 2026-03-24  # only sessions from this date

Replicating for other projects
-------------------------------
1. Copy this script into your project's scripts/ directory.
2. Edit the CONFIG block below.
3. Run once with --rebuild to backfill history.
4. Schedule periodically (cron, GitHub Actions, etc.) without --rebuild to append new sessions.

GitHub Actions example (weekly):
  - name: Update work log
    run: python scripts/update_work_log.py
    # Then commit WORK_LOG.md if changed
"""

import argparse
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# CONFIG — edit these for your project
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).parent.parent          # adjust if script is elsewhere
WORK_LOG_PATH = REPO_ROOT / "WORK_LOG.md"
SESSION_GAP_HOURS = 4          # gap > this → new session
COAUTHOR_FILTER = "Co-Authored-By: Claude"        # only commits with this string
AUTHOR_FILTER = None                               # or e.g. "kana" to filter by author name
PROJECT_NAME = "districtdrift"
PROJECT_URL = "https://districtdrift.org"
# ---------------------------------------------------------------------------

SUMMARY_START = "<!-- SUMMARY:START -->"
SUMMARY_END = "<!-- SUMMARY:END -->"
SESSIONS_START = "<!-- SESSIONS:START -->"
SESSIONS_END = "<!-- SESSIONS:END -->"


# ---------------------------------------------------------------------------
# Git helpers
# ---------------------------------------------------------------------------

def git(*args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(REPO_ROOT), *args],
        capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()


def get_commits(since: str | None = None) -> list[dict]:
    """Return list of commit dicts, oldest first."""
    fmt = "%H|%ai|%an|%s"
    cmd = ["log", f"--pretty=format:{fmt}"]
    if COAUTHOR_FILTER:
        cmd += [f"--grep={COAUTHOR_FILTER}"]
    if AUTHOR_FILTER:
        cmd += [f"--author={AUTHOR_FILTER}"]
    if since:
        cmd += [f"--after={since}"]
    output = git(*cmd)
    if not output:
        return []
    commits = []
    for line in output.splitlines():
        parts = line.split("|", 3)
        if len(parts) != 4:
            continue
        sha, ts_str, author, subject = parts
        ts = datetime.fromisoformat(ts_str)
        commits.append({"sha": sha[:8], "ts": ts, "author": author, "subject": subject})
    return list(reversed(commits))  # oldest first


def group_into_sessions(commits: list[dict]) -> list[dict]:
    """Group commits into sessions separated by SESSION_GAP_HOURS."""
    if not commits:
        return []
    sessions = []
    current: list[dict] = [commits[0]]
    for c in commits[1:]:
        gap = c["ts"] - current[-1]["ts"]
        if gap > timedelta(hours=SESSION_GAP_HOURS):
            sessions.append(_make_session(current))
            current = [c]
        else:
            current.append(c)
    sessions.append(_make_session(current))
    return sessions


def _make_session(commits: list[dict]) -> dict:
    start = commits[0]["ts"]
    end = commits[-1]["ts"]
    duration_h = (end - start).total_seconds() / 3600
    subjects = [c["subject"] for c in commits]
    return {
        "start": start,
        "end": end,
        "duration_h": duration_h,
        "commits": commits,
        "count": len(commits),
        "subjects": subjects,
    }


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------

def format_dt(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d %H:%M")


def render_summary(sessions: list[dict]) -> str:
    total_commits = sum(s["count"] for s in sessions)
    total_hours = sum(s["duration_h"] for s in sessions)
    first = sessions[0]["start"].strftime("%Y-%m-%d") if sessions else "—"
    last = sessions[-1]["end"].strftime("%Y-%m-%d") if sessions else "—"

    lines = [
        SUMMARY_START,
        "## Summary",
        "",
        f"| | |",
        f"|---|---|",
        f"| **Sessions** | {len(sessions)} |",
        f"| **Commits** | {total_commits} (all Claude co-authored) |",
        f"| **Active time** | ~{total_hours:.0f} h across {len(sessions)} sessions |",
        f"| **Date range** | {first} → {last} |",
        f"| **Project** | [{PROJECT_NAME}]({PROJECT_URL}) |",
        "",
        "### Sessions at a glance",
        "",
        "| # | Date | Duration | Commits | Focus |",
        "|---|------|----------|---------|-------|",
    ]
    for i, s in enumerate(sessions, 1):
        date = s["start"].strftime("%Y-%m-%d")
        dur = f"{s['duration_h']:.1f}h" if s["duration_h"] >= 1 else f"{s['duration_h']*60:.0f}m"
        focus = _session_focus(s["subjects"])
        lines.append(f"| {i} | {date} | {dur} | {s['count']} | {focus} |")

    lines += ["", SUMMARY_END]
    return "\n".join(lines)


def _session_focus(subjects: list[str]) -> str:
    """Derive a short focus label from commit subjects."""
    # Use the last commit subject as the session headline
    last = subjects[-1] if subjects else ""
    # Truncate if long
    if len(last) > 60:
        last = last[:57] + "..."
    return last


def render_session(n: int, s: dict) -> str:
    date = s["start"].strftime("%Y-%m-%d")
    start_t = s["start"].strftime("%H:%M")
    end_t = s["end"].strftime("%H:%M")
    dur = f"{s['duration_h']:.1f}h" if s["duration_h"] >= 1 else f"{s['duration_h']*60:.0f}m"
    lines = [
        f"### Session {n} — {date}",
        f"**{start_t} → {end_t}** ({dur}) · {s['count']} commits",
        "",
        "| Commit | Subject |",
        "|--------|---------|",
    ]
    for c in s["commits"]:
        subject = c["subject"].replace("|", "\\|")
        lines.append(f"| `{c['sha']}` | {subject} |")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# File I/O
# ---------------------------------------------------------------------------

def read_log() -> str:
    if WORK_LOG_PATH.exists():
        return WORK_LOG_PATH.read_text()
    return ""


def extract_last_logged_date(content: str) -> str | None:
    """Find the most recent session date already in the log."""
    matches = re.findall(r"### Session \d+ — (\d{4}-\d{2}-\d{2})", content)
    return matches[-1] if matches else None


def write_log(content: str) -> None:
    WORK_LOG_PATH.write_text(content)


def build_full_log(sessions: list[dict]) -> str:
    header = (
        f"# Work Log — {PROJECT_NAME}\n\n"
        f"Auto-generated by `scripts/update_work_log.py`.\n"
        f"Run `python scripts/update_work_log.py` to update.\n\n"
    )
    summary = render_summary(sessions)
    sessions_block_lines = [SESSIONS_START]
    for i, s in enumerate(sessions, 1):
        sessions_block_lines.append(render_session(i, s))
    sessions_block_lines.append(SESSIONS_END)
    sessions_block = "\n".join(sessions_block_lines)
    return header + summary + "\n\n---\n\n" + sessions_block + "\n"


def update_log(existing: str, new_sessions: list[dict], all_sessions: list[dict]) -> str:
    """Update summary block and append new sessions to existing log."""
    # Update summary
    new_summary = render_summary(all_sessions)
    if SUMMARY_START in existing and SUMMARY_END in existing:
        existing = re.sub(
            re.escape(SUMMARY_START) + ".*?" + re.escape(SUMMARY_END),
            new_summary,
            existing,
            flags=re.DOTALL,
        )
    else:
        existing = existing.rstrip() + "\n\n" + new_summary + "\n"

    # Find the next session number
    last_n_match = re.findall(r"### Session (\d+)", existing)
    next_n = int(last_n_match[-1]) + 1 if last_n_match else 1

    # Append new sessions before SESSIONS_END if present, else at end
    new_session_text = ""
    for i, s in enumerate(new_sessions, next_n):
        new_session_text += render_session(i, s)

    if new_session_text:
        if SESSIONS_END in existing:
            existing = existing.replace(SESSIONS_END, new_session_text + SESSIONS_END)
        else:
            existing = existing.rstrip() + "\n\n" + new_session_text

    return existing


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Update WORK_LOG.md from git history")
    parser.add_argument("--rebuild", action="store_true", help="Rebuild from scratch")
    parser.add_argument("--preview", action="store_true", help="Print output, don't write")
    parser.add_argument("--since", help="Only include sessions from this date (YYYY-MM-DD)")
    args = parser.parse_args()

    existing = read_log()

    if args.rebuild or not existing:
        # Full rebuild
        commits = get_commits(since=args.since)
        if not commits:
            print("No commits found matching filter.")
            sys.exit(0)
        sessions = group_into_sessions(commits)
        output = build_full_log(sessions)
        print(f"Rebuilt: {len(sessions)} sessions, {sum(s['count'] for s in sessions)} commits")
    else:
        # Incremental update: find commits since last logged date
        last_date = extract_last_logged_date(existing)
        since = args.since or last_date

        # Get ALL sessions for summary recalculation
        all_commits = get_commits()
        all_sessions = group_into_sessions(all_commits)

        # Get only new commits
        new_commits = get_commits(since=since)
        new_sessions_raw = group_into_sessions(new_commits)

        # Exclude sessions already fully logged
        if last_date:
            last_dt = datetime.fromisoformat(last_date + "T00:00:00+00:00").replace(tzinfo=None)
            new_sessions = [
                s for s in new_sessions_raw
                if s["start"].replace(tzinfo=None) > last_dt
                or s["end"].replace(tzinfo=None) > last_dt
            ]
        else:
            new_sessions = new_sessions_raw

        if not new_sessions:
            print("Work log is up to date.")
            return

        output = update_log(existing, new_sessions, all_sessions)
        added = sum(s["count"] for s in new_sessions)
        print(f"Added {len(new_sessions)} session(s), {added} commits")

    if args.preview:
        print("\n" + "=" * 60)
        print(output)
    else:
        write_log(output)
        print(f"Wrote {WORK_LOG_PATH}")


if __name__ == "__main__":
    main()
