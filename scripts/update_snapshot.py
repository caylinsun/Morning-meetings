"""Refresh both saved dashboard sets from Yahoo Finance via yfinance."""
from __future__ import annotations

import calendar
import datetime as dt
import json
from pathlib import Path

import yfinance as yf

ROOT = Path(__file__).resolve().parents[1]
FILES = (ROOT / "dist/data.json", ROOT / "dist/data-alternate.json")
NOW = dt.datetime.now(dt.timezone.utc)

def month_before(value: dt.date) -> dt.date:
    year, month = value.year, value.month - 1
    if month == 0:
        year, month = year - 1, 12
    return dt.date(year, month, min(value.day, calendar.monthrange(year, month)[1]))

def point_on_or_before(series: list[dict], target: dt.date) -> dict:
    eligible = [p for p in series if dt.date.fromisoformat(p["date"]) <= target]
    if not eligible:
        raise ValueError(f"No observation on or before {target}")
    return eligible[-1]

def performance(item: dict) -> dict:
    series = item["series"]
    latest = series[-1]
    end = dt.date.fromisoformat(latest["date"])
    bases = {
        "1D": series[-2],
        "1W": point_on_or_before(series[:-1], end - dt.timedelta(days=7)),
        "1M": point_on_or_before(series[:-1], month_before(end)),
        "YTD": point_on_or_before(series[:-1], dt.date(end.year - 1, 12, 31)),
    }
    result = {}
    for label, base in bases.items():
        pct = (item["quote"] / base["v"] - 1) * 100
        result[label] = {
            "base": base["v"], "baseDate": base["date"], "baseTime": None,
            "baseLabel": f'{base["date"]} daily close', "endDate": item["sessionDate"],
            "endTime": item["quoteTime"], "pct": pct,
            "bp": (item["quote"] - base["v"]) * 100 if item["group"] == "Bonds" else None,
        }
    return result

def update_item(item: dict) -> None:
    ticker = yf.Ticker(item["symbol"])
    history = ticker.history(period="2y", interval="1d", auto_adjust=False, raise_errors=True)
    if history.empty:
        raise ValueError(f'No history for {item["symbol"]}')
    metadata = ticker.history_metadata
    quote_time = int(metadata["regularMarketTime"])
    timezone = dt.timezone.utc
    try:
        from zoneinfo import ZoneInfo
        timezone = ZoneInfo(metadata.get("exchangeTimezoneName") or "UTC")
    except Exception:
        pass
    session = dt.datetime.fromtimestamp(quote_time, timezone).date().isoformat()
    quote = round(float(metadata.get("regularMarketPrice") or history["Close"].iloc[-1]), item["digits"])
    series = []
    for timestamp, row in history.iterrows():
        if row["Close"] != row["Close"]:
            continue
        series.append({"date": timestamp.date().isoformat(), "v": float(row["Close"]), "kind": "Daily close", "sourceTimestamp": int(timestamp.timestamp())})
    if series[-1]["date"] == session:
        series[-1].update(v=quote, kind="Latest provider observation", sourceTimestamp=quote_time)
    else:
        series.append({"date": session, "v": quote, "kind": "Latest provider observation", "sourceTimestamp": quote_time})
    item.update(quote=quote, quoteTime=quote_time, sessionDate=session, series=series, hourly=[], status="Latest provider observation", fetchedAt=NOW.isoformat())
    item["performance"] = performance(item)
    one_day = item["performance"]["1D"]
    if item["group"] == "Bonds":
        direction = "rose" if one_day["bp"] >= 0 else "fell"
        item["why"] = f'The yield {direction} {abs(one_day["bp"]):.1f} basis points from the previous available daily close. The verified series establishes the move, not a single cause.'
    else:
        direction = "rose" if one_day["pct"] >= 0 else "fell"
        item["why"] = f'The instrument {direction} {abs(one_day["pct"]):.2f}% from the previous available daily close. The verified series establishes the move, not a single cause.'
    item["whyType"] = "Verified observation; catalyst discussed in related reading"
    if item["group"] == "Crypto":
        item["note"] = "Daily observations use UTC. The latest value can be a partial-day snapshot because crypto trades continuously."

all_items = []
for path in FILES:
    data = json.loads(path.read_text())
    for instrument in data["instruments"]:
        update_item(instrument)
        all_items.append(instrument)
    data["asOf"] = NOW.isoformat()
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")))

observations = {"provider": "Yahoo Finance via yfinance", "version": yf.__version__, "fetchedAt": NOW.isoformat(), "session": "instrument-specific latest available session", "observations": {item["symbol"]: [{"date": p["date"], "close": p["v"]} for p in item["series"][-10:]] for item in all_items}, "errors": {}}
(ROOT / "dist/yfinance-observations.json").write_text(json.dumps(observations, ensure_ascii=False, indent=2))

audit = {"generatedAt": NOW.isoformat(), "provider": "Yahoo Finance via yfinance", "sets": {path.name: [{"symbol": item["symbol"], "quote": item["quote"], "unit": item["unit"], "quoteTime": item["quoteTime"], "sessionDate": item["sessionDate"], "source": item["rawUrl"]} for item in json.loads(path.read_text())["instruments"]] for path in FILES}}
(ROOT / "dist/refresh-audit.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2))
print(json.dumps({"updated": len(all_items), "asOf": NOW.isoformat(), "yfinance": yf.__version__))
