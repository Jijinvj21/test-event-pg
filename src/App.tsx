import { useEffect } from "react";
import { Peakst8 } from "@peakst8/sdk";

const EVENT = {
  name: "Test The Full Flow",
  date: "Mon, Nov 23 – Mon, Nov 30",
  time: "10:00 AM — 6:00 PM IST",
  location: "Bengaluru, Bengaluru",
  description:
    "Join the Zerodha Team Marathon for a day of fitness, teamwork, and fun! Run alongside your colleagues, cheer each other on, and celebrate every step together. Choose between a Free ticket for complimentary entry and a Standard ticket for paid entry. Lace up and meet your team at the starting line!",
  categories: [
    { name: "Free Ticket", price: "FREE" },
    { name: "Standard (Paid)", price: "₹ 1" },
  ],
  club: "Team Zerodha",
};

export default function App() {
  useEffect(() => {
    const instance = new Peakst8({
      baseUrl: import.meta.env.VITE_BASE_URL,
      eventId: import.meta.env.VITE_EVENT_ID,
    });

    // The SDK adds the fixed Register bar (and spacer) at the bottom.
    instance.mount();

    return () => instance.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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
              TZ
            </div>
            <span className="text-lg font-medium text-slate-200">{EVENT.club}</span>
          </div>
        </section>
      </main>
    </div>
  );
}
