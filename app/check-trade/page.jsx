"use client";

import { useMemo, useState } from "react";

type Verdict =
  | "Strong"
  | "Valid, but can be improved"
  | "Weak setup"
  | "Not worth taking";

type CheckTradeResult = {
  verdict: Verdict;
  oneLineSummary: string;
  whatsNotLiningUp: string[];
  why: string;
  betterVersion?: string;
};

const EXAMPLE_TRADE = "Buy NVDA 950c Jun 21 on breakout above 925";

const MOCK_RESULTS: CheckTradeResult[] = [
  {
    verdict: "Weak setup",
    oneLineSummary:
      "Timing is off — this trade is being taken without enough confirmation.",
    whatsNotLiningUp: ["Missing confirmation", "Not worth the risk"],
    why:
      "The trade is being considered before the setup has clearly confirmed. That increases the chance of entering too early and lowers the quality of the reward versus risk.",
    betterVersion:
      "A better version would wait for confirmation and use a structure with more timing flexibility.",
  },
  {
    verdict: "Valid, but can be improved",
    oneLineSummary:
      "The idea makes sense, but the current structure adds more timing pressure than it needs to.",
    whatsNotLiningUp: ["Timing is off", "Hard to execute"],
    why:
      "The overall direction may still work, but the current setup leaves less room for normal movement. That makes execution less forgiving and lowers setup quality.",
    betterVersion:
      "A better version would use more time or a cleaner trigger so the trade has more room to work.",
  },
  {
    verdict: "Strong",
    oneLineSummary:
      "This setup is aligned with the move and the structure is clean enough to pursue.",
    whatsNotLiningUp: [],
    why:
      "The trade has a defined trigger, a clear invalidation, and a structure that matches the idea. That improves timing clarity and keeps the setup easier to manage.",
    betterVersion:
      "No meaningful improvement — this structure is already efficient.",
  },
];

function getVerdictStyles(verdict: Verdict) {
  switch (verdict) {
    case "Strong":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-200";
    case "Valid, but can be improved":
      return "border-sky-500/30 bg-sky-500/10 text-sky-200";
    case "Weak setup":
      return "border-amber-500/30 bg-amber-500/10 text-amber-200";
    case "Not worth taking":
      return "border-rose-500/30 bg-rose-500/10 text-rose-200";
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-200";
  }
}

export default function CheckTradePage() {
  const [tradeText, setTradeText] = useState(EXAMPLE_TRADE);
  const [hasChecked, setHasChecked] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);

  const result = useMemo(() => MOCK_RESULTS[resultIndex], [resultIndex]);

  function handleCheckTrade() {
    const nextIndex = resultIndex === MOCK_RESULTS.length - 1 ? 0 : resultIndex + 1;
    setResultIndex(nextIndex);
    setHasChecked(true);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
            Enumra
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Check This Trade
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Paste any trade and know instantly if it’s worth taking—why, and how it could be structured better.
          </p>
        </header>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl shadow-black/20 sm:p-6">
          <label
            htmlFor="trade-input"
            className="mb-3 block text-sm font-medium text-zinc-200"
          >
            Paste your trade idea
          </label>

          <textarea
            id="trade-input"
            className="min-h-[148px] w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            value={tradeText}
            onChange={(e) => setTradeText(e.target.value)}
            placeholder="Example: Buy NVDA 950c Jun 21 on breakout above 925"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-zinc-400 sm:max-w-md">
              This prototype cycles through mock results so you can validate the core flow before wiring in parser logic or market data.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setTradeText(EXAMPLE_TRADE);
                  setHasChecked(false);
                  setResultIndex(0);
                }}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleCheckTrade}
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
              >
                Check Trade
              </button>
            </div>
          </div>
        </section>

        {hasChecked ? (
          <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-2xl shadow-black/20 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getVerdictStyles(
                  result.verdict,
                )}`}
              >
                Verdict: {result.verdict}
              </span>
            </div>

            <p className="mt-4 text-lg font-medium leading-7 text-zinc-100">
              {result.oneLineSummary}
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  What’s not lining up
                </h2>
                {result.whatsNotLiningUp.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-200">
                    {result.whatsNotLiningUp.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-7 text-zinc-200">
                    Nothing major is out of line in the current structure.
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Why
                </h2>
                <p className="mt-3 text-sm leading-7 text-zinc-200">{result.why}</p>
              </div>

              {result.betterVersion ? (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Better version
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-200">
                    {result.betterVersion}
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
            <p className="text-sm leading-7 text-zinc-400">
              Your result will appear here after you check a trade.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
