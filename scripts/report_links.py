"""
Read link check results from /tmp/link_check_results.json and create or
update a GitHub issue titled '[Automated] Broken links'.

Requires: GH_TOKEN and REPO env vars (set by the workflow).
"""

import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ISSUE_TITLE = "[Automated] Broken links"
RESULTS_FILE = Path("/tmp/link_check_results.json")


def run_gh(*args) -> str:
    result = subprocess.run(
        ["gh", *args],
        capture_output=True, text=True,
        env={**os.environ},
    )
    if result.returncode != 0:
        print(f"gh error: {result.stderr}", file=sys.stderr)
    return result.stdout.strip()


def find_existing_issue(repo: str) -> str | None:
    """Return the issue number of an existing open broken-links issue, or None."""
    out = run_gh("issue", "list",
                 "--repo", repo,
                 "--state", "open",
                 "--search", ISSUE_TITLE,
                 "--json", "number,title",
                 "--limit", "10")
    if not out:
        return None
    issues = json.loads(out)
    for issue in issues:
        if issue["title"] == ISSUE_TITLE:
            return str(issue["number"])
    return None


def build_body(broken: list, warned: list, total: int) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    def rows(items):
        return "\n".join(
            f"| `{r['status'] or r['error']}` | {r['source']} | {r['url']} |"
            for r in items
        )

    if not broken and not warned:
        return (
            f"## ✅ All links OK\n\n"
            f"Checked {total} URLs on {now}. No broken links found.\n\n"
            f"_Auto-updated by the [link-checker workflow]"
            f"(../../actions/workflows/link-checker.yml)_"
        )

    sections = []
    if broken:
        sections.append(
            f"### 🔴 {len(broken)} broken (404 / 5xx / network error)\n\n"
            f"These need to be fixed — page is gone or unreachable.\n\n"
            f"| Status | File | URL |\n|--------|------|-----|\n{rows(broken)}"
        )
    if warned:
        sections.append(
            f"### 🟡 {len(warned)} possibly bot-blocked (403)\n\n"
            f"These returned 403. They may be fine in a browser — "
            f"verify manually before removing.\n\n"
            f"| Status | File | URL |\n|--------|------|-----|\n{rows(warned)}"
        )

    body = f"## ⚠️ Link check results — {now}\n\nChecked {total} URLs.\n\n"
    body += "\n\n".join(sections)
    body += (
        "\n\n_Auto-updated by the [link-checker workflow]"
        "(../../actions/workflows/link-checker.yml)_"
    )
    return body


def main():
    repo = os.environ.get("REPO", "")
    if not repo:
        print("REPO env var not set", file=sys.stderr)
        sys.exit(1)

    if not RESULTS_FILE.exists():
        print(f"{RESULTS_FILE} not found — was check_links.py run?", file=sys.stderr)
        sys.exit(1)

    data = json.loads(RESULTS_FILE.read_text())
    broken = data["broken"]
    warned = data.get("warned", [])
    total = len(data["results"])
    body = build_body(broken, warned, total)

    existing = find_existing_issue(repo)

    if existing:
        print(f"Updating issue #{existing}…")
        run_gh("issue", "edit", existing, "--repo", repo, "--body", body)
        # Re-open if it was closed and there are new failures
        if broken:
            run_gh("issue", "reopen", existing, "--repo", repo)
        else:
            run_gh("issue", "close", existing, "--repo", repo,
                   "--comment", "All links are passing — closing.")
        print(f"Done. Issue #{existing} updated.")
    else:
        if not broken:
            print("No broken links and no existing issue — nothing to do.")
            return
        print("Creating new issue…")
        out = run_gh("issue", "create",
                     "--repo", repo,
                     "--title", ISSUE_TITLE,
                     "--body", body,
                     "--label", "maintenance")
        print(f"Created: {out}")


if __name__ == "__main__":
    main()
