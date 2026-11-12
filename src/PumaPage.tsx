import { useEffect } from "react";
import { Peakst8 } from "@peakst8/sdk";

export default function PumaPage() {
  useEffect(() => {
    const instance = new Peakst8({
      baseUrl: import.meta.env.VITE_BASE_URL,
      eventId:  import.meta.env.VITE_EVENT_ID_PUMA,
    });

    // The SDK adds the fixed Register bar (and spacer) at the bottom.
    instance.mount();

    return () => instance.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <a href="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
          ← Back to Test The Full Flow
        </a>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">Puma Project 3</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-400">
          Second test page: the same SDK, mounted with event id <code>puma-project3</code>.
        </p>
      </div>
    </div>
  );
}
