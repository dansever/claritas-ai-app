import React, { forwardRef } from "react";
import { StyleSheet, ViewStyle, Pressable, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { shadows } from "../theme/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GlassCardProps {
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  intensity?: number;
}

const springConfig = {
  damping: 15,
  mass: 0.5,
  stiffness: 150,
};

const timingConfig = {
  duration: 150,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const GlassCard = forwardRef<Animated.View, GlassCardProps>(
  ({ style, children, onPress, disabled = false, intensity = 1 }, ref) => {
    const pressed = useSharedValue(0);
    const startY = useSharedValue(0);
    const scale = useSharedValue(1);

    const gestureHandler =
      useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: () => {
          startY.value = 0;
          scale.value = withSpring(0.98, springConfig);
        },
        onActive: (event) => {
          startY.value = event.translationY;
        },
        onEnd: () => {
          startY.value = withSpring(0, springConfig);
          scale.value = withSpring(1, springConfig);
        },
        onCancel: () => {
          startY.value = withSpring(0, springConfig);
          scale.value = withSpring(1, springConfig);
        },
      });

    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        startY.value,
        [-50, 0, 50],
        [-5 * intensity, 0, 5 * intensity]
      );

      return {
        transform: [{ scale: scale.value }, { translateY }],
        opacity: interpolate(pressed.value, [0, 1], [1, 0.9]),
      };
    });

    const handlePressIn = () => {
      "worklet";
      scale.value = withTiming(0.98, timingConfig);
      pressed.value = withTiming(1, timingConfig);
    };

    const handlePressOut = () => {
      "worklet";
      scale.value = withTiming(1, timingConfig);
      pressed.value = withTiming(0, timingConfig);
    };

    return (
      <PanGestureHandler onGestureEvent={gestureHandler} enabled={!disabled}>
        <AnimatedPressable
          ref={ref}
          style={[styles.card, style, animatedStyle]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
        >
          {children}
        </AnimatedPressable>
      </PanGestureHandler>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Platform.select({
      ios: "rgba(255, 255, 255, 0.8)",
      android: "rgba(255, 255, 255, 0.95)", // Higher opacity for Android due to lack of backdrop filter
    }),
    borderRadius: 20,
    padding: 16,
    margin: 8,
    ...Platform.select({
      ios: {
        ...shadows.md,
        backdropFilter: "blur(10px)",
      },
      android: {
        ...shadows.md,
        elevation: 4,
      },
    }),
  },
});
