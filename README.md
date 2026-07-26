# Framework Automation QA - Engineering Take Home Test

## Gambaran Umum

Repository ini berisi framework automation yang dibuat untuk kebutuhan **QA Automation Engineer Take Home Test**.

Framework ini mencakup:

- Automation pengujian Web UI
- Automation pengujian REST API
- Skenario pengujian positif dan negatif
- Validasi kontrak response API (schema validation)
- Pengelolaan test data
- Integrasi dengan CI pipeline
- Pembuatan laporan hasil automation test


# Aplikasi yang Diuji (Application Under Test / AUT)

Karena tidak terdapat aplikasi internal yang diberikan, automation ini menggunakan aplikasi publik yang stabil sebagai target pengujian.


## Aplikasi UI

**SauceDemo**

URL:
https://www.saucedemo.com

Tujuan: Mensimulasikan pengujian alur pengguna pada aplikasi e-commerce.


Skenario yang diuji:

- Login menggunakan user valid
- Validasi login menggunakan user tidak valid
- Pemilihan produk
- Menambahkan produk ke keranjang
- Proses checkout
- Validasi penyelesaian order

## Aplikasi API

**Restful Booker API**

URL:
https://restful-booker.herokuapp.com


Tujuan:

Mensimulasikan pengujian REST API untuk sistem manajemen booking.


Skenario yang diuji:

- Mengambil daftar booking
- Membuat booking baru
- Validasi payload tidak valid
  
# Teknologi yang Digunakan

Bahasa Pemrograman : JavaScript
Automation Framework : Playwright
API Testing : Playwright APIRequest
Design Pattern : Page Object Model
CI/CD : GitHub Actions
Runtime : Node.js 26.1.1

# Rencana Pengujian

# Prioritas Pengujian

Fokus utama pengujian adalah memastikan fungsi bisnis utama berjalan dengan stabil.

Prioritas:
- Validasi authentication flow pada UI.
- Validasi proses utama pengguna seperti checkout.
- Validasi API utama seperti create dan retrieve booking.
- Validasi error handling dan input validation.


# Teknik Desain Test

Teknik yang digunakan:

- Page Object Model (POM) untuk UI automation agar struktur test mudah dipelihara.
- Data Driven Testing untuk menjalankan scenario dengan variasi data.
- Positive dan Negative Testing untuk memastikan sistem menangani kondisi berhasil maupun gagal.
- Schema Validation untuk memastikan kontrak response API tetap sesuai.


# Konsistensi Data dan Environment

Untuk memastikan test dapat dijalankan berulang dengan hasil yang sama:

- Test data dipisahkan dari test logic menggunakan file JSON.
- Setiap test dibuat independen dan tidak bergantung pada hasil test lain.
- Konfigurasi environment dikelola melalui Playwright configuration.
- Dependency dan runtime version dikunci melalui package.json dan package-lock.json.
- CI pipeline menggunakan environment yang sama setiap kali test dijalankan.
