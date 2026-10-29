import React, { useState } from 'react';
import { OfficialLogo } from './components/OfficialLogo';
import { AndroidEmulator } from './components/AndroidEmulator';
import { ProjectExplorer } from './components/ProjectExplorer';
import { DocumentationTabs } from './components/DocumentationTabs';
import { APP_CONFIG } from './config/foundationConfig';
import {
  Smartphone,
  FolderArchive,
  BookOpen,
  Palette,
  ExternalLink,
  Phone,
  MessageCircle,
  Download,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from './data/androidProjectFiles';

export default function App() {
  const [activeTab, setActiveTab] = useState<'emulator' | 'explorer' | 'guide' | 'brand'>('emulator');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleQuickDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const projectFolder = zip.folder("BanshhataFoundation");

      ANDROID_PROJECT_FILES.forEach(file => {
        projectFolder?.file(file.path, file.content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "BanshhataFoundation-Android-Project.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Failed to generate zip", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FBF7] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Official Header Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Emblem & Name */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 p-1 flex items-center justify-center shadow-xs">
              <OfficialLogo size={42} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#004D39] tracking-tight leading-none">
                  {APP_CONFIG.foundationName}
                </h1>
                <span className="hidden sm:inline-flex bg-emerald-100 text-[#006C50] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Android Official
                </span>
              </div>
              <p className="text-xs font-semibold text-[#006C50] mt-0.5 font-['Hind_Siliguri',sans-serif]">
                {APP_CONFIG.foundationNameBengali}
              </p>
            </div>
          </div>

          {/* Slogan Pill on Desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-[#EB1D27] font-semibold font-['Hind_Siliguri',sans-serif]">
            <Heart className="w-3.5 h-3.5 fill-[#EB1D27] text-[#EB1D27]" />
            &quot;{APP_CONFIG.slogan}&quot;
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleQuickDownloadZip}
              disabled={isDownloading}
              className="bg-[#006C50] hover:bg-[#004D39] active:scale-95 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              title="Download Android Studio Project Zip"
            >
              {isDownloading ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Project (.ZIP)</span>
            </button>

            <a
              href={APP_CONFIG.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all hidden md:flex items-center gap-1.5"
            >
              <span>ওয়েবসাইট</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('emulator')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'emulator'
                ? 'bg-[#006C50] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            লাইভ Android এমুলেটর
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'explorer'
                ? 'bg-[#006C50] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            Android Studio প্রজেক্ট ফাইল ({ANDROID_PROJECT_FILES.length})
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#006C50] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            APK / AAB ও প্লে স্টোর গাইড
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-[#006C50] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Palette className="w-4 h-4" />
            ব্র্যান্ড ও কালার বিশ্লেষণ
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'emulator' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#006C50] uppercase tracking-wider">
                Official Website Browser • Direct Fullscreen View • Single Left Contact Button
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004D39] tracking-tight">
                বাঁশহাটা ফাউন্ডেশন অফিশিয়াল মোবাইল অ্যাপ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
                অফিসিয়াল ব্লগার ওয়েবসাইটটি সম্পূর্ণ ফুলস্ক্রিনে প্রদর্শিত হচ্ছে। কোনো ডুপ্লিকেট হেডার বা নিচের নেভিগেশন বার নেই—বামপাশে রয়েছে সুবিধাজনক ফ্লোটিং যোগাযোগ বাটন।
              </p>
            </div>

            <AndroidEmulator />
          </div>
        )}

        {activeTab === 'explorer' && <ProjectExplorer />}

        {activeTab === 'guide' && <DocumentationTabs />}

        {activeTab === 'brand' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <DocumentationTabs />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-emerald-900/10 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <OfficialLogo size={24} />
            <p className="font-medium text-slate-700">
              {APP_CONFIG.foundationName} • {APP_CONFIG.foundationNameBengali}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006C50]" />
              ১০০% বিজ্ঞাপনমুক্ত ও অলাভজনক
            </span>
            <span>•</span>
            <span>Android SDK 34 / Gradle 8.7</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
