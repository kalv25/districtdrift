"""
Extract and check all external URLs from events.ts and +page.svelte.

Writes results to /tmp/link_check_results.json for report_links.py to consume.
"""

import re
import json
import time
import httpx
from pathlib import Path

ROOT = Path(__file__).parent.parent

SOURCES = [
    ROOT / "web/src/lib/events.ts",
    ROOT / "web/src/routes/+page.svelte",
]

# URLs to skip: dynamic templates, SVG namespaces, self-references
SKIP_PATTERNS = [
    r"\$\{",                    # template literals
    r"districtdrift\.org",      # self-links
    r"localhost",
    r"w3\.org/2000/svg",        # SVG namespace
    r"example\.com",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; districtdrift-linkchecker/1.0; "
                  "+https://github.com/kalv25/districtdrift)",
}

TIMEOUT = 15
# Some sites block HEAD; fall back to GET with small range
FALLBACK_HEADERS = {**HEADERS, "Range": "bytes=0-0"}


def extract_urls(path: Path) -> list[tuple[str, str]]:
    """Return list of (url, source_file) from a source file."""
    text = path.read_text(encoding="utf-8")
    urls = re.findall(r'https?://[^\s"\'<>\\]+', text)
    results = []
    for url in urls:
        # Strip trailing punctuation that crept in
        url = url.rstrip(".,;)")
        if any(re.search(p, url) for p in SKIP_PATTERNS):
            continue
        results.append((url, path.name))
    return results


def check_url(url: str) -> dict:
    try:
        r = httpx.head(url, headers=HEADERS, timeout=TIMEOUT, follow_redirects=True)
        if r.status_code == 405:
            # HEAD not allowed — try GET with byte range
            r = httpx.get(url, headers=FALLBACK_HEADERS, timeout=TIMEOUT, follow_redirects=True)
        status = r.status_code
        # 403 = bot-blocking (warn, not broken); 2xx/3xx = ok; 4xx/5xx = broken
        warn = status == 403 or status == 402
        ok = status < 400 or warn
        return {"url": url, "status": status, "ok": ok, "warn": warn, "error": None}
    except httpx.TimeoutException:
        return {"url": url, "status": None, "ok": False, "warn": False, "error": "timeout"}
    except httpx.TooManyRedirects:
        return {"url": url, "status": None, "ok": False, "warn": False, "error": "too many redirects"}
    except Exception as e:
        return {"url": url, "status": None, "ok": False, "warn": False, "error": str(e)[:120]}


def main():
    # Collect unique URLs with their source files
    seen: dict[str, str] = {}
    for source in SOURCES:
        if not source.exists():
            print(f"Warning: {source} not found, skipping")
            continue
        for url, filename in extract_urls(source):
            if url not in seen:
                seen[url] = filename

    print(f"Checking {len(seen)} unique URLs…")

    results = []
    for i, (url, source) in enumerate(seen.items(), 1):
        result = check_url(url)
        result["source"] = source
        results.append(result)
        status_str = str(result["status"]) if result["status"] else result["error"]
        flag = "✓" if result["ok"] else "✗"
        print(f"  [{i:3d}/{len(seen)}] {flag} {status_str:>6}  {url}")
        # Polite delay — don't hammer servers
        time.sleep(0.4)

    broken = [r for r in results if not r["ok"]]
    warned = [r for r in results if r.get("warn")]
    print(f"\nDone. {len(broken)} broken, {len(warned)} blocked (403), {len(results)} total.")

    out = Path("/tmp/link_check_results.json")
    out.write_text(json.dumps({"results": results, "broken": broken, "warned": warned}, indent=2))
    print(f"Results written to {out}")


if __name__ == "__main__":
    main()
