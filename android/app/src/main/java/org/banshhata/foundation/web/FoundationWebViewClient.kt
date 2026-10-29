package org.banshhata.foundation.web

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
