## ⚡ UI Transformer Generator v.2.5

AI-powered UI Generator menggunakan:
- ☁️ Cloudflare Workers + AI (Qwen, LLaMA, Mistral, Deepseek, dll)
- 🔐 Firebase Auth (Google Sign-In)
- 🔥 Firestore (role, plan, kuota)
- 💸 Midtrans + PayPal untuk pembayaran
- 🧠 Chatbot AI Customer Service
- 💎 UI Darky (Dark mode, GSAP animasi, TailwindCSS)

---

### 🚀 Fitur Utama

| Fitur | Keterangan |
|------|------------|
| 🎨 UI Generator | Generate HTML/CSS/JS/REACT/VUE dari prompt |
| 🤖 AI Chat CS | Chat dengan bot LYRA untuk bantu pengguna |
| 🔐 Login | Google Sign-In via Firebase Auth |
| 📦 Paket | Free / Medium / Advanced / Expert |
| 🔁 Kuota | Terbatas per model, berkurang tiap generate |
| 📤 Webhook | Terima pembayaran dari Midtrans & PayPal |
| 🛍️ Upgrade | Modal pricing untuk pilih paket dan bayar |
| 🌐 Serverless | Full Cloudflare Workers tanpa server backend |

---

### 🧰 Teknologi

- **Frontend**: Jekyll + Vanilla.js + GSAP + TailwindCSS CLI
- **Auth**: Firebase Auth (Google Sign-in)
- **Database**: Firestore (users & plan)
- **Backend**: Cloudflare Workers (Hono.js)
- **AI API**: Cloudflare AI (Workers AI)
- **Payment**:
  - Midtrans (Snap API)
  - PayPal (JavaScript SDK)

---

### 🗂️ Struktur Direktori

```bash
📁 public/               # Frontend jekyll static files
📁 src/
├─ index.ts              # Main worker endpoint
├─ verifyIdToken.ts      # Firebase ID Token verifier
├─ middlewareLimitFree.ts # Kuota limiter
├─ prompts.ts            # AI system prompts
├─ webhook/
│  ├─ midtrans.ts        # Webhook Midtrans
│  └─ paypal.ts          # Webhook PayPal
📁 _includes/             # UI komponen Jekyll
```

---

### 🛠️ Cara Deploy

#### 1. Konfigurasi Environment Variable di `wrangler.jsonc`

```toml
[vars]
FIREBASE_PROJECT_ID: "glitchlab-ai"
FIREBASE_CLIENT_EMAIL: "xxxx@xxxx.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_API_KEY: "AIza..."
MIDTRANS_SERVER_KEY: "SB-Mid-server-xxx"
PAYPAL_CLIENT_ID: "xxx"
PAYPAL_SECRET: "xxx"
```

#### 2. Build & Deploy ke Cloudflare

```bash
wrangler dev
wrangler deploy
```

---

### 📦 Paket Berbayar

| Paket    | Model AI                             | Kuota      | Harga     |
|----------|--------------------------------------|------------|-----------|
| Free     | Qwen 1.8B                            | 2x generate| Gratis    |
| Medium   | LLaMA 3B                             | 15         | Rp24.000  |
| Advanced | Mistral 7B                           | 25         | Rp38.000  |
| Expert   | Deepseek R1 Distill (Qwen-32B)       | 50         | Rp69.000  |

---

### 📄 Lisensi

MIT License © 2025 Daffa
