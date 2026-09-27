import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#292d27] bg-[#0d0f0c]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/fitlog-logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="fit-display text-xl font-bold tracking-[0.1em]">
            FITLOG
          </span>
        </div>
        <p className="text-xs tracking-[0.1em] text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
