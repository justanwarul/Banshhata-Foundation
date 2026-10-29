package org.banshhata.foundation.ui

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
                val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:${AppConfig.PHONE_NUMBER}"))
                startActivity(intent)
            } catch (_: Exception) {
            }
            dismiss()
        }

        // 4. Email
        binding.btnActionEmail.setOnClickListener {
            try {
                val intent = Intent(Intent.ACTION_SENDTO).apply {
                    data = Uri.parse("mailto:${AppConfig.EMAIL_ADDRESS}")
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
