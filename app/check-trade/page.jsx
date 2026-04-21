"use client";

import { useState } from "react";

export default function CheckTradePage() {
  const [showResult, setShowResult] = useState(false);

  return (
    <main style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Check This Trade</h1>

      <textarea
        defaultValue="Buy NVDA 950c Jun 21 on breakout above 925"
        style={{
          width: "100%",
          minHeight: "120px",
          marginTop: "16px",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #333",
          background: "#111",
          color: "#fff"
        }}
      />

      <button
        onClick={() => setShowResult(true)}
        style={{
          marginTop: "12px",
          padding: "12px 16px",
          borderRadius: "12px",
          border: "none",
          background: "#6C5CE7",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Check Trade
      </button>

      {showResult && (
        <div style={{ marginTop: "24px", padding: "16px", border: "1px solid #333", borderRadius: "12px" }}>
          <h2>Verdict: Weak setup</h2>

          <p>Timing is off — this trade is being taken without enough confirmation.</p>

          <h3>What’s not lining up</h3>
          <ul>
            <li>Missing confirmation</li>
            <li>Not worth the risk</li>
          </ul>

          <h3>Why</h3>
          <p>
            The trade is being considered before the setup has clearly confirmed.
            This increases the chance of entering too early and lowers the quality
            of the reward versus risk.
          </p>

          <h3>Better version</h3>
          <p>
            A better version would wait for confirmation and use a structure
            with more timing flexibility.
          </p>
        </div>
      )}
    </main>
  );
}
