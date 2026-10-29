package org.banshhata.foundation.ui

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
