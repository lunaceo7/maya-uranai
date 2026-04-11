import { useState } from "react";

const TAIYO = ["赤い龍","白い風","青い夜","黄色い種","赤い蛇","白い世界の橋渡し","青い手","黄色い星","赤い月","白い犬","青い猿","黄色い人","赤い空歩く者","白い魔法使い","青い鷲","黄色い戦士","赤い地球","白い鏡","青い嵐","黄色い太陽"];
const GINGA = ["音1（磁気）","音2（月）","音3（電気）","音4（自己存在）","音5（倍音）","音6（リズム）","音7（共鳴）","音8（銀河）","音9（太陽）","音10（惑星）","音11（スペクトル）","音12（水晶）","音13（宇宙）"];

const PATTERNS = [
  { id: 1, label: "物語のような鑑定", subtitle: "心に深く残る、世界観と余韻を大切にした特別な鑑定", icon: "🌙", color: "#7c3aed",
    system: `あなたは最高級のマヤ暦鑑定士です。以下のデータをもとに「特別なあなただけの人生鑑定書」を作成してください。【目的】「自分の人生にはちゃんと意味があった」「これからの未来が少し楽しみになった」と感じてもらうこと。【ルール】占い説明口調にしない。一文一文に温度を持たせる。テンプレ表現は連発禁止。1200〜1700文字。現実で活かせるヒントを必ず入れる。【構成】①印象的な導入 ②生まれ持った本質 ③才能・魅力 ④人生の課題とその意味 ⑤恋愛・人間関係 ⑥仕事・使命 ⑦運気を上げるための意識 ⑧未来への祝福メッセージ` },
  { id: 2, label: "前向きになれる鑑定", subtitle: "分かりやすく、今の自分に必要なヒントが受け取りやすい内容", icon: "✨", color: "#0284c7",
    system: `あなたは10年以上の実績を持つ一流のマヤ暦鑑定士です。以下のデータをもとに「まるで自分の心の中を見られているみたい」と感じる高品質な鑑定文を作成してください。【ルール】専門用語をそのまま羅列しない。不安を煽らず安心感と希望を与える。上品でやわらかく洗練された女性向け文体。800〜1500文字。【構成】①印象的な導入 ②本質・性格 ③才能・強み ④恋愛・人間関係 ⑤仕事・使命 ⑥開運のヒント ⑦未来への希望メッセージ` },
  { id: 3, label: "癒しの鑑定", subtitle: "頑張ってきた心に寄り添い、本来の魅力に気づける内容", icon: "🌸", color: "#be185d",
    system: `あなたは10年以上の実績を持つ一流のマヤ暦鑑定士です。以下のデータをもとに本人だけの人生に寄り添った鑑定文を作成してください。【ルール】専門用語を説明口調で並べない。「人前ではこう見られやすいけれど、本当はこう感じていることがある」という内面の揺れも描く。不安を煽らず安心感・希望を与える。800〜1500文字。【構成】①印象的な導入 ②本質・性格 ③才能・強み ④恋愛・人間関係 ⑤仕事・使命 ⑥今日からできる小さな一歩（1〜2個） ⑦心が軽くなる締めのメッセージ` },
];

const INIT = { birthday:"", gender:"", kin:"", taiyo:"", wave:"", ginga:"", guide:"", hantai:"", shinpi:"", ruiji:"", kagami:"", zettai:"", nayami:"", other:"" };

const sel = (val, onChange, opts, placeholder) => (
  <select value={val} onChange={e => onChange(e.target.value)} style={{ width:"100%", background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:"10px", padding:"11px 14px", color: val ? "#1e293b" : "#94a3b8", fontSize:"14px", fontFamily:"inherit", outline:"none", cursor:"pointer", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center" }}>
    <option value="">{placeholder}</option>
    {opts.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

export default function App() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(INIT);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const reset = () => { setStep(1); setSelected(null); setResult(""); setForm(INIT); };

  const generate = async () => {
    if (!selected || !form.kin) return;
    setLoading(true); setResult(""); setStep(3);
    const pat = PATTERNS.find(p => p.id === selected);
    const content = `【基本情報】生年月日:${form.birthday||"不明"} 性別:${form.gender||"不明"} KIN番号:${form.kin} 太陽の紋章:${form.taiyo||"不明"} ウェイブスペル:${form.wave||"不明"} 銀河の音:${form.ginga||"不明"}\n【相関KIN】ガイド:${form.guide||"不明"} 反対:${form.hantai||"不明"} 神秘:${form.shinpi||"不明"} 類似:${form.ruiji||"不明"} 鏡の向こう:${form.kagami||"不明"} 絶対反対:${form.zettai||"不明"}${form.nayami?`\n【悩み】${form.nayami}`:""}${form.other?`\n【その他】${form.other}`:""}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000, system:pat.system, messages:[{role:"user",content}] }) });
      const data = await res.json();
      setResult(data.content?.map(i=>i.text||"").join("")||"生成に失敗しました。");
    } catch { setResult("エラーが発生しました。もう一度お試しください。"); }
    finally { setLoading(false); }
  };

  const inpStyle = { width:"100%", background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:"10px", padding:"11px 14px", color:"#1e293b", fontSize:"14px", fontFamily:"inherit", outline:"none", boxSizing:"border-box" };
  const Label = ({c}) => <div style={{fontSize:"12px",color:"#64748b",marginBottom:"6px",fontWeight:"500"}}>{c}</div>;
  const Row = ({children}) => <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>{children}</div>;
  const Sec = ({title,children}) => <div style={{marginBottom:"24px"}}><div style={{fontSize:"11px",color:"#7c3aed",fontWeight:"700",letterSpacing:"0.1em",marginBottom:"12px",paddingBottom:"8px",borderBottom:"2px solid #ede9fe"}}>{title}</div><div style={{display:"flex",flexDirection:"column",gap:"12px"}}>{children}</div></div>;

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#faf5ff 0%,#f0f9ff 50%,#fdf2f8 100%)",color:"#1e293b",fontFamily:"'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif",padding:"32px 16px"}}>
      <div style={{maxWidth:"680px",margin:"0 auto"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"36px"}}>
          <div style={{fontSize:"36px",marginBottom:"10px"}}>🌙</div>
          <h1 style={{fontSize:"24px",fontWeight:"800",margin:"0 0 8px",background:"linear-gradient(135deg,#7c3aed,#be185d)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>マヤ暦 AI 鑑定</h1>
          <p style={{fontSize:"14px",color:"#64748b",margin:0}}>データを入力するだけで、あなただけの鑑定文が生成されます</p>
        </div>

        {/* STEP 1 */}
        {step===1 && <div>
          <div style={{fontSize:"12px",color:"#94a3b8",letterSpacing:"0.1em",marginBottom:"16px",textAlign:"center",fontWeight:"600"}}>STEP 1 ｜ 鑑定スタイルを選んでください</div>
          <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"24px"}}>
            {PATTERNS.map(p=>(
              <div key={p.id} onClick={()=>setSelected(p.id)} style={{padding:"20px",borderRadius:"16px",border:`2px solid ${selected===p.id?p.color:"#e2e8f0"}`,background:selected===p.id?"#faf5ff":"#fff",cursor:"pointer",transition:"all 0.2s",boxShadow:selected===p.id?`0 4px 24px rgba(124,58,237,0.15)`:"0 1px 4px rgba(0,0,0,0.06)"}}>
                <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                  <span style={{fontSize:"24px"}}>{p.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:"700",fontSize:"15px",marginBottom:"3px",color:selected===p.id?p.color:"#1e293b"}}>{p.label}</div>
                    <div style={{fontSize:"12px",color:"#94a3b8"}}>{p.subtitle}</div>
                  </div>
                  {selected===p.id&&<div style={{width:"22px",height:"22px",borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"12px",flexShrink:0}}>✓</div>}
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>selected&&setStep(2)} disabled={!selected} style={{width:"100%",padding:"15px",background:selected?"linear-gradient(135deg,#7c3aed,#be185d)":"#e2e8f0",border:"none",borderRadius:"12px",color:selected?"#fff":"#94a3b8",fontSize:"15px",fontWeight:"700",cursor:selected?"pointer":"not-allowed",boxShadow:selected?"0 4px 20px rgba(124,58,237,0.3)":"none"}}>
            次へ → データを入力する
          </button>
        </div>}

        {/* STEP 2 */}
        {step===2 && <div style={{background:"#fff",borderRadius:"20px",padding:"28px",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
          <div style={{fontSize:"12px",color:"#94a3b8",letterSpacing:"0.1em",marginBottom:"6px",textAlign:"center",fontWeight:"600"}}>STEP 2 ｜ マヤ暦データを入力</div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:"24px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#faf5ff",border:"1.5px solid #ddd6fe",borderRadius:"100px",padding:"5px 16px",fontSize:"13px",color:"#7c3aed",fontWeight:"600"}}>
              {PATTERNS.find(p=>p.id===selected)?.icon} {PATTERNS.find(p=>p.id===selected)?.label}
            </div>
          </div>

          <Sec title="基本情報">
            <Row>
              <div><Label c="生年月日"/><input value={form.birthday} onChange={e=>set("birthday",e.target.value)} placeholder="例：1990年01月01日" style={inpStyle} /></div>
              <div><Label c="性別"/>
                {sel(form.gender, v=>set("gender",v), ["女性","男性","その他"], "選択してください")}
              </div>
            </Row>
            <div><Label c="KIN番号 *"/>
              {sel(form.kin, v=>set("kin",v), Array.from({length:260},(_,i)=>`KIN${i+1}`), "KIN番号を選択")}
            </div>
            <Row>
              <div><Label c="太陽の紋章"/>
                {sel(form.taiyo, v=>set("taiyo",v), TAIYO, "選択してください")}
              </div>
              <div><Label c="ウェイブスペル"/>
                {sel(form.wave, v=>set("wave",v), TAIYO, "選択してください")}
              </div>
            </Row>
            <div><Label c="銀河の音"/>
              {sel(form.ginga, v=>set("ginga",v), GINGA, "選択してください")}
            </div>
          </Sec>

          <Sec title="相関KIN（わかる範囲でOK）">
            <Row>
              <div><Label c="ガイドKIN"/><input value={form.guide} onChange={e=>set("guide",e.target.value)} placeholder="例：KIN13" style={inpStyle}/></div>
              <div><Label c="反対KIN"/><input value={form.hantai} onChange={e=>set("hantai",e.target.value)} placeholder="例：KIN118" style={inpStyle}/></div>
            </Row>
            <Row>
              <div><Label c="神秘KIN"/><input value={form.shinpi} onChange={e=>set("shinpi",e.target.value)} placeholder="例：KIN221" style={inpStyle}/></div>
              <div><Label c="類似KIN"/><input value={form.ruiji} onChange={e=>set("ruiji",e.target.value)} placeholder="例：KIN83" style={inpStyle}/></div>
            </Row>
            <Row>
              <div><Label c="鏡の向こうKIN"/><input value={form.kagami} onChange={e=>set("kagami",e.target.value)} placeholder="例：KIN118" style={inpStyle}/></div>
              <div><Label c="絶対反対KIN"/><input value={form.zettai} onChange={e=>set("zettai",e.target.value)} placeholder="例：KIN1" style={inpStyle}/></div>
            </Row>
          </Sec>

          <Sec title="追加情報（任意）">
            <div><Label c="今の悩み・相談内容"/>
              <textarea value={form.nayami} onChange={e=>set("nayami",e.target.value)} placeholder="例：仕事に行き詰まりを感じている、人間関係で悩んでいる など" rows={3} style={{...inpStyle,resize:"vertical",lineHeight:"1.7"}}/>
            </div>
            <div><Label c="その他（年齢・職業・家族構成など）"/>
              <textarea value={form.other} onChange={e=>set("other",e.target.value)} placeholder="鑑定に役立てたい情報があればご記入ください" rows={2} style={{...inpStyle,resize:"vertical",lineHeight:"1.7"}}/>
            </div>
          </Sec>

          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={()=>setStep(1)} style={{flex:1,padding:"13px",background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:"12px",color:"#64748b",fontSize:"14px",fontWeight:"600",cursor:"pointer"}}>← 戻る</button>
            <button onClick={generate} disabled={!form.kin} style={{flex:3,padding:"13px",background:form.kin?"linear-gradient(135deg,#7c3aed,#be185d)":"#e2e8f0",border:"none",borderRadius:"12px",color:form.kin?"#fff":"#94a3b8",fontSize:"15px",fontWeight:"700",cursor:form.kin?"pointer":"not-allowed",boxShadow:form.kin?"0 4px 20px rgba(124,58,237,0.3)":"none"}}>
              🌙 鑑定を生成する
            </button>
          </div>
        </div>}

        {/* STEP 3 */}
        {step===3 && <div>
          <div style={{fontSize:"12px",color:"#94a3b8",letterSpacing:"0.1em",marginBottom:"20px",textAlign:"center",fontWeight:"600"}}>STEP 3 ｜ 鑑定結果</div>
          {loading ? (
            <div style={{textAlign:"center",padding:"60px 0",background:"#fff",borderRadius:"20px",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
              <div style={{fontSize:"36px",marginBottom:"16px",animation:"spin 3s linear infinite",display:"inline-block"}}>🌙</div>
              <div style={{fontSize:"14px",color:"#64748b"}}>鑑定文を生成しています...</div>
            </div>
          ) : (
            <>
              <div style={{background:"#fff",border:"1.5px solid #ede9fe",borderRadius:"20px",padding:"28px",marginBottom:"16px",lineHeight:"2.1",fontSize:"14px",color:"#374151",whiteSpace:"pre-wrap",boxShadow:"0 4px 24px rgba(124,58,237,0.08)"}}>
                {result}
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>{navigator.clipboard.writeText(result);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{flex:1,padding:"12px",background:copied?"#f0fdf4":"#f8fafc",border:`1.5px solid ${copied?"#86efac":"#e2e8f0"}`,borderRadius:"12px",color:copied?"#16a34a":"#64748b",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                  {copied?"コピー済み ✓":"テキストをコピー"}
                </button>
                <button onClick={()=>{setStep(2);setResult("");}} style={{flex:1,padding:"12px",background:"#faf5ff",border:"1.5px solid #ddd6fe",borderRadius:"12px",color:"#7c3aed",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>もう一度生成</button>
                <button onClick={reset} style={{flex:1,padding:"12px",background:"#f8fafc",border:"1.5px solid #e2e8f0",borderRadius:"12px",color:"#64748b",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>最初から</button>
              </div>
            </>
          )}
        </div>}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} input::placeholder,textarea::placeholder{color:#cbd5e1} select option{color:#1e293b}`}</style>
    </div>
  );
}
