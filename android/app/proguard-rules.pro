-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keep class org.banshhata.foundation.config.** { *; }

-keepclassmembers class * implements android.os.Parcelable {
    public static final ** CREATOR;
}
