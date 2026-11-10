import { useEffect, useRef, useState } from "react";
import { Peakst8 } from "@jijin_vj_25/sdk";

const EVENT = {
  name: "Test The Full Flow",
  date: "Nov 15, 2026",
  time: "10:00 AM — 6:00 PM IST",
  location: "KTPO Convention Centre, Bengaluru",
  description:
    "A hands-on workshop covering everything from registration to payment checkout. This is a test event created to verify the Peakst8 SDK end-to-end flow — authentication, registration, Razorpay payment, and ticket generation all running inside the embedded iframe.",
  categories: [
    { name: "General Admission", price: "FREE" },
    { name: "VIP Experience", price: "₹ 999 + GST" },
  ],
  club: "Peakst8",
};

type LogEntry = { time: string; type: string; detail: string };

export default function App() {
  const sdk = useRef<Peakst8 | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showLog, setShowLog] = useState(false);

  const push = (type: string, detail: string) =>
    setLogs((l) =>
      [{ time: new Date().toLocaleTimeString(), type, detail }, ...l].slice(0, 50),
    );

  useEffect(() => {
    const instance = new Peakst8({
      baseUrl: import.meta.env.VITE_BASE_URL,
      debug: true,
    });

    const events = [
      "iframe:ready",
      "iframe:loaded",
      "registration:success",
      "payment:success",
      "payment:failed",
      "auth:success",
      "sdk:error",
      "embed:resize",
    ] as const;

    for (const event of events) {
      instance.on(event, (e) => {
        push(event, JSON.stringify(e.payload ?? {}));
        if (event === "registration:success") {
          setBanner({ type: "success", text: "Registration successful!" });
        } else if (event === "payment:success") {
          setBanner({ type: "success", text: "Payment completed! Your ticket is confirmed." });
        } else if (event === "payment:failed") {
          setBanner({
            type: "error",
            text: `Payment issue: ${(e.payload as Record<string, string>)?.reason ?? "unknown"}`,
          });
        }
      });
    }

    sdk.current = instance;

    if (barRef.current) {
      instance.mount(barRef.current, {
        path: `/event/${import.meta.env.VITE_EVENT_ID}/embed`,
        height: "90px",
        width: "100%",
      });
    }

    return () => instance.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Banner */}
      {banner && (
        <div
          className={`fixed top-0 inset-x-0 z-50 px-4 py-3 text-center text-sm font-medium ${
            banner.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {banner.text}
          <button
            onClick={() => setBanner(null)}
            className="ml-4 underline opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            {EVENT.date} · {EVENT.location.split(",")[1]?.trim()}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {EVENT.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">{EVENT.description}</p>
          <button
            onClick={() => {
              const bar = document.querySelector<HTMLElement>(".peakst8-bar-wrapper");
              bar?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98]"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Info cards */}
      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { label: "Date", value: EVENT.date },
            { label: "Time", value: EVENT.time },
            { label: "Venue", value: EVENT.location },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-1 text-base font-medium text-slate-200">{value}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">About</h2>
          <p className="mt-3 leading-relaxed text-slate-400">{EVENT.description}</p>
        </section>

        {/* Categories */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">Categories</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EVENT.categories.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
              >
                <div>
                  <p className="font-medium text-slate-200">{cat.name}</p>
                  <p className="text-sm text-slate-500">1 Pass</p>
                </div>
                <span className="text-lg font-bold text-indigo-400">{cat.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Hosted by */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">Hosted by</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              P8
            </div>
            <span className="text-lg font-medium text-slate-200">{EVENT.club}</span>
          </div>
        </section>

        {/* Debug log */}
        <section className="mt-14">
          <button
            onClick={() => setShowLog((v) => !v)}
            className="text-sm font-medium text-slate-500 hover:text-slate-300"
          >
            {showLog ? "Hide" : "Show"} SDK event log ({logs.length})
          </button>
          {showLog && (
            <pre className="mt-3 max-h-64 overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-400">
              {logs.length === 0
                ? "(no events yet)"
                : logs.map((l, i) => (
                    <div key={i}>
                      <span className="text-slate-600">{l.time}</span>{" "}
                      <span className="text-indigo-400">{l.type}</span>{" "}
                      <span className="text-slate-500">{l.detail}</span>
                    </div>
                  ))}
            </pre>
          )}
        </section>
      </main>

      {/* Peakst8 SDK — inline CTA bar. The SDK sizes this container itself
          (90px for the bar, 100vh once the registration drawer opens); anchored
          to the bottom, a 100vh height covers the whole viewport. */}
      <div
        ref={barRef}
        className="peakst8-bar-wrapper fixed inset-x-0 bottom-0 z-40 overflow-hidden"
      />

      {/* Spacer for fixed bottom bar */}
      <div className="h-24" />
    </div>
  );
}
