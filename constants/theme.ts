import { Platform } from "react-native";

const primaryColor = "#6B4BA6";
const accentColor = "#D4A574";

export const Colors = {
  light: {
    text: "#1F1F1F",
    textSecondary: "#666666",
    buttonText: "#FFFFFF",
    primary: primaryColor,
    accent: accentColor,
    success: "#4CAF50",
    tabIconDefault: "#999999",
    tabIconSelected: primaryColor,
    link: primaryColor,
    backgroundRoot: "#F8F7F4",
    backgroundDefault: "#FFFFFF",
    backgroundSecondary: "#F2F2F2",
    backgroundTertiary: "#E8E8E8",
  },
  dark: {
    text: "#F5F5F5",
    textSecondary: "#B0B0B0",
    buttonText: "#FFFFFF",
    primary: primaryColor,
    accent: accentColor,
    success: "#4CAF50",
    tabIconDefault: "#666666",
    tabIconSelected: primaryColor,
    link: primaryColor,
    backgroundRoot: "#1A1A2E",
    backgroundDefault: "#252540",
    backgroundSecondary: "#2F2F50",
    backgroundTertiary: "#3A3A60",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  countDisplay: {
    fontSize: 96,
    fontWeight: "700" as const,
  },
  counterName: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
