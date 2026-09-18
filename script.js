/* =====================================================================
   CONFIG  —  CHANGE THESE THREE VALUES
   ---------------------------------------------------------------------
   1) WHATSAPP_NUMBER : your number with country code, digits only.
                        India example: "919092521350"
                        (91 = India, then your 10-digit number, NO +, NO spaces)
   2) SHOP_NAME       : the name shown at the top.
   3) MIN_ORDER       : minimum order value in rupees.
   ===================================================================== */
   const WHATSAPP_NUMBER = "919345273268";   // <<< PUT YOUR REAL NUMBER HERE
   const CALL_NUMBER     = "6374439080";     // shown on Contact Us, digits only
   const INSTAGRAM_URL   = "";               // paste your Instagram profile link
   let SHOP_NAME         = "Thala Crackers";
   const MIN_ORDER       = 3000;
/* ===================================================================== */

/* ---------- Catalog (from your price list — price = Final Rate) ---------- */
const CATALOG = [
  ["Sparklers", [
    ["1","7 Cm Electric","10 Box (100 pcs)",91.25],["2","7 Cm Colour","10 Box (100 pcs)",112.5],
    ["3","10 Cm Electric","1 Box (10 pcs)",15.63],["4","10 Cm Colour","1 Box (10 pcs)",20],
    ["5","12 Cm Electric","1 Box (10 pcs)",23.75],["6","12 Cm Colour","1 Box (10 pcs)",26.25],
    ["7","15 Cm Electric","1 Box (10 pcs)",37.5],["8","15 Cm Colour","1 Box (10 pcs)",40],
    ["9","15 Cm Green","1 Box (10 pcs)",47.5],["10","15 Cm Red","1 Box (10 pcs)",53.75],
    ["11","30 Cm Electric","1 Box (5 pcs)",37.5],["12","30 Cm Colour","1 Box (5 pcs)",40],
    ["13","30 Cm Green","1 Box (5 pcs)",47.5],["14","30 Cm Red","1 Box (5 pcs)",53.75],
    ["15","50 Cm Electric","1 Box (5 pcs)",153.75],["16","50 Cm Colour","1 Box (5 pcs)",178.75],
  ]],
  ["Special Colourful Sparklers 2025", [
    ["17","Roating Sparklers","1 Box (1 pcs)",170],["18","Orange Sparklers","1 Box (10 pcs)",72.5],
    ["19","Blue Sparklers","1 Box (10 pcs)",72.5],["20","Pink Sparklers","1 Box (10 pcs)",72.5],
    ["21","Lovely Sparklers","1 Box (3 pcs)",175],
  ]],
  ["Flower Pots", [
    ["22","Flower Pots Big","1 Box (10 pcs)",73.75],["23","Flower Pots Special","1 Box (10 pcs)",93.75],
    ["24","Flower Pots Asoka","1 Box (10 pcs)",123.75],["25","Colour Koti","1 Box (10 pcs)",200],
    ["26","Colour Koti XL","1 Box (10 pcs)",218.75],["27","Colour Koti DLX","1 Box (10 pcs)",306.25],
    ["28","Flower Pot DLX","1 Box (5 pcs)",162.5],
  ]],
  ["Multi Colour Flower Pots", [
    ["29","Tri Colour Delux","1 Box (5 pcs)",286.25],["30","Motu Patlu Tri Colour","1 Box (5 pcs)",196.25],
    ["31","Angry Birds","1 Box (5 pcs)",292.5],["32","Shin Chan Tri Colour","1 Box (3 pcs)",125],
  ]],
  ["Chakkars (Ground)", [
    ["34","Ground Chakker Big","1 Box (10 pcs)",41.88],["35","Ground Chakker Special","1 Box (10 pcs)",75],
    ["36","Ground Chakker Delux","1 Box (10 pcs)",130],
  ]],
  ["Plastic Chakkar SPL 2025", [
    ["37","WhizzWheel","1 Box (5 pcs)",123.75],["38","4*4 Wheel","1 Box (5 pcs)",212.5],
    ["39","Vanita Spinner mix 3 colour","1 Box (8 pcs)",225],["40","Wire Chakker Delux","1 Box (10 pcs)",143.75],
    ["41","Plastic Chakker Special","1 Box (10 pcs)",97.5],["42","Plastic Chakker Delux","1 Box (10 pcs)",147.5],
  ]],
  ["Twinkling Star", [
    ["43","1 1/2 F.T 7 Star","1 Box (10 pcs)",20],["44","4 F.T 7 Star","1 Box (10 pcs)",60],
  ]],
  ["One Sound Crackers", [
    ["45","2.75 Kuruvi butle 50pcs","1 bundle (50 pcs)",81.25],["46","3 1/2 Lakshmi / Ben10","1 Pkt (5 pcs)",12.5],
    ["47","4' Lakshmi / Ben 10","1 Pkt (5 pcs)",18.75],["48","4' Delux Lakshmi / Ben 10","1 Pkt (5 pcs)",31.25],
    ["49","4 Gold Lakshmi spl","1 Pkt (5 pcs)",33.75],["50","2 Sound","1 Pkt (5 pcs)",30],
    ["51","5 Lakshmi / Lion Fighters","1 Pkt (5 pcs)",51.25],["52","6 Lakshmi / Lion Fighters","1 Pkt (5 pcs)",57.5],
    ["54","Lion Gun","1 Pkt (5 pcs)",100],
  ]],
  ["Wonder Candle 2023 (Sky King)", [
    ["56","Baby Mix Colour","1 Box (3 pcs)",136.25],["57","Hi Tech Candle","1 Box (3 pcs)",136.25],
    ["58","Wonder la Candle","1 Box (3 pcs)",136.25],["59","Trik Candle Mega","1 Box (3 pcs)",150],
    ["60","Minionies Candle Mega","1 Box (3 pcs)",150],["61","Goodly Candle Mega","1 Box (3 pcs)",150],
    ["62","Navang Multi Colour Candle","1 Box (5 pcs)",157.5],["63","Amazing Candle DLX","1 Box (2 pcs)",221.25],
  ]],
  ["Colour Crackling Guns", [
    ["64","Free Fire Sky King spl 2026","1 Box (2 pcs)",195],["65","AK 47 Vimal Special","1 Box (2 pcs)",287.5],
  ]],
  ["Bijili Crackers", [
    ["66","Red Bijili","1 Bag (100 pcs)",33.75],["67","Vari Bijili","1 Bag (100 pcs)",35],
    ["67A","Stripped Bijili","1 Bag",62.5],
  ]],
  ["Bombs", [
    ["68","King of King","1 Box (10 pcs)",108.75],["69","Classic Bomb","1 Box (10 pcs)",126.25],
    ["70","Delux Bomb","1 Box (10 pcs)",168.75],["73","Digital Bomb","1 Box (10 pcs)",250],
  ]],
  ["Super Sound SPL Wala Crackers", [
    ["76","1000 Wala SPL","1 Box (1 pcs)",350],["77","2000 Wala SPL Sound","1 Box (1 pcs)",700],
    ["78","5000 Wala SPL Sound","1 Box (1 pcs)",1750],["79","10000 Wala SPL Sound","1 Box (1 pcs)",3500],
    ["74","100 Wala","1 Box (1 pcs)",50],
  ]],
  ["Blue Star Brand SPL Fancy", [
    ["80","2\" fancy (5 varity)","1 Box",123.75],["81","2 1/2 3ball fancy (5 varity)","1 Box",185],
    ["82","3' fancy (5 varity)","1 Box",200],["83","Heart Beat","1 Box",331.25],
    ["84","Gous Star","1 Box",331.25],["85","Angel Dream","1 Box",331.25],
    ["86","Green City","1 Box",331.25],["87","Blue Pearl","1 Box",331.25],
  ]],
  ["Moorthy Brand SPL Fancy", [
    ["88","2 1/4 3pcs spl crackling fancy","1 Box (3 pcs)",387.5],["89","Chakli 4 varity","1 Box",411.25],
    ["90","New Love series","1 Box",348.75],["91","Marlboro 4 varity","1 Box",786.25],
    ["90-A","Scissors 4 variety","1 Box (2 pcs)",748.75],
  ]],
  ["Moorthy Brand SPL Setout Display", [
    ["92","Imperial Blue 2\" 12","1 Box",1562.5],["93","Jack Daniels 2\" 12 spl crackling","1 Box",1553.75],
    ["94","Officer's Choice 2\" 40 spl crackling","1 Box",5581.25],["95","Captain Morgan 3 1/2 20 spl crackling","1 Box",5988.75],
  ]],
  ["Liya Brand SPL IPL New Fancy", [
    ["96","10 X 10 Multi colour shot 2023 spl","1 Box",3712.5],["97","5 X 10 Multi colour + crackling 2026 spl","1 Box",2111.25],
    ["98","12 step fancy 2025 spl","1 Box",397.5],
  ]],
  ["Sonny Brand Mega Display", [
    ["99","Hercules","1 Box (2 pcs)",1625],["100","Colour Plus","1 Box (2 pcs)",1625],
    ["101","Zulkwar (Ring fancy)","1 Box (2 pcs)",1625],["102","Gold Spider","1 Box (2 pcs)",1123.75],
  ]],
  ["INF Big Brand Unique Fancy", [
    ["103","Sky Driver colour + crackling (8 varity)","1 Box",473.75],["104","God Father Pink Colour","1 Box",661.25],
    ["105","Neela Angle blue colour","1 Box",661.25],["106","Premium Unique 8 desin","1 Box (2 pcs)",1387.5],
  ]],
  ["Wow Star Brand SPL Colours", [
    ["107","Wow Colour mix","1 Box",546.25],["108","Wow Pink","1 Box",546.25],
  ]],
  ["Vanitha Brand SPL Colour Fancy", [
    ["109","I World","1 Box (2 pcs)",1497.5],["110","Pink Out","1 Box (2 pcs)",1497.5],
    ["111","Purple Rain","1 Box",1866.25],["112","Ocean Blue (New 2026)","1 Box",2831.25],
    ["113","Snake Eye (New 2026)","1 Box",2831.25],
  ]],
  ["NSV Brand Fancy Collection", [
    ["114","4\" spl colour (5 desin)","1 Box",318.75],["115","4\" fancy 2pcs (2 variety)","1 Box",737.5],
    ["116","4\" Alban series 3pcs (3 varity)","1 Box",1112.5],["117","5\" Bullion series 2pcs (3 varity)","1 Box",990],
  ]],
  ["Bee Brand", [
    ["118","Gulf War crackling","1 Box (3 pcs)",561.25],["119","30 shot full crackling spl","1 Box",748.75],
    ["119A","7 step","1 pcs",425],
  ]],
  ["Mega Sky Display Fancy", [
    ["120","2\" 3pcs fancy brand","1 Box (3 pcs)",243.75],["121","3.5 inch fancy piral 6 desin","1 Box",275],
    ["122","4 inch fancy 5 desin","1 Box",292.5],["123","Nayagara Falls","1 Box",323.75],
    ["124","King Fisher","1 Box",323.75],["125","Double Ball spl 4 disin","1 Box",481.25],
  ]],
  ["Asok Brand 2026 SPL", [
    ["126","Giggly Fizz (popcorn)","1 pcs",206.25],["127","Tequila Stars","1 pcs",206.25],
    ["128","Jolly Bobby mocktail","1 pcs",206.25],["129","Gang Banger's crackling 2 in 1","1 Box",2998.75],
  ]],
  ["Sky Rockets", [
    ["130","Roket Bomb","1 Box (10 pcs)",65],["131","Lunik Rocket","1 Box (10 pcs)",150],
    ["132","Whizzing Rocket","1 Box (10 pcs)",175],
  ]],
  ["Mega Multicolour Shots", [
    ["133","12 Shot Rider","1 Box",181.25],["134","12 Shot multi colour","1 Box",205],
    ["135","25 Shot multicolour","1 Box",450],["136","30 Shot multicolour","1 Box",487.5],
    ["137","15 Shot multicolour","1 Box",275],["138","60 Shot multicolour","1 Box",1000],
    ["139","120 Shot multi colour","1 Box",2000],["140","240 Shot Mega Multicolour","1 Box",4000],
    ["141","500 Shot Mega Multicolour","1 Box",8126.25],
  ]],
  ["Multi Colour Shot (Budget)", [
    ["142","30 Shot multicolour","1 Box",443.75],["143","60 Shot multicolour","1 Box",925],
    ["144","120 Shot multi colour","1 Box",1850],["145","240 Shot Multicolour","1 Box",3700],
  ]],
  ["Vanitha Products", [
    ["146","Pink Rope","1 Box (4 pcs)",192.5],["147","Pom Pom","1 Box (40 pcs)",206.25],
    ["148","Chip White","1 Box (2 pcs)",133.75],["149","Chip Green","1 Box (2 pcs)",133.75],
    ["150","Chip Sunrise","1 Box (2 pcs)",133.75],["151","Chip Gold","1 Box (2 pcs)",133.75],
    ["152","Chip Combo mix","1 Box (2 pcs)",668.75],["153","Colour Cone","1 Box (10 pcs)",596.25],
  ]],
  ["Mini Arial Fancy", [
    ["154","1.25 Chotta Fancy","1 Box (1 pcs)",33.75],["155","1 UP Skyking brand","1 Box (5 pcs)",161.25],
    ["156","2 UP & 1 UP Sky King brand","1 Box (5 pcs)",161.25],["158","Gold Coin Skyking brand","1 Box (5 pcs)",176.25],
    ["159","White House Sky King brand","1 Box (5 pcs)",176.25],["160","Star World Sky King brand","1 Box (5 pcs)",176.25],
    ["161","Sun Rise Sky King brand","1 Box (5 pcs)",176.25],["162","Pentagon shot 5 colour mix","1 Box (5 pcs)",211.25],
    ["163","White House spl crackling","1 Box (5 pcs)",211.25],["164","Blue Moon","1 Box (5 pcs)",137.5],
    ["165","Golden Sun","1 Box (5 pcs)",137.5],
  ]],
  ["Twin Colour Crackling Fountain (Vimal)", [
    ["166","Fun Zone crackling spl","1 Box (5 pcs)",498.75],["167","Pop Fun (5 varity)","1 Box",156.25],
    ["168","Golden Pearl jumbing chakkar / spy magic","1 Box",236.25],["169","Green Blossom jumbing chakkar / spy magic","1 Box",236.25],
    ["170","Ruby King jumbing chakkar","1 Box",236.25],["171","Spy Magic jumbing chakkar","1 Box",236.25],
  ]],
  ["Whizzling Shot", [
    ["172","12 Shot Whizziling","1 Box",375],["173","25 Shot Whizziling","1 Box",837.5],
  ]],
  ["Vadivel Product 2026 (New)", [
    ["174","Pop Eye","1 Box (5 pcs)",148.75],["175","Scoopy-Doo","1 Box (5 pcs)",148.75],
    ["176","Dexter","1 Box (5 pcs)",148.75],
  ]],
  ["Sri Vijay Brand Fancy", [
    ["178","5 inc Salsa series fancy (7 varitys)","1 Box (2 pcs)",1118.75],["179","Bink Spot shot series fancy (5 verity)","1 Box (2 pcs)",1312.5],
    ["180","Signal 12 shot","1 Box",247.5],["181","Colour Cone red & green spl","1 Box (2 pcs)",333.75],
  ]],
  ["Colour Crackling Fountain", [
    ["182","Sun Fest red & green","1 Box (5 pcs)",168.75],["183","Sun Fest green","1 Box (5 pcs)",168.75],
    ["184","Sun Fest white","1 Box (5 pcs)",168.75],["185","Sun Fest red","1 Box (5 pcs)",168.75],
    ["186","Sun Fest gold","1 Box (5 pcs)",168.75],
  ]],
  ["3pcs Fountain Sky King", [
    ["187","Carnival Gold","1 Box (3 pcs)",128.75],["188","Tweet Bird White","1 Box (3 pcs)",128.75],
    ["189","Bingo Red","1 Box (3 pcs)",128.75],["190","Genz Green","1 Box (3 pcs)",128.75],
    ["191","Jiggles","1 Box (3 pcs)",133.75],
  ]],
  ["Crackling & Colour Fountain 2021 SPL", [
    ["192","Star Snow","1 Box",168.75],["193","White Crackling","1 Box",168.75],
    ["194","Golden Peacock 2021 spl","1 Box",173.75],["195","Popings 2021 spl","1 Box",173.75],
    ["196","6000 crackling / popings","1 Box",173.75],["197","Lava","1 Box",66.25],
    ["198","Undo","1 Box",66.25],["199","Redo","1 Box",66.25],
    ["200","Water Queen 2021 spl","1 Box (1 pcs)",296.25],["200-A","Rock Star 2026 SPL","1 Box",121.25],
    ["200-B","Colour Grestal 2026 SPL","1 Box",121.25],
  ]],
  ["Sky King Double & Triple Function", [
    ["201","Croods","1 Box (1 pcs)",168.75],["202","Gold Fish","1 Box (1 pcs)",168.75],
    ["203","Angle Time","1 Box (1 pcs)",168.75],["204","Rainy & Shiny","1 Box (1 pcs)",218.75],
    ["205","Tiktak","1 Box (1 pcs)",218.75],["206","Crack Jack","1 Box (1 pcs)",218.75],
    ["207","Jelly Belly","1 Box (1 pcs)",218.75],
  ]],
  ["New Collection Colour, Mani & Crackling Paper", [
    ["208","Mony in the Bank 2022 spl","1 Box",66.25],["209","Kunfu 1000 wala sound","1 Box (1 pcs)",61.25],
    ["210","Kufu Bada deluxe 2023 spl","1 Box (1 pcs)",75],["211","Magic Whip 5000 wala sound","1 Box",183.75],
    ["212","Jegajal Bada dlx","1 Box (20 pcs)",448.75],["213","EMU Egg 2024 spl","1 Box (2 pcs)",280],
  ]],
  ["Fancy Functions — Collection Sky King", [
    ["214","Mayur Father","1 Box (5 pcs)",116.25],["216","Pogo 5 colour","1 Box (5 pcs)",162.5],
    ["217","Red Sun","1 Box (5 pcs)",181.25],["218","Green Garden","1 Box (5 pcs)",181.25],
    ["219","Miss Butterfly","1 Box (5 pcs)",181.25],["220","Gold Fest","1 Box (5 pcs)",181.25],
    ["221","Blue Ice","1 Box (5 pcs)",181.25],
  ]],
  ["Children's Fancy SPL Novelties", [
    ["222","Kit Kat","1 Box (10 pcs)",31.25],["223","Bimbom Bada Kit Kat","1 Box (10 pcs)",55],
    ["224","Mega Siren dlx","1 Box (2 pcs)",136.25],["225","Helicopter","1 Box (2 pcs)",80],
    ["226","Electric Stone","10 Box (100 pcs)",83.75],["227","Jee Boom Baa","10 Box (100 pcs)",71.25],
    ["228","Dancing Butterfly","1 Box (10 pcs)",83.75],["229","Snack Tablet","10 Box (100 pcs)",30],
    ["230","Siren (5 pcs)","1 Box (5 pcs)",146.25],["231","Spinner / Bambaram","1 Box (10 pcs)",106.25],
    ["232","Photo Flash","1 Box (5 pcs)",83.75],["233","Rainbow Colour Smoke","1 Box (3 pcs)",187.5],
    ["234","Roll Cap","1 Box (10 pcs)",68.75],["230-A","7-Shot","1 Box (5 pcs)",83.75],
    ["230-b","Trafic Master","1 Box (3 pcs)",168.75],["231-A","Selfi Stick","1 Box (5 pcs)",168.75],
    ["231-b","Drone","1 Box (5 pcs)",170],
  ]],
  ["2026 New Children's Novelties", [
    ["235","Kulfi","1 Box",295],["236","Smooke Bomb Cylinder","1 Box (2 pcs)",252.5],
    ["237","King Version 3 verity","1 Box",177.5],["235-a","Asarafi Big","1 Box (5 pcs)",43.75],
    ["235-b","Golden Flower","1 Box (10 pcs)",62.5],
  ]],
  ["Peacock 180° Fountain", [
    ["238","Mini Feather Peacock","1 Box",146.25],["239","Peacock White","1 Box",200],
    ["240","Peacock Gold","1 Box",200],["241","Peacock Green","1 Box",200],
    ["242","Peacock Red & Green","1 Box",200],["243","Bingo Peacock (5 varity)","1 Box",162.5],
    ["244","Bada Peacock","1 Box",498.75],["245","Sindoor 2026 (4 varity) Peacock series","1 Box",387.5],
  ]],
  ["Mega Match Boxes", [
    ["251","Classic 10 in 1","1 Box",143.75],["252","Vip 10 in 1 matches","1 Box",236.25],
  ]],
  ["Guns", [
    ["253","Gun","1 pcs",40],["254","Men Black (Sonny) 3 varity","1 gun",97],
  ]],
  ["Sky King Brand New 2026", [
    ["255","Fun Sticks","1 Box (5 pcs)",350],
  ]],
  ["Paper Bomb", [
    ["257","Mani paper / millionare","1 Box (2 pcs)",225],["259","250 kgm Paper Bomb","1 Box",52.5],
    ["260","500 kgm Paper Bomb","1 Box",105],
  ]],
  ["Balaji Brand SPL New Fancy", [
    ["262","Super Heroes","1 Box (2 pcs)",1500],
  ]],
  ["Gift Boxes", [
    ["263","18 - Item Gift Box","1 Box",209],["264","25 - Item Gift Box","1 Box",320],
    ["265","36 - Item Gift Box","1 Box",500],["266","40 - Item Gift Box","5 Box",3000],
    ["267","50 - Item Gift Box","5 Box",3900],["268","60 - Item Gift Box","5 Box",4800],
  ]],
  ["Combo Packs", [
    ["270","5K Combo Pack","52 items • Free TN delivery",5000],
    ["271","7.5K Combo Pack","70 items • Free TN delivery",7500],
    ["272","10K Combo Pack","90 items • Free TN delivery",10000],
  ]],
];

/* ---------- State ---------- */
const cart = {}; // code -> qty
const byCode = {};
CATALOG.forEach(([cat,items]) => items.forEach(it => byCode[it[0]] = {code:it[0],name:it[1],pack:it[2],price:it[3],cat}));

const STORE_KEY = "thala_cart_v1";
function loadCart(){ try{ const s=JSON.parse(localStorage.getItem(STORE_KEY)||"{}"); Object.keys(s).forEach(k=>{ if(byCode[k]&&s[k]>0) cart[k]=s[k]; }); }catch(e){} }
function saveCart(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(cart)); }catch(e){} }

/* ---------- Helpers ---------- */
const rupee = n => "₹" + Number(n).toLocaleString("en-IN", {maximumFractionDigits:2});
function totals(){ let sum=0,count=0; for(const k in cart){ sum += byCode[k].price*cart[k]; count += cart[k]; } return {sum,count}; }

/* ---------- Render catalog ---------- */
const catalogEl = document.getElementById("catalog");
const catListEl = document.getElementById("catList");
const catGridEl = document.getElementById("catGrid");
const productMount = document.getElementById("productMount");
const browseView = document.getElementById("browseView");
const productsView = document.getElementById("productsView");
const controls = {};
const sectionById = {};
const CATEGORY_ICONS = {
  "Sparklers":"✨","Special Colourful Sparklers 2025":"✨","Flower Pots":"🎇","Multi Colour Flower Pots":"🎇",
  "Chakkars (Ground)":"🌀","Plastic Chakkar SPL 2025":"🌀","Twinkling Star":"⭐","One Sound Crackers":"💥",
  "Wonder Candle 2023 (Sky King)":"🕯️","Colour Crackling Guns":"🔫","Bijili Crackers":"⚡","Bombs":"💣",
  "Super Sound SPL Wala Crackers":"💥","Blue Star Brand SPL Fancy":"🎆","Moorthy Brand SPL Fancy":"🎆",
  "Moorthy Brand SPL Setout Display":"🎆","Liya Brand SPL IPL New Fancy":"🎆","Sonny Brand Mega Display":"🎆",
  "INF Big Brand Unique Fancy":"🎆","Wow Star Brand SPL Colours":"🎨","Vanitha Brand SPL Colour Fancy":"🎨",
  "NSV Brand Fancy Collection":"🎆","Bee Brand":"🐝","Mega Sky Display Fancy":"🎆","Asok Brand 2026 SPL":"🍸",
  "Sky Rockets":"🚀","Mega Multicolour Shots":"🎇","Multi Colour Shot (Budget)":"🎇","Vanitha Products":"🎀",
  "Mini Arial Fancy":"🎆","Twin Colour Crackling Fountain (Vimal)":"⛲","Whizzling Shot":"🎇",
  "Vadivel Product 2026 (New)":"🎭","Sri Vijay Brand Fancy":"🎆","Colour Crackling Fountain":"⛲",
  "3pcs Fountain Sky King":"⛲","Crackling & Colour Fountain 2021 SPL":"⛲","Sky King Double & Triple Function":"🎆",
  "New Collection Colour, Mani & Crackling Paper":"💰","Fancy Functions — Collection Sky King":"🎆",
  "Children's Fancy SPL Novelties":"🎈","2026 New Children's Novelties":"🎈","Peacock 180° Fountain":"🦚",
  "Mega Match Boxes":"🔥","Guns":"🔫","Sky King Brand New 2026":"🎆","Paper Bomb":"💣",
  "Balaji Brand SPL New Fancy":"🦸","Gift Boxes":"🎁","Combo Packs":"📦"
};

CATALOG.forEach(([cat,items],ci) => {
  const secId = cat === "Combo Packs" ? "combos" : "cat"+ci;
  const icon = CATEGORY_ICONS[cat] || "🎆";
  const sec = document.createElement("section");
  sec.className = "cat"; sec.id = secId; sec.dataset.cat = cat.toLowerCase();
  sec.hidden = true;
  sec.innerHTML = `<h2><span class="title-text">${icon} ${cat}</span> <span class="count">(${items.length})</span></h2><div class="bar"></div><div class="grid"></div>`;
  const gridEl = sec.querySelector(".grid");
  items.forEach((it, idx) => {
    const [code,name,pack,price] = it;
    const isCombo = cat === "Combo Packs";
    const mrp = isCombo ? null : Math.round(price * 4 * 100) / 100;
    const card = document.createElement("div");
    card.className = "card reveal-card"; card.dataset.code = code; card.dataset.search = (name+" "+cat).toLowerCase();
    card.style.transitionDelay = (Math.min(idx, 12) * 55) + "ms";
    card.innerHTML = `
      <div class="glare"></div>
      <div class="card-inner">
        <div class="tile">${icon}</div>
        <div class="name">${name}</div>
        <div class="sub">${pack}</div>
        <div class="pricerow">${mrp ? `<span class="mrp">${rupee(mrp)}</span>` : ""}<span class="price">${rupee(price)}</span></div>
        <div class="ctrl"></div>
      </div>`;
    card.querySelector(".ctrl").appendChild(makeControl(code));
    attachTilt(card);
    gridEl.appendChild(card);
  });
  productMount.appendChild(sec);
  sectionById[secId] = sec;

  const tile = document.createElement("button");
  tile.type = "button"; tile.className = "cat-tile";
  tile.dataset.cat = cat.toLowerCase();
  tile.dataset.id = secId;
  tile.innerHTML = `<span class="ico">${icon}</span><span class="nm">${cat}</span><span class="ct">${items.length} item${items.length===1?"":"s"} →</span>`;
  tile.onclick = () => openCategory(secId);
  catGridEl.appendChild(tile);

  const item = document.createElement("button");
  item.type = "button"; item.className = "cat-item";
  item.textContent = icon+" "+cat;
  item.dataset.cat = cat.toLowerCase();
  item.onclick = () => openCategory(secId);
  catListEl.appendChild(item);
});
const allItem = document.createElement("button");
allItem.type = "button"; allItem.className = "cat-item";
allItem.textContent = "← All categories";
allItem.onclick = ()=>{ showBrowse({restore:true, scrollToShop:true}); closeMenus(); };
catListEl.prepend(allItem);

/* ---------- Category / product views ---------- */
let lastBrowseScrollY = 0;
let lastOpenedTile = null;

function navOffset(){
  const nav = document.querySelector(".navbar");
  return (nav ? nav.getBoundingClientRect().height : 64) + 8;
}

function scrollInstant(fn){
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  fn();
  html.style.scrollBehavior = prev;
}

function playCardEntrance(sec){
  const cards = [...sec.querySelectorAll(".card")];
  cards.forEach((card,i)=>{
    card.classList.remove("reveal-visible");
    card.style.transitionDelay = (Math.min(i, 12) * 55) + "ms";
  });
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      cards.forEach(card=> card.classList.add("reveal-visible"));
    });
  });
}

function animateCategoryTiles(){
  document.querySelectorAll(".cat-tile").forEach((tile,i)=>{
    tile.classList.remove("in");
    tile.style.transitionDelay = (Math.min(i, 16) * 45) + "ms";
  });
  requestAnimationFrame(()=>{
    document.querySelectorAll(".cat-tile").forEach(tile=>{
      const r = tile.getBoundingClientRect();
      if(r.top < window.innerHeight && r.bottom > 0) tile.classList.add("in");
    });
  });
}

function showTilesReady(){
  document.querySelectorAll(".cat-tile").forEach(tile=>{
    tile.classList.add("in");
    tile.style.transitionDelay = "0ms";
    tile.classList.toggle("was-open", tile === lastOpenedTile);
  });
}

function setCategoryMode(on){
  document.body.classList.toggle("in-category", on);
}

function showBrowse(opts = {}){
  setCategoryMode(false);
  const restore = !!opts.restore && lastBrowseScrollY > 0;
  browseView.hidden = false;
  productsView.hidden = true;
  Object.values(sectionById).forEach(sec=> sec.hidden = true);
  const q = document.getElementById("productSearch");
  if(q) q.value = "";
  if(restore){
    showTilesReady();
    scrollInstant(()=>{
      window.scrollTo(0, lastBrowseScrollY);
      if(lastOpenedTile){
        const r = lastOpenedTile.getBoundingClientRect();
        if(r.bottom < navOffset() || r.top > window.innerHeight){
          window.scrollTo(0, Math.max(0, window.scrollY + r.top - navOffset()));
        }
      }
    });
  } else {
    document.querySelectorAll(".cat-tile.was-open").forEach(t=> t.classList.remove("was-open"));
    animateCategoryTiles();
    if(opts.scrollToShop){
      document.getElementById("shop").scrollIntoView({behavior:"smooth"});
    }
  }
}

function openCategory(secId){
  const sec = sectionById[secId];
  if(!sec) return;
  const tile = document.querySelector(`.cat-tile[data-id="${secId}"]`);
  const wasBrowsing = !browseView.hidden;
  if(wasBrowsing){
    lastBrowseScrollY = window.scrollY;
    lastOpenedTile = tile;
  }
  setCategoryMode(true);
  browseView.hidden = true;
  productsView.hidden = false;
  Object.values(sectionById).forEach(s=> s.hidden = s !== sec);
  sec.querySelectorAll(".card").forEach(c=> c.style.display = "");
  if(productSearch) productSearch.value = "";
  playCardEntrance(sec);
  const toolbar = document.querySelector(".products-toolbar");
  scrollInstant(()=>{
    const delta = toolbar.getBoundingClientRect().top - navOffset();
    if(Math.abs(delta) > 2) window.scrollBy(0, delta);
  });
  closeMenus();
}

/* ---------- Scroll reveal (page sections + category tiles) ---------- */
function revealIfInViewport(el){
  const r = el.getBoundingClientRect();
  if(r.top < window.innerHeight * 0.92 && r.bottom > 0){
    el.classList.add("reveal-visible");
    if(el.classList.contains("cat-tile") || el.closest(".cat-grid")) el.classList.add("in");
    return true;
  }
  return false;
}

if("IntersectionObserver" in window){
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("reveal-visible");
        if(entry.target.classList.contains("cat-tile")) entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.08, rootMargin:"0px 0px -4% 0px"});
  document.querySelectorAll(".reveal, .cat-tile").forEach(el=> revealObserver.observe(el));

  let revealCheckQueued = false;
  function queueRevealCheck(){
    if(revealCheckQueued) return;
    revealCheckQueued = true;
    requestAnimationFrame(()=>{
      revealCheckQueued = false;
      document.querySelectorAll(".reveal:not(.reveal-visible), .cat-tile:not(.in)").forEach(el=>{
        if(revealIfInViewport(el)) revealObserver.unobserve(el);
      });
    });
  }
  window.addEventListener("scroll", queueRevealCheck, {passive:true});
  window.addEventListener("resize", queueRevealCheck);
  queueRevealCheck();
} else {
  document.querySelectorAll(".reveal, .cat-tile").forEach(el=>{
    el.classList.add("reveal-visible","in");
  });
}

function attachTilt(card){
  if(!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  const glare = card.querySelector(".glare");
  card.addEventListener("mousemove", (e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--tilt-x", ((0.5 - y) * 8).toFixed(2) + "deg");
    card.style.setProperty("--tilt-y", ((x - 0.5) * 10).toFixed(2) + "deg");
    if(glare){
      card.style.setProperty("--glare-x", (x * 100).toFixed(1) + "%");
      card.style.setProperty("--glare-y", (y * 100).toFixed(1) + "%");
    }
  });
  card.addEventListener("mouseleave", ()=>{
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
}

function makeControl(code){
  const wrap = document.createElement("div");
  function draw(){
    const q = cart[code]||0;
    if(q>0){
      wrap.innerHTML = `<div class="stepper">
        <button aria-label="less">−</button><span class="qty">${q}</span><button aria-label="more">+</button></div>`;
      wrap.querySelector("button[aria-label=less]").onclick = ()=>{ changeQty(code,-1); draw(); };
      wrap.querySelector("button[aria-label=more]").onclick = ()=>{ changeQty(code, 1); draw(); };
    } else {
      wrap.innerHTML = `<button class="add">Add +</button>`;
      wrap.querySelector(".add").onclick = ()=>{ changeQty(code,1); draw(); };
    }
  }
  wrap._draw = draw; draw(); controls[code]=wrap; return wrap;
}

function changeQty(code, delta){
  const q = (cart[code]||0) + delta;
  if(q<=0) delete cart[code]; else cart[code]=q;
  saveCart(); refreshBar(); if(overlay.classList.contains("show")) renderCart();
}

/* ---------- Cart bar ---------- */
const cartbar = document.getElementById("cartbar");
const barCount = document.getElementById("barCount");
const barTotal = document.getElementById("barTotal");
function refreshBar(){
  const {sum,count} = totals();
  barCount.textContent = count; barTotal.textContent = rupee(sum);
  cartbar.classList.toggle("show", count>0);
  document.body.classList.toggle("has-cart", count>0);
}

/* ---------- Overlay / cart ---------- */
const overlay = document.getElementById("overlay");
const sheet = document.getElementById("sheet");
document.getElementById("openCart").onclick = ()=>{ renderCart(); overlay.classList.add("show"); };
document.getElementById("closeCart").onclick = closeCart;
overlay.addEventListener("click", e=>{ if(e.target===overlay) closeCart(); });
function closeCart(){ overlay.classList.remove("show"); }

function clearCart(){
  const rows = [...cartItemsEl.querySelectorAll(".crow")];
  rows.forEach((row,i)=>{
    row.classList.add("leaving");
    row.style.animationDelay = (i * 40) + "ms";
  });
  const finish = ()=>{
    Object.keys(cart).forEach(code=> delete cart[code]);
    saveCart();
    Object.keys(controls).forEach(code=> controls[code] && controls[code]._draw());
    refreshBar();
    renderCart();
  };
  if(rows.length) setTimeout(finish, 260 + Math.min(rows.length, 8) * 40);
  else finish();
}

const cartItemsEl = document.getElementById("cartItems");
const totalsBox = document.getElementById("totalsBox");
function renderCart(){
  const keys = Object.keys(cart);
  const clearBtn = document.getElementById("clearCart");
  if(clearBtn) clearBtn.hidden = keys.length===0;
  if(keys.length===0){
    cartItemsEl.innerHTML = `<div class="empty">Your order is empty.<br>Add some crackers to get started 🎆</div>`;
    totalsBox.style.display = "none"; return;
  }
  cartItemsEl.innerHTML = "";
  keys.forEach(code=>{
    const it = byCode[code], q = cart[code];
    const row = document.createElement("div");
    row.className = "crow";
    row.innerHTML = `
      <div class="cn"><div class="t">${it.name}</div></div>
      <div class="stepper"><button aria-label="less">−</button><span class="qty">${q}</span><button aria-label="more">+</button></div>
      <div class="lp">${rupee(it.price*q)}</div>`;
    row.style.animationDelay = (Math.min(keys.indexOf(code), 8) * 50) + "ms";
    row.querySelector("button[aria-label=less]").onclick = ()=>{ changeQty(code,-1); controls[code]&&controls[code]._draw(); };
    row.querySelector("button[aria-label=more]").onclick = ()=>{ changeQty(code, 1); controls[code]&&controls[code]._draw(); };
    cartItemsEl.appendChild(row);
  });
  const {sum,count} = totals();
  totalsBox.style.display = "block";
  document.getElementById("itemCountLbl").textContent = count+" item"+(count>1?"s":"");
  document.getElementById("cartSubtotal").textContent = rupee(sum);
  document.getElementById("cartGrand").textContent = rupee(sum);

  const minWarn = document.getElementById("minWarn");
  const placeBtn = document.getElementById("placeBtn");
  if(sum < MIN_ORDER){
    minWarn.style.display = "block";
    minWarn.textContent = `Minimum order is ${rupee(MIN_ORDER)}. Add ${rupee(MIN_ORDER-sum)} more to place your order.`;
    placeBtn.disabled = true;
  } else {
    minWarn.style.display = "none";
    placeBtn.disabled = false;
  }
}

/* ---------- Search ---------- */
const search = document.getElementById("search");
const productSearch = document.getElementById("productSearch");
const noresults = document.getElementById("noresults");
search.addEventListener("input", ()=>{
  const q = search.value.trim().toLowerCase();
  let any = false;
  catGridEl.querySelectorAll(".cat-tile").forEach(tile=>{
    const match = !q || tile.dataset.cat.includes(q) || tile.textContent.toLowerCase().includes(q);
    tile.style.display = match ? "" : "none";
    if(match) any = true;
  });
  noresults.style.display = any ? "none" : "block";
});
productSearch.addEventListener("input", ()=>{
  const q = productSearch.value.trim().toLowerCase();
  const sec = [...productMount.querySelectorAll(".cat")].find(s=> !s.hidden);
  if(!sec) return;
  sec.querySelectorAll(".card").forEach(card=>{
    const match = !q || card.dataset.search.includes(q);
    card.style.display = match ? "" : "none";
    if(match) card.classList.add("reveal-visible");
  });
});

/* ---------- Place order (WhatsApp text message) ---------- */
function buildOrderMessage(name, mobile, email, addr){
  const byCat = {};
  for(const code in cart){
    const it = byCode[code];
    (byCat[it.cat] ||= []).push([it, cart[code]]);
  }
  const {sum,count} = totals();
  const dated = new Date().toLocaleDateString("en-IN", {day:"numeric", month:"short", year:"numeric"});
  const itemWord = count === 1 ? "item" : "items";

  let msg = `🪔 *${SHOP_NAME.toUpperCase()}*\n`;
  msg += `_Happy Diwali • Sivakasi_\n\n`;
  msg += `> 📅 ${dated}\n\n`;

  Object.keys(byCat).forEach(cat=>{
    const icon = CATEGORY_ICONS[cat] || "🎆";
    msg += `*${icon} ${cat}*\n`;
    byCat[cat].forEach(([it,q])=>{
      msg += `- ${it.name}  × ${q}  —  *${rupee(it.price*q)}*\n`;
    });
    msg += `\n`;
  });

  msg += `*Amount payable*\n`;
  msg += `> 💰 *${rupee(sum)}*\n`;
  msg += `> ${count} ${itemWord}\n\n`;

  msg += `*Deliver to*\n`;
  msg += `> 👤 ${name}\n`;
  msg += `> 📱 ${mobile}\n`;
  msg += `> ✉️ ${email}\n`;
  msg += `> 📍 ${addr}`;
  return msg;
}

document.getElementById("placeBtn").onclick = ()=>{
  const name = document.getElementById("fName").value.trim();
  const mobile = document.getElementById("fMobile").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const addr = document.getElementById("fAddr").value.trim();
  const err = document.getElementById("formErr");

  if(!name){ err.textContent="Please enter your name."; return; }
  if(mobile.replace(/\D/g,"").length < 10){ err.textContent="Please enter a valid 10-digit mobile number."; return; }
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent="Please enter a valid email."; return; }
  if(!addr){ err.textContent="Please enter your delivery address."; return; }
  err.textContent = "";

  const msg = buildOrderMessage(name, mobile, email, addr);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const isDesktop = window.innerWidth > 768;
  if(isDesktop){
    window.open(url, "_blank", "noopener");
  } else {
    window.location.href = url;
  }

  Object.keys(cart).forEach(code=> delete cart[code]);
  saveCart();
  refreshBar();
  Object.keys(controls).forEach(code=> controls[code]._draw());
  closeCart();
  document.getElementById("fName").value = "";
  document.getElementById("fMobile").value = "";
  document.getElementById("fEmail").value = "";
  document.getElementById("fAddr").value = "";
  window.scrollTo(0,0);
};

/* ---------- Navbar, hero motion, menus ---------- */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const catDd = document.getElementById("catDd");
const catBtn = document.getElementById("catBtn");
const catPanel = document.getElementById("catPanel");
const catFilter = document.getElementById("catFilter");
const heroContent = document.querySelector(".hero-content");
const heroBgImg = document.querySelector(".hero-bg-img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeDropdown(){
  catDd.classList.remove("open");
  catBtn.setAttribute("aria-expanded", "false");
  catPanel.hidden = true;
}
function closeMenus(){
  closeDropdown();
  navbar.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
}

catBtn.onclick = (e)=>{
  e.stopPropagation();
  const open = !catDd.classList.contains("open");
  if(open){
    catDd.classList.add("open");
    catBtn.setAttribute("aria-expanded", "true");
    catPanel.hidden = false;
    if(window.innerWidth > 860) catFilter.focus();
  } else {
    closeDropdown();
  }
};
navToggle.onclick = (e)=>{
  e.stopPropagation();
  const open = !navbar.classList.contains("menu-open");
  navbar.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  if(!open) closeMenus();
};
catFilter.addEventListener("input", ()=>{
  const q = catFilter.value.trim().toLowerCase();
  catListEl.querySelectorAll(".cat-item").forEach(item=>{
    item.hidden = q && !item.dataset.cat.includes(q) && !item.textContent.toLowerCase().includes(q);
  });
});
document.addEventListener("click", (e)=>{
  if(!catDd.contains(e.target) && !navToggle.contains(e.target) && !document.getElementById("navLinks").contains(e.target)){
    closeMenus();
  }
});
document.querySelectorAll('.nav-link[href^="#"]').forEach(link=>{
  link.addEventListener("click", ()=> setTimeout(closeMenus, 50));
});

function syncNav(){
  navbar.classList.toggle("scrolled", window.scrollY > 48);
  if(!reduceMotion && window.scrollY < window.innerHeight){
    const y = window.scrollY;
    if(heroContent) heroContent.style.transform = `translateY(${y * 0.22}px)`;
    if(heroBgImg) heroBgImg.style.translate = `0 ${y * 0.18}px`;
  }
}
window.addEventListener("scroll", syncNav, {passive:true});
syncNav();

function splitTitle(el){
  const text = el.textContent;
  el.innerHTML = text.split("").map((ch,i)=>{
    const safe = ch === " " ? "&nbsp;" : ch;
    return `<span class="ch" style="animation-delay:${180 + i*42}ms">${safe}</span>`;
  }).join("");
}

function spawnSparks(id, count){
  const box = document.getElementById(id);
  if(!box || reduceMotion) return;
  for(let i=0;i<(count||22);i++){
    const spark = document.createElement("i");
    spark.style.left = (Math.random()*100) + "%";
    spark.style.animationDuration = (5 + Math.random()*6) + "s";
    spark.style.animationDelay = (Math.random()*6) + "s";
    spark.style.width = spark.style.height = (3 + Math.random()*4) + "px";
    box.appendChild(spark);
  }
}

/* ---------- Init ---------- */
const shopNameEl = document.getElementById("shopName");
if(shopNameEl && shopNameEl.textContent.trim()) SHOP_NAME = shopNameEl.textContent.trim();
document.getElementById("navBrand").textContent = SHOP_NAME;
splitTitle(shopNameEl);
spawnSparks("sparks", 22);
spawnSparks("shopSparks", 18);

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
["navWaIcon","contactWa","contactCta"].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.href = waUrl;
});
document.getElementById("contactCall").href = "tel:+91" + CALL_NUMBER.replace(/\D/g,"");

const ig = INSTAGRAM_URL.trim();
["navIg","contactIg"].forEach(id=>{
  const el = document.getElementById(id);
  if(!el) return;
  if(ig){ el.href = ig; return; }
  el.removeAttribute("href");
  el.setAttribute("aria-disabled","true");
  el.tabIndex = -1;
});

document.getElementById("backCats").onclick = ()=> showBrowse({restore:true, scrollToShop:true});
document.getElementById("navCombos").addEventListener("click", (e)=>{
  e.preventDefault();
  openCategory("combos");
});
document.getElementById("browseCta").addEventListener("click", ()=>{
  showBrowse();
  setTimeout(animateCategoryTiles, 350);
});
document.querySelector('.nav-brand').addEventListener("click", ()=> showBrowse());
document.querySelector('a.nav-link[href="#hero"]').addEventListener("click", ()=> showBrowse());
document.querySelector('a.nav-link[href="#contact"]').addEventListener("click", (e)=>{
  e.preventDefault();
  showBrowse();
  closeMenus();
  requestAnimationFrame(()=> document.getElementById("contact").scrollIntoView({behavior:"smooth"}));
});
document.getElementById("clearCart").onclick = clearCart;

loadCart();
Object.keys(cart).forEach(code=> controls[code] && controls[code]._draw());
refreshBar();
