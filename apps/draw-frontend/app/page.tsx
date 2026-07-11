import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Grid2X2,
  Mail,
  MessageCircle,
  MousePointer2,
  PenLine,
  Plus,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featureList = [
  {
    title: "Precision Tools",
    copy: "Smart alignment, snapping, and vector-perfect paths.",
  },
  {
    title: "Global Assets",
    copy: "Share components and templates across different boards.",
  },
  {
    title: "Interactive Comments",
    copy: "Tag teammates directly on any object for focused feedback.",
  },
];

const collaborators = [
  { name: "Ali", color: "bg-[#2f80ed]", x: "left-[12%]", y: "top-[24%]" },
  { name: "Mira", color: "bg-[#27ae60]", x: "left-[28%]", y: "top-[6%]" },
  { name: "Jay", color: "bg-[#f2994a]", x: "left-[58%]", y: "top-[8%]" },
  { name: "Kim", color: "bg-[#9b51e0]", x: "right-[10%]", y: "top-[24%]" },
  { name: "Rio", color: "bg-[#eb5757]", x: "right-[4%]", y: "bottom-[28%]" },
  { name: "Noa", color: "bg-[#00a99d]", x: "left-[12%]", y: "bottom-[18%]" },
  { name: "Isha", color: "bg-[#111827]", x: "left-[56%]", y: "bottom-[8%]" },
];

function CanvasPreview() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
      <div className="flex h-10 items-center justify-between border-b border-slate-200 px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
          <span>72%</span>
          <span className="rounded-full bg-blue-600 px-2 py-1 text-white">Share</span>
        </div>
      </div>

      <div className="flex h-9 items-center gap-3 border-b border-slate-200 px-4 text-slate-400">
        <MousePointer2 size={14} />
        <PenLine size={14} />
        <Circle size={13} />
        <MessageCircle size={14} />
        <Plus size={14} />
      </div>

      <div className="relative aspect-[1648/898] bg-black">
        <Image
          src="/drawapp-preview.png"
          alt="Draw-App canvas sketch preview"
          fill
          priority
          className="object-contain"
          sizes="(min-width: 1024px) 820px, 100vw"
        />
      </div>
    </div>
  );
}

function TeamPreview() {
  return (
    <div className="relative min-h-[300px] overflow-hidden bg-[linear-gradient(#eef2f7_1px,transparent_1px),linear-gradient(90deg,#eef2f7_1px,transparent_1px)] bg-[size:22px_22px] shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
      <div className="absolute inset-x-8 top-9 h-px rotate-[-8deg] bg-slate-200" />
      <div className="absolute bottom-10 left-8 right-8 h-px rotate-[9deg] bg-slate-200" />

      <div className="absolute left-1/2 top-1/2 h-36 w-64 -translate-x-1/2 -translate-y-1/2 rounded-md border border-slate-300 bg-white shadow-xl">
        <div className="flex h-8 items-center justify-between border-b border-slate-200 px-3">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-200" />
            <span className="h-2 w-2 rounded-full bg-amber-200" />
          </div>
          <div className="h-2 w-14 rounded-full bg-slate-200" />
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="h-16 rounded-md border border-blue-200 bg-blue-50" />
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-slate-200" />
            <div className="h-2 rounded-full bg-slate-200" />
            <div className="h-2 w-2/3 rounded-full bg-slate-200" />
          </div>
          <div className="col-span-2 h-5 rounded-md bg-emerald-100" />
        </div>
      </div>

      {collaborators.map((person) => (
        <div
          key={person.name}
          className={`absolute ${person.x} ${person.y} flex flex-col items-center gap-1`}
        >
          <div
            className={`grid h-11 w-11 place-items-center rounded-full border-4 border-white text-xs font-bold text-white shadow-lg ${person.color}`}
          >
            {person.name.slice(0, 1)}
          </div>
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 shadow-sm">
            {person.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f6fa] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#073b8e]">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[#073b8e] text-white">
              <PenLine size={14} />
            </span>
            Draw-App
          </Link>
          <div className="hidden items-center gap-8 text-xs font-semibold text-slate-500 sm:flex">
            <Link href="/" className="border-b-2 border-[#073b8e] py-5 text-[#073b8e]">
              Home
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="text-xs font-semibold text-slate-600 hover:text-[#073b8e]">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-sm bg-[#073b8e] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#052f72]"
            >
              Create account
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-14 pt-12 text-center md:pt-16">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-normal text-slate-950 md:text-6xl">
          Visualize Ideas, Together.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Create diagrams, wireframes, and sketches on an infinite canvas. Collaborate in real time
          and turn thoughts into clear visuals.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-[#073b8e] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#052f72]"
          >
            Start Drawing <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 lg:grid-cols-[1fr_380px]">
        <CanvasPreview />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <article className="rounded-lg bg-[#0646ad] p-7 text-white shadow-[0_18px_45px_rgba(6,70,173,0.25)]">
            <div className="mb-8 grid h-9 w-9 place-items-center rounded-full bg-white/10">
              <Users size={20} />
            </div>
            <h2 className="text-xl font-bold">Live Sync</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-blue-50">
              See changes as they happen. Zero lag, 100% collaboration.
            </p>
            <Zap className="ml-auto mt-8 text-white/20" size={72} />
          </article>
          <article className="rounded-lg bg-[#e7e8ea] p-7 text-slate-950">
            <div className="mb-8 grid h-9 w-9 place-items-center rounded-full text-[#073b8e]">
              <Grid2X2 size={21} />
            </div>
            <h2 className="text-xl font-bold">Infinite Space</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              Don&apos;t let the screen limit your ideas. Pan and zoom across an endless canvas.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">
              Designed for modern teams.
            </h2>
            <div className="mt-7 space-y-5">
              {featureList.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 flex-none text-[#073b8e]" size={18} />
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{feature.title}</h3>
                    <p className="mt-1 max-w-md text-sm leading-6 text-slate-600">{feature.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TeamPreview />
        </div>
      </section>

      <footer className="bg-[#f4f6fa]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-bold text-slate-950">
            Draw-App
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <a
              href="https://github.com/anki7rJ"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 underline-offset-4 hover:text-[#073b8e] hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ankitraj-cse"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 underline-offset-4 hover:text-[#073b8e] hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:lab.devankit@gmail.com"
              className="inline-flex items-center gap-2 underline-offset-4 hover:text-[#073b8e] hover:underline"
            >
              <Mail size={16} /> Gmail
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
