"use client";

import { useOshen } from "@/lib/store";
import { IconCheck } from "./Icons";

export default function ToastHost() {
  const { toast } = useOshen();
  return (
    <div
      className={`fixed bottom-5 right-5 z-50 bg-ink3 border border-teal rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm max-w-[300px] transition-all duration-300 ${
        toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <IconCheck width="16" height="16" className="text-teal shrink-0" />
      <span>{toast}</span>
    </div>
  );
}
