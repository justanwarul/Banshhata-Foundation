export interface FoundationConfig {
  foundationName: string;
  foundationNameBengali: string;
  slogan: string;
  websiteUrl: string;
  messengerUrl: string;
  preferredMessengerUrl: string;
  facebookFallbackUrl: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  facebookUrl: string;
  whatsappUrl: string;
  appVersion: string;
  versionCode: number;
  applicationId: string;
  branding: {
    primaryGreen: string;
    primaryGreenDark: string;
    primaryGreenLight: string;
    accentRed: string;
    accentRedHover: string;
    backgroundTint: string;
    surface: string;
    textDark: string;
    textMuted: string;
  };
}

export const APP_CONFIG: FoundationConfig = {
  foundationName: "Banshhata Foundation",
  foundationNameBengali: "বাঁশহাটা ফাউন্ডেশন",
  slogan: "মানবতার হাত বাড়াই, অসহায়ের পাশে দাঁড়াই",
  websiteUrl: "https://BanshhataFoundation.blogspot.com/",
  messengerUrl: "https://m.me/BanshhataFoundation",
  preferredMessengerUrl: "https://m.me/BanshhataFoundation",
  facebookFallbackUrl: "https://www.facebook.com/BanshhataFoundation",
  phone: "+8801939391339",
  phoneDisplay: "+880 1939-391339",
  email: "banshhatafoundation@gmail.com",
  facebookUrl: "https://www.facebook.com/BanshhataFoundation",
  whatsappUrl: "", // Kept empty until official destination is configured
  appVersion: "1.0.0",
  versionCode: 1,
  applicationId: "org.banshhata.foundation",
  branding: {
    primaryGreen: "#006C50",      // Official SVG emerald green
    primaryGreenDark: "#004D39",  // Deep emerald for app bar/headers
    primaryGreenLight: "#008F6A", // Vibrant green accent
    accentRed: "#EB1D27",         // Official SVG red (humanity/heart)
    accentRedHover: "#C4131D",
    backgroundTint: "#F4FBF7",    // Soft pastel mint background
    surface: "#FFFFFF",
    textDark: "#0F291E",
    textMuted: "#4A6358",
  }
};
