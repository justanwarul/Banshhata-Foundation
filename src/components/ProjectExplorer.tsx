import React, { useState } from 'react';
import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES, ProjectFile } from '../data/androidProjectFiles';
import {
  FolderArchive,
  FileCode,
  Download,
  Copy,
  Check,
  Search,
  Folder,
  FileText,
  File,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ProjectExplorer: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>("app/src/main/java/org/banshhata/foundation/config/AppConfig.kt");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const selectedFile = ANDROID_PROJECT_FILES.find(f => f.path === selectedFilePath) || ANDROID_PROJECT_FILES[0];

  const filteredFiles = ANDROID_PROJECT_FILES.filter(file =>
    file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = async () => {
    if (selectedFile) {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // One-Click Android Project Zip Exporter
  const handleDownloadZip = async () => {
    setIsZipping(true);
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
      setIsZipping(false);
    }
  };

  const getCategoryBadge = (category: ProjectFile['category']) => {
    switch (category) {
      case 'kotlin':
        return <span className="bg-purple-100 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Kotlin</span>;
      case 'gradle':
        return <span className="bg-blue-100 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Gradle</span>;
      case 'manifest':
        return <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Manifest</span>;
      case 'layout':
        return <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Layout XML</span>;
      case 'res':
        return <span className="bg-teal-100 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Resource</span>;
      case 'config':
        return <span className="bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Config</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">Docs</span>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Download Action Banner */}
      <div className="bg-gradient-to-r from-[#006C50] via-[#005a43] to-[#004D39] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs rounded-full text-xs font-semibold text-emerald-100 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Complete Android Studio Project Structure
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Download &amp; Build in Android Studio
          </h2>
          <p className="text-sm text-emerald-100 leading-relaxed">
            All files for <strong>Banshhata Foundation</strong> are generated according to official Android standards (Gradle 8.7, Kotlin, ViewBinding, Adaptive Icons, VectorDrawables, and ProGuard). Open directly in Android Studio to build your Debug APK, Release APK, or Google Play signed AAB!
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="shrink-0 bg-white hover:bg-emerald-50 active:scale-95 text-[#006C50] px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center gap-2.5 transition-all cursor-pointer disabled:opacity-60"
        >
          {isZipping ? (
            <>
              <div className="w-4 h-4 border-2 border-[#006C50] border-t-transparent rounded-full animate-spin" />
              প্রস্তুত হচ্ছে...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-[#006C50]" />
              Download Project (.ZIP)
            </>
          )}
        </button>
      </div>

      {/* Explorer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs">
        {/* Left Column: File Tree & Search */}
        <div className="lg:col-span-5 flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
          {/* Search Bar */}
          <div className="p-3 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="প্রজেক্ট ফাইল খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-xs rounded-xl border border-transparent focus:border-emerald-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Files List */}
          <div className="flex-1 overflow-y-auto max-h-[520px] p-2 space-y-1">
            {filteredFiles.map((file) => {
              const isSelected = file.path === selectedFilePath;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200 shadow-xs'
                      : 'hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#006C50]' : 'text-slate-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-[11.5px]">{file.path}</span>
                      {getCategoryBadge(file.category)}
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                      {file.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>মোট ফাইল: {ANDROID_PROJECT_FILES.length}টি</span>
            <span className="text-[11px] text-emerald-700 font-medium">100% Android Studio Ready</span>
          </div>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-7 flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 text-slate-100">
          {/* Code Header */}
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-semibold text-emerald-300 truncate">
                {selectedFile.path}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    কপি হয়েছে!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    কোড কপি করুন
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description banner */}
          <div className="px-4 py-2 bg-slate-800/60 border-b border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>{selectedFile.description}</span>
            {getCategoryBadge(selectedFile.category)}
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[500px] p-4 text-xs font-mono leading-relaxed text-slate-200 selection:bg-emerald-700 selection:text-white">
            <pre>
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
