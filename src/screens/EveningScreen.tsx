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
import Animated, {
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<MainTabParamList, "Evening">;

interface ReflectionPrompt {
  id: string;
  question: string;
  category: "highlights" | "challenges" | "gratitude" | "tomorrow";
}

interface ReflectionEntry {
  id: string;
  promptId: string;
  answer: string;
  timestamp: number;
}

const AnimatedGlassCard = Animated.createAnimatedComponent(GlassCard);

const REFLECTION_PROMPTS: ReflectionPrompt[] = [
  {
    id: "1",
    question: "What was the best moment of your day?",
    category: "highlights",
  },
  {
    id: "2",
    question: "What challenged you today and what did you learn?",
    category: "challenges",
  },
  {
    id: "3",
    question: "What are you most grateful for today?",
    category: "gratitude",
  },
  {
    id: "4",
    question: "What would make tomorrow even better?",
    category: "tomorrow",
  },
];

export const EveningScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);

  const handleNext = () => {
    if (currentAnswer.trim()) {
      const newEntry: ReflectionEntry = {
        id: Date.now().toString(),
        promptId: REFLECTION_PROMPTS[currentPromptIndex].id,
        answer: currentAnswer.trim(),
        timestamp: Date.now(),
      };

      setEntries([newEntry, ...entries]);
      setCurrentAnswer("");

      if (currentPromptIndex < REFLECTION_PROMPTS.length - 1) {
        setCurrentPromptIndex(currentPromptIndex + 1);
      }
    }
  };

  const getPromptCardStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      opacity: withDelay(
        index * 200,
        withSpring(1, { damping: 20, stiffness: 90 })
      ),
      transform: [
        {
          scale: withDelay(
            index * 200,
            withSpring(1, { damping: 20, stiffness: 90 })
          ),
        },
      ],
    }));
  };

  const renderPromptCard = (prompt: ReflectionPrompt, index: number) => {
    const isActive = index === currentPromptIndex;
    const entry = entries.find((e) => e.promptId === prompt.id);
    const animatedStyle = getPromptCardStyle(index);

    return (
      <AnimatedGlassCard
        key={prompt.id}
        style={[
          styles.promptCard,
          {
            borderColor: isActive ? theme.primary : theme.surfaceHighlight,
            transform: [{ scale: 0.8 }],
          },
          animatedStyle,
        ]}
      >
        <Text style={[styles.promptCategory, { color: theme.primary }]}>
          {prompt.category.toUpperCase()}
        </Text>
        <Text style={[styles.promptQuestion, { color: theme.text }]}>
          {prompt.question}
        </Text>
        {entry && (
          <Text style={[styles.answer, { color: theme.textSecondary }]}>
            {entry.answer}
          </Text>
        )}
      </AnimatedGlassCard>
    );
  };

  const inputStyle: TextStyle = {
    ...styles.input,
    color: theme.text,
    borderColor: theme.primary,
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
            Evening Reflection
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Take a moment to reflect on your day
          </Text>

          <View style={styles.promptsContainer}>
            {REFLECTION_PROMPTS.map(renderPromptCard)}
          </View>

          {currentPromptIndex < REFLECTION_PROMPTS.length && (
            <View style={styles.inputContainer}>
              <TextInput
                style={inputStyle}
                placeholder="Share your thoughts..."
                placeholderTextColor={theme.textSecondary}
                value={currentAnswer}
                onChangeText={setCurrentAnswer}
                multiline
              />
              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: theme.primary }]}
                onPress={handleNext}
              >
                <Text style={[styles.nextButtonText, { color: theme.surface }]}>
                  {currentPromptIndex === REFLECTION_PROMPTS.length - 1
                    ? "Complete"
                    : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
  promptsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  promptCard: {
    padding: spacing.lg,
    borderWidth: 1,
  },
  promptCategory: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  promptQuestion: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  answer: {
    fontSize: typography.sizes.md,
    lineHeight: typography.sizes.md * 1.5,
  },
  inputContainer: {
    gap: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: spacing.md,
    padding: spacing.md,
    minHeight: 120,
    textAlignVertical: "top",
  },
  nextButton: {
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: "600",
  },
});
