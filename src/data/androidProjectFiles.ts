export interface ProjectFile {
  path: string;
  category: 'config' | 'gradle' | 'manifest' | 'kotlin' | 'layout' | 'res' | 'docs';
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: ProjectFile[] = [
  {
    path: "build.gradle.kts",
    category: "gradle",
    description: "Root-level Gradle build configuration",
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("com.android.application") version "8.5.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.24" apply false
}
`
  },
  {
    path: "settings.gradle.kts",
    category: "gradle",
    description: "Gradle project settings and repository definitions",
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "BanshhataFoundation"
include(":app")
`
  },
  {
    path: "gradle.properties",
    category: "gradle",
    description: "Gradle JVM and AndroidX optimization flags",
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
`
  },
  {
    path: "gradle/wrapper/gradle-wrapper.properties",
    category: "gradle",
    description: "Standard Gradle 8.7 distribution wrapper",
    content: `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.7-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`
  },
  {
    path: "app/build.gradle.kts",
    category: "gradle",
    description: "App module Gradle configuration with optimizations, ProGuard, and dependencies",
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "org.banshhata.foundation"
    compileSdk = 34

    defaultConfig {
        applicationId = "org.banshhata.foundation"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug") // Replace with release keystore for Play Store
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    // AndroidX Core & UI
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("androidx.activity:activity-ktx:1.9.0")

    // SwipeRefreshLayout for smooth website pull-to-refresh
    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.1.0")

    // Modern AndroidX WebKit for enhanced WebView caching and security
    implementation("androidx.webkit:webkit:1.11.0")
}
`
  },
  {
    path: "app/proguard-rules.pro",
    category: "config",
    description: "ProGuard / R8 optimization rules for production build",
    content: `# ProGuard rules for Banshhata Foundation
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve configuration classes
-keep class org.banshhata.foundation.config.** { *; }

# Retain Parcelable & Serializable if needed
-keepclassmembers class * implements android.os.Parcelable {
    public static final ** CREATOR;
}
`
  },
  {
    path: "app/src/main/AndroidManifest.xml",
    category: "manifest",
    description: "App manifest with required permissions, external intent queries, and clean activity stack",
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Minimal, clean permissions: Only network access is requested -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Queries for opening official external communication apps safely -->
    <queries>
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <data android:scheme="https" />
        </intent>
        <intent>
            <action android:name="android.intent.action.DIAL" />
            <data android:scheme="tel" />
        </intent>
        <intent>
            <action android:name="android.intent.action.SENDTO" />
            <data android:scheme="mailto" />
        </intent>
        <package android:name="com.facebook.katana" />
        <package android:name="com.facebook.orca" />
        <package android:name="com.whatsapp" />
    </queries>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.BanshhataFoundation"
        android:usesCleartextTraffic="false">

        <!-- Animated Splash Screen Activity (Launcher Entry Point) -->
        <activity
            android:name=".ui.SplashActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.BanshhataFoundation.Splash">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Main Fullscreen Website Browser Activity -->
        <activity
            android:name=".ui.MainActivity"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
            android:exported="false"
            android:label="@string/app_name"
            android:windowSoftInputMode="adjustResize" />

    </application>

</manifest>
`
  },
  {
    path: "app/src/main/res/values/colors.xml",
    category: "res",
    description: "Official color palette extracted directly from the foundation SVG icon",
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Primary Brand Colors: Exactly from Official SVG Icon -->
    <color name="brand_primary">#006C50</color>            <!-- Official emerald green -->
    <color name="brand_primary_dark">#004D39</color>       <!-- Darker emerald for app bars -->
    <color name="brand_primary_light">#008F6A</color>      <!-- Light emerald accent -->
    <color name="brand_accent_red">#EB1D27</color>        <!-- Official red for heart/humanity -->
    <color name="brand_accent_red_dark">#C4131D</color>

    <!-- Neutral & Background Palette -->
    <color name="brand_background">#F4FBF7</color>        <!-- Soft pastel mint background -->
    <color name="brand_surface">#FFFFFF</color>           <!-- Card & dialog surface -->
    <color name="brand_text_primary">#0F291E</color>      <!-- Deep pine dark text -->
    <color name="brand_text_secondary">#4A6358</color>    <!-- Muted slate text -->
    <color name="brand_divider">#E2EDE8</color>           <!-- Subtle border line -->
    <color name="brand_progress_track">#D1E7DF</color>    <!-- Progress bar track -->

    <!-- Status & UI -->
    <color name="white">#FFFFFF</color>
    <color name="black">#000000</color>
</resources>
`
  },
  {
    path: "app/src/main/res/values/strings.xml",
    category: "res",
    description: "Centralized strings including slogan, names, and user-facing copy",
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Foundation Identity -->
    <string name="app_name">Banshhata Foundation</string>
    <string name="foundation_name_bn">বাঁশহাটা ফাউন্ডেশন</string>
    <string name="foundation_slogan">মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই</string>

    <!-- Communication & Contact -->
    <string name="action_contact">যোগাযোগ করুন</string>
    <string name="action_call">কল করুন</string>
    <string name="action_messenger">মেসেঞ্জার</string>
    <string name="action_facebook">ফেসবুক পেজ</string>
    <string name="action_email">ইমেইল</string>
    <string name="action_whatsapp">হোয়াটসঅ্যাপ</string>
    <string name="action_share">শেয়ার</string>

    <!-- Offline State -->
    <string name="offline_title">ইন্টারনেট সংযোগ নেই</string>
    <string name="offline_message">অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</string>
    <string name="offline_retry">পুনরায় চেষ্টা করুন</string>
    <string name="offline_view_cached">সংরক্ষিত পৃষ্ঠা দেখুন</string>

    <!-- Share Intent Text -->
    <string name="share_title">Banshhata Foundation শেয়ার করুন</string>
    <string name="share_text">Banshhata Foundation\\n\\\"মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই\\\"\\n\\nঅফিসিয়াল ওয়েবসাইট দেখুন:\\nhttps://BanshhataFoundation.blogspot.com/</string>

    <!-- Toast Messages -->
    <string name="toast_press_back_again">অ্যাপ বন্ধ করতে আবার ব্যাক চাপুন</string>
</resources>
`
  },
  {
    path: "app/src/main/res/values/themes.xml",
    category: "res",
    description: "Material3 theme with official brand colors and window configurations",
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Base Application Theme: NoActionBar to maximize website viewing area -->
    <style name="Theme.BanshhataFoundation" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <!-- Primary Brand Colors -->
        <item name="colorPrimary">@color/brand_primary</item>
        <item name="colorPrimaryVariant">@color/brand_primary_dark</item>
        <item name="colorOnPrimary">@color/white</item>

        <!-- Secondary Accent -->
        <item name="colorSecondary">@color/brand_accent_red</item>
        <item name="colorSecondaryVariant">@color/brand_accent_red_dark</item>
        <item name="colorOnSecondary">@color/white</item>

        <!-- System UI -->
        <item name="android:statusBarColor">@color/brand_primary_dark</item>
        <item name="android:windowLightStatusBar">false</item>
        <item name="android:navigationBarColor">@color/brand_surface</item>
        <item name="android:windowBackground">@color/brand_surface</item>
    </style>

    <!-- Animated Splash Screen Specific Theme -->
    <style name="Theme.BanshhataFoundation.Splash" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="android:windowBackground">@color/brand_background</item>
        <item name="android:statusBarColor">@color/brand_background</item>
        <item name="android:windowLightStatusBar">true</item>
        <item name="android:navigationBarColor">@color/brand_background</item>
    </style>
</resources>
`
  },
  {
    path: "app/src/main/res/drawable/ic_foundation_logo.xml",
    category: "res",
    description: "VectorDrawable rendition of the official Banshhata Foundation logo",
    content: `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="200dp"
    android:height="200dp"
    android:viewportWidth="375"
    android:viewportHeight="375">

    <!-- Outer Green Border Ring -->
    <path
        android:strokeColor="#006C50"
        android:strokeWidth="11"
        android:fillColor="#00000000"
        android:pathData="M187.5,12 A175.5,175.5 0 1,1 187.49,12 Z" />

    <!-- Inner Green Border Ring -->
    <path
        android:strokeColor="#006C50"
        android:strokeWidth="3"
        android:fillColor="#00000000"
        android:pathData="M187.5,24 A163.5,163.5 0 1,1 187.49,24 Z" />

    <!-- Left Floral Green Ribbon -->
    <path
        android:fillColor="#006C50"
        android:pathData="M 25.84 124.53 C 6.39 174.08 10.79 229.82 37.73 275.72 C 64.68 321.63 111.21 352.61 163.96 359.78 C 177.91 323.17 166.95 292.73 131.08 268.46 C 118.02 259.06 107.61 249.44 99.88 239.62 C 93.39 231.39 89.01 222.5 82.05 214.32 C 73.95 228.93 77.71 246.26 93.34 266.32 C 104.81 279.65 110.54 286.31 110.54 286.31 C 82.22 280.03 57.95 261.91 43.87 236.55 C 38.85 227.51 35.29 217.86 33.23 207.93 C 29.88 191.74 30.5 174.84 35.23 158.72 C 39.16 145.34 40.76 132.62 25.84 124.52 Z" />

    <!-- Left Red Accent -->
    <path
        android:fillColor="#EB1D27"
        android:pathData="M 56.15 146.51 C 32.43 185.66 31.85 219.72 54.42 248.69 C 45.8 228.18 46.92 205.09 57.78 179.39 C 62.26 168.8 66.81 155.25 56.15 146.51 Z" />

    <!-- Right Floral Green Ribbon -->
    <path
        android:fillColor="#006C50"
        android:pathData="M 348.63 124.53 C 368.08 174.08 363.7 229.82 336.75 275.72 C 309.79 321.63 263.26 352.61 210.51 359.78 C 196.57 323.17 207.52 292.73 243.38 268.46 C 256.45 259.06 266.86 249.44 274.59 239.62 C 281.07 231.39 285.46 222.5 292.41 214.32 C 300.52 228.93 296.75 246.26 281.13 266.32 C 269.66 279.65 263.92 286.31 263.92 286.31 C 292.24 280.03 316.52 261.91 330.61 236.55 C 335.63 227.51 339.18 217.86 341.24 207.93 C 344.6 191.74 343.98 174.84 339.25 158.72 C 335.31 145.34 333.71 132.62 348.63 124.52 Z" />

    <!-- Right Red Accent -->
    <path
        android:fillColor="#EB1D27"
        android:pathData="M 318.32 146.51 C 342.04 185.66 342.63 219.72 320.05 248.69 C 328.68 228.18 327.55 205.09 316.69 179.39 C 312.21 168.8 307.66 155.25 318.32 146.51 Z" />

    <!-- Top Wing Red -->
    <path
        android:fillColor="#EB1D27"
        android:pathData="M 292.87 73.32 C 239.56 77.93 207.3 124.57 242.51 171.75 C 214.79 153.32 194.72 123.96 195.5 89.89 C 196.21 60.17 212.98 33.35 238.29 19.72 C 225.12 36.44 205.84 74.86 243.75 71.29 C 260.61 69.66 280.66 66.87 292.87 73.32 Z" />

    <!-- Top Left Wing Green -->
    <path
        android:fillColor="#006C50"
        android:pathData="M 82.12 73.32 C 135.44 77.93 167.7 124.57 132.48 171.75 C 160.21 153.32 180.28 123.96 179.49 89.89 C 178.79 60.14 162.01 33.32 136.7 19.7 C 149.88 36.41 169.16 74.84 131.24 71.26 C 114.38 69.66 94.34 66.87 82.12 73.32 Z" />

    <!-- Center Heart Circles -->
    <path
        android:fillColor="#EB1D27"
        android:pathData="M 247.19 39.59 A 10 10 0 1 1 247.18 39.59 Z" />

    <path
        android:fillColor="#006C50"
        android:pathData="M 127.81 39.59 A 10 10 0 1 1 127.8 39.59 Z" />
</vector>
`
  },
  {
    path: "app/src/main/res/drawable/bg_splash_glow.xml",
    category: "res",
    description: "Radial glow shape for animated splash reveal",
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="oval">
    <gradient
        android:type="radial"
        android:gradientRadius="90dp"
        android:startColor="#33006C50"
        android:centerColor="#15006C50"
        android:endColor="#00000000" />
</shape>
`
  },
  {
    path: "app/src/main/res/drawable/ic_contact_message.xml",
    category: "res",
    description: "Vector icon for the single floating contact button on the left",
    content: `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M20,2H4C2.9,2 2,2.9 2,4v18l4,-4h14c1.1,0 2,-0.9 2,-2V4C22,2.9 21.1,2 20,2zM20,16H5.17L4,17.17V4h16V16z"/>
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M7,9h10v2H7z"/>
    <path
        android:fillColor="#FFFFFFFF"
        android:pathData="M7,6h10v2H7z"/>
</vector>
`
  },
  {
    path: "app/src/main/res/drawable/bg_bottom_sheet.xml",
    category: "res",
    description: "Rounded background shape for the contact panel",
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="@color/brand_surface" />
    <corners
        android:topLeftRadius="24dp"
        android:topRightRadius="24dp" />
</shape>
`
  },
  {
    path: "app/src/main/res/drawable/bg_drag_handle.xml",
    category: "res",
    description: "Drag handle indicator for bottom sheet",
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="@color/brand_divider" />
    <corners android:radius="2dp" />
</shape>
`
  },
  {
    path: "app/src/main/res/drawable/ic_launcher_background.xml",
    category: "res",
    description: "Solid branded green adaptive launcher background",
    content: `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#006C50"
        android:pathData="M0,0h108v108h-108z" />
</vector>
`
  },
  {
    path: "app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml",
    category: "res",
    description: "Adaptive icon definition for modern Android launchers",
    content: `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_foundation_logo" />
</adaptive-icon>
`
  },
  {
    path: "app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml",
    category: "res",
    description: "Round adaptive icon definition",
    content: `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_foundation_logo" />
</adaptive-icon>
`
  },
  {
    path: "app/src/main/res/layout/activity_splash.xml",
    category: "layout",
    description: "Splash screen layout with logo, radial glow ring, and animated slogan",
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/splashRoot"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/brand_background"
    android:padding="24dp">

    <!-- Container for centered branding -->
    <LinearLayout
        android:id="@+id/brandingContainer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="vertical"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.45">

        <!-- Logo Container with Circular Glow Aura -->
        <FrameLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">

            <!-- Soft circular glow aura using official emerald color -->
            <View
                android:id="@+id/logoGlowRing"
                android:layout_width="180dp"
                android:layout_height="180dp"
                android:layout_gravity="center"
                android:alpha="0"
                android:background="@drawable/bg_splash_glow"
                android:scaleX="0.6"
                android:scaleY="0.6" />

            <!-- Official SVG Logo (Unchanged Artwork & Proportions) -->
            <ImageView
                android:id="@+id/ivLogo"
                android:layout_width="140dp"
                android:layout_height="140dp"
                android:layout_gravity="center"
                android:alpha="0"
                android:contentDescription="@string/app_name"
                android:scaleX="0.75"
                android:scaleY="0.75"
                android:src="@drawable/ic_foundation_logo" />

        </FrameLayout>

        <!-- Foundation Title (English) -->
        <TextView
            android:id="@+id/tvTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:alpha="0"
            android:text="@string/app_name"
            android:textColor="@color/brand_primary_dark"
            android:textSize="24sp"
            android:textStyle="bold"
            android:translationY="20dp" />

        <!-- Foundation Title (Bengali) -->
        <TextView
            android:id="@+id/tvTitleBn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:alpha="0"
            android:text="@string/foundation_name_bn"
            android:textColor="@color/brand_primary"
            android:textSize="18sp"
            android:textStyle="bold"
            android:translationY="15dp" />

        <!-- Official Slogan with Ruby Red Accent -->
        <TextView
            android:id="@+id/tvSlogan"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:alpha="0"
            android:gravity="center"
            android:paddingHorizontal="16dp"
            android:text="@string/foundation_slogan"
            android:textColor="@color/brand_accent_red"
            android:textSize="15sp"
            android:textStyle="normal"
            android:translationY="15dp" />

    </LinearLayout>

    <!-- Bottom Subtle Loading Progress Indicator -->
    <com.google.android.material.progressindicator.LinearProgressIndicator
        android:id="@+id/splashProgress"
        android:layout_width="140dp"
        android:layout_height="wrap_content"
        android:layout_marginBottom="40dp"
        android:alpha="0"
        android:indeterminate="true"
        app:indicatorColor="@color/brand_primary"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:trackColor="@color/brand_progress_track" />

</androidx.constraintlayout.widget.ConstraintLayout>
`
  },
  {
    path: "app/src/main/res/layout/activity_main.xml",
    category: "layout",
    description: "Main activity layout: Fullscreen website browser + refined left floating Contact button",
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/mainCoordinator"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/brand_surface">

    <!-- Thin Linear Progress Indicator at the very top (visible only during loading) -->
    <com.google.android.material.progressindicator.LinearProgressIndicator
        android:id="@+id/pageLoadingBar"
        android:layout_width="match_parent"
        android:layout_height="3dp"
        android:layout_gravity="top"
        android:elevation="8dp"
        android:visibility="gone"
        app:indicatorColor="@color/brand_accent_red"
        app:trackColor="@color/brand_primary_dark" />

    <!-- Pure Fullscreen Dynamic Website Container -->
    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout
        android:id="@+id/swipeRefreshLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <!-- Official Banshhata Foundation Blogger Content Layer -->
        <WebView
            android:id="@+id/webView"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>

    <!-- Professional Offline Screen Fallback -->
    <include
        android:id="@+id/offlineLayout"
        layout="@layout/layout_offline"
        android:visibility="gone" />

    <!-- THE ONLY APP-CREATED MAIN UI ELEMENT:
         Refined, elegant floating Contact button on the LEFT side of the screen.
         Does not conflict with the website's own scroll-to-top button on the right. -->
    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/btnFloatingContact"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|start"
        android:layout_marginStart="20dp"
        android:layout_marginBottom="36dp"
        android:contentDescription="যোগাযোগ করুন (Contact Foundation)"
        android:src="@drawable/ic_contact_message"
        app:backgroundTint="@color/brand_primary"
        app:borderWidth="0dp"
        app:elevation="6dp"
        app:fabSize="normal"
        app:hoveredFocusedTranslationZ="8dp"
        app:pressedTranslationZ="10dp"
        app:rippleColor="@color/brand_primary_light"
        app:tint="@color/white" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
`
  },
  {
    path: "app/src/main/res/layout/dialog_contact_panel.xml",
    category: "layout",
    description: "Clean native Android bottom sheet contact panel with all official communication channels",
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/bg_bottom_sheet"
    android:orientation="vertical"
    android:padding="20dp">

    <!-- Top Drag Handle -->
    <View
        android:layout_width="40dp"
        android:layout_height="4dp"
        android:layout_gravity="center_horizontal"
        android:layout_marginBottom="16dp"
        android:background="@drawable/bg_drag_handle" />

    <!-- Header Section with Logo & Foundation Name -->
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="14dp">

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentStart="true"
            android:layout_toStartOf="@id/btnClose"
            android:gravity="center_vertical"
            android:orientation="horizontal">

            <ImageView
                android:layout_width="44dp"
                android:layout_height="44dp"
                android:contentDescription="@string/app_name"
                android:src="@drawable/ic_foundation_logo" />

            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginStart="12dp"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/app_name"
                    android:textColor="@color/brand_primary_dark"
                    android:textSize="16sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/foundation_slogan"
                    android:textColor="@color/brand_accent_red"
                    android:textSize="12sp" />

            </LinearLayout>

        </LinearLayout>

        <!-- Accessible Close Button -->
        <ImageButton
            android:id="@+id/btnClose"
            android:layout_width="36dp"
            android:layout_height="36dp"
            android:layout_alignParentEnd="true"
            android:layout_centerVertical="true"
            android:background="?attr/selectableItemBackgroundBorderless"
            android:contentDescription="Close"
            android:src="@android:drawable/ic_menu_close_clear_cancel"
            app:tint="@color/brand_text_secondary" />

    </RelativeLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:layout_marginBottom="12dp"
        android:background="@color/brand_divider" />

    <!-- Actions List in Required Logical Order (Req 5) -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <!-- 1. Messenger Action (Preferred m.me with FB Fallback) -->
        <LinearLayout
            android:id="@+id/btnActionMessenger"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="?attr/selectableItemBackground"
            android:clickable="true"
            android:focusable="true"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="8dp">

            <ImageView
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:contentDescription="Messenger"
                android:src="@drawable/ic_contact_message"
                app:tint="@color/brand_primary" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:layout_weight="1"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="মেসেঞ্জার (Messenger)"
                    android:textColor="@color/brand_text_primary"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="m.me/BanshhataFoundation"
                    android:textColor="@color/brand_text_secondary"
                    android:textSize="11sp" />
            </LinearLayout>
        </LinearLayout>

        <!-- 2. Facebook Page Action -->
        <LinearLayout
            android:id="@+id/btnActionFacebook"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="?attr/selectableItemBackground"
            android:clickable="true"
            android:focusable="true"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="8dp">

            <ImageView
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:contentDescription="Facebook"
                android:src="@android:drawable/ic_menu_share"
                app:tint="@color/brand_primary" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:layout_weight="1"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="ফেসবুক পেজ (Facebook Page)"
                    android:textColor="@color/brand_text_primary"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="fb.com/BanshhataFoundation"
                    android:textColor="@color/brand_text_secondary"
                    android:textSize="11sp" />
            </LinearLayout>
        </LinearLayout>

        <!-- 3. Phone Call Action (Prefills dialer with +8801939391339) -->
        <LinearLayout
            android:id="@+id/btnActionCall"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="?attr/selectableItemBackground"
            android:clickable="true"
            android:focusable="true"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="8dp">

            <ImageView
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:contentDescription="Phone Call"
                android:src="@android:drawable/ic_menu_call"
                app:tint="@color/brand_primary" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:layout_weight="1"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="কল করুন (Phone Call)"
                    android:textColor="@color/brand_text_primary"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="+880 1939-391339"
                    android:textColor="@color/brand_text_secondary"
                    android:textSize="11sp" />
            </LinearLayout>
        </LinearLayout>

        <!-- 4. Email Action -->
        <LinearLayout
            android:id="@+id/btnActionEmail"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="?attr/selectableItemBackground"
            android:clickable="true"
            android:focusable="true"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="8dp">

            <ImageView
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:contentDescription="Email"
                android:src="@android:drawable/ic_dialog_email"
                app:tint="@color/brand_primary" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:layout_weight="1"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="ইমেইল করুন (Email)"
                    android:textColor="@color/brand_text_primary"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="banshhatafoundation@gmail.com"
                    android:textColor="@color/brand_text_secondary"
                    android:textSize="11sp" />
            </LinearLayout>
        </LinearLayout>

        <!-- 5. WhatsApp Action (Visible ONLY after WHATSAPP_URL is configured) -->
        <LinearLayout
            android:id="@+id/btnActionWhatsApp"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="?attr/selectableItemBackground"
            android:clickable="true"
            android:focusable="true"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="8dp"
            android:visibility="gone">

            <ImageView
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:contentDescription="WhatsApp"
                android:src="@android:drawable/ic_menu_send"
                app:tint="@color/brand_primary" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:layout_weight="1"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="হোয়াটসঅ্যাপ (WhatsApp)"
                    android:textColor="@color/brand_text_primary"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="অফিসিয়াল বার্তা"
                    android:textColor="@color/brand_text_secondary"
                    android:textSize="11sp" />
            </LinearLayout>
        </LinearLayout>

        <!-- 6. Share Foundation Action -->
        <LinearLayout
            android:id="@+id/btnActionShare"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="?attr/selectableItemBackground"
            android:clickable="true"
            android:focusable="true"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="8dp">

            <ImageView
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:contentDescription="Share"
                android:src="@android:drawable/ic_menu_share"
                app:tint="@color/brand_primary" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:layout_weight="1"
                android:orientation="vertical">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="ফাউন্ডেশন শেয়ার করুন (Share)"
                    android:textColor="@color/brand_text_primary"
                    android:textSize="14sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="BanshhataFoundation.blogspot.com"
                    android:textColor="@color/brand_text_secondary"
                    android:textSize="11sp" />
            </LinearLayout>
        </LinearLayout>

    </LinearLayout>

</LinearLayout>
`
  },
  {
    path: "app/src/main/res/layout/layout_offline.xml",
    category: "layout",
    description: "Clean, professional offline fallback screen with retry and cached view",
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/brand_background"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="32dp">

    <!-- Foundation Logo -->
    <ImageView
        android:layout_width="96dp"
        android:layout_height="96dp"
        android:alpha="0.85"
        android:contentDescription="@string/app_name"
        android:src="@drawable/ic_foundation_logo" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:text="@string/offline_title"
        android:textColor="@color/brand_primary_dark"
        android:textSize="20sp"
        android:textStyle="bold" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:gravity="center"
        android:text="@string/offline_message"
        android:textColor="@color/brand_text_secondary"
        android:textSize="14sp" />

    <!-- Action Buttons -->
    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnRetry"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="28dp"
        android:paddingHorizontal="32dp"
        android:text="@string/offline_retry"
        app:backgroundTint="@color/brand_primary"
        app:cornerRadius="24dp" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnCached"
        style="@style/Widget.MaterialComponents.Button.TextButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="@string/offline_view_cached"
        android:textColor="@color/brand_primary" />

</LinearLayout>
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/config/AppConfig.kt",
    category: "kotlin",
    description: "Central, clearly identifiable configuration file for URLs, phone, slogan and identity",
    content: `package org.banshhata.foundation.config

/**
 * Banshhata Foundation - Central Application Configuration
 *
 * Official configuration parameters as defined in the Master Specification.
 * Administrators can modify URLs, phone numbers, or add a WhatsApp destination
 * directly here without altering any UI or WebView logic.
 */
object AppConfig {

    // Foundation Identity
    const val FOUNDATION_NAME = "Banshhata Foundation"
    const val FOUNDATION_NAME_BN = "বাঁশহাটা ফাউন্ডেশন"
    const val FOUNDATION_SLOGAN = "মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই"

    // Dynamic Blogger Content Source (Single Source of Truth)
    const val WEBSITE_URL = "https://BanshhataFoundation.blogspot.com/"

    // Official Communication Channels
    const val FACEBOOK_URL = "https://www.facebook.com/BanshhataFoundation"
    const val PREFERRED_MESSENGER_URL = "https://m.me/BanshhataFoundation"
    const val FACEBOOK_FALLBACK_URL = "https://www.facebook.com/BanshhataFoundation"
    const val PHONE_NUMBER = "+8801939391339"
    const val PHONE_DISPLAY = "+880 1939-391339"
    const val EMAIL_ADDRESS = "banshhatafoundation@gmail.com"

    // WhatsApp destination (kept empty until an official Foundation WhatsApp is confirmed)
    // When populated (e.g. "https://wa.me/8801939391339"), the WhatsApp option will automatically appear in the Contact Panel.
    const val WHATSAPP_URL = ""

    // Native Share Content
    const val SHARE_SUBJECT = "Banshhata Foundation"
    const val SHARE_CONTENT = """Banshhata Foundation
"মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই"

অফিসিয়াল ওয়েবসাইট দেখুন:
https://BanshhataFoundation.blogspot.com/"""

    // App Version Metadata
    const val APP_VERSION = "1.0.0"
    const val BUILD_NUMBER = 1

    // WebView Settings
    const val ENABLE_DOM_STORAGE = true
    const val ENABLE_DATABASE = true
    const val CACHE_MAX_AGE_SECONDS = 86400 // 24 hours offline fallback
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/ui/SplashActivity.kt",
    category: "kotlin",
    description: "Smooth, choreographed 5-step native Android launch animation sequence",
    content: `package org.banshhata.foundation.ui

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.view.animation.DecelerateInterpolator
import android.view.animation.OvershootInterpolator
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.banshhata.foundation.databinding.ActivitySplashBinding

/**
 * SplashActivity
 * Executes a smooth, choreographed native Android launch animation sequence:
 * 1. Logo fade-in and scale-up (0.75f -> 1.0f).
 * 2. Soft circular emerald aura reveal.
 * 3. Smooth slide-up & fade-in of "Banshhata Foundation" and Bengali title.
 * 4. Slogan fade-in with official ruby red accent.
 * 5. Seamless crossfade to MainActivity (1.3s total) without blocking the user.
 */
@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding
    private var isNavigated = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        executeChoreographedAnimation()

        // Transition smoothly to MainActivity at 1.4 seconds
        lifecycleScope.launch {
            delay(1400)
            if (!isFinishing && !isDestroyed && !isNavigated) {
                navigateToMain()
            }
        }
    }

    private fun executeChoreographedAnimation() {
        // Step 1: Smooth Logo Scale-up & Fade-in
        binding.ivLogo.animate()
            .alpha(1f)
            .scaleX(1.0f)
            .scaleY(1.0f)
            .setDuration(650)
            .setInterpolator(OvershootInterpolator(1.1f))
            .start()

        // Step 2: Soft Emerald Aura Reveal
        binding.logoGlowRing.animate()
            .alpha(0.7f)
            .scaleX(1.15f)
            .scaleY(1.15f)
            .setDuration(750)
            .setInterpolator(DecelerateInterpolator())
            .start()

        // Step 3: Title Slide-up & Fade-in
        binding.tvTitle.animate()
            .alpha(1f)
            .translationY(0f)
            .setStartDelay(350)
            .setDuration(400)
            .setInterpolator(DecelerateInterpolator())
            .start()

        binding.tvTitleBn.animate()
            .alpha(1f)
            .translationY(0f)
            .setStartDelay(450)
            .setDuration(400)
            .setInterpolator(DecelerateInterpolator())
            .start()

        // Step 4: Slogan Reveal with Red Accent
        binding.tvSlogan.animate()
            .alpha(1f)
            .translationY(0f)
            .setStartDelay(650)
            .setDuration(450)
            .setInterpolator(DecelerateInterpolator())
            .start()

        // Step 5: Progress indicator fade-in
        binding.splashProgress.animate()
            .alpha(0.85f)
            .setStartDelay(750)
            .setDuration(300)
            .start()
    }

    private fun navigateToMain() {
        isNavigated = true
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
        }
        startActivity(intent)
        // Smooth crossfade activity transition
        @Suppress("DEPRECATION")
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
        finish()
    }
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/ui/MainActivity.kt",
    category: "kotlin",
    description: "Core website browser activity with full-screen WebView, pull-to-refresh, offline support, and refined left contact button",
    content: `package org.banshhata.foundation.ui

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.view.animation.DecelerateInterpolator
import android.webkit.WebSettings
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import org.banshhata.foundation.R
import org.banshhata.foundation.config.AppConfig
import org.banshhata.foundation.databinding.ActivityMainBinding
import org.banshhata.foundation.util.NetworkUtils
import org.banshhata.foundation.web.FoundationWebChromeClient
import org.banshhata.foundation.web.FoundationWebViewClient

/**
 * MainActivity
 * Dedicated Android website-browser application for Banshhata Foundation.
 * Displays the original Blogger website in full viewport with natural pull-to-refresh,
 * robust offline cache fallback, and exactly ONE floating Contact button on the left.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var contactDialog: ContactBottomSheetDialog? = null
    private var backPressedTime: Long = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupWebView()
        setupSwipeRefresh()
        setupFloatingContactButton()
        setupOfflineHandling()
        setupBackPressHandling()

        loadWebsite()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        binding.webView.apply {
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = AppConfig.ENABLE_DOM_STORAGE
                databaseEnabled = AppConfig.ENABLE_DATABASE
                useWideViewPort = true
                loadWithOverviewMode = true
                builtInZoomControls = false
                displayZoomControls = false
                setSupportZoom(true)

                // Caching strategy: fresh online, offline cache fallback
                cacheMode = if (NetworkUtils.isNetworkAvailable(this@MainActivity)) {
                    WebSettings.LOAD_DEFAULT
                } else {
                    WebSettings.LOAD_CACHE_ELSE_NETWORK
                }
            }

            webViewClient = FoundationWebViewClient(
                activity = this@MainActivity,
                onPageStarted = {
                    binding.pageLoadingBar.visibility = View.VISIBLE
                },
                onPageFinished = {
                    binding.pageLoadingBar.visibility = View.GONE
                    binding.swipeRefreshLayout.isRefreshing = false
                    showWebViewContent()
                },
                onErrorReceived = {
                    binding.pageLoadingBar.visibility = View.GONE
                    binding.swipeRefreshLayout.isRefreshing = false
                    if (!NetworkUtils.isNetworkAvailable(this@MainActivity)) {
                        showOfflineScreen()
                    }
                }
            )

            webChromeClient = FoundationWebChromeClient(
                onProgressChanged = { progress ->
                    if (progress in 1..99) {
                        binding.pageLoadingBar.visibility = View.VISIBLE
                        binding.pageLoadingBar.progress = progress
                    } else {
                        binding.pageLoadingBar.visibility = View.GONE
                    }
                }
            )
        }
    }

    private fun setupSwipeRefresh() {
        binding.swipeRefreshLayout.apply {
            setColorSchemeResources(
                R.color.brand_primary,
                R.color.brand_accent_red,
                R.color.brand_primary_dark
            )
            setOnRefreshListener {
                refreshContent()
            }
        }
    }

    /**
     * The ONLY additional app-created UI element:
     * One refined, elegant floating Contact button on the LEFT side of the screen.
     * Includes a subtle one-time entrance animation.
     */
    private fun setupFloatingContactButton() {
        binding.btnFloatingContact.apply {
            // Initial state for one-time appearance animation
            alpha = 0f
            translationX = -30f

            animate()
                .alpha(1f)
                .translationX(0f)
                .setStartDelay(200)
                .setDuration(400)
                .setInterpolator(DecelerateInterpolator())
                .start()

            setOnClickListener {
                showContactPanel()
            }
        }
    }

    private fun showContactPanel() {
        if (contactDialog == null || !contactDialog!!.isAdded) {
            contactDialog = ContactBottomSheetDialog.newInstance()
            contactDialog?.show(supportFragmentManager, ContactBottomSheetDialog.TAG)
        }
    }

    private fun setupOfflineHandling() {
        binding.offlineLayout.btnRetry.setOnClickListener {
            if (NetworkUtils.isNetworkAvailable(this)) {
                showWebViewContent()
                refreshContent()
            } else {
                Toast.makeText(this, R.string.offline_message, Toast.LENGTH_SHORT).show()
            }
        }

        binding.offlineLayout.btnCached.setOnClickListener {
            binding.webView.settings.cacheMode = WebSettings.LOAD_CACHE_ONLY
            binding.webView.reload()
            showWebViewContent()
        }
    }

    /**
     * Android System Back Navigation:
     * 1. If Contact panel is open, dismiss it.
     * 2. If WebView has page history, navigate back to previous website page.
     * 3. If root website page is reached, exit gracefully.
     */
    private fun setupBackPressHandling() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (contactDialog != null && contactDialog!!.isVisible) {
                    contactDialog?.dismiss()
                    return
                }

                if (binding.webView.canGoBack()) {
                    binding.webView.goBack()
                } else {
                    if (System.currentTimeMillis() - backPressedTime < 2000) {
                        finish()
                    } else {
                        backPressedTime = System.currentTimeMillis()
                        Toast.makeText(this@MainActivity, R.string.toast_press_back_again, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }

    fun refreshContent() {
        if (NetworkUtils.isNetworkAvailable(this)) {
            binding.webView.settings.cacheMode = WebSettings.LOAD_NO_CACHE
            binding.webView.reload()
        } else {
            binding.swipeRefreshLayout.isRefreshing = false
            showOfflineScreen()
        }
    }

    private fun loadWebsite() {
        if (NetworkUtils.isNetworkAvailable(this)) {
            showWebViewContent()
            binding.webView.loadUrl(AppConfig.WEBSITE_URL)
        } else {
            showOfflineScreen()
        }
    }

    private fun showOfflineScreen() {
        binding.swipeRefreshLayout.visibility = View.GONE
        binding.offlineLayout.root.visibility = View.VISIBLE
    }

    private fun showWebViewContent() {
        binding.offlineLayout.root.visibility = View.GONE
        binding.swipeRefreshLayout.visibility = View.VISIBLE
    }

    override fun onDestroy() {
        binding.webView.destroy()
        super.onDestroy()
    }
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/ui/ContactBottomSheetDialog.kt",
    category: "kotlin",
    description: "Native bottom sheet contact panel with Messenger (m.me + FB fallback), Facebook, Call, Email, WhatsApp (configurable), and Share",
    content: `package org.banshhata.foundation.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import org.banshhata.foundation.config.AppConfig
import org.banshhata.foundation.databinding.DialogContactPanelBinding
import org.banshhata.foundation.util.ShareUtils

/**
 * ContactBottomSheetDialog
 * Clean, accessible native Android bottom sheet providing official communication
 * channels for Banshhata Foundation when the single left floating button is tapped.
 */
class ContactBottomSheetDialog : BottomSheetDialogFragment() {

    private var _binding: DialogContactPanelBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = DialogContactPanelBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupClickListeners()
    }

    private fun setupClickListeners() {
        // Dismiss
        binding.btnClose.setOnClickListener {
            dismiss()
        }

        // 1. Messenger Action (Preferred m.me with FB Fallback)
        binding.btnActionMessenger.setOnClickListener {
            handleMessengerAction()
            dismiss()
        }

        // 2. Facebook Page Action
        binding.btnActionFacebook.setOnClickListener {
            openUrl(AppConfig.FACEBOOK_URL)
            dismiss()
        }

        // 3. Phone Call (Pre-fills dialer with official number, never dials automatically)
        binding.btnActionCall.setOnClickListener {
            try {
                val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:\${AppConfig.PHONE_NUMBER}"))
                startActivity(intent)
            } catch (_: Exception) {
            }
            dismiss()
        }

        // 4. Email
        binding.btnActionEmail.setOnClickListener {
            try {
                val intent = Intent(Intent.ACTION_SENDTO).apply {
                    data = Uri.parse("mailto:\${AppConfig.EMAIL_ADDRESS}")
                    putExtra(Intent.EXTRA_SUBJECT, "Banshhata Foundation - Inquiry")
                }
                startActivity(intent)
            } catch (_: Exception) {
            }
            dismiss()
        }

        // 5. WhatsApp (Configurable: only visible if a valid official destination is configured)
        if (AppConfig.WHATSAPP_URL.isNotBlank()) {
            binding.btnActionWhatsApp.visibility = View.VISIBLE
            binding.btnActionWhatsApp.setOnClickListener {
                openUrl(AppConfig.WHATSAPP_URL)
                dismiss()
            }
        } else {
            binding.btnActionWhatsApp.visibility = View.GONE
        }

        // 6. Share Foundation (Native share sheet)
        binding.btnActionShare.setOnClickListener {
            ShareUtils.shareFoundation(requireContext())
            dismiss()
        }
    }

    /**
     * Handles opening Messenger using preferred direct destination https://m.me/BanshhataFoundation
     * with graceful fallback to the Facebook page.
     */
    private fun handleMessengerAction() {
        try {
            val pm = requireContext().packageManager
            val messengerUri = Uri.parse(AppConfig.PREFERRED_MESSENGER_URL)

            // Try opening in Facebook Messenger app if installed
            val appIntent = Intent(Intent.ACTION_VIEW, messengerUri).apply {
                setPackage("com.facebook.orca")
            }
            if (appIntent.resolveActivity(pm) != null) {
                startActivity(appIntent)
                return
            }

            // Fallback: Open in web browser
            val webIntent = Intent(Intent.ACTION_VIEW, messengerUri)
            if (webIntent.resolveActivity(pm) != null) {
                startActivity(webIntent)
                return
            }

            // Secondary Fallback: Open Facebook page
            openUrl(AppConfig.FACEBOOK_FALLBACK_URL)
        } catch (_: Exception) {
            openUrl(AppConfig.FACEBOOK_FALLBACK_URL)
        }
    }

    private fun openUrl(url: String) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            startActivity(intent)
        } catch (_: Exception) {
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    companion object {
        const val TAG = "ContactBottomSheetDialog"
        fun newInstance() = ContactBottomSheetDialog()
    }
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/web/FoundationWebViewClient.kt",
    category: "kotlin",
    description: "Specialized WebViewClient handling external schemes (tel, mailto, fb, wa) and errors",
    content: `package org.banshhata.foundation.web

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

/**
 * FoundationWebViewClient
 * Manages URL loading inside the WebView and safely delegates external intents
 * like telephone calls (tel:), emails (mailto:), WhatsApp, Messenger, and Facebook
 * to their respective native applications without breaking the WebView.
 */
class FoundationWebViewClient(
    private val activity: Activity,
    private val onPageStarted: () -> Unit,
    private val onPageFinished: () -> Unit,
    private val onErrorReceived: () -> Unit
) : WebViewClient() {

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val url = request?.url?.toString() ?: return false
        return handleUrl(url)
    }

    @Deprecated("Deprecated in Java")
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        if (url == null) return false
        return handleUrl(url)
    }

    private fun handleUrl(url: String): Boolean {
        // Keep Blogger and HTTP/HTTPS foundation web pages inside WebView
        if (url.startsWith("http://") || url.startsWith("https://")) {
            if (url.contains("facebook.com") || url.contains("m.me") ||
                url.contains("wa.me") || url.contains("api.whatsapp.com") ||
                url.contains("youtube.com") || url.contains("maps.google.com")) {
                openExternalIntent(url)
                return true
            }
            return false // Load in WebView
        }

        // Handle specific external schemes
        if (url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("sms:") ||
            url.startsWith("intent:") || url.startsWith("fb:") || url.startsWith("whatsapp:")) {
            openExternalIntent(url)
            return true
        }

        return false
    }

    private fun openExternalIntent(url: String) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            activity.startActivity(intent)
        } catch (_: Exception) {
            // Silently ignore if intent cannot be handled
        }
    }

    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
        super.onPageStarted(view, url, favicon)
        onPageStarted.invoke()
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        onPageFinished.invoke()
    }

    override fun onReceivedError(
        view: WebView?,
        request: WebResourceRequest?,
        error: WebResourceError?
    ) {
        super.onReceivedError(view, request, error)
        if (request?.isForMainFrame == true) {
            onErrorReceived.invoke()
        }
    }
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/web/FoundationWebChromeClient.kt",
    category: "kotlin",
    description: "WebChromeClient monitoring loading progress for smooth UI feedback",
    content: `package org.banshhata.foundation.web

import android.webkit.WebChromeClient
import android.webkit.WebView

/**
 * FoundationWebChromeClient
 * Listens for page progress changes to update the linear loading progress indicator.
 */
class FoundationWebChromeClient(
    private val onProgressChanged: (Int) -> Unit
) : WebChromeClient() {

    override fun onProgressChanged(view: WebView?, newProgress: Int) {
        super.onProgressChanged(view, newProgress)
        onProgressChanged.invoke(newProgress)
    }
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/util/NetworkUtils.kt",
    category: "kotlin",
    description: "Reliable internet connectivity verification utility",
    content: `package org.banshhata.foundation.util

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities

/**
 * NetworkUtils
 * Checks active network capabilities (Wi-Fi, Cellular, Ethernet) to determine
 * if the device has an active internet connection.
 */
object NetworkUtils {

    fun isNetworkAvailable(context: Context): Boolean {
        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
                ?: return false

        val activeNetwork = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(activeNetwork) ?: return false

        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
    }
}
`
  },
  {
    path: "app/src/main/java/org/banshhata/foundation/util/ShareUtils.kt",
    category: "kotlin",
    description: "Native Android share sheet helper for sharing the official foundation link",
    content: `package org.banshhata.foundation.util

import android.content.Context
import android.content.Intent
import org.banshhata.foundation.R
import org.banshhata.foundation.config.AppConfig

/**
 * ShareUtils
 * Invokes Android's native share sheet with official foundation title and website link.
 */
object ShareUtils {

    fun shareFoundation(context: Context) {
        val shareIntent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, AppConfig.SHARE_SUBJECT)
            putExtra(Intent.EXTRA_TEXT, AppConfig.SHARE_CONTENT)
        }
        val chooser = Intent.createChooser(shareIntent, context.getString(R.string.share_title))
        context.startActivity(chooser)
    }
}
`
  },
  {
    path: "README.md",
    category: "docs",
    description: "Complete guide for Android Studio, APK/AAB building, and Google Play publishing",
    content: `# Banshhata Foundation - Official Android Application

Official, lightweight, production-ready Android website-browser application for **Banshhata Foundation**
(*"মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই"*).

---

## 1. Core Architecture

- **Single Source of Truth**: The official Blogger website (\`https://BanshhataFoundation.blogspot.com/\`) serves as the dynamic content layer.
- **Animated Launch Introduction**: 5-step smooth intro (logo fade/scale, radial emerald aura, title slide-up, ruby slogan reveal, crossfade).
- **Pure Fullscreen Experience**: Completely removed duplicate app-created headers, title bars, and bottom navigation. The website's original logo, navigation, donation pages, and footer are displayed directly.
- **The Only Additional UI Element**: Exactly **ONE** refined floating Contact button pinned on the **LEFT** side of the screen with subtle shadow, elevation, and one-time appearance animation.
- **Contact Panel**: Tapping the floating button opens an elegant native bottom sheet with direct actions for:
  1. Messenger (\`https://m.me/BanshhataFoundation\` with Facebook app/web fallback)
  2. Facebook Page (\`https://www.facebook.com/BanshhataFoundation\`)
  3. Call (\`+8801939391339\` - dialer prefilled)
  4. Email (\`banshhatafoundation@gmail.com\`)
  5. WhatsApp (hidden until official destination is configured)
  6. Share Foundation
- **Zero-Rebuild Updates**: Foundation administrators update content on the Blogger website directly without republishing the Android application.
- **Offline Resilience**: Automatically falls back to local cache when offline and displays a clean retry screen.
- **Strictly No Ads**: 100% non-commercial, zero third-party ads or trackers.
- **Official Branding**: Sourced directly from the official Banshhata Foundation SVG emblem using deep emerald green (\`#006C50\`) and ruby red (\`#EB1D27\`).

---

## 2. Project Customization Guide

All foundation variables are centralized in one single file:
\`app/src/main/java/org/banshhata/foundation/config/AppConfig.kt\`

| Setting | Location in Project | Default Value |
| :--- | :--- | :--- |
| **Website URL** | \`AppConfig.kt\` (\`WEBSITE_URL\`) | \`https://BanshhataFoundation.blogspot.com/\` |
| **Foundation Name** | \`AppConfig.kt\` & \`strings.xml\` | \`Banshhata Foundation\` / \`বাঁশহাটা ফাউন্ডেশন\` |
| **Slogan** | \`AppConfig.kt\` & \`strings.xml\` | \`মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই\` |
| **Preferred Messenger** | \`AppConfig.kt\` (\`PREFERRED_MESSENGER_URL\`) | \`https://m.me/BanshhataFoundation\` |
| **Facebook Page / Fallback** | \`AppConfig.kt\` (\`FACEBOOK_URL\`) | \`https://www.facebook.com/BanshhataFoundation\` |
| **Phone Number** | \`AppConfig.kt\` (\`PHONE_NUMBER\`) | \`+8801939391339\` |
| **Email Address** | \`AppConfig.kt\` (\`EMAIL_ADDRESS\`) | \`banshhatafoundation@gmail.com\` |
| **WhatsApp URL** | \`AppConfig.kt\` (\`WHATSAPP_URL\`) | \`""\` (hidden until configured) |
| **Official SVG Logo** | \`app/src/main/res/drawable/ic_foundation_logo.xml\` | VectorDrawable from SVG |

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
   \`app/build/outputs/apk/debug/app-debug.apk\`
4. Install it on your Android phone via USB cable or share via WhatsApp/Drive.

### How to Build Release APK
1. Go to **Build > Generate Signed Bundle / APK**.
2. Select **APK** and click **Next**.
3. Create a new Keystore or choose your existing keystore file (\`.jks\`).
4. Select **release** build variant and click **Finish**.
5. The optimized release APK will be in:
   \`app/build/outputs/apk/release/app-release.apk\`

---

## 4. How to Build Signed AAB for Google Play Store

Google Play requires **Android App Bundle (.aab)** format:
1. Go to **Build > Generate Signed Bundle / APK**.
2. Select **Android App Bundle** and click **Next**.
3. Select your Keystore, enter password, key alias, and key password.
4. Select **release** variant and check **V1 and V2 signing**.
5. Click **Finish**.
6. The bundle file will be generated at:
   \`app/build/outputs/bundle/release/app-release.aab\`

---

## 5. Google Play Console Publishing Checklist

1. Sign in to [Google Play Console](https://play.google.com/console).
2. Click **Create App**:
   - App Name: \`Banshhata Foundation\`
   - Default Language: Bengali (\`bn-BD\`) or English (\`en-US\`)
   - App or Game: App
   - Free or Paid: Free
3. Complete **App Content declarations**:
   - Privacy Policy URL: \`https://BanshhataFoundation.blogspot.com/p/privacy-policy.html\`
   - Ads: Select **No, my app does not contain ads**
   - Target Audience: 13+ / All ages
   - Data Safety: No personal data collected or shared.
4. Upload Graphics:
   - App Icon: 512 x 512 px PNG (exported from official SVG)
   - Feature Graphic: 1024 x 500 px
   - Phone Screenshots: 2 to 8 screenshots
5. Create a **Production Release**:
   - Upload \`app-release.aab\`
   - Add release notes in Bengali & English
   - Review and rollout!
`
  }
];
