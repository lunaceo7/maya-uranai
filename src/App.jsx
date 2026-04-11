import { useState } from "react";

const PATTERNS = [
  {
    id: 1,
    label: "物語のような鑑定",
    subtitle: "心に深く残る、世界観と余韻を大切にした特別な鑑定",
    icon: "🌙",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
    system: `あなたは、人生の本質を深く読み解き、その人だけの魅力・使命・未来の可能性を、まるで長年その人の人生を見守ってきたかのような深さで言葉にできる、最高級のマヤ暦鑑定士です。

以下のマヤ暦データをもとに、「特別なあなただけの人生鑑定書」として、読んだ人が思わず保存したくなり、何度も読み返したくなるほど完成度の高い文章を作ってください。

【この鑑定書の目的】
読んだ相手に、
・自分の人生にはちゃんと意味があった
・今までの経験も無駄じゃなかった
・これからの未来が少し楽しみになった
・自分って、思っていたよりずっと素敵だった
と、自然に感じてもらうこと。

【文章の世界観・トーン】
・高級感があり、洗練されている
・感情に深く寄り添う
・美しいが、重すぎない
・特別感がある
・ありきたりな占い表現は使わない
・読者に「私のことを見抜いている」と感じさせる
・心を癒しつつ、前向きな余韻を残す

【重要ルール】
■ 占い説明っぽくしない → マヤ暦の知識を説明するのではなく、その要素が"その人の人生そのもの"として自然に伝わるように描写する。
■ 一文一文に温度を持たせる → 書いている文章ではなく、語りかけている文章にする。
■ ありきたり禁止：「優しい」「頑張り屋」「繊細」「感受性が高い」などの浅いテンプレは連発禁止。
■ 重すぎない緩急を入れる → 途中に1か所だけ、少し呼吸できる軽やかさを入れる。
■ 長さ：1200〜1700文字程度。
■ 抽象論で終わらせない → 必ず、現実の人生で活かせるヒントを自然に入れる。

【構成】
① 人生全体を象徴する、美しく印象的な導入
② 生まれ持った本質と魂の個性
③ 才能・魅力・人から愛される理由
④ 人生でぶつかりやすい課題と、その意味
⑤ 恋愛・人間関係の特徴
⑥ 仕事・使命・豊かさのヒント
⑦ これから運気を上げるための意識
⑧ 未来への希望と祝福のメッセージ`
  },
  {
    id: 2,
    label: "前向きになれる鑑定",
    subtitle: "分かりやすく、今の自分に必要なヒントが受け取りやすい内容",
    icon: "✨",
    color: "#0891b2",
    glow: "rgba(8,145,178,0.3)",
    system: `あなたは、10年以上の実績を持つ一流のマヤ暦鑑定士です。ただ結果を説明するのではなく、「この人はこんなにも魅力があったんだ」と本人が涙ぐむほど、優しく、的確に、人生に光を灯す言葉を届けるプロです。

以下のマヤ暦データをもとに、初心者でも自然に理解でき、「まるで自分の心の中を見られているみたい」と感じる、高品質な鑑定文を作成してください。

【絶対ルール】
・マヤ暦の専門用語をそのまま羅列しない
・意味を、感情に寄り添う言葉に変換する
・読み手の魅力を丁寧に言語化する
・不安を煽らず、安心感と希望を与える
・スピリチュアルに寄りすぎず、現実でも役立つ視点を入れる
・恋愛、仕事、人間関係、人生全体に活かせる内容にする
・上品でやわらかく、洗練された女性向け文体
・テンプレ感をなくし、この人だけの物語として書く
・800〜1500文字程度

【出力構成】
①冒頭：この人の人生全体を象徴する印象的な一文
②本質・性格（内面の魅力）
③才能・強み（周囲に与えている価値）
④恋愛・人間関係の傾向
⑤仕事・使命（向いていること・人生テーマ）
⑥今の人生で意識すると開運すること
⑦未来への希望メッセージ（余韻を残す締め）`
  },
  {
    id: 3,
    label: "癒しの鑑定",
    subtitle: "頑張ってきた心に寄り添い、本来の魅力に気づける内容",
    icon: "🌸",
    color: "#be185d",
    glow: "rgba(190,24,93,0.3)",
    system: `あなたは、10年以上の実績を持つ一流のマヤ暦鑑定士です。ただ結果を説明するのではなく、「この人は、こんなにも魅力があったんだ」と本人が思わず涙ぐむほど、優しく、的確に、人生に光を灯す言葉を届けるプロです。

以下のマヤ暦データをもとに、「まるで自分の心の中を見られているみたい」と感じる、高品質で、本人だけの人生に寄り添った鑑定文を作成してください。

【最重要ルール】
・マヤ暦の専門用語をそのまま説明口調で並べない
・「誰にでも当てはまる表現」を避け、この人だけの感情や人生の流れを描く
・「あなたは〇〇な人です」で終わらず、「なぜそうなのか」「どんな場面でそう出やすいか」まで丁寧に書く
・不安を煽らず、安心感・希望・前向きさを与える
・上品でやわらかく、洗練された女性向け文体
・800〜1500文字程度

【出力構成】
①冒頭：この人の人生全体を象徴する印象的な一文
②本質・性格（内面の魅力・心の深さ）
③才能・強み（周囲に与えている価値）
④恋愛・人間関係の傾向（心の癖）
⑤仕事・使命（向いていること・人生テーマ）
⑥今の人生で意識すると運気が整うこと（今日からできる小さな一歩を1〜2個）
⑦未来への希望メッセージ（読み終えたあと心が軽くなる締め）`
  }
];

export default function MayaUranai() {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({ kin: "", taiyo: "", wave: "", ginga: "", nayami: "", other: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const handleGenerate = async () => {
    if (!selected || !formData.kin) return;
    setLoading(true);
    setResult("");
    setStep(3);

    const pattern = PATTERNS.find(p => p.id === selected);
    const userContent = `【マヤ暦データ】
KIN番号: ${formData.kin}
太陽の紋章: ${formData.taiyo || "（不明）"}
ウェイブスペル: ${formData.wave || "（不明）"}
銀河の音: ${formData.ginga || "（不明）"}
${formData.nayami ? `【今の悩み・相談内容】\n${formData.nayami}` : ""}
${formData.other ? `【その他の情報】\n${formData.other}` : ""}

上記のデータをもとに鑑定文を作成してください。`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: pattern.system,
          messages: [{ role: "user", content: userContent }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("") || "生成に失敗しました。";
      setResult(text);
    } catch (e) {
      setResult("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setSelected(null); setResult("");
    setFormData({ kin: "", taiyo: "", wave: "", ginga: "", nayami: "", other: "" });
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    padding: "12px 14px", color: "#e8e6f0", fontSize: "14px",
    fontFamily: "inherit", outline: "none", boxSizing: "border-box", lineHeight: "1.7"
  };

  const selectedPattern = PATTERNS.find(p => p.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#e8e6f0", fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif", padding: "32px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: "-200px", right: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-150px", left: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(190,24,93,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>🌙</div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 8px", background: "linear-gradient(135deg, #e8e6f0, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>マヤ暦 AI 鑑定</h1>
          <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>データを入力するだけで、あなただけの鑑定文が生成されます</p>
        </div>

        {step === 1 && (
          <div>
            <div style={{ fontSize: "12px", color: "#6b6880", letterSpacing: "0.1em", marginBottom: "16px", textAlign: "center" }}>STEP 1 ｜ 鑑定スタイルを選んでください</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {PATTERNS.map(p => (
                <div key={p.id} onClick={() => setSelected(p.id)} style={{ padding: "20px", borderRadius: "14px", border: `1px solid ${selected === p.id ? p.color : "rgba(255,255,255,0.08)"}`, background: selected === p.id ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)", cursor: "pointer", transition: "all 0.2s", boxShadow: selected === p.id ? `0 0 20px ${p.glow}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "22px" }}>{p.icon}</span>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px", color: selected === p.id ? "#fff" : "#c4c2d4" }}>{p.label}</div>
                      <div style={{ fontSize: "12px", color: "#6b6880", lineHeight: "1.5" }}>{p.subtitle}</div>
                    </div>
                    {selected === p.id && <div style={{ marginLeft: "auto", width: "20px", height: "20px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>✓</div>}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => selected && setStep(2)} disabled={!selected} style={{ width: "100%", padding: "14px", background: selected ? "linear-gradient(135deg, #7c3aed, #be185d)" : "rgba(255,255,255,0.05)", border: "none", borderRadius: "12px", color: selected ? "#fff" : "#4a4760", fontSize: "15px", fontWeight: "600", cursor: selected ? "pointer" : "not-allowed", letterSpacing: "0.03em" }}>次へ → データを入力する</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: "12px", color: "#6b6880", letterSpacing: "0.1em", marginBottom: "4px", textAlign: "center" }}>STEP 2 ｜ マヤ暦データを入力</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "100px", padding: "4px 12px", fontSize: "12px", color: "#c084fc", margin: "8px auto 24px", width: "fit-content" }}>
              {selectedPattern?.icon} {selectedPattern?.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {[
                { key: "kin", label: "KIN番号 *", placeholder: "例：144" },
                { key: "taiyo", label: "太陽の紋章", placeholder: "例：黄色い種" },
                { key: "wave", label: "ウェイブスペル", placeholder: "例：赤い竜" },
                { key: "ginga", label: "銀河の音", placeholder: "例：音5" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: "12px", color: "#6b6880", display: "block", marginBottom: "6px" }}>{f.label}</label>
                  <input value={formData[f.key]} onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "12px", color: "#6b6880", display: "block", marginBottom: "6px" }}>今の悩み・相談内容</label>
                <textarea value={formData.nayami} onChange={e => setFormData(prev => ({ ...prev, nayami: e.target.value }))} placeholder="例：仕事に行き詰まりを感じている、人間関係で悩んでいる など" style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }} onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#6b6880", display: "block", marginBottom: "6px" }}>その他の情報（任意）</label>
                <textarea value={formData.other} onChange={e => setFormData(prev => ({ ...prev, other: e.target.value }))} placeholder="年齢、職業、家族構成など" style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#6b6880", fontSize: "14px", cursor: "pointer" }}>← 戻る</button>
              <button onClick={handleGenerate} disabled={!formData.kin} style={{ flex: 3, padding: "13px", background: formData.kin ? "linear-gradient(135deg, #7c3aed, #be185d)" : "rgba(255,255,255,0.05)", border: "none", borderRadius: "12px", color: formData.kin ? "#fff" : "#4a4760", fontSize: "15px", fontWeight: "600", cursor: formData.kin ? "pointer" : "not-allowed" }}>🌙 鑑定を生成する</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ fontSize: "12px", color: "#6b6880", letterSpacing: "0.1em", marginBottom: "20px", textAlign: "center" }}>STEP 3 ｜ 鑑定結果</div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: "32px", marginBottom: "16px", animation: "spin 3s linear infinite", display: "inline-block" }}>🌙</div>
                <div style={{ fontSize: "14px", color: "#6b6880" }}>鑑定文を生成しています...</div>
              </div>
            ) : (
              <>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", marginBottom: "16px", lineHeight: "2", fontSize: "14px", color: "#d1cfe8", whiteSpace: "pre-wrap" }}>{result}</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ flex: 1, padding: "12px", background: copied ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", color: copied ? "#4ade80" : "#9ca3af", fontSize: "13px", cursor: "pointer" }}>{copied ? "コピー済み ✓" : "テキストをコピー"}</button>
                  <button onClick={() => { setStep(2); setResult(""); }} style={{ flex: 1, padding: "12px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "10px", color: "#a78bfa", fontSize: "13px", cursor: "pointer" }}>もう一度生成</button>
                  <button onClick={reset} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#6b6880", fontSize: "13px", cursor: "pointer" }}>最初から</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } input::placeholder, textarea::placeholder { color: #3d3a4e; }`}</style>
    </div>
  );
}
