'use strict';
(()=>{
const glossary=[
['Stocks|equities|equity','股票','Ownership shares in a company.','代表對一家公司的部分擁有權。'],
['Foreign Exchange|FX','外匯','The exchange of one currency for another.','把一種貨幣兌換成另一種貨幣的市場或交易。'],
['Commodities','商品','Raw materials such as oil, copper and gold that are traded in markets.','在市場交易的原材料，例如石油、銅和黃金。'],
['Bonds|bond','債券','Debt issued by a government or company, with promised payments under its terms.','政府或企業發行的債務，按條款承諾支付利息及償還本金。'],
['Crypto','加密資產','Digital assets recorded on distributed networks; prices can fluctuate sharply.','在分散式網絡上記錄的數碼資產，價格可能大幅波動。'],
['capital markets','資本市場','Markets where businesses and governments raise funding through securities such as shares and bonds.','企業及政府透過股票、債券等證券籌集資金的市場。'],
['asset classes','資產類別','Groups of investments with similar features, such as stocks or bonds.','具有相似特徵的投資分類，例如股票或債券。'],
['Market breadth','市場寬度','How widely a market move is shared across individual stocks.','市場升跌涵蓋多少個別股票；指數上升不代表大部分股票都上升。'],
['Benchmark|benchmarks','基準','A reference used to evaluate a market or investment.','用來衡量市場或投資表現的參考標準。'],
['index|indices','指數','A measure that tracks a selected group of assets.','追蹤一組指定資產表現的衡量指標。'],
['Base currency','基礎貨幣','The first currency in a pair: GBP in GBP/USD.','貨幣對中排在首位的貨幣，例如 GBP/USD 中的英鎊。'],
['Quote currency','報價貨幣','The second currency in a pair: USD in GBP/USD.','貨幣對中排在第二位的貨幣，例如 GBP/USD 中的美元。'],
['Futures contract|futures','期貨合約','A contract to buy or sell an asset at an agreed price on a future date.','約定在未來日期以指定價格買入或賣出資產的合約。'],
['Contract roll|contract rolls','期貨轉倉','Replacing an expiring futures position with a later-dated contract; price gaps can affect continuous charts.','把即將到期的期貨倉位轉至較後到期的合約；合約價差可能影響連續圖表。'],
['Basis point|basis points|bp','基點','One basis point is 0.01 percentage point. A yield rising from 4.00% to 4.25% rises 25 bp.','一個基點等於 0.01 個百分點。收益率從 4.00% 升至 4.25%，即上升 25 個基點。'],
['Duration','存續期','A measure of a bond price’s sensitivity to changes in yields; higher duration usually means greater sensitivity.','衡量債券價格對收益率變動的敏感度；存續期越高，通常價格反應越大。'],
['Liquidity','流動性','How easily an asset can be traded without substantially changing its price.','資產能否容易買賣而不大幅影響價格。'],
['Volatility','波動性','The size and frequency of price fluctuations.','價格變動的幅度與頻率。'],
['yield to maturity','到期收益率','The discount rate that equates a bond’s price with its promised payments through maturity; it is not a guaranteed realised return.','使債券未來承諾付款的現值等於現價的折現率，並非保證能實現的回報。'],
['discount yield','貼現收益率','An annualised bill yield calculated from the discount to face value, rather than the purchase price.','按票面值與買入價之差計算的年化票據收益率，以票面值而非買入價作基礎。'],
['yield|yields','收益率','An income or pricing measure expressed as a percentage. A yield change is not the same as an investment return.','以百分比表示的收入或定價指標；收益率的變動並不等於投資回報。'],
['Treasury bill|bill','國庫券','Short-term government debt typically sold at a discount and repaid at face value.','通常以低於面值的價格發行、到期按面值償還的短期政府債務。'],
['Treasury|Treasuries','美國國債','In this dashboard, debt securities issued by the US government.','在本儀表板中，指美國政府發行的債務證券。'],
['central-bank|central bank|central banks','中央銀行','An institution responsible for monetary policy, such as setting policy interest rates.','負責貨幣政策的機構，例如設定政策利率。'],
['Fed','美國聯邦儲備局（聯儲局）','The US central bank, which sets monetary policy.','美國的中央銀行，負責制定貨幣政策。'],
['monetary policy','貨幣政策','Central-bank actions that influence interest rates, credit and economic activity.','中央銀行影響利率、信貸及經濟活動的措施。'],
['inflation','通脹','A sustained rise in the general price level, reducing money’s purchasing power.','整體物價持續上升，令貨幣購買力下降。'],
['hawkish','鷹派','Favouring tighter monetary policy to restrain inflation.','傾向收緊貨幣政策，以抑制通脹。'],
['tightening','收緊政策','Reducing monetary support, for example by raising policy interest rates.','減少貨幣政策支持，例如提高政策利率。'],
['rate hike|rate increase','加息','An increase in an interest rate, often a central bank’s policy rate.','提高利率，通常指中央銀行提高政策利率。'],
['valuations','估值','Assessments of an asset’s value, often relative to earnings, cash flows or other assets.','對資產價值的評估，常參考盈利、現金流或其他資產。'],
['rebased|rebased to 100','重新設定基期為 100','Putting price series on the same starting level so their percentage moves can be compared.','把不同價格序列的起點設為 100，以便比較百分比變動。'],
['correlation','相關性','How two series tend to move together; it does not establish that one causes the other.','兩組數據共同變動的傾向；相關性不能證明因果關係。'],
['dividends','股息','Payments a company distributes to its shareholders.','公司向股東派發的款項。'],
['settlement','結算價','An exchange-determined reference price used to value futures positions; it can differ from the latest trade.','交易所用來計算期貨倉位價值的參考價格，可能與最新成交價不同。'],
['YTD','年初至今','The change since the previous year-end reference date.','相對上一年年底基準日期的變動。'],
['risk-on','風險偏好上升','A market mood in which investors are more willing to hold riskier assets.','投資者較願意持有高風險資產的市場情緒。'],
['risk-off','風險偏好下降','A market mood in which investors seek more defensive assets.','投資者傾向尋求較具防守性資產的市場情緒。']
];
const dictionary=new Map();glossary.forEach((entry,id)=>entry[0].split('|').forEach(word=>dictionary.set(word.toLowerCase(),id)));
const escapeRE=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const pattern=new RegExp('\\b('+[...dictionary.keys()].sort((a,b)=>b.length-a.length).map(escapeRE).join('|')+')\\b','gi');
const tip=document.createElement('div');tip.id='vocabulary-tooltip';tip.className='vocabulary-tooltip';tip.setAttribute('role','tooltip');tip.setAttribute('popover','manual');tip.hidden=true;
let current=null,timer;
function hide(){clearTimeout(timer);if(current)current.removeAttribute('aria-describedby');current=null;if(tip.matches(':popover-open'))tip.hidePopover();tip.hidden=true;}
function position(){if(!current?.isConnected){hide();return;}const r=current.getBoundingClientRect(),t=tip.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(r.left,innerWidth-t.width-8))+'px';tip.style.top=Math.max(8,r.bottom+8+t.height<innerHeight?r.bottom+8:r.top-t.height-8)+'px';}
function show(button){clearTimeout(timer);if(current===button)return;hide();current=button;const entry=glossary[Number(button.dataset.vocab)];tip.replaceChildren();for(const [tag,text,lang] of [['strong',button.textContent,'en'],['b',entry[1],'zh-Hant'],['p',entry[2],'en'],['p',entry[3],'zh-Hant']]){const e=document.createElement(tag);e.textContent=text;e.lang=lang;tip.append(e);}const host=button.closest('dialog')||document.body;host.append(tip);tip.hidden=false;if(tip.showPopover)tip.showPopover();button.setAttribute('aria-describedby',tip.id);position();}
function scheduleHide(){clearTimeout(timer);timer=setTimeout(hide,180);}
function annotate(){observer.disconnect();const roots=document.querySelectorAll('.asset-heading h2,.card h3,.card .explanation,.movement-period,.stories h3,.stories p,.why p,.detail-context,.quality-note,.event-note,.comparison p,.term');for(const root of roots){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('button,a,svg,select,.vocabulary-tooltip')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const node of nodes){const text=node.textContent;pattern.lastIndex=0;const matches=[...text.matchAll(pattern)];if(!matches.length)continue;const fragment=document.createDocumentFragment();let end=0;for(const m of matches){fragment.append(text.slice(end,m.index));const b=document.createElement('button');b.type='button';b.className='vocab-term';b.dataset.vocab=dictionary.get(m[0].toLowerCase());b.textContent=m[0];b.setAttribute('aria-label',m[0]+': definition and Chinese translation');fragment.append(b);end=m.index+m[0].length;}fragment.append(text.slice(end));node.replaceWith(fragment);}}if(current&&!current.isConnected)hide();observer.observe(document.querySelector('main'),{childList:true,subtree:true});observer.observe(document.querySelector('#detail-content'),{childList:true,subtree:true});}
const observer=new MutationObserver(annotate);annotate();
document.addEventListener('pointerover',e=>{const b=e.target.closest('.vocab-term');if(b)show(b);else if(tip.contains(e.target))clearTimeout(timer);});
document.addEventListener('pointerout',e=>{if(e.target.closest('.vocab-term')||tip.contains(e.target))scheduleHide();});
document.addEventListener('focusin',e=>{const b=e.target.closest('.vocab-term');if(b)show(b);else hide();});
document.addEventListener('click',e=>{const b=e.target.closest('.vocab-term');if(b)show(b);else if(!tip.contains(e.target))hide();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&current){e.preventDefault();e.stopImmediatePropagation();hide();}},true);
document.querySelector('#detail').addEventListener('close',hide);window.addEventListener('resize',hide);window.addEventListener('scroll',hide,true);
})();
