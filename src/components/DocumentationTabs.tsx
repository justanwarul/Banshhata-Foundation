import React, { useState } from 'react';
import { APP_CONFIG } from '../config/foundationConfig';
import { OfficialLogo } from './OfficialLogo';
import {
  FileEdit,
  Play,
  UploadCloud,
  CheckSquare,
  Palette,
  ExternalLink,
  Code2,
  HelpCircle,
  Copy,
  Check,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export const DocumentationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'config' | 'apk' | 'aab' | 'playstore' | 'branding'>('config');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'config'
              ? 'bg-[#006C50] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          ১. কনফিগারেশন পরিবর্তন গাইড
        </button>

        <button
          onClick={() => setActiveTab('apk')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'apk'
              ? 'bg-[#006C50] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Play className="w-4 h-4" />
          ২. APK তৈরির নিয়ম (Debug &amp; Release)
        </button>

        <button
          onClick={() => setActiveTab('aab')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'aab'
              ? 'bg-[#006C50] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          ৩. Signed AAB তৈরি (Play Store)
        </button>

        <button
          onClick={() => setActiveTab('playstore')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'playstore'
              ? 'bg-[#006C50] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          ৪. Google Play পাবলিশিং চেকলিস্ট
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'branding'
              ? 'bg-[#006C50] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Palette className="w-4 h-4" />
          ৫. ব্র্যান্ড কালার ও লোগো বিশ্লেষণ
        </button>
      </div>

      {/* Tab 1: Configuration Guide */}
      {activeTab === 'config' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              ফাউন্ডেশনের তথ্য ও লিঙ্ক পরিবর্তনের নির্দেশিকা
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ভবিষ্যতে কোনো তথ্য পরিবর্তনের প্রয়োজন হলে পুরো প্রজেক্টে খোঁজাখুঁজি না করে নিচের নির্ধারিত ফাইলগুলোতে পরিবর্তন করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: AppConfig.kt */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#006C50]">
                  app/.../config/AppConfig.kt
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  প্রধান কনফিগ
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                এটি হলো কেন্দ্রীয় ফাইল। এখানে নিম্নলিখিত মানগুলো সহজেই পরিবর্তন করা যাবে:
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>WEBSITE_URL:</strong> ব্লগার সাইটের লিংক
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>FOUNDATION_NAME:</strong> ফাউন্ডেশনের ইংরেজি নাম
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>FOUNDATION_SLOGAN:</strong> মানবতার হাত বাড়াই...
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>PHONE_NUMBER:</strong> হেল্পলাইন ফোন নম্বর (+8801939391339)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>PREFERRED_MESSENGER_URL:</strong> সরাসরি মেসেঞ্জার চ্যাট (https://m.me/BanshhataFoundation)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>FACEBOOK_FALLBACK_URL:</strong> ফেসবুক পেজের লিংক
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>EMAIL_ADDRESS:</strong> banshhatafoundation@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>WHATSAPP_URL:</strong> হোয়াটসঅ্যাপ লিংক (বর্তমানে খালি/লুকায়িত)
                </li>
              </ul>
            </div>

            {/* Box 2: strings.xml */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">
                  app/src/main/res/values/strings.xml
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                  ইউজার ইন্টারফেস টেক্সট
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                অ্যাপের স্ক্রিনে প্রদর্শিত বাংলা লেখা, বোতামের নাম, অফলাইন মেসেজ এবং শেয়ার টেক্সট এখানে সংরক্ষিত:
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <strong>app_name:</strong> অ্যাপের নাম
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <strong>share_text:</strong> শেয়ার করার সময় যে বার্তা যাবে
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <strong>offline_message:</strong> অফলাইন স্ক্রিনের লেখা
                </li>
              </ul>
            </div>

            {/* Box 3: SVG Logo Location */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-900">
                  app/src/main/res/drawable/ic_foundation_logo.xml
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  লোগো ভেক্টর
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                আপনার দেওয়া অফিসিয়াল SVG লোগোটি এখানে ভেক্টর ড্রয়েবল (VectorDrawable) আকারে সংরক্ষিত আছে। এটি সব রেজোলিউশনে অত্যন্ত ঝকঝকে দেখায়।
              </p>
              <p className="text-[11px] text-amber-800 font-medium">
                অ্যাডাপ্টিভ আইকন: <code>res/mipmap-anydpi-v26/ic_launcher.xml</code>
              </p>
            </div>

            {/* Box 4: Maintenance Rule Reminder */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-rose-900">
                  গুরুত্বপূর্ণ রক্ষণাবেক্ষণ নীতি (Requirement 22)
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded-full">
                  Zero APK Rebuild
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                ফাউন্ডেশন অ্যাডমিনিস্ট্রেটররা যখন ব্লগার সাইটে কোনো দান ক্যাম্পেইন, নতুন পোস্ট, বিজ্ঞপ্তি বা প্রকল্প যোগ করবেন—<strong>অ্যাপটি পুনরায় বিল্ড বা প্লে স্টোরে আপডেট করতে হবে না</strong>। ব্যবহারকারীরা অ্যাপ চালু করলেই স্বয়ংক্রিয়ভাবে ওয়েবসাইটের সর্বশেষ তথ্য দেখতে পাবেন!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Build APK Guide */}
      {activeTab === 'apk' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Android Studio-তে APK তৈরির পদ্ধতি (Step-by-Step)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              নিজস্ব ফোনে ইনস্টল বা পরীক্ষামূলক টেস্ট করার জন্য Debug বা Release APK তৈরি করার সহজ নিয়ম।
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#006C50] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ১
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800">প্রজেক্ট ওপেন করুন</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ডাউনলোড করা <code>BanshhataFoundation-Android-Project.zip</code> ফাইলটি আনজিপ করুন। Android Studio খুলে <strong>File &gt; Open</strong>-এ গিয়ে আনজিপ করা ফোল্ডারটি সিলেক্ট করুন এবং Gradle সিঙ্ক সম্পন্ন হতে দিন।
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#006C50] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ২
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800">Debug APK তৈরি (Testing APK)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  উপরের মেনু থেকে <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong> চাপুন। কয়েক সেকেন্ডের মধ্যে বিল্ড শেষ হলে নোটিফিকেশনে <strong>locate</strong> লিংকে ক্লিক করলেই আপনার <code>app-debug.apk</code> ফাইলটি পেয়ে যাবেন।
                </p>
                <div className="p-2 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg mt-1">
                  app/build/outputs/apk/debug/app-debug.apk
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#006C50] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ৩
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800">ফোনে টেস্ট ও ইনস্টল করুন</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  তৈরি হওয়া <code>app-debug.apk</code> ফাইলটি আপনার ফোনে পাঠিয়ে ইনস্টল করুন। অ্যাপটি সম্পূর্ণ বিজ্ঞাপনমুক্ত, সুরক্ষিত এবং হালকা ওজনের হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Build AAB Guide */}
      {activeTab === 'aab' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Google Play Store-এর জন্য Signed AAB তৈরির নিয়ম
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              গুগল প্লে স্টোরে অ্যাপ পাবলিশ করতে Android App Bundle (.aab) ফরম্যাট আবশ্যক।
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-sm text-[#006C50] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                কীস্টোর (Keystore) কী এবং কেন প্রয়োজন?
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                কীস্টোর হলো একটি ডিজিটাল চাবি যা নিশ্চিত করে আপনিই এই অ্যাপটির আসল মালিক। ভবিষ্যতে যেকোনো নতুন আপডেট দিতে এই একই কীস্টোর ফাইল প্রয়োজন হবে।
              </p>
            </div>

            <ol className="space-y-3 text-xs text-slate-700">
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>পদক্ষেপ ১:</strong> Android Studio-এর মেনু থেকে <strong>Build &gt; Generate Signed Bundle / APK</strong> নির্বাচন করুন।
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>পদক্ষেপ ২:</strong> <strong>Android App Bundle</strong> অপশনে টিক দিয়ে <strong>Next</strong> চাপুন।
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>পদক্ষেপ ৩:</strong> নতুন হলে <strong>Create new...</strong> চাপুন এবং আপনার কীস্টোরের একটি নাম (যেমন: <code>banshhata-release.jks</code>) ও পাসওয়ার্ড সেট করুন।
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>পদক্ষেপ ৪:</strong> Build Variant হিসেবে <strong>release</strong> সিলেক্ট করুন এবং <strong>Finish</strong> চাপুন।
              </li>
              <li className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>পদক্ষেপ ৫:</strong> বিল্ড সম্পন্ন হলে আপনার AAB ফাইলটি এখানে পাবেন:
                <div className="p-2 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg mt-1.5">
                  app/build/outputs/bundle/release/app-release.aab
                </div>
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 4: Google Play Store Publishing Checklist */}
      {activeTab === 'playstore' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Google Play Console পাবলিশিং চেকলিস্ট
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              অ্যাপটি কোনো বাধা ছাড়াই প্রথম চান্সে গুগল প্লে কনসোলে অনুমোদন পাওয়ার পূর্ণাঙ্গ গাইড।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#006C50]" />
                ১. অ্যাপের নাম ও ট্যাগলাইন
              </h4>
              <p className="text-xs text-slate-600">
                <strong>App Name:</strong> Banshhata Foundation<br />
                <strong>Short Description:</strong> মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই<br />
                <strong>Category:</strong> Social Welfare / Non-profit
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#006C50]" />
                ২. বিজ্ঞাপন সংক্রান্ত ঘোষণা (Requirement 3)
              </h4>
              <p className="text-xs text-slate-600">
                Play Console-এর &quot;Ads&quot; সেকশনে গিয়ে নির্বাচন করবেন:
                <br />
                <span className="font-bold text-[#006C50]">&quot;No, my app does not contain ads&quot;</span>
                <br />
                (যেহেতু অ্যাপটি সম্পূর্ণ অলাভজনক ও বিজ্ঞাপনমুক্ত)।
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#006C50]" />
                ৩. প্রাইভেসি পলিসি (Privacy Policy)
              </h4>
              <p className="text-xs text-slate-600">
                ব্লগার সাইটের প্রাইভেসি পেজের লিংক দিন:
                <br />
                <code className="text-[11px] text-[#006C50]">
                  https://banshhatafoundation.blogspot.com/p/privacy-policy.html
                </code>
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-[#006C50]" />
                ৪. ডাটা সেফটি (Data Safety)
              </h4>
              <p className="text-xs text-slate-600">
                &quot;Does your app collect or share any user data?&quot; — নির্বাচন করবেন <strong>No</strong>। কোনো সংবেদনশীল তথ্য ট্র্যাক বা সংগ্রহ করা হয় না।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Brand Palette & Logo Analysis */}
      {activeTab === 'branding' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              অফিসিয়াল লোগো ও ব্র্যান্ড কালার প্যালেট বিশ্লেষণ
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ব্যবহারকারীর প্রদত্ত অফিসিয়াল SVG লোগো থেকে নিখুঁতভাবে রঙ ও ফর্ম বিশ্লেষণ করে সম্পূর্ণ অ্যাপ্লিকেশন সাজানো হয়েছে।
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-center shrink-0">
              <OfficialLogo size={140} />
            </div>

            <div className="space-y-4 flex-1">
              <h4 className="font-bold text-sm text-slate-800">
                কালার সিস্টেম স্পেসিফিকেশন (Hex Codes)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#006C50] shadow-xs shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">Primary Green</span>
                    <span className="text-[10px] font-mono text-slate-500">#006C50</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#EB1D27] shadow-xs shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">Accent Red</span>
                    <span className="text-[10px] font-mono text-slate-500">#EB1D27</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#004D39] shadow-xs shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">Dark Emerald</span>
                    <span className="text-[10px] font-mono text-slate-500">#004D39</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F4FBF7] border border-slate-200 shadow-xs shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">Background Mint</span>
                    <span className="text-[10px] font-mono text-slate-500">#F4FBF7</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] border border-slate-200 shadow-xs shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">Pure Surface</span>
                    <span className="text-[10px] font-mono text-slate-500">#FFFFFF</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#0F291E] shadow-xs shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">Text Deep Pine</span>
                    <span className="text-[10px] font-mono text-slate-500">#0F291E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
