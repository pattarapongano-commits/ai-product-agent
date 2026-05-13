import { useState, useRef } from "react";
import Head from "next/head";

// ─── CONSTANTS ────────────────────────────────────────────────
const MOODS = [
  { id: "luxury",       label: "Luxury / High-end",   emoji: "💎", color: "#c9a84c" },
  { id: "lifestyle",    label: "Lifestyle / Natural",  emoji: "🌿", color: "#5a8a5e" },
  { id: "energetic",    label: "Energetic / Sport",    emoji: "⚡", color: "#e84545" },
  { id: "minimal",      label: "Minimal / Clean",      emoji: "◻️", color: "#888"    },
  { id: "playful",      label: "Playful / Fun",        emoji: "🎉", color: "#f5a623" },
  { id: "professional", label: "Professional / Corp",  emoji: "💼", color: "#2c5f8a" },
];

const PLATFORMS = [
  { id: "tiktok",    label: "TikTok",          icon: "🎵" },
  { id: "instagram", label: "Instagram Reels", icon: "📸" },
  { id: "facebook",  label: "Facebook",        icon: "👥" },
  { id: "lazada",    label: "Lazada / Shopee", icon: "🛒" },
  { id: "line",      label: "LINE OA",         icon: "💬" },
];

const CHARACTER_PRESETS = [
  "สาวไทย อายุ 20-25 ปี หน้าตาดี สดใส",
  "หนุ่มฟิตเนส กล้ามเนื้อดี ดูแลตัวเอง",
  "คุณแม่บ้าน อายุ 30-40 ปี ดูน่าเชื่อถือ",
  "นักธุรกิจมืออาชีพ สูทสวย ดูมั่นใจ",
  "ศิลปิน/อินฟลูฯ สไตล์โมเดิร์น เก๋",
  "คู่รัก ดูแฮปปี้ ไลฟ์สไตล์ดี",
];

const MOOD_DESC = {
  luxury:       "แสงนุ่ม โทนทอง/ครีม บรรยากาศพรีเมียม high-end editorial",
  lifestyle:    "แสงธรรมชาติ สีเขียว/ครีม ดูออร์แกนิค authentic",
  energetic:    "สีสันจัด คอนทราสต์สูง dynamic motion blur",
  minimal:      "พื้นขาว/เทา clean lines สะอาดตา Scandinavian",
  playful:      "สีสดใส ลูกเล่นเยอะ Gen-Z aesthetic fun",
  professional: "สีน้ำเงิน/เทา ดูน่าเชื่อถือ corporate clean",
};

// ─── PROMPT BUILDER ───────────────────────────────────────────
function buildPrompt(data) {
  const mood = MOODS.find((m) => m.id === data.mood);
  const platforms = (data.platforms || []).join(", ");
  return `
คุณคือ AI Marketing Creative Director ผู้เชี่ยวชาญด้าน Product Photography, Influencer Content และ Affiliate Marketing ในตลาดไทย

## สินค้า & โจทย์
- **ชื่อสินค้า**: ${data.productName || "ไม่ระบุ"}
- **รายละเอียด**: ${data.productDesc || "ไม่ระบุ"}
- **ราคา**: ${data.price || "ไม่ระบุ"}
- **Affiliate Link**: ${data.affiliateLink || "ไม่ระบุ"}

## Visual Direction
- **Mood & Tone**: ${mood?.label} — ${MOOD_DESC[data.mood] || ""}
- **Character/พรีเซนเตอร์**: ${data.character || "ไม่ระบุ"}
- **สถานที่/ฉาก**: ${data.place || "ไม่ระบุ"}
- **Platform เป้าหมาย**: ${platforms || "ทั่วไป"}

## งานที่ต้องการ

### 1. 🖼️ IMAGE PROMPTS (ภาษาอังกฤษ สำหรับ Midjourney / Stable Diffusion)
สร้าง 3 prompt ที่แตกต่างกัน:
- **Hero Shot**: สินค้า + พรีเซนเตอร์ในฉากหลัก
- **Lifestyle Shot**: การใช้งานจริงในชีวิตประจำวัน
- **Close-up / Detail Shot**: เน้นรายละเอียดสินค้า + expression ของพรีเซนเตอร์

### 2. 🎬 VIDEO SCRIPT (สคริปต์คลิปสั้น 15-30 วินาที)
เขียนเป็น Scene-by-Scene:
- Hook (3 วิ): ดึงดูดทันที
- Problem/Desire (5 วิ): สร้าง pain point หรือความต้องการ
- Solution = สินค้า (10 วิ): โชว์สินค้า + ประโยชน์
- CTA + Affiliate (5 วิ): call-to-action ชัดเจน

### 3. 📝 CAPTION / POST COPY
เขียน 2 เวอร์ชัน:
- **Hook version**: ขึ้นต้นด้วย hook แรง สำหรับ TikTok/Reels
- **SEO version**: รายละเอียดครบ สำหรับ Marketplace/Facebook

### 4. #️⃣ HASHTAGS
Trending hashtags ไทย + อังกฤษ รวม 20 แท็ก แยกตาม platform

### 5. 🎯 AFFILIATE CTA SCRIPTS
เขียน CTA 3 แบบ: soft / medium / hard sell ใส่ affiliate link อย่างเป็นธรรมชาติ

### 6. 💡 PRODUCTION TIPS
เทคนิคถ่าย/ตัดต่อสำหรับ ${platforms} โดยเฉพาะ

ตอบเป็น Markdown ใช้ emoji ประกอบ ภาษาไทยเป็นหลัก prompt รูปภาพให้เป็นภาษาอังกฤษ
  `.trim();
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────
function UploadBox({ label, icon, value, onChange }) {
  const ref = useRef();
  const preview = value ? URL.createObjectURL(value) : null;
  return (
    <div onClick={() => ref.current.click()} style={{
      border: value ? "2px solid #a78bfa" : "2px dashed #444",
      borderRadius: 14, padding: "16px 10px", textAlign: "center",
      cursor: "pointer", background: value ? "#a78bfa11" : "#ffffff05",
      transition: "all .2s", minHeight: 110,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={onChange} />
      {preview
        ? <><img src={preview} alt="" style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 8 }} /><span style={{ fontSize: 11, color: "#a78bfa" }}>✓ คลิกเพื่อเปลี่ยน</span></>
        : <><span style={{ fontSize: 26 }}>{icon}</span><span style={{ fontSize: 12, color: "#aaa", fontWeight: 700 }}>{label}</span><span style={{ fontSize: 10, color: "#555" }}>คลิกเพื่ออัปโหลด</span></>
      }
    </div>
  );
}

function Tag({ active, onClick, children, color = "#a78bfa" }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 12px", borderRadius: 999,
      border: active ? `2px solid ${color}` : "2px solid #333",
      background: active ? `${color}22` : "transparent",
      color: active ? color : "#888", fontSize: 12, fontWeight: 700, cursor: "pointer",
    }}>{children}</button>
  );
}

function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const el = document.createElement("textarea");
    el.value = typeof children === "string" ? children : "";
    document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ background: "#111", border: "1px solid #222", borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{
        padding: "13px 16px", display: "flex", justifyContent: "space-between",
        alignItems: "center", cursor: "pointer", background: "#161616",
      }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#e0e0e0" }}>{title}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={e => { e.stopPropagation(); copy(); }} style={{
            background: "transparent", border: "1px solid #333", borderRadius: 6,
            color: copied ? "#22c55e" : "#666", fontSize: 11, padding: "2px 8px", cursor: "pointer",
          }}>{copied ? "✓" : "Copy"}</button>
          <span style={{ color: "#555" }}>{open ? "▾" : "▸"}</span>
        </div>
      </div>
      {open && <div style={{ padding: "14px 16px" }}>{children}</div>}
    </div>
  );
}

function ResultText({ text }) {
  if (!text) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />;
        if (line.startsWith("### ")) return (
          <div key={i} style={{ fontSize: 15, fontWeight: 800, color: "#a78bfa", marginTop: 14 }}>
            {line.replace("### ", "")}
          </div>
        );
        if (line.startsWith("## ")) return (
          <div key={i} style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", letterSpacing: 1, marginTop: 10 }}>
            {line.replace("## ", "").toUpperCase()}
          </div>
        );
        if (line.startsWith("- ") || line.startsWith("• ")) return (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#ccc", lineHeight: 1.65 }}>
            <span style={{ color: "#7c3aed", flexShrink: 0 }}>›</span>
            <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e8e8e8">$1</strong>') }} />
          </div>
        );
        if (line.startsWith("**") && line.endsWith("**")) return (
          <div key={i} style={{ fontWeight: 800, color: "#a78bfa", fontSize: 13, marginTop: 8 }}>
            {line.replace(/\*\*/g, "")}
          </div>
        );
        // Detect image prompts (English lines)
        if (/^[A-Z"(]/.test(line.trim()) && line.length > 40) return (
          <div key={i} style={{
            background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 8,
            padding: "9px 12px", fontSize: 12, color: "#86efac", fontFamily: "monospace", lineHeight: 1.6, marginTop: 4,
          }}>{line}</div>
        );
        return (
          <div key={i} style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7 }}
            dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e0e0e0">$1</strong>') }} />
        );
      })}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function Home() {
  const [step, setStep] = useState(0); // 0=upload 1=config 2=review 3=result
  const [data, setData] = useState({
    productImage: null, humanImage: null, placeImage: null,
    productName: "", productDesc: "", price: "", affiliateLink: "",
    mood: "lifestyle", character: "", place: "",
    platforms: ["tiktok", "instagram"],
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const togglePlatform = id =>
    set("platforms", data.platforms.includes(id)
      ? data.platforms.filter(p => p !== id)
      : [...data.platforms, id]);

  const generate = async () => {
    setStep(3); setLoading(true); setError(""); setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt(data) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setResult(json.result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = ["📦 Upload", "🎨 ตั้งค่า", "✍️ รีวิว", "🚀 ผลลัพธ์"];
  const pct = ((step + 1) / steps.length) * 100;

  return (
    <>
      <Head>
        <title>AI Product Agent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e0e0e0", fontFamily: "'Noto Sans Thai', system-ui, sans-serif", paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ background: "#0d0019", borderBottom: "1px solid #1a1a1a", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>AI Product Agent</div>
                <div style={{ fontSize: 10, color: "#666" }}>Affiliate Marketing Creator</div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ height: 3, background: "#222", borderRadius: 99, marginBottom: 12 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius: 99, transition: "width .4s" }} />
            </div>
            {/* Step tabs */}
            <div style={{ display: "flex", gap: 4 }}>
              {steps.map((s, i) => (
                <button key={i} onClick={() => step < 3 && setStep(i)} style={{
                  flex: 1, padding: "5px 2px", borderRadius: 7, border: "none",
                  background: step === i ? "#7c3aed22" : "transparent",
                  color: step === i ? "#a78bfa" : "#444", fontSize: 10, fontWeight: 700, cursor: "pointer",
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 560, margin: "0 auto", padding: "22px 16px" }}>

          {/* ── STEP 0: UPLOAD ── */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0 }}>อัปโหลดข้อมูลสินค้า</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <UploadBox label="🛍️ รูปสินค้า*" icon="📦" value={data.productImage} onChange={e => set("productImage", e.target.files[0])} />
                <UploadBox label="👤 รูป Model" icon="🙋" value={data.humanImage} onChange={e => set("humanImage", e.target.files[0])} />
              </div>
              <UploadBox label="🏞️ รูปสถานที่/ฉาก (ถ้ามี)" icon="📍" value={data.placeImage} onChange={e => set("placeImage", e.target.files[0])} />

              {[
                { k: "productName", label: "ชื่อสินค้า *", ph: "เช่น เซรั่มวิตามินซี, รองเท้าวิ่ง Nike...", type: "text" },
                { k: "productDesc", label: "รายละเอียดสินค้า", ph: "จุดเด่น ส่วนผสม ประโยชน์...", type: "textarea" },
              ].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: 11, color: "#777", fontWeight: 700, display: "block", marginBottom: 5 }}>{f.label}</label>
                  {f.type === "textarea"
                    ? <textarea value={data[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.ph} rows={3} style={iS} />
                    : <input value={data[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.ph} style={iS} />
                  }
                </div>
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { k: "price", label: "ราคา", ph: "฿XXX" },
                  { k: "affiliateLink", label: "Affiliate Link", ph: "https://..." },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize: 11, color: "#777", fontWeight: 700, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input value={data[f.k]} onChange={e => set(f.k, e.target.value)} placeholder={f.ph} style={iS} />
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(1)} disabled={!data.productName} style={btn(!data.productName)}>
                ถัดไป — ตั้งค่า Visual →
              </button>
            </div>
          )}

          {/* ── STEP 1: CONFIG ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0 }}>ตั้งค่า Visual & Platform</h2>

              <div>
                <label style={{ fontSize: 11, color: "#777", fontWeight: 800, letterSpacing: 1, display: "block", marginBottom: 10 }}>🎨 MOOD & TONE</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {MOODS.map(m => (
                    <button key={m.id} onClick={() => set("mood", m.id)} style={{
                      padding: "11px 12px", borderRadius: 11, textAlign: "left", cursor: "pointer",
                      border: data.mood === m.id ? `2px solid ${m.color}` : "2px solid #222",
                      background: data.mood === m.id ? `${m.color}18` : "#111",
                      color: data.mood === m.id ? "#fff" : "#666",
                    }}>
                      <div style={{ fontSize: 18, marginBottom: 2 }}>{m.emoji}</div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#777", fontWeight: 800, letterSpacing: 1, display: "block", marginBottom: 8 }}>👤 CHARACTER / PRESENTER</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                  {CHARACTER_PRESETS.map(c => (
                    <Tag key={c} active={data.character === c} onClick={() => set("character", data.character === c ? "" : c)}>
                      {c.split(" ").slice(0, 3).join(" ")}
                    </Tag>
                  ))}
                </div>
                <input value={data.character} onChange={e => set("character", e.target.value)}
                  placeholder="หรือพิมพ์เองได้..." style={iS} />
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#777", fontWeight: 800, letterSpacing: 1, display: "block", marginBottom: 6 }}>📍 PLACE / SCENE</label>
                <input value={data.place} onChange={e => set("place", e.target.value)}
                  placeholder="เช่น คาเฟ่ริมทะเล, สตูดิโอสีขาว..." style={iS} />
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#777", fontWeight: 800, letterSpacing: 1, display: "block", marginBottom: 8 }}>📱 PLATFORM เป้าหมาย</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {PLATFORMS.map(p => (
                    <Tag key={p.id} active={data.platforms.includes(p.id)} onClick={() => togglePlatform(p.id)}>
                      {p.icon} {p.label}
                    </Tag>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(0)} style={backBtn}>← กลับ</button>
                <button onClick={() => setStep(2)} style={{ ...btn(false), flex: 1 }}>ถัดไป — รีวิว →</button>
              </div>
            </div>
          )}

          {/* ── STEP 2: REVIEW ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0 }}>รีวิวก่อน Generate</h2>

              {[
                ["สินค้า", data.productName],
                ["รายละเอียด", data.productDesc || "—"],
                ["ราคา", data.price || "—"],
                ["Affiliate Link", data.affiliateLink || "—"],
                ["Mood", MOODS.find(m => m.id === data.mood)?.label],
                ["Character", data.character || "—"],
                ["สถานที่", data.place || "—"],
                ["Platform", data.platforms.join(", ") || "—"],
                ["รูปสินค้า", data.productImage ? "✓ อัปโหลดแล้ว" : "ไม่มี"],
                ["รูปมนุษย์", data.humanImage ? "✓ อัปโหลดแล้ว" : "ไม่มี"],
                ["รูปสถานที่", data.placeImage ? "✓ อัปโหลดแล้ว" : "ไม่มี"],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #1a1a1a", fontSize: 13 }}>
                  <span style={{ color: "#666" }}>{k}</span>
                  <span style={{ color: "#e0e0e0", fontWeight: 600, maxWidth: "60%", textAlign: "right", wordBreak: "break-all" }}>{v}</span>
                </div>
              ))}

              <div style={{ background: "#0d1117", border: "1px solid #7c3aed44", borderRadius: 12, padding: 14, marginTop: 4 }}>
                <div style={{ fontSize: 12, color: "#a78bfa", fontWeight: 800, marginBottom: 8 }}>🚀 AI จะสร้าง:</div>
                {["3× Image Prompts (Midjourney/SD ready)", "Video Script 15-30 วิ แบบ Scene-by-Scene", "Caption + Hashtags ครบชุด", "Affiliate CTA 3 เวอร์ชัน", "Production Tips เฉพาะ Platform"].map((t, i) => (
                  <div key={i} style={{ fontSize: 12, color: "#aaa", marginBottom: 5, display: "flex", gap: 7 }}>
                    <span style={{ color: "#7c3aed" }}>✦</span>{t}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(1)} style={backBtn}>← กลับ</button>
                <button onClick={generate} style={{ ...btn(false), flex: 1, fontSize: 14 }}>🤖 Generate Creative Brief</button>
              </div>
            </div>
          )}

          {/* ── STEP 3: RESULTS ── */}
          {step === 3 && (
            <div>
              {loading && (
                <div style={{ textAlign: "center", padding: "50px 0", color: "#a78bfa" }}>
                  <div style={{ fontSize: 44, animation: "spin 1.5s linear infinite", display: "inline-block" }}>⚙️</div>
                  <p style={{ fontSize: 15, fontWeight: 800, marginTop: 16 }}>AI กำลังสร้าง Creative Brief...</p>
                  <p style={{ fontSize: 12, color: "#555" }}>ใช้เวลาประมาณ 15-30 วินาที</p>
                </div>
              )}

              {error && (
                <div style={{ background: "#2d0a0a", border: "1px solid #ef4444", borderRadius: 14, padding: 18, color: "#f87171" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>⚠️ เกิดข้อผิดพลาด</div>
                  <div style={{ fontSize: 12, color: "#fca5a5", marginBottom: 14, lineHeight: 1.6 }}>{error}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={generate} style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🔄 ลองใหม่</button>
                    <button onClick={() => setStep(2)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #555", background: "transparent", color: "#aaa", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← กลับ</button>
                  </div>
                </div>
              )}

              {result && (
                <>
                  <div style={{ background: "linear-gradient(135deg,#1a0a2e,#2d1b69)", borderRadius: 14, padding: "18px 20px", border: "1px solid #a78bfa44", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 800, letterSpacing: 2 }}>CREATIVE BRIEF READY ✓</div>
                      <div style={{ fontSize: 17, fontWeight: 800, marginTop: 4 }}>{data.productName}</div>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(result); }} style={{
                      background: "#7c3aed", color: "#fff", border: "none", borderRadius: 10,
                      padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                    }}>📋 Copy All</button>
                  </div>

                  <Section title="ทั้งหมด (ดูผลลัพธ์)">
                    <ResultText text={result} />
                  </Section>

                  <button onClick={() => { setStep(0); setResult(""); setData(d => ({ ...d, productImage: null, humanImage: null, placeImage: null })); }} style={{ ...backBtn, width: "100%", marginTop: 8 }}>
                    ← สร้างใหม่
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { background: #0a0a0a; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────
const iS = {
  width: "100%", background: "#111", border: "1px solid #2a2a2a",
  borderRadius: 10, padding: "10px 13px", color: "#e0e0e0",
  fontSize: 13, outline: "none", fontFamily: "inherit",
};

const btn = disabled => ({
  width: "100%", padding: "13px 18px", borderRadius: 11, border: "none",
  background: disabled ? "#222" : "linear-gradient(135deg,#7c3aed,#a78bfa)",
  color: disabled ? "#444" : "#fff", fontSize: 13, fontWeight: 800,
  cursor: disabled ? "not-allowed" : "pointer",
});

const backBtn = {
  padding: "11px 18px", borderRadius: 11, border: "1px solid #2a2a2a",
  background: "transparent", color: "#777", fontSize: 13, fontWeight: 700, cursor: "pointer",
};
