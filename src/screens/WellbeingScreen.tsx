import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ViewStyle,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList } from "../navigation/types";
import { GradientBackground } from "../components/GradientBackground";
import { GlassCard } from "../components/GlassCard";
import { useTheme } from "../hooks/useTheme";
import { typography, spacing } from "../theme/theme";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  interpolate,
  Easing,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Path, Circle } from "react-native-svg";

type Props = NativeStackScreenProps<MainTabParamList, "Wellbeing">;

interface WellbeingMetric {
  id: string;
  name: string;
  value: number;
  color: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const WellbeingScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const [metrics, setMetrics] = useState<WellbeingMetric[]>([
    { id: "1", name: "Mental Energy", value: 0.7, color: "#FF7E5F" },
    { id: "2", name: "Physical Energy", value: 0.8, color: "#4299E1" },
    { id: "3", name: "Emotional Balance", value: 0.6, color: "#805AD5" },
    { id: "4", name: "Overall Wellbeing", value: 0.75, color: "#48BB78" },
  ]);

  const waveOffset = useSharedValue(0);

  React.useEffect(() => {
    waveOffset.value = withRepeat(
      withSequence(
        withTiming(2 * Math.PI, { duration: 2000, easing: Easing.linear }),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const getWaveProps = (color: string) => {
    return useAnimatedProps(() => {
      const d = `
        M 0 ${50 + Math.sin(waveOffset.value) * 10}
        Q ${width / 4} ${50 + Math.cos(waveOffset.value) * 15},
          ${width / 2} ${50 + Math.sin(waveOffset.value) * 10},
          ${(width * 3) / 4} ${50 + Math.cos(waveOffset.value) * 15},
          ${width} ${50 + Math.sin(waveOffset.value) * 10}
        V 100
        H 0
        Z
      `;

      return {
        d,
        fill: color,
        opacity: 0.15,
        transform: [{ translateY: 0 }],
      };
    });
  };

  const renderCircularProgress = (metric: WellbeingMetric) => {
    const progress = useSharedValue(0);
    const size = width * 0.4;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    React.useEffect(() => {
      progress.value = withSpring(metric.value, {
        damping: 20,
        stiffness: 90,
      });
    }, [metric.value]);

    const circleProps = useAnimatedProps(() => ({
      strokeDashoffset: withSpring(
        circumference - progress.value * circumference,
        { damping: 20, stiffness: 90 }
      ),
    }));

    return (
      <GlassCard key={metric.id} style={styles.metricCard}>
        <Text style={[styles.metricName, { color: theme.text }]}>
          {metric.name}
        </Text>
        <View style={styles.progressContainer}>
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={theme.surfaceHighlight}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={metric.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              animatedProps={circleProps}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
          <Text style={[styles.progressText, { color: metric.color }]}>
            {Math.round(metric.value * 100)}%
          </Text>
        </View>
      </GlassCard>
    );
  };

  return (
    <GradientBackground
      colors={[theme.gradientStart, theme.gradientMiddle, theme.gradientEnd]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Wellbeing Check-In
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Track your energy and balance
        </Text>

        <View style={styles.waveContainer}>
          <Svg width={width} height={100} style={StyleSheet.absoluteFill}>
            {metrics.map((metric, index) => (
              <AnimatedPath
                key={metric.id}
                animatedProps={getWaveProps(metric.color)}
                transform={`translateY(${index * 10})`}
              />
            ))}
          </Svg>
        </View>

        <View style={styles.metricsContainer}>
          {metrics.map(renderCircularProgress)}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    marginBottom: spacing.xl,
  },
  waveContainer: {
    height: 100,
    marginBottom: spacing.xl,
    overflow: "hidden",
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  metricCard: {
    width: width / 2 - spacing.xl - spacing.md / 2,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  metricName: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  progressContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
