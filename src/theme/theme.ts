import { Platform } from "react-native";

export type ColorScheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textSecondary: string;
  surface: string;
  surfaceHighlight: string;
  gradientStart: string;
  gradientMiddle: string;
  gradientEnd: string;
};

export type ThemeType = {
  morning: ColorScheme;
  day: ColorScheme;
  evening: ColorScheme;
  night: ColorScheme;
};

export const theme: ThemeType = {
  morning: {
    primary: "#FF7E5F",
    secondary: "#FEB47B",
    background: "#FFF9F5",
    text: "#2D3748",
    textSecondary: "#4A5568",
    surface: "#FFFFFF",
    surfaceHighlight: "#FFF0E6",
    gradientStart: "#FF7E5F",
    gradientMiddle: "#FEB47B",
    gradientEnd: "#FFE4C7",
  },
  day: {
    primary: "#3182CE",
    secondary: "#63B3ED",
    background: "#F7FAFC",
    text: "#2D3748",
    textSecondary: "#4A5568",
    surface: "#FFFFFF",
    surfaceHighlight: "#EBF8FF",
    gradientStart: "#3182CE",
    gradientMiddle: "#63B3ED",
    gradientEnd: "#90CDF4",
  },
  evening: {
    primary: "#6B46C1",
    secondary: "#9F7AEA",
    background: "#FAF5FF",
    text: "#2D3748",
    textSecondary: "#4A5568",
    surface: "#FFFFFF",
    surfaceHighlight: "#F3E8FF",
    gradientStart: "#6B46C1",
    gradientMiddle: "#9F7AEA",
    gradientEnd: "#D6BCFA",
  },
  night: {
    primary: "#90CDF4",
    secondary: "#63B3ED",
    background: "#1A202C",
    text: "#F7FAFC",
    textSecondary: "#E2E8F0",
    surface: "#2D3748",
    surfaceHighlight: "#2A4365",
    gradientStart: "#1A365D",
    gradientMiddle: "#2C5282",
    gradientEnd: "#2A4365",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  families: {
    sans: Platform.select({
      ios: "SF Pro Display",
      android: "Roboto",
      default: "System",
    }),
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};
