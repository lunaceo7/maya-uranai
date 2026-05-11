import { useState, useEffect } from "react";

const SCENARIOS = [
  {
    id: 1, level: "初心者", label: "🌱 初心者",
    title: "初めての恋愛相談",
    customerProfile: "26歳・会社員・女性",
    situation: "好きな人がいるのですが、脈ありかどうか気になっています。彼は同じ部署の先輩で、たまに目が合ったり、ランチに誘ってくれることもあります。でも他の女性にも優しいので自信が持てなくて…。",
    hint: "ポイント：①共感②現状整理③具体的なアドバイス の順で鑑定しましょう",
    rubric: [
      { text: "相手の感情への共感があるか", tip: "「もどかしいですよね」など感情に寄り添う言葉があるか" },
      { text: "状況を整理して伝えているか", tip: "事実を整理して伝えられているか" },
      { text: "具体的な行動アドバイスがあるか", tip: "次の行動が明確に提示できているか" },
      { text: "希望を持てる締め方になっているか", tip: "読んだ後に前向きな気持ちになれる締めくくりか" },
    ],
    sampleAnswer: "○○さん、大切なお気持ちをご相談いただきありがとうございます。好きな方の気持ちが分からず、もどかしい毎日を過ごされているのですね。目が合う・ランチに誘ってくれるというのは、あなたのことを意識しているサインの可能性が高いです。ただ、優しい方は周りにも同じように接することがあるため、もう一歩踏み込んで関係性を深めるアクションが鍵になりそうです。例えば、ランチの帰りに「いつも誘ってくれてありがとうございます」と一言添えてみてはいかがでしょうか。小さな一歩が、大きな変化を生みます。応援しています。",
    tips: ["感謝の言葉から始めると相手が安心する", "事実と感情を分けて整理すると伝わりやすい", "アドバイスは1つに絞ると実行しやすい"],
  },
  {
    id: 2, level: "初心者", label: "🌱 初心者",
    title: "転職すべきか迷っている",
    customerProfile: "31歳・男性・会社員",
    situation: "今の会社に5年勤めましたが、給料も上がらず、やりがいも感じられません。転職を考えているのですが、リスクが怖くて踏み出せません。妻と子供が1人います。",
    hint: "ポイント：不安を否定せず、背中を押すか慎重に見極めるかを判断して伝えましょう",
    rubric: [
      { text: "家族への配慮が入っているか", tip: "妻・子どもへの言及があるか" },
      { text: "現状の感情に寄り添えているか", tip: "5年間の積み上げへのねぎらい、不安への共感があるか" },
      { text: "転職に対する見立てが明確か", tip: "自分の見立てを明示できているか" },
      { text: "次の行動が具体的か", tip: "具体的な第一歩があるか" },
    ],
    sampleAnswer: "○○さん、5年間積み上げてこられたものと、家族への責任感の間で揺れるお気持ち、とてもよく伝わります。あなたの中にはすでに「変わりたい」という強い意志が芽生えています。まずは転職エージェントへの登録や、副業での市場価値確認など、「辞める前にできること」から始めてみてください。動き出すことで、霧が晴れるように次の道が見えてくるはずです。",
    tips: ["「辞める前にできること」の提案が安心感を生む", "リスクへの恐れを否定せず、肯定的に言い換える", "家族への言及で信頼感が増す"],
  },
  {
    id: 3, level: "上級者", label: "⭐ 上級者",
    title: "複雑な人間関係トラブル",
    customerProfile: "34歳・女性・フリーランス",
    situation: "仕事仲間だと思っていた友人に、私のクライアントを横取りされました。その友人は今も普通に接してきます。怒りをぶつけるべきか、距離を置くべきか、それとも割り切って付き合い続けるべきか…。どうするのが一番いいですか？",
    hint: "ポイント：感情の整理→行動の選択肢の提示→その人に合った道の示し方 が鍵",
    rubric: [
      { text: "裏切りへの怒りに共感できているか", tip: "怒りや悲しみをしっかり受け止める言葉があるか" },
      { text: "複数の選択肢を示せているか", tip: "行動の選択肢を複数示せているか" },
      { text: "相手の状況に合った提案ができているか", tip: "フリーランスという立場を考慮した提案か" },
      { text: "自分を守ることへの肯定が入っているか", tip: "自己肯定感を高める言葉があるか" },
      { text: "今後の人間関係の指針が伝わるか", tip: "この先どう生きるかのヒントが含まれているか" },
    ],
    sampleAnswer: "○○さん、信頼していた方からの行為はとても辛かったと思います。その怒りと悲しみ、当然のことです。選択肢は大きく3つあります。①率直に伝える：事実ベースで話す。②静かに距離を置く：仕事上の関係だけ最低限維持する。③完全に縁を切る：エネルギーを消耗する関係は潔く手放す。どの選択をしても「あなたは間違っていない」とお伝えしたいです。",
    tips: ["感情を受け止めてから選択肢を提示する順番が大事", "選択肢は番号で整理すると読みやすい", "最後は必ず相談者の背中を押す言葉で締める"],
  },
  {
    id: 4, level: "上級者", label: "⭐ 上級者",
    title: "起業すべきかどうか",
    customerProfile: "38歳・男性・会社員",
    situation: "副業で月10万円ほど稼げるようになりました。会社を辞めて独立したいのですが、家族（妻・子2人）がいるので決断できません。妻は反対していませんが、積極的でもないです。今が独立のタイミングかどうか教えてほしいです。",
    hint: "ポイント：数字的な根拠・精神的な準備・家族との対話 の3軸で鑑定を組み立てましょう",
    rubric: [
      { text: "現状の成果への評価が入っているか", tip: "月10万円という実績をきちんと評価しているか" },
      { text: "独立のリスクと備えへの言及があるか", tip: "具体的な備えに触れているか" },
      { text: "家族との対話を促せているか", tip: "奥様の気持ちを聞く促しがあるか" },
      { text: "今がタイミングかへの明確な見立てがあるか", tip: "YesかNoかを明確に示しているか" },
      { text: "背中を押しつつも慎重さも伝わるか", tip: "希望と現実のバランスが取れているか" },
    ],
    sampleAnswer: "○○さん、副業で月10万円という実績は素晴らしい土台です。ただ、タイミングとしてはもう少しだけ準備期間を取ることをお勧めします。生活費6ヶ月分の貯蓄と、副業収入を月20〜30万円に伸ばすことが安心の基準になるでしょう。奥様の気持ちの背景を、一度じっくり聞いてみてください。家族の安心が、あなたの力になります。",
    tips: ["数字を使うと信頼感が増す", "「まだ早い」と言うときも必ず希望を添える", "家族への言及は必須"],
  },
];

const RANKS = [
  { name: "見習い占い師", min: 0, max: 2, color: "#8b9dc3", emoji: "🌱" },
  { name: "一人前占い師", min: 3, max: 7, color: "#c9a84c", emoji: "✨" },
  { name: "熟練占い師", min: 8, max: 14, color: "#9b59b6", emoji: "🔮" },
  { name: "師範", min: 15, max: 999, color: "#e74c3c", emoji: "👑" },
];

function getRank(count) {
  return RANKS.find(r => count >= r.min && count <= r.max) || RANKS[0];
}

function ScoreBar({ score }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(score), 100); }, [score]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
      <div style={{ flex: 1, height: 6, background: "#1a1a2e", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          width: `${width}%`, height: "100%",
          background: score >= 80 ? "#c9a84c" : score >= 50 ? "#8b9dc3" : "#6b4c4c",
          borderRadius: 3, transition: "width 1s ease"
        }} />
      </div>
      <span style={{ color: "#c9a84c", fontWeight: 700, minWidth: 36, fontSize: 13 }}>{score}点</span>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("practice");
  const [filterLevel, setFilterLevel] = useState("すべて");
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [phase, setPhase] = useState("select");
  const [userAnswer, setUserAnswer] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("uranai-history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveHistory = (newHistory) => {
    try { localStorage.setItem("uranai-history", JSON.stringify(newHistory)); } catch (e) {}
  };

  const filtered = SCENARIOS.filter(s => filterLevel === "すべて" || s.level === filterLevel);
  const totalCount = history.length;
  const avgScore = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;
  const rank = getRank(totalCount);
  const nextRank = RANKS[RANKS.indexOf(rank) + 1];

  function toggleCheck(i) {
    setCheckedItems(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  function submitSelfCheck() {
    const score = Math.round((checkedItems.length / selectedScenario.rubric.length) * 100);
    const entry = { id: Date.now(), date: new Date().toLocaleDateString("ja-JP"), scenario: selectedScenario.title, level: selectedScenario.level, score };
    const newHistory = [...history, entry];
    setHistory(newHistory);
    saveHistory(newHistory);
    setPhase("result");
  }

  function reset() {
    setSelectedScenario(null); setPhase("select"); setUserAnswer(""); setCheckedItems([]);
  }

  const currentScore = selectedScenario ? Math.round((checkedItems.length / selectedScenario.rubric.length) * 100) : 0;

  const streakDays = (() => {
    if (history.length === 0) return 0;
    const dates = [...new Set(history.map(h => h.date))].sort().reverse();
    const today = new Date().toLocaleDateString("ja-JP");
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("ja-JP");
    if (dates[0] !== today && dates[0] !== yesterday) return 0;
    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const a = new Date(dates[i - 1].replace(/\//g, "-"));
      const b = new Date(dates[i].replace(/\//g, "-"));
      if ((a - b) / 86400000 === 1) streak++; else break;
    }
    return streak;
  })();

  const stepBar = (active) => (
    <div style={{ display: "flex", marginBottom: 16, background: "#100d1a", borderRadius: 10, overflow: "hidden", border: "1px solid #2a2040" }}>
      {["① 鑑定文を書く", "② 自己チェック", "③ 結果"].map((s, i) => (
        <div key={i} style={{
          flex: 1, padding: "8px 4px", textAlign: "center", fontSize: 11,
          background: i === active ? "rgba(201,168,76,0.1)" : "transparent",
          color: i === active ? "#c9a84c" : "#4a4060",
          borderRight: i < 2 ? "1px solid #2a2040" : "none"
        }}>{s}</div>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a", color: "#e8e0d0", fontFamily: "'Georgia', 'Noto Serif JP', serif", paddingBottom: 60 }}>
      <div style={{ background: "linear-gradient(135deg, #1a1030, #0d0d1a, #1a0d20)", borderBottom: "1px solid #2a2040", padding: "24px 20px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>🔮</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#c9a84c", margin: "0 0 4px", letterSpacing: "0.1em" }}>占い師トレーニング</h1>
        <p style={{ fontSize: 12, color: "#8b8070", margin: 0 }}>テキスト鑑定 練習システム</p>
      </div>

      <div style={{ background: "#100d1a", borderBottom: "1px solid #1a1535", padding: "10px 20px", display: "flex", justifyContent: "space-around" }}>
        {[
          { label: "ランク", value: `${rank.emoji} ${rank.name}`, color: rank.color },
          { label: "練習回数", value: `${totalCount}回`, color: "#c9a84c" },
          { label: "平均スコア", value: `${avgScore}点`, color: "#8b9dc3" },
          { label: "連続記録", value: `${streakDays}日`, color: streakDays >= 3 ? "#e74c3c" : "#c8c0b0" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#6b6058" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", borderBottom: "1px solid #2a2040" }}>
        {[["practice", "🔮 練習"], ["history", "📊 成長記録"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, padding: "12px 0", border: "none",
            background: tab === key ? "rgba(201,168,76,0.08)" : "transparent",
            color: tab === key ? "#c9a84c" : "#6b6058", fontSize: 13, cursor: "pointer",
            borderBottom: tab === key ? "2px solid #c9a84c" : "2px solid transparent",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px" }}>

        {tab === "history" && (
          <div style={{ paddingTop: 20 }}>
            <div style={{ background: "linear-gradient(135deg, #1a1530, #160d20)", border: `1px solid ${rank.color}40`, borderRadius: 12, padding: 20, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: rank.color }}>{rank.emoji} {rank.name}</div>
                  {nextRank && <div style={{ fontSize: 11, color: "#6b6058" }}>次: {nextRank.emoji} {nextRank.name}（あと{nextRank.min - totalCount}回）</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#c9a84c" }}>{totalCount}</div>
                  <div style={{ fontSize: 10, color: "#6b6058" }}>総練習回数</div>
                </div>
              </div>
              {nextRank && (
                <div>
                  <div style={{ height: 6, background: "#1a1a2e", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})`, width: `${Math.min(((totalCount - rank.min) / (nextRank.min - rank.min)) * 100, 100)}%`, transition: "width 1s ease" }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#6b6058", marginTop: 3, textAlign: "right" }}>{totalCount - rank.min} / {nextRank.min - rank.min}</div>
                </div>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 26 }}>{streakDays >= 7 ? "🔥" : streakDays >= 3 ? "⚡" : "💫"}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: streakDays >= 3 ? "#e74c3c" : "#c8c0b0" }}>{streakDays}日</div>
                <div style={{ fontSize: 10, color: "#6b6058" }}>連続練習記録</div>
              </div>
              <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 10, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 26 }}>{totalCount >= 20 ? "🏆" : totalCount >= 10 ? "🥇" : totalCount >= 5 ? "🥈" : "🎯"}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#c9a84c" }}>{totalCount}回</div>
                <div style={{ fontSize: 10, color: "#6b6058" }}>累計練習数</div>
              </div>
            </div>
            <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1535", fontSize: 12, color: "#8b9dc3" }}>📋 練習履歴</div>
              {history.length === 0 ? (
                <div style={{ padding: 30, textAlign: "center", color: "#5a5050", fontSize: 13 }}>まだ練習記録がありません</div>
              ) : [...history].reverse().slice(0, 10).map((h) => (
                <div key={h.id} style={{ padding: "11px 16px", borderBottom: "1px solid #1a1535", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, color: "#c8c0b0" }}>{h.scenario}</div>
                    <div style={{ fontSize: 10, color: "#6b6058" }}>{h.date} · {h.level}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: h.score >= 80 ? "#c9a84c" : h.score >= 50 ? "#8b9dc3" : "#8b6060" }}>{h.score}点</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "practice" && (
          <div>
            {phase === "select" && (
              <div>
                <div style={{ display: "flex", gap: 8, padding: "16px 0 12px", justifyContent: "center" }}>
                  {["すべて", "初心者", "上級者"].map(l => (
                    <button key={l} onClick={() => setFilterLevel(l)} style={{
                      padding: "5px 14px", borderRadius: 20, border: "1px solid",
                      borderColor: filterLevel === l ? "#c9a84c" : "#2a2040",
                      background: filterLevel === l ? "rgba(201,168,76,0.1)" : "transparent",
                      color: filterLevel === l ? "#c9a84c" : "#8b8070", fontSize: 12, cursor: "pointer"
                    }}>{l}</button>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {filtered.map(s => {
                    const sh = history.filter(h => h.scenario === s.title);
                    const best = sh.length > 0 ? Math.max(...sh.map(h => h.score)) : null;
                    return (
                      <button key={s.id} onClick={() => { setSelectedScenario(s); setPhase("write"); }}
                        style={{ background: "linear-gradient(135deg, #1a1530, #160d20)", border: "1px solid #2a2040", borderRadius: 12, padding: "16px 18px", textAlign: "left", cursor: "pointer", color: "#e8e0d0" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a84c"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2040"}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: "#8b9dc3" }}>{s.label}</span>
                          {best !== null && <span style={{ fontSize: 11, color: "#c9a84c" }}>最高 {best}点</span>}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, margin: "5px 0 6px" }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: "#9a9080", lineHeight: 1.6 }}>{s.situation.slice(0, 55)}…</div>
                        {sh.length > 0 && <div style={{ fontSize: 10, color: "#6b6058", marginTop: 4 }}>{sh.length}回練習済み</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {phase === "write" && selectedScenario && (
              <div style={{ paddingTop: 16 }}>
                <button onClick={reset} style={{ background: "none", border: "none", color: "#8b8070", cursor: "pointer", fontSize: 12, padding: "0 0 12px" }}>← 一覧へ</button>
                {stepBar(0)}
                <div style={{ background: "linear-gradient(135deg, #1a1530, #160d20)", border: "1px solid #2a2040", borderRadius: 12, padding: 18, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#8b9dc3", marginBottom: 6 }}>{selectedScenario.label} ／ {selectedScenario.customerProfile}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#c9a84c", marginBottom: 10 }}>{selectedScenario.title}</div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 12, fontSize: 13, lineHeight: 1.8, color: "#c8c0b0", borderLeft: "3px solid #c9a84c" }}>{selectedScenario.situation}</div>
                </div>
                <div style={{ background: "rgba(139,157,195,0.05)", border: "1px dashed #3a3860", borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 12, color: "#8b9dc3", lineHeight: 1.6 }}>💡 {selectedScenario.hint}</div>
                <textarea value={userAnswer} onChange={e => setUserAnswer(e.target.value)} placeholder="お客様へのテキスト鑑定文をここに書いてください…"
                  style={{ width: "100%", minHeight: 160, background: "#0d0d1a", border: "1px solid #2a2040", borderRadius: 10, padding: 12, color: "#e8e0d0", fontSize: 13, lineHeight: 1.8, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", outline: "none", marginBottom: 6 }}
                  onFocus={e => e.target.style.borderColor = "#c9a84c"} onBlur={e => e.target.style.borderColor = "#2a2040"}
                />
                <div style={{ textAlign: "right", fontSize: 11, color: "#6b6058", marginBottom: 14 }}>{userAnswer.length}文字</div>
                <button onClick={() => setPhase("check")} disabled={!userAnswer.trim()} style={{
                  width: "100%", padding: "13px",
                  background: userAnswer.trim() ? "linear-gradient(135deg, #c9a84c, #a07830)" : "#1a1535",
                  border: "none", borderRadius: 10, color: userAnswer.trim() ? "#0d0d1a" : "#4a4060",
                  fontSize: 14, fontWeight: 700, cursor: userAnswer.trim() ? "pointer" : "not-allowed"
                }}>次へ：自己チェック →</button>
              </div>
            )}

            {phase === "check" && selectedScenario && (
              <div style={{ paddingTop: 16 }}>
                {stepBar(1)}
                <div style={{ fontSize: 13, color: "#c8c0b0", marginBottom: 12, lineHeight: 1.7 }}>自分の鑑定文を見ながら、該当するものにチェックを入れてください。</div>
                <details style={{ marginBottom: 14 }}>
                  <summary style={{ cursor: "pointer", fontSize: 12, color: "#8b8070", padding: "8px 0" }}>📝 自分の鑑定文を確認する</summary>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 12, fontSize: 13, lineHeight: 1.8, color: "#c8c0b0", borderLeft: "3px solid #2a2040", marginTop: 8 }}>{userAnswer}</div>
                </details>
                <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
                  {selectedScenario.rubric.map((r, i) => (
                    <button key={i} onClick={() => toggleCheck(i)} style={{
                      width: "100%", textAlign: "left", padding: "14px 16px",
                      background: checkedItems.includes(i) ? "rgba(201,168,76,0.08)" : "transparent",
                      border: "none", borderBottom: i < selectedScenario.rubric.length - 1 ? "1px solid #1a1535" : "none",
                      cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start"
                    }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, border: `2px solid ${checkedItems.includes(i) ? "#c9a84c" : "#3a3060"}`, background: checkedItems.includes(i) ? "#c9a84c" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#0d0d1a", fontWeight: 700, marginTop: 1 }}>
                        {checkedItems.includes(i) ? "✓" : ""}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: checkedItems.includes(i) ? "#c9a84c" : "#c8c0b0", marginBottom: 3 }}>{r.text}</div>
                        <div style={{ fontSize: 11, color: "#6b6058", lineHeight: 1.5 }}>{r.tip}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 10, padding: 12, marginBottom: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#8b8070", marginBottom: 4 }}>現在のスコア</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#c9a84c" }}>{checkedItems.length} / {selectedScenario.rubric.length}</div>
                  <ScoreBar score={currentScore} />
                </div>
                <button onClick={submitSelfCheck} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg, #c9a84c, #a07830)", border: "none", borderRadius: 10, color: "#0d0d1a", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>結果と模範解答を見る →</button>
              </div>
            )}

            {phase === "result" && selectedScenario && (
              <div style={{ paddingTop: 16 }}>
                {stepBar(2)}
                <div style={{ background: "linear-gradient(135deg, #1a1530, #160d20)", border: "1px solid #c9a84c", borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#8b8070", marginBottom: 6, letterSpacing: "0.15em" }}>スコア</div>
                  <div style={{ fontSize: 52, fontWeight: 700, color: "#c9a84c", textShadow: "0 0 30px rgba(201,168,76,0.4)" }}>{currentScore}</div>
                  <div style={{ fontSize: 13, color: "#8b8070" }}>/ 100点</div>
                  <ScoreBar score={currentScore} />
                  <div style={{ fontSize: 13, color: "#9a9080", marginTop: 10 }}>
                    {currentScore >= 80 ? "🎉 素晴らしい鑑定文です！" : currentScore >= 60 ? "✨ 良い鑑定文です。もう少し！" : currentScore >= 40 ? "💡 基礎はできています。模範解答を参考に。" : "🌱 まずは模範解答をしっかり読んでみましょう。"}
                  </div>
                </div>
                <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#8b9dc3", marginBottom: 10 }}>📋 チェック結果</div>
                  {selectedScenario.rubric.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>{checkedItems.includes(i) ? "✅" : "❌"}</span>
                      <span style={{ fontSize: 13, color: checkedItems.includes(i) ? "#c8c0b0" : "#6b6058", lineHeight: 1.5 }}>{r.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "#c9a84c", marginBottom: 10 }}>💡 プロの鑑定のコツ</div>
                  {selectedScenario.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#c9a84c", fontSize: 10, marginTop: 3 }}>▸</span>
                      <span style={{ fontSize: 12, color: "#9a9080", lineHeight: 1.6 }}>{tip}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#100d1a", border: "1px solid #2a2040", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: "#8b9dc3", marginBottom: 10 }}>📖 模範解答</div>
                  <div style={{ fontSize: 13, lineHeight: 1.9, color: "#c8c0b0", borderLeft: "3px solid #8b9dc3", paddingLeft: 12 }}>{selectedScenario.sampleAnswer}</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { setPhase("write"); setCheckedItems([]); setUserAnswer(""); }} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid #2a2040", borderRadius: 10, color: "#8b8070", fontSize: 13, cursor: "pointer" }}>↩ もう一度</button>
                  <button onClick={() => { reset(); setTab("history"); }} style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #c9a84c, #a07830)", border: "none", borderRadius: 10, color: "#0d0d1a", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>📊 成長記録を見る</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
