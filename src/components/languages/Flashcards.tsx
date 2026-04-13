"use client";

import { useMemo, useState } from "react";
import { getDueCards, getCardState, reviewCard, type SrsGrade } from "./srs";
import { Reveal } from "@/components/motion/Reveal";

export type Flashcard = {
  id: string;
  front: string;
  back: string;
};

function GradeButton(props: {
  grade: SrsGrade;
  label: string;
  className: string;
  style?: React.CSSProperties;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.label}
    </button>
  );
}

export function Flashcards(props: { deckId: string; cards: Flashcard[] }) {
  const { deckId, cards } = props;
  const allIds = useMemo(() => cards.map((c) => `${deckId}:${c.id}`), [cards, deckId]);
  const [reviewOnlyDue, setReviewOnlyDue] = useState(true);
  const [frontFirst, setFrontFirst] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [bump, setBump] = useState(0);

  const idsToStudy = useMemo(() => {
    const ids = reviewOnlyDue ? getDueCards(allIds) : allIds;
    return ids;
  }, [allIds, reviewOnlyDue, bump]);

  const activeId = idsToStudy[cursor] ?? null;
  const activeCard = useMemo(() => {
    if (!activeId) return null;
    const rawId = activeId.replace(`${deckId}:`, "");
    return cards.find((c) => c.id === rawId) ?? null;
  }, [activeId, cards, deckId]);

  const stats = useMemo(() => {
    const due = getDueCards(allIds).length;
    return { total: allIds.length, due };
  }, [allIds, bump]);

  const state = activeId ? getCardState(activeId) : null;

  const grade = (g: SrsGrade) => {
    if (!activeId) return;
    reviewCard(activeId, g);
    setRevealed(false);
    setCursor((c) => c + 1);
    setBump((x) => x + 1);
  };

  return (
    <div className="grid gap-5">
      <div className="glass p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="text-white/70">
            Deck: <span className="text-white/90 font-semibold">{deckId}</span>
          </div>
          <div className="text-white/55">
            Due: <span className="text-white/85">{stats.due}</span> /{" "}
            <span className="text-white/85">{stats.total}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setReviewOnlyDue((v) => !v);
              setCursor(0);
              setRevealed(false);
              setBump((x) => x + 1);
            }}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/10"
          >
            {reviewOnlyDue ? "Review: due only" : "Review: all cards"}
          </button>
          <button
            type="button"
            onClick={() => {
              setFrontFirst((v) => !v);
              setRevealed(false);
            }}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/10"
          >
            {frontFirst ? "Mode: term → meaning" : "Mode: meaning → term"}
          </button>
        </div>
      </div>

      {!activeCard ? (
        <div className="glass p-8 text-sm text-white/70">
          No cards to review right now. Come back later (or switch to “all cards”).
        </div>
      ) : (
        <Reveal>
          <div className="glass p-8">
            <div className="text-xs uppercase tracking-wider text-white/50">
              Card {Math.min(cursor + 1, idsToStudy.length)} / {idsToStudy.length}
            </div>

            <div className="mt-5 grid gap-4">
              <div className="text-2xl font-semibold text-white">
                {frontFirst ? activeCard.front : activeCard.back}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                {revealed ? (
                  <div className="text-base text-white/85">
                    {frontFirst ? activeCard.back : activeCard.front}
                  </div>
                ) : (
                  <div className="text-sm text-white/55">
                    Tap “Reveal answer” to check yourself.
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {!revealed ? (
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
                    style={{ background: "var(--grad-gold)" }}
                  >
                    Reveal answer
                  </button>
                ) : (
                  <>
                    <GradeButton
                      grade="again"
                      label="Again"
                      onClick={() => grade("again")}
                      className="rounded-full border border-red-400/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:border-red-400/50 hover:bg-red-500/15"
                    />
                    <GradeButton
                      grade="hard"
                      label="Hard"
                      onClick={() => grade("hard")}
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
                    />
                    <GradeButton
                      grade="good"
                      label="Good"
                      onClick={() => grade("good")}
                      className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/40 hover:bg-emerald-500/15"
                    />
                    <GradeButton
                      grade="easy"
                      label="Easy"
                      onClick={() => grade("easy")}
                      className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--midnight)]"
                      style={{ background: "var(--grad-gold)" }}
                    />
                  </>
                )}
              </div>

              {state ? (
                <div className="text-xs text-white/45">
                  interval: {state.intervalDays.toFixed(2)} days · ease:{" "}
                  {state.ease.toFixed(2)} · reps: {state.reps} · lapses:{" "}
                  {state.lapses}
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}

