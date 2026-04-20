"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Compass,
  Globe2,
  LayoutDashboard,
  Lock,
  Palette,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { getInstitutions } from "@/lib/api/institutions.api";
import { getPublishedPages } from "@/lib/api/pages.api";
import { useAuth } from "@/lib/context/AuthContext";

const featureCards = [
  {
    icon: Palette,
    title: "Design that feels intentional",
    description:
      "Replace generic layouts with a clear visual system built for universities, admissions, departments, and student-facing portals.",
  },
  {
    icon: Lock,
    title: "Role-aware publishing",
    description:
      "Keep admin, editor, and public experiences separate so teams can work fast without breaking the live campus site.",
  },
  {
    icon: Code2,
    title: "Server-driven pages",
    description:
      "Create and update pages without shipping a new frontend every time the content changes.",
  },
  {
    icon: Globe2,
    title: "Responsive by default",
    description:
      "The same structure adapts cleanly to mobile, tablet, and desktop so the campus experience stays consistent everywhere.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Open the dashboard",
    description:
      "Review institutions, published pages, and the latest activity from one clean control center.",
  },
  {
    step: "02",
    title: "Edit the page structure",
    description:
      "Use the builder to arrange content sections, update copy, and keep the campus voice consistent.",
  },
  {
    step: "03",
    title: "Publish instantly",
    description:
      "Push changes live without waiting on a separate build-heavy marketing workflow.",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loadedInstitutions, publishedPages] = await Promise.all([
          getInstitutions(),
          getPublishedPages(),
        ]);

        setInstitutions(
          Array.isArray(loadedInstitutions) ? loadedInstitutions : [],
        );
        setPages(Array.isArray(publishedPages) ? publishedPages : []);
      } catch (error) {
        console.error("Failed to fetch public data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const institutionCount = institutions.length;
  const pageCount = pages.length;
  const featuredPages = pages.slice(0, 10);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.14),transparent_25%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] px-6 py-10">
        <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center rounded-4xl border border-white/70 bg-white/70 p-8 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.28)] backdrop-blur-xl">
          <div className="flex items-center gap-4 text-slate-700">
            <div className="h-4 w-4 animate-pulse rounded-full bg-sky-500" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Loading CampusSync
              </p>
              <p className="text-base text-slate-600">
                Preparing the public homepage
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.12),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_42%,#ffffff_100%)] text-slate-900 selection:bg-sky-100 selection:text-sky-950">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full px-2 py-1 transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_18px_40px_-18px_rgba(15,23,42,0.8)]">
              <Bot className="h-6 w-6" />
            </span>
            <span className="text-lg font-black tracking-tight sm:text-xl">
              Campus<span className="text-sky-600">Sync</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <a
              href="#overview"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700"
            >
              Overview
            </a>
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700"
            >
              Features
            </a>
            <a
              href="#pages"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700"
            >
              Live pages
            </a>
            <a
              href="#workflow"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700"
            >
              Workflow
            </a>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.75)] transition-all hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-sky-700 sm:inline-flex"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.75)] transition-all hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section
          id="overview"
          className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-sky-700 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Campus website platform
              </div>

              <h1 className="max-w-xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[0.96]">
                A cleaner public face for your university.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                CampusSync gives institutions a modern homepage, a real
                publishing workflow, and a public directory of live pages that
                actually works.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={user ? "/dashboard" : "/register"}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.8)] transition-all hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {user ? "Open dashboard" : "Create an account"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#pages"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
                >
                  View live pages
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 rounded-[28px] border border-white/80 bg-white/75 p-4 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur-xl">
                <div>
                  <div className="text-3xl font-black tracking-tight text-slate-950">
                    {institutionCount || "0"}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Institutions
                  </div>
                </div>
                <div className="border-x border-slate-100 px-4">
                  <div className="text-3xl font-black tracking-tight text-slate-950">
                    {pageCount || "0"}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Published pages
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tight text-slate-950">
                    24/7
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Public access
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-sky-300/30 blur-3xl" />
              <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-indigo-300/25 blur-3xl" />

              <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-slate-950 p-4 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.85)]">
                <div className="flex items-center justify-between border-b border-white/10 px-2 pb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
                  <span>Campus view</span>
                  <span className="inline-flex items-center gap-2 text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-slate-900 via-slate-800 to-sky-900 p-3">
                    <img
                      src="/campus-hero.svg"
                      alt="Stylized campus illustration showing the platform experience"
                      className="h-full w-full rounded-[22px] object-cover"
                    />
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            Instant publishing
                          </p>
                          <p className="text-sm text-slate-300">
                            Update content without breaking the homepage.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            Working links
                          </p>
                          <p className="text-sm text-slate-300">
                            Every visible action leads to a real route or
                            section.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-200">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            Designed for teams
                          </p>
                          <p className="text-sm text-slate-300">
                            Admissions, academics, and admin can all share the
                            same system.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-700">
                Why this design works
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Clear hierarchy, strong contrast, and real campus utility.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                The page now leads with a proper product story, not a generic
                collage of cards. It shows the campus identity, the live system,
                and the actual entry points users need.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-[28px] border border-white/80 bg-white/85 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.32)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_28px_90px_-40px_rgba(14,165,233,0.3)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pages" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-700">
                  Published pages
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Home page should directly show your published project pages.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                  These are your real public routes. Each card opens the live
                  published page directly.
                </p>
              </div>

              <Link
                href={user ? "/dashboard" : "/login"}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
              >
                <Compass className="h-4 w-4" />
                {user ? "Manage pages" : "Staff login"}
              </Link>
            </div>

            <div className="mt-10">
              {featuredPages.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {featuredPages.map((page, index) => (
                    <Link
                      key={page._id}
                      href={`/${page.slug}?institutionId=${encodeURIComponent(page.institutionId)}`}
                      className="group overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_90px_-40px_rgba(59,130,246,0.32)]"
                    >
                      <div
                        className={`p-6 ${index % 3 === 0 ? "bg-slate-950" : index % 3 === 1 ? "bg-sky-700" : "bg-indigo-700"}`}
                      >
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/70">
                              Published page
                            </p>
                            <h3 className="mt-3 text-2xl font-black tracking-tight capitalize">
                              {page.name || page.slug}
                            </h3>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-sm leading-7 text-slate-600">
                          Adaptive server-driven UI for the {page.slug} portal.
                          Open the live route to verify the published
                          experience.
                        </p>
                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Live route
                          </span>
                          <span className="text-sm font-semibold text-sky-700 transition-transform group-hover:translate-x-0.5">
                            Visit site
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-4xl border border-dashed border-slate-300 bg-white/75 p-10 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
                    No published pages found
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    Publish at least one page from your dashboard and it will
                    appear here automatically.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="workflow" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-700">
                Workflow
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                A homepage that shows how the product actually works.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                The left side explains the platform. The right side visualizes
                the platform. The page stays direct, polished, and grounded in
                the project's purpose.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/80 bg-slate-950 p-6 text-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.8)]">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                  <Sparkles className="h-4 w-4" />
                  Project value
                </div>
                <p className="mt-4 text-xl font-bold leading-8 text-white">
                  A useful landing page should make the product easy to
                  understand, easy to trust, and easy to enter.
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  That is why the new front page uses strong contrast, a
                  dedicated campus illustration, and only real navigation paths.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {workflowSteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-5 rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.3)] backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/85 px-4 py-14 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Bot className="h-6 w-6" />
              </span>
              <span className="text-xl font-black tracking-tight text-slate-950">
                Campus<span className="text-sky-600">Sync</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              A public front page that presents the product clearly, respects
              the campus brand, and sends visitors to working routes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-slate-700">
              <li>
                <a
                  href="#overview"
                  className="transition-colors hover:text-sky-700"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-sky-700"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pages"
                  className="transition-colors hover:text-sky-700"
                >
                  Live pages
                </a>
              </li>
              <li>
                <a
                  href="#workflow"
                  className="transition-colors hover:text-sky-700"
                >
                  Workflow
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.26em] text-slate-500">
              Account
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-slate-700">
              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-sky-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-sky-700"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-sky-700"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; 2026 CampusSync. Built for modern institutional websites.
          </p>
          <div className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.24em] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Public site ready
          </div>
        </div>
      </footer>
    </div>
  );
}
