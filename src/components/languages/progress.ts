"use client";

const KEY = "wf_language_progress_v1";

export type ProgressState = {
  xp: number;
  streakDays: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  completedLessonIds: string[];
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return { xp: 0, streakDays: 0, lastActiveDate: null, completedLessonIds: [] };
  }
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { xp: 0, streakDays: 0, lastActiveDate: null, completedLessonIds: [] };
  try {
    const p = JSON.parse(raw);
    return {
      xp: typeof p.xp === "number" ? p.xp : 0,
      streakDays: typeof p.streakDays === "number" ? p.streakDays : 0,
      lastActiveDate: typeof p.lastActiveDate === "string" ? p.lastActiveDate : null,
      completedLessonIds: Array.isArray(p.completedLessonIds) ? p.completedLessonIds : [],
    };
  } catch {
    return { xp: 0, streakDays: 0, lastActiveDate: null, completedLessonIds: [] };
  }
}

export function saveProgress(p: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function awardXp(lessonId: string, amount: number) {
  const p = loadProgress();
  const t = today();

  if (p.lastActiveDate === t) {
    // same day: streak unchanged
  } else {
    // naive streak increment (MVP)
    p.streakDays = p.streakDays + 1;
    p.lastActiveDate = t;
  }

  p.xp += amount;
  if (!p.completedLessonIds.includes(lessonId)) {
    p.completedLessonIds.push(lessonId);
  }
  saveProgress(p);
  return p;
}

