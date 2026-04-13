"use client";

import { useMemo, useState } from "react";
import type { PaymentMethod } from "@/lib/payments";

export function PaymentMethodPicker(props: {
  methods: PaymentMethod[];
  onSelect?: (method: PaymentMethod) => void;
}) {
  const { methods, onSelect } = props;
  const [selected, setSelected] = useState<PaymentMethod | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, PaymentMethod[]>();
    for (const m of methods) {
      map.set(m.category, [...(map.get(m.category) ?? []), m]);
    }
    return Array.from(map.entries());
  }, [methods]);

  return (
    <div className="grid gap-5">
      {grouped.map(([cat, items]) => (
        <div key={cat} className="glass p-6">
          <div className="text-xs uppercase tracking-wider text-white/50">
            {cat}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {items.map((m) => {
              const active = selected?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelected(m);
                    onSelect?.(m);
                  }}
                  className={[
                    "text-left rounded-xl border px-4 py-3 transition",
                    active
                      ? "border-white/25 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white/90">
                      {m.name}
                    </div>
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: m.color }}
                      aria-hidden
                    />
                  </div>
                  <div className="mt-1 text-xs text-white/55">
                    ID: <span className="text-white/65">{m.id}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

