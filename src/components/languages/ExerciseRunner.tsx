"use client";

import { useMemo, useState } from "react";
import type { Lesson, LessonExercise } from "@/lib/languageAcademy";
import { awardXp, loadProgress } from "@/components/languages/progress";

function McqExercise(props: {
  ex: Extract<LessonExercise, { type: "mcq" }>;
  onCorrect: () => void;
}) {
  const { ex, onCorrect } = props;
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === ex.answerIndex;

  return (
    <div className="glass p-6">
      <div className="text-sm font-semibold text-white">{ex.prompt}</div>
      <div className="mt-4 grid gap-2">
        {ex.choices.map((c, i) => {
          const active = picked === i;
          const good = picked != null && i === ex.answerIndex;
          const bad = picked != null && active && !good;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setPicked(i)}
              className={[
                "rounded-xl border px-4 py-3 text-left text-sm transition",
                active
                  ? "border-white/25 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                good ? "outline outline-1 outline-emerald-400/50" : "",
                bad ? "outline outline-1 outline-red-400/50" : "",
              ].join(" ")}
            >
              <span className="text-white/85">{c}</span>
            </button>
          );
        })}
      </div>
      {picked != null ? (
        <div className="mt-4 text-sm">
          {correct ? (
            <div className="text-emerald-200">
              Correct.{" "}
              <button
                type="button"
                onClick={onCorrect}
                className="ml-2 text-[var(--gold)] hover:underline"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="text-red-200">
              Not quite. Try again.
              {ex.explain ? (
                <div className="mt-2 text-white/60">{ex.explain}</div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function MatchExercise(props: {
  ex: Extract<LessonExercise, { type: "match" }>;
  onCorrect: () => void;
}) {
  const { ex, onCorrect } = props;
  const [leftPicked, setLeftPicked] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});

  const left = ex.pairs.map((p) => p.left);
  const right = ex.pairs.map((p) => p.right);

  const done = Object.keys(matches).length === ex.pairs.length;
  const correct = done
    ? ex.pairs.every((p) => matches[p.left] === p.right)
    : false;

  return (
    <div className="glass p-6">
      <div className="text-sm font-semibold text-white">{ex.prompt}</div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          {left.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLeftPicked(l)}
              className={[
                "rounded-xl border px-4 py-3 text-left text-sm transition",
                leftPicked === l
                  ? "border-white/25 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
              ].join(" ")}
            >
              <div className="text-white/85">{l}</div>
              {matches[l] ? (
                <div className="mt-1 text-xs text-white/55">
                  matched: <span className="text-white/75">{matches[l]}</span>
                </div>
              ) : null}
            </button>
          ))}
        </div>
        <div className="grid gap-2">
          {right.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                if (!leftPicked) return;
                setMatches((m) => ({ ...m, [leftPicked]: r }));
                setLeftPicked(null);
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/85 transition hover:border-white/20 hover:bg-white/10"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm">
        {done ? (
          correct ? (
            <div className="text-emerald-200">
              Perfect match.{" "}
              <button
                type="button"
                onClick={onCorrect}
                className="ml-2 text-[var(--gold)] hover:underline"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="text-red-200">
              Some matches are wrong. Adjust and try again.
              {ex.explain ? (
                <div className="mt-2 text-white/60">{ex.explain}</div>
              ) : null}
            </div>
          )
        ) : (
          <div className="text-white/55">Pick a left item, then choose its match.</div>
        )}
      </div>
    </div>
  );
}

function FillExercise(props: {
  ex: Extract<LessonExercise, { type: "fill" }>;
  onCorrect: () => void;
}) {
  const { ex, onCorrect } = props;
  const [val, setVal] = useState("");
  const [checked, setChecked] = useState(false);

  const correct =
    checked &&
    val.trim().toLowerCase() === ex.answer.trim().toLowerCase();

  return (
    <div className="glass p-6">
      <div className="text-sm font-semibold text-white">{ex.prompt}</div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setChecked(false);
          }}
          placeholder={ex.placeholder ?? "Type answer"}
          className="glass w-full px-4 py-3 text-sm text-white/90 placeholder:text-white/40 outline-none"
        />
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:border-white/25 hover:bg-white/10"
        >
          Check
        </button>
      </div>

      {checked ? (
        <div className="mt-4 text-sm">
          {correct ? (
            <div className="text-emerald-200">
              Correct.{" "}
              <button
                type="button"
                onClick={onCorrect}
                className="ml-2 text-[var(--gold)] hover:underline"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="text-red-200">
              Not quite. Answer:{" "}
              <span className="text-white/90">{ex.answer}</span>
              {ex.explain ? (
                <div className="mt-2 text-white/60">{ex.explain}</div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function ExerciseRunner(props: { lessonKey: string; lesson: Lesson }) {
  const { lesson, lessonKey } = props;
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(() => loadProgress());

  const ex = lesson.exercises[idx];
  const isLast = idx === lesson.exercises.length - 1;

  const xpForLesson = useMemo(() => Math.max(10, lesson.exercises.length * 8), [lesson.exercises.length]);

  const onCorrect = () => {
    if (!isLast) {
      setIdx((i) => i + 1);
      return;
    }
    const updated = awardXp(lessonKey, xpForLesson);
    setProgress(updated);
  };

  const completed = progress.completedLessonIds.includes(lessonKey);

  return (
    <div className="grid gap-5">
      <div className="glass p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="text-white/70">
            XP: <span className="text-white/90 font-semibold">{progress.xp}</span>{" "}
            · Streak:{" "}
            <span className="text-white/90 font-semibold">{progress.streakDays}</span>
          </div>
          <div className="text-white/55">
            Exercise {Math.min(idx + 1, lesson.exercises.length)} / {lesson.exercises.length}
          </div>
        </div>
        {completed ? (
          <div className="mt-2 text-xs text-emerald-200">Lesson completed.</div>
        ) : null}
      </div>

      {ex.type === "mcq" ? (
        <McqExercise ex={ex} onCorrect={onCorrect} />
      ) : ex.type === "match" ? (
        <MatchExercise ex={ex} onCorrect={onCorrect} />
      ) : (
        <FillExercise ex={ex} onCorrect={onCorrect} />
      )}
    </div>
  );
}

