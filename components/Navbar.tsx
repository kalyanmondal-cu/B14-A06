"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "./FitLogProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const active = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-[#292d27] bg-[#090a09]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/fitlog-logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span className="fit-display text-2xl font-bold tracking-[0.08em]">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "/#library", label: "Workout" },
            { href: "/my-plan", label: "My Plan" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] transition ${active(item.href.split("#")[0]) ? "bg-white/10 text-[#ccff00]" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-[#090a09]"
          >
            Plan{" "}
            <span className="ml-1 rounded-full bg-black/10 px-1.5">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="rounded-full border border-[#3a3e36] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-zinc-200 hover:border-[#ccff00]/50"
          >
            Saved <span className="ml-1 text-[#ccff00]">{saved.length}</span>
          </Link>
        </div>
      </div>
      <nav className="flex border-t border-[#292d27] px-5 py-2 md:hidden">
        <Link
          href="/#library"
          className="flex-1 py-1 text-center text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className="flex-1 py-1 text-center text-xs font-bold uppercase tracking-[0.15em] text-zinc-400"
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
}
