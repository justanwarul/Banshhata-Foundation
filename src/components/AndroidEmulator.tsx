import React, { useState, useEffect, useRef } from 'react';
import { OfficialLogo } from './OfficialLogo';
import { APP_CONFIG } from '../config/foundationConfig';
import {
  MessageSquare,
  Wifi,
  WifiOff,
  Phone,
  MessageCircle,
  Share2,
  X,
  RotateCcw,
  Smartphone,
  Tablet,
  ExternalLink,
  Mail,
  Send,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const AndroidEmulator: React.FC = () => {
  // State
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState<boolean>(false);
  const [deviceOrientation, setDeviceOrientation] = useState<'portrait' | 'tablet'>('portrait');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cachedViewActive, setCachedViewActive] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Splash Screen timer (Fast, lightweight 1.5s as per Req 7)
  useEffect(() => {
    if (isSplashActive) {
      const timer = setTimeout(() => {
        setIsSplashActive(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSplashActive]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Natural pull-to-refresh or programmatic reload
  const handleRefresh = () => {
    if (!isOnline) {
      showToast("ইন্টারনেট সংযোগ নেই! সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।");
      return;
    }
    setIsLoading(true);
    setProgress(25);
    setCachedViewActive(false);

    setTimeout(() => setProgress(70), 300);
    setTimeout(() => setProgress(95), 600);
    setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
      if (iframeRef.current) {
        iframeRef.current.src = APP_CONFIG.websiteUrl;
      }
    }, 850);
  };

  // Android System Back Navigation (Req 12)
  const handleSystemBack = () => {
    // 1. If Contact Panel is open, dismiss it first
    if (isContactPanelOpen) {
      setIsContactPanelOpen(false);
      return;
    }

    // 2. If website has navigation history, go back
    if (canGoBack) {
      try {
        iframeRef.current?.contentWindow?.history.back();
      } catch {
        // Cross-origin fallback
      }
      showToast("পূর্ববর্তী পৃষ্ঠায় ফিরে যাওয়া হচ্ছে");
      setCanGoBack(false);
      return;
    }

    // 3. Root website page reached
    showToast("আপনি বাঁশহাটা ফাউন্ডেশনের হোম পেজে আছেন (ডাবল ট্যাপে অ্যাপ বন্ধ হবে)");
  };

  // Native Android Share Sheet Action
  const handleNativeShare = async () => {
    const shareData = {
      title: APP_CONFIG.foundationName,
      text: `${APP_CONFIG.foundationName}\n"${APP_CONFIG.slogan}"\n\nঅফিসিয়াল ওয়েবসাইট দেখুন:\n${APP_CONFIG.websiteUrl}`,
      url: APP_CONFIG.websiteUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast("সফলভাবে শেয়ার করা হয়েছে");
      } catch {
        // User cancelled or unsupported
      }
    } else {
      await navigator.clipboard.writeText(shareData.text);
      showToast("শেয়ার লিংক ও স্লোগান ক্লিপবোর্ডে কপি করা হয়েছে!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-2">
      {/* Emulator Testing Controls Bar */}
      <div className="w-full max-w-3xl bg-white border border-emerald-900/10 rounded-2xl p-3 sm:p-4 mb-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <Smartphone className="w-4 h-4 text-[#006C50]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
              Banshhata Foundation Website Browser
              <span className="bg-emerald-100 text-[#006C50] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Single Source of Truth
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Pure fullscreen website with single left floating contact button &amp; zero duplicate app bars
            </p>
          </div>
        </div>

        {/* Quick Testing Toggles */}
        <div className="flex items-center gap-2 text-xs">
          {/* Device Orientation Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setDeviceOrientation('portrait')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                deviceOrientation === 'portrait'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Portrait Phone (390 x 780)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              ফোন
            </button>
            <button
              onClick={() => setDeviceOrientation('tablet')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                deviceOrientation === 'tablet'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tablet View (640 x 800)"
            >
              <Tablet className="w-3.5 h-3.5" />
              ট্যাবলেট
            </button>
          </div>

          {/* Online/Offline Simulation Toggle */}
          <button
            onClick={() => {
              const nextState = !isOnline;
              setIsOnline(nextState);
              showToast(nextState ? "ইন্টারনেট সংযোগ চালু (Online)" : "ইন্টারনেট বিচ্ছিন্ন (Offline Test)");
            }}
            className={`px-2.5 py-1.5 rounded-lg font-medium border flex items-center gap-1.5 transition-all ${
              isOnline
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
            title="Toggle network connectivity to test offline resilience"
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-[#006C50]" />
                Online
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-[#EB1D27]" />
                Offline
              </>
            )}
          </button>

          {/* Replay Splash */}
          <button
            onClick={() => {
              setIsSplashActive(true);
              setIsContactPanelOpen(false);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium flex items-center gap-1 transition-all"
            title="Replay Splash Screen"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            স্প্ল্যাশ
          </button>
        </div>
      </div>

      {/* Realistic Android Hardware Frame */}
      <div
        className={`relative transition-all duration-300 ease-in-out bg-slate-900 shadow-2xl rounded-[44px] p-2.5 sm:p-3 border-[6px] border-slate-800 ${
          deviceOrientation === 'tablet'
            ? 'w-full max-w-[640px] h-[780px]'
            : 'w-[380px] h-[750px]'
        }`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 108, 80, 0.22), 0 10px 20px -5px rgba(0,0,0,0.3)',
        }}
      >
        {/* Hardware Front Camera Punch-hole */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 z-50">
          <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-950" />
          </div>
          <div className="w-8 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Screen Display Area */}
        <div className="w-full h-full bg-white rounded-[34px] overflow-hidden flex flex-col relative select-none">
          {/* Android Status Bar (System UI - Material 3) */}
          <div className="h-7 bg-[#004D39] text-white px-5 flex items-center justify-between text-[11px] font-medium tracking-wide z-40 select-none">
            <span className="font-semibold text-emerald-100">10:45</span>
            <div className="flex items-center gap-2 text-emerald-100">
              {isOnline ? (
                <Wifi className="w-3 h-3" />
              ) : (
                <WifiOff className="w-3 h-3 text-[#EB1D27]" />
              )}
              <span className="text-[10px] font-bold">4G</span>
              <div className="w-4 h-2 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                <div className="h-full w-3/4 bg-white rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* SCREEN 1: 5-STEP SMOOTH NATIVE LAUNCH ANIMATION (Req 2 & Prompt 4) */}
          {isSplashActive && (
            <div className="absolute inset-0 top-7 bg-radial from-emerald-50/90 via-[#F4FBF7] to-[#E3F2EB] flex flex-col items-center justify-center p-6 z-40 animate-splash-fade">
              <div className="flex flex-col items-center text-center max-w-[280px] relative">
                {/* Step 3: Gentle Circular Reveal / Soft Emerald Glow Aura Ring */}
                <div className="absolute -top-4 w-44 h-44 rounded-full bg-emerald-500/15 blur-xl animate-splash-aura pointer-events-none" />
                <div className="absolute top-2 w-32 h-32 rounded-full border border-emerald-400/30 animate-splash-aura pointer-events-none" />

                {/* Step 1 & 2: Official SVG Logo with Smooth Fade-in + Scale-up */}
                <div className="relative mb-5 drop-shadow-lg animate-splash-logo z-10">
                  <OfficialLogo size={135} />
                </div>

                {/* Step 4: Staggered Fade-in of Foundation Name */}
                <h1 className="text-xl font-bold text-[#004D39] tracking-tight leading-tight z-10 animate-splash-title">
                  {APP_CONFIG.foundationName}
                </h1>

                {/* Step 5: Slogan Reveal Beneath Name */}
                <div className="mt-3 px-4 py-1.5 rounded-full bg-white/95 border border-emerald-100 shadow-xs z-10 animate-splash-slogan">
                  <p className="text-xs font-semibold text-[#EB1D27] font-['Hind_Siliguri',sans-serif]">
                    &quot;{APP_CONFIG.slogan}&quot;
                  </p>
                </div>

                {/* Step 6: Lightweight Progress Indicator Transitioning to Website */}
                <div className="w-28 h-1 bg-emerald-100/80 rounded-full overflow-hidden mt-7 z-10">
                  <div className="w-full h-full bg-[#006C50] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: MAIN PURE WEBSITE BROWSER INTERFACE */}
          {!isSplashActive && (
            <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
              {/* Thin Linear Progress Indicator at the very top (visible only during page load) */}
              {isLoading && (
                <div className="w-full h-[3px] bg-[#004D39] overflow-hidden z-30">
                  <div
                    className="h-full bg-[#EB1D27] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Main Fullscreen Dynamic Website Content Area */}
              <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
                {/* OFFLINE FALLBACK SCREEN (Req 11) */}
                {!isOnline && !cachedViewActive ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#F4FBF7] animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-white border border-emerald-100 flex items-center justify-center mb-3 shadow-xs">
                      <OfficialLogo size={52} />
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2">
                      <WifiOff className="w-3.5 h-3.5" />
                      ইন্টারনেট সংযোগ নেই
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">
                      No Internet Connection
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
                      Please check your internet connection and try again.
                      <br />
                      <span className="font-['Hind_Siliguri',sans-serif]">অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</span>
                    </p>

                    <div className="flex flex-col gap-2 w-full max-w-[200px] mt-5">
                      <button
                        onClick={handleRefresh}
                        className="w-full py-2.5 px-4 bg-[#006C50] hover:bg-[#004D39] active:scale-95 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        পুনরায় চেষ্টা করুন (Retry)
                      </button>
                      <button
                        onClick={() => {
                          setCachedViewActive(true);
                          showToast("সংরক্ষিত পৃষ্ঠা লোড করা হয়েছে");
                        }}
                        className="w-full py-2 px-3 text-[#006C50] hover:bg-emerald-50 active:scale-95 rounded-xl text-xs font-medium border border-emerald-200 transition-all cursor-pointer"
                      >
                        সংরক্ষিত পৃষ্ঠা দেখুন (View Cached)
                      </button>
                    </div>
                  </div>
                ) : (
                  /* FULLSCREEN WEBSITE: The actual Blogger site is displayed edge-to-edge!
                     Zero duplicate headers, banners, or bottom bars! (Req 2 & 3) */
                  <div className="w-full h-full relative flex-1">
                    <iframe
                      ref={iframeRef}
                      src={APP_CONFIG.websiteUrl}
                      title="Banshhata Foundation Official Website"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      onLoad={() => {
                        setIsLoading(false);
                      }}
                    />

                    {/* THE ONLY APP-CREATED MAIN UI ELEMENT:
                        Exactly ONE floating Contact button on the LEFT side of the screen! (Req 4 & UI Prompt)
                        - Small and elegant rounded design (50x50)
                        - Subtle shadow & soft emerald glow
                        - Color derived from official logo (#006C50)
                        - Clear contact/message icon
                        - Accessible touch target
                        - No persistent text label
                        - Subtle one-time entrance animation
                        - Pinned to the LEFT: never covers forms or conflicts with Blogger's right-side scroll-to-top button */}
                    <button
                      onClick={() => setIsContactPanelOpen(true)}
                      className="absolute bottom-6 left-4 z-40 w-12 h-12 rounded-full bg-[#006C50] hover:bg-[#004D39] active:scale-95 text-white shadow-lg flex items-center justify-center transition-all cursor-pointer group animate-fab-entry ring-2 ring-white/80"
                      style={{
                        boxShadow: '0 6px 18px -2px rgba(0, 108, 80, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
                      }}
                      title="যোগাযোগ করুন (Contact Foundation)"
                      aria-label="Contact Foundation"
                    >
                      <MessageSquare className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                    </button>
                  </div>
                )}
              </div>

              {/* NATIVE CONTACT PANEL / BOTTOM SHEET (Req 5 & Master Prompt Order) */}
              {isContactPanelOpen && (
                <div
                  onClick={() => setIsContactPanelOpen(false)}
                  className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center animate-fadeIn select-none"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-white rounded-t-[28px] p-5 shadow-2xl animate-slideUp text-left"
                    style={{
                      boxShadow: '0 -10px 30px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Top Drag Handle */}
                    <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

                    {/* Header with official logo & foundation identity */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 p-0.5 flex items-center justify-center shrink-0">
                          <OfficialLogo size={36} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm leading-tight">
                            {APP_CONFIG.foundationName}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#EB1D27] font-['Hind_Siliguri',sans-serif]">
                            &quot;{APP_CONFIG.slogan}&quot;
                          </p>
                        </div>
                      </div>

                      {/* Accessible Close Button */}
                      <button
                        onClick={() => setIsContactPanelOpen(false)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
                        title="Close contact panel"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Configurable Contact Actions - Exact Master Prompt Order:
                        1. Messenger (Preferred m.me URL)
                        2. Facebook Page
                        3. Phone Call
                        4. Email
                        5. WhatsApp (hidden when empty)
                        6. Share */}
                    <div className="space-y-1.5 text-xs">
                      {/* 1. Messenger Action (Preferred URL https://m.me/BanshhataFoundation) */}
                      <a
                        href={APP_CONFIG.preferredMessengerUrl || "https://m.me/BanshhataFoundation"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 active:bg-emerald-100/60 transition-all flex items-center gap-3 text-slate-800 group"
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-[#006C50] flex items-center gap-1.5">
                            মেসেঞ্জার (Messenger)
                            <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-1.5 py-0.2 rounded-full">পছন্দনীয়</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            m.me/BanshhataFoundation
                          </p>
                        </div>
                      </a>

                      {/* 2. Facebook Page Action */}
                      <a
                        href={APP_CONFIG.facebookFallbackUrl || APP_CONFIG.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 active:bg-emerald-100/60 transition-all flex items-center gap-3 text-slate-800 group"
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-[#006C50]">
                            ফেসবুক পেজ (Facebook Page)
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            facebook.com/BanshhataFoundation
                          </p>
                        </div>
                      </a>

                      {/* 3. Phone Call Action (Opens dialer with number prefilled) */}
                      <a
                        href={`tel:${APP_CONFIG.phone}`}
                        className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 active:bg-emerald-100/60 transition-all flex items-center gap-3 text-slate-800 group"
                      >
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#006C50] flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-[#006C50]">
                            কল করুন (Phone Call)
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            {APP_CONFIG.phoneDisplay}
                          </p>
                        </div>
                      </a>

                      {/* 4. Email Action */}
                      <a
                        href={`mailto:${APP_CONFIG.email}`}
                        className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 active:bg-emerald-100/60 transition-all flex items-center gap-3 text-slate-800 group"
                      >
                        <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-[#006C50]">
                            ইমেইল (Email)
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            {APP_CONFIG.email}
                          </p>
                        </div>
                      </a>

                      {/* 5. WhatsApp Action (HIDDEN by default until configured as per Section 5 & 19) */}
                      {APP_CONFIG.whatsappUrl && APP_CONFIG.whatsappUrl.trim() !== "" && (
                        <a
                          href={APP_CONFIG.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 active:bg-emerald-100/60 transition-all flex items-center gap-3 text-slate-800 group"
                        >
                          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Send className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 group-hover:text-[#006C50]">
                              হোয়াটসঅ্যাপ (WhatsApp)
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              অফিসিয়াল বার্তা
                            </p>
                          </div>
                        </a>
                      )}

                      {/* 6. Share Foundation Action */}
                      <button
                        onClick={() => {
                          setIsContactPanelOpen(false);
                          handleNativeShare();
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 active:bg-emerald-100/60 transition-all flex items-center gap-3 text-slate-800 group cursor-pointer text-left"
                      >
                        <div className="w-9 h-9 rounded-full bg-rose-50 text-[#EB1D27] flex items-center justify-center shrink-0">
                          <Share2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-[#006C50]">
                            ফাউন্ডেশন শেয়ার করুন (Share)
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            BanshhataFoundation.blogspot.com
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Android System 3-Button Navigation Bar (Hardware Simulation) */}
              <div className="h-6 bg-slate-950 flex items-center justify-center gap-14 select-none">
                {/* Back button */}
                <button
                  onClick={handleSystemBack}
                  className="w-4 h-4 border-2 border-slate-400 rotate-45 rounded-[2px] active:scale-90 transition-transform cursor-pointer"
                  title="System Back Button"
                  aria-label="Back"
                />
                {/* Home button */}
                <button
                  onClick={() => {
                    setIsContactPanelOpen(false);
                    if (iframeRef.current) {
                      iframeRef.current.src = APP_CONFIG.websiteUrl;
                    }
                  }}
                  className="w-4 h-4 rounded-full border-2 border-slate-400 active:scale-90 transition-transform cursor-pointer"
                  title="System Home Button"
                  aria-label="Home"
                />
                {/* Recents button */}
                <button
                  onClick={() => showToast("Banshhata Foundation App")}
                  className="w-4 h-4 rounded-[2px] border-2 border-slate-400 active:scale-90 transition-transform cursor-pointer"
                  title="System Recents Button"
                  aria-label="Recents"
                />
              </div>
            </div>
          )}

          {/* Interactive In-App Toast Notification */}
          {toastMessage && (
            <div className="absolute bottom-12 left-4 right-4 bg-slate-900/90 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 z-50 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
