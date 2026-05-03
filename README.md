# COMS Mobile App

Aplikasi mobile untuk sistem **C.O.M.S (Canteen Occupancy Monitoring System)**. Memungkinkan mahasiswa memantau kepadatan kantin kampus secara real-time langsung dari smartphone, mendapatkan rekomendasi kantin terdekat berdasarkan lokasi, serta menerima notifikasi saat kantin favorit tidak ramai.

## Cara Kerja

Aplikasi terhubung ke backend COMS melalui REST API. Lokasi pengguna digunakan untuk merekomendasikan kantin terdekat. Notifikasi push dikirim ketika jumlah pengunjung kantin favorit turun di bawah ambang batas yang ditentukan pengguna.

## Stack

- **Expo + React Native**
- **React Navigation** (stack + bottom tabs)
- **NativeWind** untuk styling
- **Expo Location** untuk akses GPS
- **Expo Notifications** untuk push notification
- **React Native Maps** untuk peta kantin
- **Axios + AsyncStorage**

## Requirements

- Node.js 18+
- npm
- Expo CLI (`npm install -g expo-cli`)
- Aplikasi **Expo Go** di HP (untuk development), atau
- **EAS CLI** (`npm install -g eas-cli`) untuk build APK

## Instalasi & Menjalankan Lokal

```bash
npm install
cp .env.example .env
# Isi EXPO_PUBLIC_API_URL di .env
npm start
```

Scan QR code menggunakan aplikasi **Expo Go** di Android/iOS, atau tekan `a` untuk emulator Android / `i` untuk simulator iOS.

## Environment Variables

| Variable | Keterangan |
|----------|------------|
| `EXPO_PUBLIC_API_URL` | URL base API backend, contoh: `https://web-production-e34ad.up.railway.app/api` |

## Deploy

Aplikasi mobile di-distribusikan melalui **Expo Application Services (EAS)**.

**Link Build Terbaru (Android APK):**
https://expo.dev/accounts/matthew12-t/projects/coms_frontend_mobile/builds/8d3fc7fa-a249-4b46-b08b-1082e1bd0dd0
