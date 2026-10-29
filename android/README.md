# Banshhata Foundation - Official Android Application

Official, lightweight, production-ready Android application for **Banshhata Foundation**
(*"মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই"*).

---

## 1. Core Architecture

- **Single Source of Truth**: The official Blogger website (`https://banshhatafoundation.blogspot.com/`) serves as the dynamic content layer.
- **Zero-Rebuild Updates**: Foundation administrators can update donations, notices, projects, reports, campaigns, and news on the Blogger website directly without republishing the Android application.
- **Offline Resilience**: Automatically falls back to local cache when offline and displays a clean retry screen.
- **Strictly No Ads**: 100% non-commercial, zero third-party ads or trackers.
- **Official Branding**: Sourced directly from the official Banshhata Foundation SVG emblem using deep emerald green (`#006C50`) and ruby red (`#EB1D27`).

---

## 2. Project Customization Guide

All foundation variables are centralized in one single file:
`app/src/main/java/org/banshhata/foundation/config/AppConfig.kt`

| Setting | Location in Project | Default Value |
| :--- | :--- | :--- |
| **Website URL** | `AppConfig.kt` (`WEBSITE_URL`) | `https://banshhatafoundation.blogspot.com/` |
| **Foundation Name** | `AppConfig.kt` & `strings.xml` | `Banshhata Foundation` / `বাঁশহাটা ফাউন্ডেশন` |
| **Slogan** | `AppConfig.kt` & `strings.xml` | `মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই` |
| **Messenger URL** | `AppConfig.kt` (`MESSENGER_URL`) | `https://www.facebook.com/BanshhataFoundation` |
| **Phone Number** | `AppConfig.kt` (`PHONE_NUMBER`) | `+8801939391339` |
| **Official SVG Logo** | `app/src/main/res/drawable/ic_foundation_logo.xml` | VectorDrawable from SVG |

---

## 3. How to Build the Project in Android Studio

### Prerequisites
1. Download & Install [Android Studio Hedgehog / Ladybug or newer](https://developer.android.com/studio).
2. Ensure JDK 17 is installed.

### Steps to Open
1. Unzip the downloaded project folder.
2. In Android Studio, click **File > Open** and select the unzipped directory.
3. Allow Gradle to synchronize dependencies.

### How to Build Debug APK (For Local Testing)
1. In Android Studio, go to the top menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
2. Once complete, click **locate** in the popup notification.
3. The APK will be located at:
   `app/build/outputs/apk/debug/app-debug.apk`
4. Install it on your Android phone via USB cable or share via WhatsApp/Drive.

### How to Build Release APK
1. Go to **Build > Generate Signed Bundle / APK**.
2. Select **APK** and click **Next**.
3. Create a new Keystore or choose your existing keystore file (`.jks`).
4. Select **release** build variant and click **Finish**.
5. The optimized release APK will be in:
   `app/build/outputs/apk/release/app-release.apk`

---

## 4. How to Build Signed AAB for Google Play Store

Google Play requires **Android App Bundle (.aab)** format:
1. Go to **Build > Generate Signed Bundle / APK**.
2. Select **Android App Bundle** and click **Next**.
3. Select your Keystore, enter password, key alias, and key password.
4. Select **release** variant and check **V1 and V2 signing**.
5. Click **Finish**.
6. The bundle file will be generated at:
   `app/build/outputs/bundle/release/app-release.aab`

---

## 5. Google Play Console Publishing Checklist

1. Sign in to [Google Play Console](https://play.google.com/console).
2. Click **Create App**:
   - App Name: `Banshhata Foundation`
   - Default Language: Bengali (`bn-BD`) or English (`en-US`)
   - App or Game: App
   - Free or Paid: Free
3. Complete **App Content declarations**:
   - Privacy Policy URL: `https://banshhatafoundation.blogspot.com/p/privacy-policy.html`
   - Ads: Select **No, my app does not contain ads**
   - Target Audience: 13+ / All ages
   - Data Safety: No personal data collected or shared.
4. Upload Graphics:
   - App Icon: 512 x 512 px PNG (exported from official SVG)
   - Feature Graphic: 1024 x 500 px
   - Phone Screenshots: 2 to 8 screenshots
5. Create a **Production Release**:
   - Upload `app-release.aab`
   - Add release notes in Bengali & English
   - Review and rollout!
