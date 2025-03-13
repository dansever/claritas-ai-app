import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { GradientBackground } from "../components/GradientBackground";
import { useTheme } from "../hooks/useTheme";
import { GlassCard } from "../components/GlassCard";
import { typography, spacing } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  const handleLogin = () => {
    // TODO: Implement actual authentication
    navigation.replace("Main", { screen: "Morning" });
  };

  return (
    <GradientBackground
      colors={[theme.gradientStart, theme.gradientMiddle, theme.gradientEnd]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Claritas</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Your journey to mindful reflection
        </Text>

        <GlassCard style={styles.card}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: theme.surface }]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.textButton}>
            <Text
              style={[styles.textButtonText, { color: theme.textSecondary }]}
            >
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </GlassCard>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: "700",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.sizes.md,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  card: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
  },
  textButton: {
    padding: spacing.sm,
  },
  textButtonText: {
    fontSize: typography.sizes.sm,
  },
});
