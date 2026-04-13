export type LanguageSlug =
  | "english"
  | "chinese"
  | "spanish"
  | "french"
  | "german"
  | "swahili";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const SUPPORTED_LANGUAGES: Array<{ slug: LanguageSlug; name: string }> = [
  { slug: "english", name: "English" },
  { slug: "chinese", name: "Chinese" },
  { slug: "spanish", name: "Spanish" },
  { slug: "french", name: "French" },
  { slug: "german", name: "German" },
  { slug: "swahili", name: "Swahili" },
];

export type LessonExercise =
  | {
      type: "mcq";
      prompt: string;
      choices: string[];
      answerIndex: number;
      explain?: string;
    }
  | {
      type: "match";
      prompt: string;
      pairs: Array<{ left: string; right: string }>;
      explain?: string;
    };

export type Lesson = {
  id: string;
  title: string;
  summary?: string;
  exercises: LessonExercise[];
};

export type Unit = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type LevelPlan = {
  level: CefrLevel;
  units: Unit[];
};

export type LanguagePlan = {
  lang: LanguageSlug;
  levels: LevelPlan[];
};

// MVP curriculum: small but complete route tree.
export const MVP_LANGUAGE_PLAN: LanguagePlan[] = SUPPORTED_LANGUAGES.map((l) => ({
  lang: l.slug,
  levels: (["A1", "A2", "B1", "B2", "C1", "C2"] as CefrLevel[]).map((level) => ({
    level,
    units: [
      {
        id: "1",
        title: "Unit 1 — Foundations",
        lessons: [
          {
            id: "1",
            title: "Lesson 1 — Greetings",
            summary: "Core greetings and simple introductions.",
            exercises: [
              {
                type: "mcq",
                prompt: "Choose the best greeting for a first meeting.",
                choices: ["Hey!", "Good morning.", "Later."],
                answerIndex: 1,
                explain: "Formal greetings are safest for first meetings.",
              },
              {
                type: "match",
                prompt: "Match the phrases.",
                pairs: [
                  { left: "Hello", right: "A greeting" },
                  { left: "Thank you", right: "Gratitude" },
                  { left: "Sorry", right: "Apology" },
                ],
              },
            ],
          },
          {
            id: "2",
            title: "Lesson 2 — Numbers",
            summary: "Numbers, quantities, and simple prices.",
            exercises: [
              {
                type: "mcq",
                prompt: "Pick the correct statement for '2 items'.",
                choices: ["Two items", "Second items", "Twice item"],
                answerIndex: 0,
              },
            ],
          },
        ],
      },
    ],
  })),
}));

export function getLanguageName(lang: LanguageSlug) {
  return SUPPORTED_LANGUAGES.find((x) => x.slug === lang)?.name ?? lang;
}

export function getLevelPlan(lang: LanguageSlug, level: CefrLevel) {
  return MVP_LANGUAGE_PLAN.find((p) => p.lang === lang)?.levels.find((l) => l.level === level) ?? null;
}

export function getUnit(lang: LanguageSlug, level: CefrLevel, unitId: string) {
  return getLevelPlan(lang, level)?.units.find((u) => u.id === unitId) ?? null;
}

export function getLesson(lang: LanguageSlug, level: CefrLevel, unitId: string, lessonId: string) {
  return getUnit(lang, level, unitId)?.lessons.find((ls) => ls.id === lessonId) ?? null;
}

