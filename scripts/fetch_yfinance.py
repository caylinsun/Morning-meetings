"""Fetch dated Yahoo observations through yfinance; never overwrite verified editions.
Usage: python scripts/fetch_yfinance.py --date 2026-09-18 --output dist/yfinance-observations.json
"""
import argparse,datetime,json,pathlib
import yfinance as yf
p=argparse.ArgumentParser();p.add_argument('--date',required=True);p.add_argument('--output',required=True);a=p.parse_args();end=datetime.date.fromisoformat(a.date);root=pathlib.Path(__file__).resolve().parents[1]
symbols=[i['symbol'] for f in ['data.json','data-alternate.json'] for i in json.loads((root/'dist'/f).read_text())['instruments']]
result={'provider':'Yahoo Finance via yfinance','version':yf.__version__,'fetchedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'session':a.date,'observations':{},'errors':{}}
yf.set_tz_cache_location(str(root.parent/'yfinance-cache'))
for symbol in symbols:
 try:
  h=yf.Ticker(symbol).history(start=str(end-datetime.timedelta(days=7)),end=str(end+datetime.timedelta(days=1)),auto_adjust=False,raise_errors=True)
  rows=[{'date':t.strftime('%Y-%m-%d'),'close':float(r['Close'])} for t,r in h.iterrows() if str(t.date())<=a.date]
  if not rows or rows[-1]['date']!=a.date:raise ValueError('Requested session unavailable')
  result['observations'][symbol]=rows
 except Exception as e:result['errors'][symbol]=str(e)
path=pathlib.Path(a.output);path.write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps({'verified':len(result['observations']),'failed':len(result['errors']),'version':yf.__version__}))
