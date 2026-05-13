# 🤖 AI Product Agent — คู่มือติดตั้งและใช้งาน

## สิ่งที่ต้องมี (ทั้งหมดฟรี)

| สิ่ง | ที่ไหน | ฟรีไหม |
|------|--------|---------|
| Anthropic API Key | console.anthropic.com | ✅ ฟรี $5 credit แรก |
| GitHub Account | github.com | ✅ ฟรี |
| Vercel Account | vercel.com | ✅ ฟรีตลอด |

---

## ขั้นตอนที่ 1 — สมัคร Anthropic API Key

1. เปิด **https://console.anthropic.com**
2. กด **Sign Up** → สมัครด้วย Email หรือ Google
3. ยืนยัน Email
4. ไปที่เมนู **API Keys** → กด **Create Key**
5. **Copy key** ที่ขึ้นต้นด้วย `sk-ant-...` เก็บไว้ (จะเห็นครั้งเดียว!)

> 💡 Anthropic ให้ $5 credit ฟรีสำหรับผู้ใช้ใหม่ — เพียงพอสำหรับการใช้งานหลายร้อยครั้ง

---

## ขั้นตอนที่ 2 — Upload โค้ดขึ้น GitHub

### วิธีที่ 1: ใช้เว็บ GitHub (ง่ายสุด ไม่ต้อง Terminal)

1. เปิด **https://github.com** → Sign Up / Login
2. กด **"New Repository"** (ปุ่มสีเขียว)
3. ตั้งชื่อ: `ai-product-agent`
4. เลือก **Public** → กด **Create Repository**
5. กด **"uploading an existing file"**
6. **ลากไฟล์ทั้งหมด** จากโฟลเดอร์ที่ดาวน์โหลดมาวาง
   - อย่าลืม: `pages/`, `package.json`, `next.config.js`, `.gitignore`
   - **ห้าม** upload `.env.local` (มี API key)
7. กด **Commit changes**

### วิธีที่ 2: ใช้ Terminal (ถ้าถนัด)

```bash
cd ai-product-agent
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-product-agent.git
git push -u origin main
```

---

## ขั้นตอนที่ 3 — Deploy บน Vercel (ฟรี)

1. เปิด **https://vercel.com** → Sign Up ด้วย GitHub account
2. กด **"Add New Project"**
3. เลือก repository **ai-product-agent** → กด **Import**
4. ในหน้า Configure:
   - Framework Preset: **Next.js** (จะ detect อัตโนมัติ)
   - กด **"Environment Variables"** → เพิ่ม:
     ```
     Name:  ANTHROPIC_API_KEY
     Value: sk-ant-xxxxxxxxxxxx (key ที่ copy ไว้)
     ```
5. กด **Deploy** 🚀
6. รอ 1-2 นาที → ได้ URL เช่น `https://ai-product-agent-xxx.vercel.app`

> ✅ เปิดใช้งานได้เลย! บนมือถือหรือคอมก็ได้

---

## ขั้นตอนที่ 4 — ทดสอบใช้งาน

1. เปิด URL จาก Vercel
2. ใส่ชื่อสินค้า + รายละเอียด
3. เลือก Mood & Platform
4. กด **Generate** — รอประมาณ 15-30 วินาที
5. ได้ Creative Brief ครบชุด! 🎉

---

## แก้ปัญหาที่พบบ่อย

| ปัญหา | วิธีแก้ |
|-------|---------|
| Deploy ไม่ผ่าน | ตรวจสอบว่า upload ไฟล์ `package.json` และ `pages/` ครบ |
| ขึ้น "API key not configured" | ไปที่ Vercel → Settings → Environment Variables → เพิ่ม key ใหม่ → Redeploy |
| ขึ้น "401 Unauthorized" | API Key ผิด หรือหมดอายุ → สร้าง key ใหม่ใน console.anthropic.com |
| ผลลัพธ์ไม่ออก | ตรวจสอบ credit ใน Anthropic Console — ถ้าหมดให้เติม |

---

## ค่าใช้จ่าย

| บริการ | ค่าใช้จ่าย |
|--------|-----------|
| Vercel Hosting | **ฟรี** (Hobby plan) |
| GitHub | **ฟรี** |
| Anthropic API | ~$0.003 ต่อ 1 ครั้ง (ฟรี $5 แรก = ~1,600 ครั้ง) |

---

## ต้องการความช่วยเหลือ?

ถามได้เลยใน Claude.ai ครับ 🙌
