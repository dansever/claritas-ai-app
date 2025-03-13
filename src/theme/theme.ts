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
    background: "#FFF6F0",
    text: "#2D3748",
    textSecondary: "#4A5568",
    surface: "#FFFFFF",
    surfaceHighlight: "#FFF0E6",
    gradientStart: "#FF7E5F",
    gradientMiddle: "#FEB47B",
    gradientEnd: "#FFE4C7",
  },
  day: {
    primary: "#4299E1",
    secondary: "#63B3ED",
    background: "#F7FAFC",
    text: "#2D3748",
    textSecondary: "#4A5568",
    surface: "#FFFFFF",
    surfaceHighlight: "#EBF8FF",
    gradientStart: "#4299E1",
    gradientMiddle: "#63B3ED",
    gradientEnd: "#90CDF4",
  },
  evening: {
    primary: "#805AD5",
    secondary: "#B794F4",
    background: "#FAF5FF",
    text: "#2D3748",
    textSecondary: "#4A5568",
    surface: "#FFFFFF",
    surfaceHighlight: "#F3E8FF",
    gradientStart: "#805AD5",
    gradientMiddle: "#B794F4",
    gradientEnd: "#D6BCFA",
  },
  night: {
    primary: "#2C5282",
    secondary: "#4A5568",
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
