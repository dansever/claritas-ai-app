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
  ViewStyle,
  TextStyle,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList } from "../navigation/types";
import { GradientBackground } from "../components/GradientBackground";
import { GlassCard } from "../components/GlassCard";
import { useTheme } from "../hooks/useTheme";
import { typography, spacing } from "../theme/theme";

type Props = NativeStackScreenProps<MainTabParamList, "Morning">;

interface Intention {
  id: string;
  text: string;
  type: "goal" | "excitement" | "concern";
}

export const MorningScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const [newIntention, setNewIntention] = useState("");
  const [selectedType, setSelectedType] = useState<Intention["type"]>("goal");
  const [intentions, setIntentions] = useState<Intention[]>([]);

  const handleAddIntention = () => {
    if (newIntention.trim()) {
      setIntentions([
        ...intentions,
        {
          id: Date.now().toString(),
          text: newIntention.trim(),
          type: selectedType,
        },
      ]);
      setNewIntention("");
    }
  };

  const cardStyle: ViewStyle = {
    ...styles.intentionCard,
    borderLeftColor: theme.primary,
  };

  const renderIntentionCard = (intention: Intention) => (
    <GlassCard key={intention.id} style={cardStyle}>
      <Text style={[styles.intentionType, { color: theme.primary }]}>
        {intention.type.charAt(0).toUpperCase() + intention.type.slice(1)}
      </Text>
      <Text style={[styles.intentionText, { color: theme.text }]}>
        {intention.text}
      </Text>
    </GlassCard>
  );

  const inputStyle: TextStyle = {
    ...styles.input,
    color: theme.text,
    borderColor: theme.primary,
  };

  const getTypeButtonStyle = (type: Intention["type"]): ViewStyle => ({
    ...styles.typeButton,
    backgroundColor: selectedType === type ? theme.primary : theme.surface,
  });

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
            Morning Intentions
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Set your intentions for the day ahead
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={inputStyle}
              placeholder="What's on your mind?"
              placeholderTextColor={theme.textSecondary}
              value={newIntention}
              onChangeText={setNewIntention}
              multiline
            />
            <View style={styles.typeButtons}>
              {(["goal", "excitement", "concern"] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={getTypeButtonStyle(type)}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      {
                        color:
                          selectedType === type ? theme.surface : theme.primary,
                      },
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={handleAddIntention}
            >
              <Text style={[styles.addButtonText, { color: theme.surface }]}>
                Add Intention
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.intentionsContainer}>
            {intentions.map(renderIntentionCard)}
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
  inputContainer: {
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
  typeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  typeButton: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  typeButtonText: {
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
  intentionsContainer: {
    gap: spacing.md,
  },
  intentionCard: {
    borderLeftWidth: 4,
  },
  intentionType: {
    fontSize: typography.sizes.sm,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  intentionText: {
    fontSize: typography.sizes.md,
  },
});
