import { useState } from "react";
import { BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,Legend,RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis } from "recharts";

/* ═══════════════════════════════════════════════════════════
   VERIFIED DATA — Source: प_थ_य_ड_ट__१५_अप_र_ल_.xlsx
   Total: 1,55,915 | Year: 2026
   "Ashok kumar" — 226 verified (डीडवाना जिला, कुचामनसिटी)
   महाराणा प्रताप जिला excluded from bottom lists
   ═══════════════════════════════════════════════════════════ */

const LOGO = "data:image/jpeg;base64,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";

const D = {
  total2026:155915, total2025:143932, uniqueMitrs:11301,
  prant:[
    { name:"जयपुर",      m26:54428, m25:52158, bhags:28, khands:219, mitrs:4051 },
    { name:"जोधपुर",     m26:51914, m25:46553, bhags:22, khands:173, mitrs:3749 },
    { name:"चित्तौड़गढ़", m26:49573, m25:45221, bhags:29, khands:219, mitrs:3986 },
  ],
  top20:[
    { name:"मुकेश टेलर",          c:373, p:"जोधपुर",     b:"बिलाड़ा जिला" },
    { name:"वंश कंसारा",           c:360, p:"जोधपुर",     b:"नोखा जिला" },
    { name:"विवेक जोशी",           c:313, p:"चित्तौड़गढ़", b:"शाहपुरा जिला" },
    { name:"डॉ. गोपाल कुमावत",     c:312, p:"चित्तौड़गढ़", b:"आमेट" },
    { name:"सत्यनारायण नामा",      c:302, p:"जयपुर",      b:"टोंक जिला" },
    { name:"भगत सिंह",             c:288, p:"जयपुर",      b:"झुंझुनूं जिला" },
    { name:"नरेंद्र सिंह राणावत",    c:278, p:"चित्तौड़गढ़", b:"शाहपुरा जिला" },
    { name:"सांवर दान चारण",        c:273, p:"जोधपुर",     b:"नोखा जिला" },
    { name:"योगेश कुमार शर्मा",     c:254, p:"चित्तौड़गढ़", b:"बारां जिला" },
    { name:"सुरेश जांगिड़",         c:251, p:"जयपुर",      b:"विध्याधर जिला (भाग-4)" },
    { name:"श्री भावेश त्रिवेदी",    c:250, p:"जोधपुर",     b:"भीनमाल जिला" },
    { name:"डॉ. नरेन्द्र जोशी",     c:237, p:"चित्तौड़गढ़", b:"उदयपुर महानगर" },
    { name:"कौशल नरेश शर्मा",      c:229, p:"जयपुर",      b:"टोंक जिला" },
    { name:"अशोक कुमार",           c:226, p:"जोधपुर",     b:"डीडवाना जिला" },
    { name:"चन्द्रशेखर साहू",       c:226, p:"चित्तौड़गढ़", b:"बूंदी जिला" },
    { name:"मंगीलाल",              c:225, p:"जोधपुर",     b:"बालोतरा जिला" },
    { name:"अमृत असावा",           c:221, p:"जोधपुर",     b:"सिरोही जिला" },
    { name:"पवन कुमार अग्रवाल",    c:218, p:"जोधपुर",     b:"सिरोही जिला" },
    { name:"शिवराज",               c:217, p:"चित्तौड़गढ़", b:"अजमेर जिला" },
    { name:"महिपाल सिंह राठौड़",    c:216, p:"चित्तौड़गढ़", b:"महाराणा प्रताप जिला" },
  ],
  topMitrPrant:{
    "जयपुर":[
      { name:"सत्यनारायण नामा",    c:302, b:"टोंक जिला" },
      { name:"भगत सिंह",            c:288, b:"झुंझुनूं जिला" },
      { name:"सुरेश जांगिड़",       c:251, b:"विध्याधर जिला (भाग-4)" },
      { name:"कौशल नरेश शर्मा",    c:229, b:"टोंक जिला" },
      { name:"ओम प्रकाश वर्मा",    c:211, b:"विध्याधर जिला (भाग-4)" },
      { name:"कन्हैया लाल पीला",    c:200, b:"टोंक जिला" },
      { name:"कन्हैया लाल चौरसिया", c:200, b:"श्री माधोपुर जिला" },
      { name:"विनोद कुमार",         c:167, b:"झुंझुनूं जिला" },
      { name:"संतोष कुमार जांगीड़",  c:160, b:"ऋषि गालव जिला (भाग 1)" },
      { name:"राजेश कुमार",         c:155, b:"सवाईमाधोपुर जिला" },
    ],
    "जोधपुर":[
      { name:"मुकेश टेलर",          c:373, b:"बिलाड़ा जिला" },
      { name:"वंश कंसारा",           c:359, b:"नोखा जिला" },
      { name:"सांवर दान चारण",        c:273, b:"नोखा जिला" },
      { name:"श्री भावेश त्रिवेदी",    c:250, b:"भीनमाल जिला" },
      { name:"अशोक कुमार",           c:226, b:"डीडवाना जिला" },
      { name:"मंगीलाल",              c:225, b:"बालोतरा जिला" },
      { name:"अमृत असावा",           c:219, b:"सिरोही जिला" },
      { name:"पवन कुमार अग्रवाल",    c:218, b:"सिरोही जिला" },
      { name:"महेंद्र कुमार",         c:214, b:"सूरतगढ़ जिला" },
      { name:"उदयराज गोदारा",        c:212, b:"बालोतरा जिला" },
    ],
    "चित्तौड़गढ़":[
      { name:"विवेक जोशी",           c:313, b:"शाहपुरा जिला" },
      { name:"डॉ. गोपाल कुमावत",     c:312, b:"आमेट" },
      { name:"नरेंद्र सिंह राणावत",    c:278, b:"शाहपुरा जिला" },
      { name:"योगेश कुमार शर्मा",     c:242, b:"बारां जिला" },
      { name:"डॉ. नरेन्द्र जोशी",     c:237, b:"उदयपुर महानगर" },
      { name:"चन्द्रशेखर साहू",       c:226, b:"बूंदी जिला" },
      { name:"महिपाल सिंह राठौड़",    c:216, b:"महाराणा प्रताप जिला" },
      { name:"शिवराज",               c:213, b:"अजमेर जिला" },
      { name:"अश्विनी शर्मा",         c:205, b:"अजमेर जिला" },
      { name:"छीतरलाल नागर",         c:198, b:"बूंदी जिला" },
    ],
  },
  topBhagAll:[
    { b:"विध्याधर जिला (भाग-4)",p:"जयपुर",c:6176 },{ b:"जोधपुर महानगर",p:"जोधपुर",c:5629 },
    { b:"कोटा महानगर",p:"चित्तौड़गढ़",c:4650 },{ b:"बाड़मेर जिला",p:"जोधपुर",c:4574 },{ b:"बालोतरा जिला",p:"जोधपुर",c:4441 },
  ],
  bottomBhagAll:[
    { b:"उदयपुर जिला",p:"चित्तौड़गढ़",c:1072 },{ b:"आमेट",p:"चित्तौड़गढ़",c:1061 },
    { b:"सूरतगढ़ जिला",p:"जोधपुर",c:1054 },{ b:"चूरु जिला",p:"जयपुर",c:905 },{ b:"डूंगरपुर जिला",p:"चित्तौड़गढ़",c:807 },
  ],
  bhagPrant:{
    "जयपुर":{ top:[{b:"विध्याधर जिला (भाग-4)",c:6176},{b:"टोंक जिला",c:4063},{b:"सीकर जिला",c:3941},{b:"भिवाड़ी जिला",c:3201},{b:"मानसरोवर जिला (भाग-3)",c:2973}],
              bottom:[{b:"डीग जिला",c:1238},{b:"करौली जिला",c:1219},{b:"बस्सी जिला",c:1181},{b:"रतनगढ़ जिला",c:1168},{b:"चूरु जिला",c:905}] },
    "जोधपुर":{ top:[{b:"जोधपुर महानगर",c:5629},{b:"बाड़मेर जिला",c:4574},{b:"बालोतरा जिला",c:4441},{b:"फलौदी जिला",c:3170},{b:"बिलाड़ा जिला",c:2870}],
               bottom:[{b:"हनुमानगढ़ जिला",c:1808},{b:"बाली जिला",c:1328},{b:"खाजूवाला जिला",c:1189},{b:"मेड़ता जिला",c:1127},{b:"सूरतगढ़ जिला",c:1054}] },
    "चित्तौड़गढ़":{ top:[{b:"कोटा महानगर",c:4650},{b:"अजमेर महानगर",c:3754},{b:"बूंदी जिला",c:3069},{b:"बारां जिला",c:2601},{b:"शाहपुरा जिला",c:2382}],
                   bottom:[{b:"सलूम्बर जिला",c:1137},{b:"निम्बाहेड़ा जिला",c:1088},{b:"उदयपुर जिला",c:1072},{b:"आमेट",c:1061},{b:"डूंगरपुर जिला",c:807}] },
  },
  mitrBuckets:[
    { prant:"जयपुर","1-10":2728,"11-50":1097,"51-100":108,"101-200":113,"200+":5 },
    { prant:"जोधपुर","1-10":2490,"11-50":1062,"51-100":92,"101-200":92,"200+":13 },
    { prant:"चित्तौड़गढ़","1-10":2790,"11-50":997,"51-100":106,"101-200":84,"200+":9 },
  ],
  mitrBucketsAll:{"1-10":7556,"11-50":3105,"51-100":312,"101-200":298,"200+":30},
};

const C={bg:"#080c18",card:"#0f1525",card2:"#141b2e",border:"#1c2540",text:"#e4e4ec",muted:"#7a82a0",saffron:"#E8833A",blue:"#3A86E8",green:"#27AE60",red:"#E04848",purple:"#9B6DD7",gold:"#F5B731"};
const PC={"जयपुर":C.saffron,"जोधपुर":C.blue,"चित्तौड़गढ़":C.green};
const PIE_C=[C.saffron,C.blue,C.green];
const MEDAL=["🥇","🥈","🥉"];
const fmt=n=>n?.toLocaleString("hi-IN")??n;

function KPI({icon,label,value,sub,color}){return(<div style={{background:`linear-gradient(135deg,${C.card},${C.card2})`,borderRadius:14,padding:"16px 14px",border:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:-6,right:-2,fontSize:36,opacity:0.06}}>{icon}</div><div style={{fontSize:10,color:C.muted,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>{label}</div><div style={{fontSize:24,fontWeight:900,color:color||C.text,lineHeight:1}}>{value}</div>{sub&&<div style={{fontSize:11,color:C.muted,marginTop:6}}>{sub}</div>}</div>);}
function Sec({children,emoji}){return<h2 style={{fontSize:15,fontWeight:700,color:C.text,margin:"28px 0 14px",display:"flex",alignItems:"center",gap:8,borderLeft:`4px solid ${C.saffron}`,paddingLeft:12}}><span style={{fontSize:17}}>{emoji}</span>{children}</h2>;}
function Tab({active,onClick,children}){return<button onClick={onClick} style={{padding:"7px 14px",borderRadius:22,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:active?`linear-gradient(135deg,${C.saffron},#D4722E)`:C.card,color:active?"#fff":C.muted,boxShadow:active?`0 4px 14px ${C.saffron}44`:"none"}}>{children}</button>;}
function Badge({name}){const c=PC[name]||"#888";return<span style={{background:c+"1A",color:c,padding:"2px 8px",borderRadius:8,fontSize:10,fontWeight:700,border:`1px solid ${c}33`,whiteSpace:"nowrap"}}>{name}</span>;}
function Card({children,style:s}){return<div style={{background:C.card,borderRadius:14,padding:14,border:`1px solid ${C.border}`,...s}}>{children}</div>;}
function TT({active,payload,label}){if(!active||!payload?.length)return null;return<div style={{background:"#141830",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",color:"#fff",fontSize:11}}><div style={{fontWeight:700,marginBottom:4}}>{label}</div>{payload.map((p,i)=><div key={i} style={{color:p.color||p.fill}}>{p.name}: <b>{fmt(p.value)}</b></div>)}</div>;}
const TH={padding:"9px 10px",textAlign:"left",color:C.saffron,fontWeight:700,fontSize:11,whiteSpace:"nowrap"};
const TD={padding:"8px 10px",fontSize:12};
const G=m=>({display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(${m}px,1fr))`,gap:12});

export default function App(){
  const[tab,setTab]=useState("overview");
  const[pf,setPf]=useState("सभी");
  const growth=D.total2026-D.total2025,growthPct=((growth/D.total2025)*100).toFixed(1);
  const pieData=D.prant.map(p=>({name:p.name,value:p.m26}));
  const compareData=D.prant.map(p=>({name:p.name,"2026":p.m26,"2025":p.m25}));
  const radarData=D.prant.map(p=>({subject:p.name,"सदस्य(×1K)":Math.round(p.m26/1000),"मित्र(×100)":Math.round(p.mitrs/100),"भाग":p.bhags}));
  const fTop20=pf==="सभी"?D.top20:D.top20.filter(t=>t.p===pf);
  const bTop=pf==="सभी"?D.topBhagAll:(D.bhagPrant[pf]?.top||[]);
  const bBot=pf==="सभी"?D.bottomBhagAll:(D.bhagPrant[pf]?.bottom||[]);
  const mList=pf==="सभी"?null:D.topMitrPrant[pf];

  return(
    <div style={{fontFamily:"'Noto Sans Devanagari',sans-serif",background:C.bg,color:C.text,minHeight:"100vh",padding:"16px 10px"}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        {/* HEADER */}
        <header style={{textAlign:"center",marginBottom:8,padding:"16px 8px 14px",borderBottom:`1px solid ${C.border}`}}>
          <img src={LOGO} alt="पाथेय कण" style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",marginBottom:8,border:`3px solid ${C.gold}44`}}/>
          <div style={{fontSize:11,color:C.gold,fontWeight:700,letterSpacing:3,marginBottom:4}}>पाथेय कण संस्थान</div>
          <h1 style={{fontSize:20,fontWeight:900,margin:"0 0 4px",background:`linear-gradient(135deg,${C.saffron},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>सदस्यता अभियान — Closing Report</h1>
          <div style={{fontSize:11,color:C.muted,marginTop:6}}>दिनांक: <b style={{color:C.text}}>१५ अप्रैल २०२६</b>, दोपहर १२:०० बजे के अनुसार</div>
          <div style={{fontSize:10,color:C.red,marginTop:4,fontStyle:"italic",opacity:0.8}}>* कुछ आंकड़े अभी update हो रहे हैं, मामूली बदलाव संभव है।</div>
        </header>

        <div style={{display:"flex",gap:6,justifyContent:"center",margin:"16px 0 10px",flexWrap:"wrap"}}>
          {[["overview","📊 सारांश"],["leaderboard","🏆 श्रेष्ठ मित्र"],["bhag","🗺️ भाग विश्लेषण"],["prant","📈 प्रान्त"]].map(([k,l])=><Tab key={k} active={tab===k} onClick={()=>setTab(k)}>{l}</Tab>)}
        </div>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
          {["सभी","जयपुर","जोधपुर","चित्तौड़गढ़"].map(p=><button key={p} onClick={()=>setPf(p)} style={{padding:"5px 12px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",border:pf===p?`2px solid ${C.saffron}`:`1px solid ${C.border}`,background:pf===p?C.saffron+"1A":C.card,color:pf===p?C.saffron:C.muted}}>{p==="सभी"?"सभी प्रान्त":p}</button>)}
        </div>

        {/* OVERVIEW */}
        {tab==="overview"&&<><div style={G(150)}><KPI icon="👥" label="कुल सदस्य 2026" value={fmt(D.total2026)} color={C.saffron}/><KPI icon="📅" label="सदस्य 2025" value={fmt(D.total2025)} sub={`वृद्धि: +${fmt(growth)} (+${growthPct}%)`} color={C.blue}/><KPI icon="🙏" label="कुल पाथेय मित्र" value={fmt(D.uniqueMitrs)} color={C.green}/><KPI icon="🏆" label="200+ सदस्य बनाने वाले" value="30" sub="सर्वश्रेष्ठ प्रदर्शक" color={C.gold}/></div>
          <Sec emoji="🏛️">प्रान्त-वार सारांश</Sec>
          <div style={G(240)}>{D.prant.map(p=>{const g=p.m26-p.m25,gp=((g/p.m25)*100).toFixed(1);return(<div key={p.name} style={{background:C.card,borderRadius:14,padding:16,border:`1px solid ${PC[p.name]}22`,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:3,background:PC[p.name]}}/><div style={{fontSize:16,fontWeight:800,color:PC[p.name],marginBottom:12}}>{p.name}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 14px",fontSize:12}}>{[["सदस्य 2026",<b style={{color:PC[p.name]}}>{fmt(p.m26)}</b>],["सदस्य 2025",fmt(p.m25)],["वृद्धि",<span style={{color:C.green}}>+{fmt(g)} ({gp}%)</span>],["पाथेय मित्र",fmt(p.mitrs)],["भाग/ज़िले",p.bhags],["खंड",p.khands]].map(([l,v],i)=><div key={i}><span style={{color:C.muted}}>{l}: </span>{v}</div>)}</div></div>);})}</div>
          <Sec emoji="📊">तुलनात्मक चार्ट</Sec>
          <div style={G(260)}>
            <Card><div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:10}}>📅 2025 vs 2026</div><ResponsiveContainer width="100%" height={210}><BarChart data={compareData} barSize={18}><XAxis dataKey="name" tick={{fill:C.muted,fontSize:10}} axisLine={false}/><YAxis tick={{fill:C.muted,fontSize:9}} axisLine={false} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/><Tooltip content={<TT/>}/><Legend wrapperStyle={{fontSize:10}}/><Bar dataKey="2025" fill={C.muted} radius={[4,4,0,0]}/><Bar dataKey="2026" radius={[4,4,0,0]}>{compareData.map((_,i)=><Cell key={i} fill={PIE_C[i]}/>)}</Bar></BarChart></ResponsiveContainer></Card>
            <Card><div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:10}}>👥 सदस्य वितरण 2026</div><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={72} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} style={{fontSize:9}}>{pieData.map((_,i)=><Cell key={i} fill={PIE_C[i]}/>)}</Pie><Tooltip content={<TT/>}/></PieChart></ResponsiveContainer></Card>
          </div></>}

        {/* LEADERBOARD */}
        {tab==="leaderboard"&&<><Sec emoji="🏆">श्रेष्ठ पाथेय मित्र — सर्वाधिक सदस्य</Sec>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>{pf==="सभी"?"सम्पूर्ण राजस्थान — शीर्ष 20":`${pf} — शीर्ष 10`}</div>
          <Card style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:C.card2,borderBottom:`2px solid ${C.saffron}33`}}>{["#","पाथेय मित्र","प्रान्त","भाग/ज़िला","सदस्य"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>
            {(pf==="सभी"?fTop20:(mList||[]).map((m,i)=>({...m,p:pf}))).map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}`,background:i<3?`${C.gold}06`:"transparent"}}><td style={{...TD,fontWeight:800,fontSize:15,width:36}}>{i<3?MEDAL[i]:i+1}</td><td style={{...TD,fontWeight:700,whiteSpace:"nowrap"}}>{r.name}</td><td style={TD}><Badge name={r.p}/></td><td style={{...TD,color:C.muted,whiteSpace:"nowrap"}}>{r.b}</td><td style={TD}><span style={{background:r.c>=300?C.red+"22":r.c>=200?C.gold+"22":C.green+"22",color:r.c>=300?C.red:r.c>=200?C.gold:C.green,padding:"3px 10px",borderRadius:10,fontWeight:800,fontSize:13}}>{fmt(r.c)}</span></td></tr>)}
          </tbody></table></div></Card>
          <div style={{...G(130),marginTop:16}}>{D.prant.map(p=>{const cnt=D.mitrBuckets.find(b=>b.prant===p.name)?.["200+"]||0;const t1=D.topMitrPrant[p.name]?.[0];return<Card key={p.name} style={{border:`1px solid ${PC[p.name]}33`,textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:PC[p.name]}}>{cnt}</div><div style={{fontSize:10,color:C.muted,marginBottom:4}}>200+ मित्र — {p.name}</div>{t1&&<div style={{fontSize:10,color:C.text,fontWeight:600}}>🏆 {t1.name} ({t1.c})</div>}</Card>;})}</div>
          <Sec emoji="📊">मित्र प्रदर्शन श्रेणी</Sec>
          <Card><ResponsiveContainer width="100%" height={230}><BarChart data={D.mitrBuckets} barSize={12}><XAxis dataKey="prant" tick={{fill:C.muted,fontSize:10}} axisLine={false}/><YAxis tick={{fill:C.muted,fontSize:9}} axisLine={false}/><Tooltip content={<TT/>}/><Legend wrapperStyle={{fontSize:9}}/><Bar dataKey="1-10" name="1-10" fill="#555" radius={[3,3,0,0]}/><Bar dataKey="11-50" name="11-50" fill={C.purple} radius={[3,3,0,0]}/><Bar dataKey="51-100" name="51-100" fill={C.blue} radius={[3,3,0,0]}/><Bar dataKey="101-200" name="101-200" fill={C.gold} radius={[3,3,0,0]}/><Bar dataKey="200+" name="200+" fill={C.red} radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
            <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:8,flexWrap:"wrap"}}>{Object.entries(D.mitrBucketsAll).map(([k,v])=><div key={k} style={{textAlign:"center",fontSize:10}}><div style={{fontWeight:800,color:C.text,fontSize:13}}>{fmt(v)}</div><div style={{color:C.muted}}>{k}</div></div>)}</div></Card></>}

        {/* BHAG */}
        {tab==="bhag"&&<><Sec emoji="🏅">शीर्ष 5 भाग/ज़िला {pf!=="सभी"&&`— ${pf}`}</Sec>
          <Card style={{marginBottom:14}}><ResponsiveContainer width="100%" height={210}><BarChart data={bTop} layout="vertical" barSize={18} margin={{left:90}}><XAxis type="number" tick={{fill:C.muted,fontSize:9}} axisLine={false} tickFormatter={v=>`${(v/1000).toFixed(1)}K`}/><YAxis type="category" dataKey="b" tick={{fill:"#ccc",fontSize:10}} axisLine={false} width={90}/><Tooltip content={<TT/>}/><Bar dataKey="c" name="सदस्य" radius={[0,8,8,0]}>{bTop.map((e,i)=><Cell key={i} fill={PC[e.p||pf]||C.green}/>)}</Bar></BarChart></ResponsiveContainer></Card>
          <Card style={{padding:0,overflow:"hidden",marginBottom:20}}><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:C.card2}}>{["#","भाग/ज़िला",pf==="सभी"?"प्रान्त":null,"सदस्य"].filter(Boolean).map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{bTop.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}`}}><td style={{...TD,fontWeight:700,color:C.green,width:32}}>{i+1}</td><td style={{...TD,fontWeight:600}}>{r.b}</td>{pf==="सभी"&&<td style={TD}><Badge name={r.p}/></td>}<td style={{...TD,fontWeight:800,color:C.green}}>{fmt(r.c)}</td></tr>)}</tbody></table></div></Card>
          <Sec emoji="⬇️">निचले 5 भाग/ज़िला {pf!=="सभी"&&`— ${pf}`}</Sec>
          <Card style={{marginBottom:14}}><ResponsiveContainer width="100%" height={210}><BarChart data={[...bBot].reverse()} layout="vertical" barSize={18} margin={{left:90}}><XAxis type="number" tick={{fill:C.muted,fontSize:9}} axisLine={false}/><YAxis type="category" dataKey="b" tick={{fill:"#ccc",fontSize:10}} axisLine={false} width={90}/><Tooltip content={<TT/>}/><Bar dataKey="c" name="सदस्य" radius={[0,8,8,0]} fill={C.red}/></BarChart></ResponsiveContainer></Card>
          <Card style={{padding:0,overflow:"hidden"}}><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:C.card2}}>{["#","भाग/ज़िला",pf==="सभी"?"प्रान्त":null,"सदस्य"].filter(Boolean).map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{bBot.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}`}}><td style={{...TD,fontWeight:700,color:C.red,width:32}}>{i+1}</td><td style={{...TD,fontWeight:600}}>{r.b}</td>{pf==="सभी"&&<td style={TD}><Badge name={r.p}/></td>}<td style={{...TD,fontWeight:800,color:C.red}}>{fmt(r.c)}</td></tr>)}</tbody></table></div></Card></>}

        {/* PRANT */}
        {tab==="prant"&&<><Sec emoji="🏛️">प्रान्त विस्तृत विश्लेषण</Sec>
          <div style={G(240)}>{D.prant.map(p=>{const bk=D.mitrBuckets.find(b=>b.prant===p.name);const t1=D.topMitrPrant[p.name]?.[0];const tB=D.bhagPrant[p.name]?.top?.[0];const g=p.m26-p.m25;return<div key={p.name} style={{background:`linear-gradient(160deg,${C.card},${PC[p.name]}06)`,borderRadius:14,padding:18,border:`1px solid ${PC[p.name]}22`,position:"relative"}}><div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${PC[p.name]},transparent)`}}/><div style={{fontSize:17,fontWeight:900,color:PC[p.name],marginBottom:12}}>{p.name}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 14px",fontSize:12,marginBottom:12}}><div><span style={{color:C.muted}}>सदस्य 2026:</span> <b style={{color:PC[p.name]}}>{fmt(p.m26)}</b></div><div><span style={{color:C.muted}}>वृद्धि:</span> <b style={{color:C.green}}>+{fmt(g)}</b></div><div><span style={{color:C.muted}}>पाथेय मित्र:</span> <b>{fmt(p.mitrs)}</b></div><div><span style={{color:C.muted}}>200+ मित्र:</span> <b style={{color:C.gold}}>{bk?.["200+"]||0}</b></div><div><span style={{color:C.muted}}>भाग/ज़िले:</span> <b>{p.bhags}</b></div><div><span style={{color:C.muted}}>खंड:</span> <b>{p.khands}</b></div></div><div style={{borderTop:`1px solid ${C.border}`,paddingTop:10,fontSize:11}}>{t1&&<div style={{marginBottom:3}}>🏆 <b>श्रेष्ठ मित्र:</b> <span style={{color:PC[p.name]}}>{t1.name} ({t1.c})</span></div>}{tB&&<div>🏅 <b>श्रेष्ठ भाग:</b> <span style={{color:PC[p.name]}}>{tB.b} ({fmt(tB.c)})</span></div>}</div></div>;})}</div>
          <Sec emoji="🎯">प्रान्त बहु-आयामी तुलना</Sec>
          <Card><ResponsiveContainer width="100%" height={260}><RadarChart data={radarData}><PolarGrid stroke="#1c2540"/><PolarAngleAxis dataKey="subject" tick={{fill:"#ccc",fontSize:11}}/><PolarRadiusAxis tick={{fill:"#555",fontSize:9}}/><Radar name="सदस्य(×1K)" dataKey="सदस्य(×1K)" stroke={C.saffron} fill={C.saffron} fillOpacity={0.15}/><Radar name="मित्र(×100)" dataKey="मित्र(×100)" stroke={C.blue} fill={C.blue} fillOpacity={0.15}/><Radar name="भाग" dataKey="भाग" stroke={C.green} fill={C.green} fillOpacity={0.15}/><Legend wrapperStyle={{fontSize:10}}/><Tooltip/></RadarChart></ResponsiveContainer></Card>
          <Sec emoji="📈">2025 → 2026 वृद्धि</Sec>
          <Card><ResponsiveContainer width="100%" height={210}><BarChart data={D.prant.map(p=>({name:p.name,"वृद्धि":p.m26-p.m25}))} barSize={32}><XAxis dataKey="name" tick={{fill:C.muted,fontSize:11}} axisLine={false}/><YAxis tick={{fill:C.muted,fontSize:9}} axisLine={false}/><Tooltip content={<TT/>}/><Bar dataKey="वृद्धि" name="वृद्धि (संख्या)" radius={[6,6,0,0]}>{D.prant.map((_,i)=><Cell key={i} fill={PIE_C[i]}/>)}</Bar></BarChart></ResponsiveContainer>
            <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:10,flexWrap:"wrap"}}>{D.prant.map(p=><div key={p.name} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:900,color:PC[p.name]}}>+{((p.m26-p.m25)/p.m25*100).toFixed(1)}%</div><div style={{fontSize:11,color:C.muted}}>{p.name}</div></div>)}</div></Card></>}

        {/* FOOTER */}
        <footer style={{textAlign:"center",marginTop:32,padding:"14px 0",color:C.muted,fontSize:10,borderTop:`1px solid ${C.border}`,lineHeight:1.8}}>
          <img src={LOGO} alt="" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover",marginBottom:4,opacity:0.7}}/><br/>
          <span style={{color:C.gold,fontWeight:700,letterSpacing:2}}>पाथेय कण संस्थान</span><br/>
          सदस्यता अभियान Closing Report &nbsp;|&nbsp; १५ अप्रैल २०२६, दोपहर १२:०० बजे<br/>
          <span style={{fontSize:9,color:C.red,fontStyle:"italic"}}>* कुछ आंकड़े अभी update हो रहे हैं, मामूली बदलाव संभव है।</span>
        </footer>
      </div>
    </div>
  );
}
