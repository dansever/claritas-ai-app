import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Morning: undefined;
  Gratitude: undefined;
  Wellbeing: undefined;
  Evening: undefined;
  Profile: undefined;
};

export type MorningStackParamList = {
  MorningIntentions: undefined;
  AddIntention: undefined;
  ViewIntention: { id: string };
};

export type GratitudeStackParamList = {
  GratitudeJournal: undefined;
  AddGratitude: undefined;
  ViewGratitude: { id: string };
};

export type WellbeingStackParamList = {
  WellbeingCheck: undefined;
  AddWellbeing: undefined;
  ViewWellbeing: { id: string };
};

export type EveningStackParamList = {
  EveningReflection: undefined;
  AddReflection: undefined;
  ViewReflection: { id: string };
};
