import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList } from "../navigation/types";
import { GradientBackground } from "../components/GradientBackground";
import { GlassCard } from "../components/GlassCard";
import { useTheme } from "../hooks/useTheme";
import { typography, spacing } from "../theme/theme";

type Props = NativeStackScreenProps<MainTabParamList, "Profile">;

interface SettingItem {
  id: string;
  title: string;
  description: string;
  type: "toggle" | "action";
  value?: boolean;
  onPress?: () => void;
}

export const ProfileScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const [settings, setSettings] = React.useState<SettingItem[]>([
    {
      id: "1",
      title: "Daily Reminders",
      description: "Receive notifications for daily reflections",
      type: "toggle",
      value: true,
    },
    {
      id: "2",
      title: "AI Insights",
      description: "Enable AI-powered analysis of your reflections",
      type: "toggle",
      value: true,
    },
    {
      id: "3",
      title: "Export Data",
      description: "Download your journal entries and insights",
      type: "action",
      onPress: () => {
        // TODO: Implement data export
      },
    },
    {
      id: "4",
      title: "Privacy Policy",
      description: "Read about how we protect your data",
      type: "action",
      onPress: () => {
        // TODO: Open privacy policy
      },
    },
  ]);

  const handleToggle = (id: string) => {
    setSettings(
      settings.map((item) =>
        item.id === id && item.type === "toggle"
          ? { ...item, value: !item.value }
          : item
      )
    );
  };

  const renderSettingItem = (item: SettingItem) => (
    <GlassCard key={item.id} style={styles.settingCard}>
      <View style={styles.settingContent}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text
            style={[styles.settingDescription, { color: theme.textSecondary }]}
          >
            {item.description}
          </Text>
        </View>
        {item.type === "toggle" ? (
          <Switch
            value={item.value}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
            thumbColor={theme.surface}
          />
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.primary }]}
            onPress={item.onPress}
          >
            <Text style={[styles.actionButtonText, { color: theme.surface }]}>
              View
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </GlassCard>
  );

  return (
    <GradientBackground
      colors={[theme.gradientStart, theme.gradientMiddle, theme.gradientEnd]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Customize your experience
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          {settings.map(renderSettingItem)}
        </View>

        <GlassCard style={styles.versionCard}>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            Claritas v1.0.0
          </Text>
        </GlassCard>
      </ScrollView>
    </GradientBackground>
  );
};

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
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
  },
  settingsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  settingCard: {
    padding: spacing.lg,
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.sizes.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  actionButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
  },
  versionCard: {
    padding: spacing.md,
    alignItems: "center",
  },
  versionText: {
    fontSize: typography.sizes.sm,
  },
});
