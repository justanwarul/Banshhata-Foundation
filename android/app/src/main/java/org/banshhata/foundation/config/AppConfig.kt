package org.banshhata.foundation.config

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
