# PromptLab

Playground interaktif untuk belajar dan bereksperimen dengan teknik prompt engineering. Tulis, uji, dan bandingkan prompt secara real-time menggunakan OpenAI API.

## Fitur

- **6 Teknik Prompting** — Zero-Shot, Few-Shot, Chain-of-Thought, Role Prompting, Output Formatting, dan Temperature Comparison
- **Streaming Response** — hasil AI muncul secara real-time dengan animated cursor
- **Prompt Preview** — lihat prompt final yang dikirim ke API sebelum menjalankannya
- **Temperature Comparison** — bandingkan respons pada suhu 0.0, 0.5, dan 1.0 secara side-by-side
- **Prompt History** — riwayat prompt tersimpan di localStorage, lengkap dengan token count dan estimasi biaya
- **Token Counter** — hitung jumlah token dan perkiraan harga setiap prompt
- **Panduan Teknik** — penjelasan dan tips untuk setiap teknik prompting
- **Konfigurasi API** — masukkan OpenAI API key dan pilih model langsung dari UI

## Tech Stack

- [Next.js 16](https://nextjs.org) — App Router + Server Actions
- [OpenAI SDK](https://github.com/openai/openai-node) — streaming & chat completions
- [Zustand](https://zustand-demo.pmnd.rs) — state management dengan localStorage persistence
- [Tailwind CSS v4](https://tailwindcss.com) — dark theme dengan aksen gradient ungu-cyan
- [react-markdown](https://github.com/remarkjs/react-markdown) — render respons markdown
- [js-tiktoken](https://github.com/dqbd/tiktoken) — token counting

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### 3. Konfigurasi API Key

Masukkan OpenAI API key langsung di UI melalui tombol **Settings** — tersimpan otomatis di localStorage.

> Atau buat `.env.local` jika ingin hardcode:
> ```env
> OPENAI_API_KEY=sk-...
> ```
