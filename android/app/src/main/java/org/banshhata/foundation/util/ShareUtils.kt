package org.banshhata.foundation.util

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
