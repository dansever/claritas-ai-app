import React from "react";
import { StyleSheet, ViewStyle, Pressable, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
  useSharedValue,
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
}

export const GlassCard: React.FC<GlassCardProps> = ({
  style,
  children,
  onPress,
  disabled = false,
}) => {
  const pressed = useSharedValue(0);
  const startY = useSharedValue(0);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        startY.value = 0;
      },
      onActive: (event) => {
        startY.value = event.translationY;
      },
      onEnd: () => {
        startY.value = withSpring(0);
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 0.98]);

    const translateY = interpolate(startY.value, [-50, 0, 50], [-10, 0, 10]);

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const handlePressIn = () => {
    "worklet";
    pressed.value = withSpring(1);
  };

  const handlePressOut = () => {
    "worklet";
    pressed.value = withSpring(0);
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={!disabled}>
      <AnimatedPressable
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
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
