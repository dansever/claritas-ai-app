import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList } from "../navigation/types";
import { GradientBackground } from "../components/GradientBackground";
import { GlassCard } from "../components/GlassCard";
import { useTheme } from "../hooks/useTheme";
import { typography, spacing } from "../theme/theme";

type Props = NativeStackScreenProps<MainTabParamList, "Gratitude">;

interface GratitudeEntry {
  id: string;
  text: string;
  category: string;
  timestamp: number;
}

export const GratitudeScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const [newEntry, setNewEntry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);

  const categories = [
    { id: "general", label: "General" },
    { id: "people", label: "People" },
    { id: "experiences", label: "Experiences" },
    { id: "things", label: "Things" },
  ];

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      setEntries([
        {
          id: Date.now().toString(),
          text: newEntry.trim(),
          category: selectedCategory,
          timestamp: Date.now(),
        },
        ...entries,
      ]);
      setNewEntry("");
    }
  };

  return (
    <GradientBackground
      colors={[theme.gradientStart, theme.gradientMiddle, theme.gradientEnd]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            Gratitude Journal
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            What are you grateful for today?
          </Text>

          <GlassCard style={styles.inputCard}>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.primary }]}
              placeholder="I'm grateful for..."
              placeholderTextColor={theme.textSecondary}
              value={newEntry}
              onChangeText={setNewEntry}
              multiline
            />

            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        selectedCategory === category.id
                          ? theme.primary
                          : theme.surface,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      {
                        color:
                          selectedCategory === category.id
                            ? theme.surface
                            : theme.primary,
                      },
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={handleAddEntry}
            >
              <Text style={[styles.addButtonText, { color: theme.surface }]}>
                Add Entry
              </Text>
            </TouchableOpacity>
          </GlassCard>

          <View style={styles.entriesContainer}>
            {entries.map((entry) => (
              <GlassCard
                key={entry.id}
                style={{
                  ...styles.entryCard,
                  borderLeftColor: theme.primary,
                }}
              >
                <Text
                  style={[styles.entryCategory, { color: theme.textSecondary }]}
                >
                  {categories.find((c) => c.id === entry.category)?.label}
                </Text>
                <Text style={[styles.entryText, { color: theme.text }]}>
                  {entry.text}
                </Text>
                <Text
                  style={[styles.entryTimestamp, { color: theme.textSecondary }]}
                >
                  {new Date(entry.timestamp).toLocaleDateString()}
                </Text>
              </GlassCard>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    marginBottom: spacing.xl,
  },
  inputCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderRadius: spacing.md,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: spacing.md,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  categoryButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
  },
  addButton: {
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
  },
  entriesContainer: {
    gap: spacing.md,
  },
  entryCard: {
    padding: spacing.lg,
    borderLeftWidth: 4,
  },
  entryCategory: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  entryText: {
    fontSize: typography.sizes.md,
    marginBottom: spacing.sm,
  },
  entryTimestamp: {
    fontSize: typography.sizes.xs,
  },
}); 