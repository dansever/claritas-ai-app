import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface GradientBackgroundProps {
  colors: [string, string, ...string[]];
  style?: ViewStyle;
  children?: React.ReactNode;
  intensity?: number;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors,
  style,
  children,
  intensity = 1,
}) => {
  const animatedColors = useDerivedValue(() => {
    return colors.map((color, index) => {
      if (index === 0) return color;
      return interpolateColor(intensity, [0, 1], [colors[0], color]);
    }) as [string, string, ...string[]];
  }, [colors, intensity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(1, {
        damping: 20,
        stiffness: 90,
      }),
    };
  });

  return (
    <AnimatedLinearGradient
      colors={animatedColors.value}
      style={[styles.gradient, style, animatedStyle]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
