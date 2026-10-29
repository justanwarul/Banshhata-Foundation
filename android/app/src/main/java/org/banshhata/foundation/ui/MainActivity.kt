package org.banshhata.foundation.ui

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
