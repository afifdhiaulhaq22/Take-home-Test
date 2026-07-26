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
