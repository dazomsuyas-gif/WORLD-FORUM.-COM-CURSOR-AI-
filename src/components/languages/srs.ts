"use client";

export type SrsGrade = "again" | "hard" | "good" | "easy";

export type SrsCardState = {
  id: string;
  dueAt: number; // epoch ms
  intervalDays: number;
  ease: number; // 1.3..2.8 (mvp)
  reps: number;
  lapses: number;
  lastReviewedAt: number | null;
};

type Store = Record<string, SrsCardState>;

const KEY = "wf_srs_v1";

function loadStore(): Store {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Store;
  } catch {
    return {};
  }
}

function saveStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(store));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function getCardState(cardId: string): SrsCardState {
  const store = loadStore();
  const existing = store[cardId];
  if (existing) return existing;
  const now = Date.now();
  const fresh: SrsCardState = {
    id: cardId,
    dueAt: now,
    intervalDays: 0,
    ease: 2.2,
    reps: 0,
    lapses: 0,
    lastReviewedAt: null,
  };
  store[cardId] = fresh;
  saveStore(store);
  return fresh;
}

export function reviewCard(cardId: string, grade: SrsGrade): SrsCardState {
  const store = loadStore();
  const prev = store[cardId] ?? getCardState(cardId);
  const now = Date.now();

  let ease = prev.ease;
  let intervalDays = prev.intervalDays;
  let reps = prev.reps + 1;
  let lapses = prev.lapses;

  if (grade === "again") {
    lapses += 1;
    ease = clamp(ease - 0.2, 1.3, 2.8);
    intervalDays = 0;
  } else if (grade === "hard") {
    ease = clamp(ease - 0.05, 1.3, 2.8);
    intervalDays = intervalDays <= 0 ? 0.5 : intervalDays * 1.2;
  } else if (grade === "good") {
    intervalDays = intervalDays <= 0 ? 1 : intervalDays * ease;
  } else if (grade === "easy") {
    ease = clamp(ease + 0.08, 1.3, 2.8);
    intervalDays = intervalDays <= 0 ? 2 : intervalDays * (ease + 0.15);
  }

  // Convert days to ms (support fractional days).
  const dueAt = now + intervalDays * 24 * 60 * 60 * 1000;

  const next: SrsCardState = {
    id: cardId,
    dueAt,
    intervalDays,
    ease,
    reps,
    lapses,
    lastReviewedAt: now,
  };

  store[cardId] = next;
  saveStore(store);
  return next;
}

export function getDueCards(cardIds: string[], now = Date.now()) {
  const store = loadStore();
  const due: string[] = [];
  for (const id of cardIds) {
    const s = store[id] ?? null;
    if (!s || s.dueAt <= now) due.push(id);
  }
  return due;
}

