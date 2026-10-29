package org.banshhata.foundation.web

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
