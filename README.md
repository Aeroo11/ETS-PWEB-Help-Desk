# Help Desk Web — ETS Pemrograman Web

Situs pusat bantuan (help center) bertema layanan streaming, dibuat sebagai tugas
**Evaluasi Tengah Semester (ETS) mata kuliah Pemrograman Web**.

> Proyek akademik, tidak berafiliasi dengan merek mana pun.

## Fitur
- **Beranda** dengan navigasi ke semua halaman bantuan
- **FAQ** interaktif (accordion) — `faq.html`, `js/faq.js`
- **Form kontak** dengan validasi sisi klien — `contact.html`, `js/validation.js`
- **Lacak tiket bantuan** — `track.html`, `js/tickets.js`
- Dua tema visual: *earth tone* dan efek *horror*

## Teknologi
HTML5 · CSS3 · JavaScript (vanilla), tanpa framework dan tanpa build step.

## Cara menjalankan
Buka `index.html` langsung di browser, atau:
```bash
python -m http.server 8000   # lalu buka http://localhost:8000
```

## Struktur
```
├── index.html      # beranda
├── faq.html        # FAQ
├── contact.html    # form kontak
├── track.html      # lacak tiket
├── css/            # style.css, earth-tone.css, horror-effects.css
└── js/             # main.js, faq.js, validation.js, tickets.js
```
