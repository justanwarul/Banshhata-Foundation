package org.banshhata.foundation.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.WebView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import org.banshhata.foundation.R
import org.banshhata.foundation.config.AppConfig
import org.banshhata.foundation.databinding.ActivitySettingsBinding
import org.banshhata.foundation.util.ShareUtils

/**
 * SettingsActivity
 * Lightweight settings screen offering quick website navigation,
 * cache refreshing, direct phone calls, Messenger integration, and app info.
 */
class SettingsActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySettingsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySettingsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()
        setupClickListeners()
    }

    private fun setupToolbar() {
        binding.settingsToolbar.setNavigationOnClickListener {
            finish()
        }
    }

    private fun setupClickListeners() {
        // Open Official Website in External Browser
        binding.itemWebsite.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(AppConfig.WEBSITE_URL))
            startActivity(intent)
        }

        // Clear Web Cache & Refresh
        binding.itemClearCache.setOnClickListener {
            WebView(this).clearCache(true)
            Toast.makeText(this, R.string.toast_cache_cleared, Toast.LENGTH_SHORT).show()
        }

        // Share Foundation
        binding.itemShare.setOnClickListener {
            ShareUtils.shareFoundation(this)
        }

        // Direct Call
        binding.itemCall.setOnClickListener {
            val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${AppConfig.PHONE_NUMBER}"))
            startActivity(intent)
        }

        // Messenger
        binding.itemMessenger.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(AppConfig.MESSENGER_URL))
            startActivity(intent)
        }

        // Version Display
        binding.itemVersion.text = "সংস্করণ: ${AppConfig.APP_VERSION} (Build ${AppConfig.BUILD_NUMBER})"
    }
}
