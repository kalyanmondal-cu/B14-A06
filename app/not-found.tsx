import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-[70vh] place-items-center px-5"><div className="text-center"><p className="text-xs font-black uppercase tracking-[.3em] text-[#ccff00]">404 / ROUTE NOT FOUND</p><h1 className="fit-display mt-4 text-7xl font-black uppercase">Wrong Rep.</h1><p className="mt-4 text-zinc-500">This route does not exist in the FitLog library.</p><Link href="/" className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wider text-[#090a09]">Back to workouts</Link></div></main>;
}
