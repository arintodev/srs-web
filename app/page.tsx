"use client";

// app/page.tsx
// Single-page company profile for PT Surakarta Rahayu Sportainment.
// Next.js (App Router) + Tailwind CSS, shadcn/ui-style components (Button, Badge).
// Requires: lucide-react. No shadcn CSS variables are needed: the palette is set in the classes.
//
// Design idea: the race bib. The hero and the 2026 season cards are built as bibs.
// Palette (sampled from the company profile PDF): brand red #fb0303 for large type and graphics,
// deep red #c60c0c for buttons and any small white text, track blue #2774a1, asphalt #1b1b1b, mist #f3f3f3.
// Fonts (Big Shoulders Display + Instrument Sans) load through the @import in STYLES.
// For production, move them to next/font in layout.tsx and drop the @import line.
//
// Photos are hot-linked from Unsplash with plain <img> tags, so no next.config changes
// are needed. Swap any photo by editing the IMG map.

import {
  Camera,
  Flag,
  ImageIcon,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Palette,
  Phone,
  Presentation,
  Shirt,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ----------------------------- Images ----------------------------- */

const IMG = {
  hero: "1596460658047-1826d5921c56", // runners on the road
  crowd: "1509941654768-e0a6884be9b2", // city marathon crowd
  racers: "1461897104016-0b3b00cc81ee", // runners in a race
  hiking: "1666037381203-4b07d8c1162d", // hiking at sunrise
  auditorium: "1492538368677-f6e0afe31dcc", // auditorium / conference
  stage: "1760420940953-3958ad9f6287", // speaker on stage
  stairs: "1507097489474-c9212a8f8597", // spiral stairs
  trail: "1465188162913-8fb5709d6d57", // runner on a hill path
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const CREDITS = [
  "Capstone Events",
  "Braden Collum",
  "Spencer Imbrock",
  "Joshua Gresham",
  "Mikael Kristenson",
  "Tahsin Labib",
  "Dan Freeman",
  "Kalen Emsley",
];

/* ----------------------------- Content ----------------------------- */

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "2026 races" },
  { href: "#race-day", label: "Race day" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

const MISSIONS = [
  {
    title: "Technology that helps",
    text: "Reliable, current IT solutions that make every event more efficient and more likely to succeed.",
  },
  {
    title: "Safe, professional events",
    text: "Sports and MICE events at local and national scale, run to a high standard of safety and operations.",
  },
  {
    title: "Visuals that communicate",
    text: "Design and media with a clear message and the quality to compete.",
  },
  {
    title: "One team, start to finish",
    text: "Strategic planning, visual execution, and operations handled together, for partners and clients.",
  },
];

const SERVICES: {
  icon: LucideIcon;
  title: string;
  text: string;
  image: string;
  alt: string;
}[] = [
  {
    icon: Flag,
    title: "Special events",
    text: "Planning and running sports events (running events, mountain hiking), themed events, product launches, and hobby festivals.",
    image: IMG.hero,
    alt: "Runners on a road",
  },
  {
    icon: Presentation,
    title: "MICE",
    text: "Conferences, work meetings, expos, digital participant registration, and gathering and incentive trip packages.",
    image: IMG.auditorium,
    alt: "An audience in an auditorium",
  },
  {
    icon: Palette,
    title: "Visual communication design",
    text: "Brand identity, digital and print promotion, billboard and venue banners, and graphic assets for events and social media.",
    image: IMG.stage,
    alt: "A speaker on an event stage",
  },
  {
    icon: Shirt,
    title: "Textile, fashion and apparel design",
    text: "Running jerseys, event T-shirts, merchandise, committee and crew uniforms, and themed equipment.",
    image: IMG.racers,
    alt: "Runners in race jerseys",
  },
  {
    icon: Camera,
    title: "Photography",
    text: "Event coverage, race photography of participants, product photos, and commercial and merchandise shoots.",
    image: IMG.crowd,
    alt: "Spectators filming a marathon",
  },
  {
    icon: Mountain,
    title: "Digital ticketing for mountain hiking",
    text: "An online reservation and management system that connects area managers, such as Perhutani and National Parks, with hikers.",
    image: IMG.hiking,
    alt: "A hiker on a trail at sunrise",
  },
];

// Listed in date order.
const SEASON = [
  {
    day: "15",
    month: "Mar",
    name: "Banter Banterun",
    location: "Jl. Menteri Supeno, Manahan, Solo",
    categories: ["Speed run", "Community run", "Sprint 100m"],
    image: IMG.trail,
    text: "A charity sprint that depends on a smooth registration flow, a timing system, and good service for participants along the route.",
  },
  {
    day: "12",
    month: "Apr",
    name: "Vertical Run Solo",
    location: "Food Walk Solo Paragon, Surakarta",
    categories: ["Vertical run", "Stair climbing"],
    image: IMG.stairs,
    text: "A stair race up a Solo high-rise. We focused on precise timing for each participant interval and safety in the stairwell.",
  },
  {
    day: "28",
    month: "Jun",
    name: "SoekarnoRun.soc 2026",
    location: "Alun-Alun Utara, Surakarta",
    categories: ["5K Speed", "5K Fun", "10K", "Kids Dash"],
    image: IMG.racers,
    text: "A large, nationally themed road run. We handled mass registration, digital race pack validation, and coordination of the city route.",
  },
  {
    day: "12",
    month: "Jul",
    name: "Sucorwave Taruna Nusantarun",
    location: "SMA Taruna Nusantara, Magelang",
    categories: ["3K Fun Run", "5K", "10K"],
    image: IMG.crowd,
    text: "A national run for alumni, students, and the public. We integrated the registration system, managed accommodation packages, and ran race day.",
  },
];

// A real sequence: this is the order in which a race comes together.
const FLOW = [
  {
    title: "Design and promotion",
    text: "Jersey and apparel design, promotional visuals, and photo documentation through the event.",
  },
  {
    title: "Registration and ticketing",
    text: "E-vouchers, automatic BIB numbers, and payment gateway integration.",
  },
  {
    title: "Race pack collection",
    text: "QR code scanning so runners collect their packs quickly and in order.",
  },
  {
    title: "Route and field",
    text: "Water stations, medical team, marshals who guide the course, and the finisher medal at the line.",
  },
  {
    title: "Chiptiming and results",
    text: "Accurate timing for competitive categories, integrated with the race results.",
  },
];

const TEAM = [
  { role: "President Commissioner", name: "Aulia Haryo Suryo" },
  { role: "Commissioner", name: "Iyok Andrianto" },
  { role: "President Director", name: "Monique Dian Ayu" },
  { role: "Director", name: "Nur Rizky" },
];

/* ------------------------------ Styles ------------------------------ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500..900&family=Instrument+Sans:wght@400;500;600&display=swap');

.sr-root { font-family: 'Instrument Sans', system-ui, sans-serif; }
.sr-display { font-family: 'Big Shoulders Display', 'Arial Narrow', sans-serif; font-variant-numeric: tabular-nums; }
.sr-check {
  height: 24px;
  background-image: repeating-conic-gradient(#1b1b1b 0 25%, #ffffff 0 50%);
  background-size: 24px 24px;
}

@keyframes sr-line-up { from { transform: translateY(105%); } to { transform: translateY(0); } }
@keyframes sr-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes sr-bib-drop {
  0%   { opacity: 0; transform: translateY(-130%) rotate(-14deg); }
  55%  { opacity: 1; transform: translateY(3%) rotate(0deg); }
  78%  { transform: translateY(-1%) rotate(-4.5deg); }
  100% { opacity: 1; transform: translateY(0) rotate(-3deg); }
}
.sr-line-up { display: inline-block; animation: sr-line-up .9s cubic-bezier(.22,1,.36,1) both; }
.sr-fade { animation: sr-fade .8s ease-out both; }
.sr-bib-drop { transform-origin: 50% 0; animation: sr-bib-drop 1.15s cubic-bezier(.3,.9,.3,1) .45s both; }

@media (prefers-reduced-motion: reduce) {
  .sr-line-up, .sr-fade, .sr-bib-drop { animation: none; }
  .sr-bib-drop { transform: rotate(-3deg); }
}
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
`;

/* ---------------------------- Primitives ---------------------------- */

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2774a1] focus-visible:ring-offset-2";

function Button({
  href,
  variant = "primary",
  children,
  external = false,
}: {
  href: string;
  variant?: "primary" | "outline" | "light" | "outlineLight";
  children: ReactNode;
  external?: boolean;
}) {
  const styles = {
    primary: "bg-[#c60c0c] text-white hover:bg-[#9f0909]",
    outline:
      "border-2 border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-white",
    light: "bg-white text-[#c60c0c] hover:bg-[#f3f3f3]",
    outlineLight: "border-2 border-white text-white hover:bg-white hover:text-[#c60c0c]",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors ${FOCUS} ${styles}`}
    >
      {children}
    </a>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[#1b1b1b]/30 px-2 py-0.5 text-xs font-medium text-[#1b1b1b]">
      {children}
    </span>
  );
}

// The four pin holes of a race bib.
function Pins() {
  return (
    <>
      {[
        "left-2.5 top-2.5",
        "right-2.5 top-2.5",
        "bottom-2.5 left-2.5",
        "bottom-2.5 right-2.5",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute h-3 w-3 rounded-full border-2 border-[#1b1b1b] bg-[#f3f3f3] ${pos}`}
        />
      ))}
    </>
  );
}

function Photo({
  id,
  alt,
  className = "",
  w = 1200,
  eager = false,
}: {
  id: string;
  alt: string;
  className?: string;
  w?: number;
  eager?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={u(id, w)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

function Heading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`sr-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl ${className}`}
    >
      {children}
    </h2>
  );
}

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">{children}</div>
    </section>
  );
}

/* ------------------------- Interactive pieces ------------------------- */

// Hovering, focusing, or tapping a service changes the photo beside the list.
function Services() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <ul className="divide-y divide-[#1b1b1b]/15 border-y border-[#1b1b1b]/15">
        {SERVICES.map((s, i) => (
          <li
            key={s.title}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`group relative cursor-default py-7 pl-5 transition-colors ${FOCUS} ${
              active === i ? "bg-[#f3f3f3]" : ""
            }`}
          >
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 w-1 bg-[#fb0303] transition-transform duration-300 origin-top ${
                active === i ? "scale-y-100" : "scale-y-0"
              }`}
            />
            <div className="flex items-start gap-4">
              <s.icon className="mt-1.5 h-5 w-5 shrink-0 text-[#fb0303]" />
              <div>
                <h3 className="sr-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[#1b1b1b]/70">
                  {s.text}
                </p>
                <div className="mt-4 aspect-[16/9] overflow-hidden rounded-md lg:hidden">
                  <Photo id={s.image} alt={s.alt} w={800} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative hidden lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border-2 border-[#1b1b1b] bg-[#f3f3f3]">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={active !== i}
              >
                <Photo id={s.image} alt={s.alt} w={900} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// The line draws across once the section scrolls into view.
function RaceDay() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: horizontal route */}
      <div className="absolute left-6 right-6 top-6 hidden h-px bg-white/30 lg:block" />
      <div
        className={`absolute left-6 right-6 top-6 hidden h-0.5 origin-left bg-white transition-transform duration-[1600ms] ease-out motion-reduce:transition-none lg:block ${
          on ? "scale-x-100" : "scale-x-0"
        }`}
      />
      {/* Mobile: vertical route */}
      <div className="absolute bottom-6 left-6 top-6 w-px bg-white/30 lg:hidden" />

      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {FLOW.map((s, i) => (
          <li key={s.title} className="flex gap-5 lg:block">
            <span
              style={{ transitionDelay: `${i * 300}ms` }}
              className={`sr-display relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-2xl font-black transition-colors duration-500 motion-reduce:transition-none ${
                on ? "bg-white text-[#2774a1]" : "bg-[#2774a1] text-white"
              }`}
            >
              {i + 1}
            </span>
            <div className="lg:mt-6">
              <h3 className="sr-display text-3xl font-extrabold leading-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------- Page ------------------------------- */

export default function CompanyProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="sr-root min-h-screen bg-white text-[#1b1b1b] antialiased">
      <style>{STYLES}</style>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1b1b1b]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className={`flex items-center gap-3 rounded-md ${FOCUS}`}>
            {/* Replace with your logo */}
            <span className="sr-display flex h-9 w-9 items-center justify-center rounded-md bg-[#fb0303] text-xl font-black text-white">
              SR
            </span>
            <span className="text-sm font-semibold leading-tight">
              Surakarta Rahayu
              <span className="block text-xs font-normal text-[#1b1b1b]/60">
                Race Management
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-sm text-[#1b1b1b]/70 transition-colors hover:text-[#c60c0c] ${FOCUS}`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className={`hidden h-10 items-center justify-center rounded-md bg-[#c60c0c] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#9f0909] sm:inline-flex ${FOCUS}`}
            >
              Contact us
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#1b1b1b]/20 lg:hidden ${FOCUS}`}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav className="min-h-0 overflow-hidden">
            <div className="flex flex-col border-t border-[#1b1b1b]/10 px-4 py-2 text-sm font-medium">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 hover:bg-[#f3f3f3]"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="bg-white pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <div>
            <h1 className="sr-display text-[clamp(4.5rem,15vw,10.5rem)] font-black leading-[0.88] tracking-tight">
              <span className="block overflow-hidden pb-[0.07em]">
                <span className="sr-line-up">Race day,</span>
              </span>
              <span className="block overflow-hidden pb-[0.07em]">
                <span
                  className="sr-line-up text-[#fb0303]"
                  style={{ animationDelay: "140ms" }}
                >
                  handled.
                </span>
              </span>
            </h1>

            <p
              className="sr-fade mt-8 max-w-lg text-lg leading-relaxed text-[#1b1b1b]/75"
              style={{ animationDelay: "500ms" }}
            >
              PT Surakarta Rahayu Sportainment plans and runs sports and MICE
              events at local and national scale. Registration, timing, race-day
              operations, jersey design, and photography come from one team.
            </p>

            <div
              className="sr-fade mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "650ms" }}
            >
              <Button href="#portfolio">See the 2026 races</Button>
              <Button href="#contact" variant="outline">
                Contact us
              </Button>
            </div>
          </div>

          {/* The bib */}
          <div className="mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="sr-bib-drop relative rounded-lg border-2 border-[#1b1b1b] bg-white p-7 shadow-[8px_8px_0_#1b1b1b]">
              <Pins />
              <div className="mb-3 bg-[#c60c0c] px-3 py-1.5 text-center text-xs font-semibold text-white">
                Surakarta Rahayu Race Management
              </div>
              <div className="aspect-[4/5] overflow-hidden border-2 border-[#1b1b1b]">
                <Photo id={IMG.hero} alt="Runners racing on a road" w={900} eager />
              </div>
              <div className="mt-3 flex items-end justify-between">
                <span className="sr-display text-6xl font-black leading-none">2026</span>
                <span className="pb-1 text-xs font-medium text-[#1b1b1b]/60">
                  Surakarta, Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="sr-check" aria-hidden />
      </section>

      {/* About */}
      <Section id="about">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Heading>One company for the whole event.</Heading>
          <div>
            <p className="text-xl leading-relaxed">
              PT Surakarta Rahayu Sportainment is an incorporated company in
              Surakarta. It works across information technology, sports and MICE
              event management, and the creative industry behind an event’s
              visuals and media.
            </p>
            <p className="mt-5 leading-relaxed text-[#1b1b1b]/70">
              A professional team and solid cooperation give us the governance,
              strategic direction, and efficient operations that events at local
              and national scale need. We plan the event, design what people see
              and wear, and run the day itself.
            </p>

            <dl className="mt-10 divide-y divide-[#1b1b1b]/15 border-y border-[#1b1b1b]/15 text-sm">
              {[
                ["Base", "Surakarta, Central Java"],
                ["Scale", "Local and national events"],
                [
                  "Work",
                  "Special events, MICE, visual design, apparel, photography, digital ticketing",
                ],
                [
                  "Legal basis",
                  "Menkumham establishment decree No. AHU-0033118.AH.01.01.TAHUN 2026",
                ],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="text-[#1b1b1b]/70">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Vision & mission */}
      <Section className="bg-[#f3f3f3]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Heading>Where we’re headed.</Heading>
            <p className="mt-8 max-w-md text-2xl font-medium leading-snug">
              To be the leading, most trusted company in Indonesia that combines
              information technology, sports and MICE event management, and the
              creative industry, so every event feels high-standard and solves a
              real problem.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {MISSIONS.map((m) => (
              <div key={m.title} className="border-t-2 border-[#fb0303] pt-5">
                <dt className="sr-display text-3xl font-extrabold leading-tight">
                  {m.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#1b1b1b]/70">
                  {m.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Services */}
      <Section id="services">
        <div className="mb-14 max-w-3xl">
          <Heading>What we do.</Heading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#1b1b1b]/70">
            Six services, so an event doesn’t need six different suppliers.
          </p>
        </div>
        <Services />
      </Section>

      {/* 2026 season: bibs, in date order */}
      <Section id="portfolio" className="bg-[#f3f3f3]">
        <div className="mb-16 max-w-3xl">
          <Heading>Four races in 2026.</Heading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#1b1b1b]/70">
            Running and special events we planned and operated this year, in the
            order they took place.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {SEASON.map((e, i) => (
            <article
              key={e.name}
              className={`relative rounded-lg border-2 border-[#1b1b1b] bg-white p-8 shadow-[6px_6px_0_#1b1b1b] transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none ${
                i % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"
              }`}
            >
              <Pins />
              <div className="flex items-start justify-between gap-4">
                <div className="sr-display flex items-baseline gap-2 leading-none">
                  <span className="text-7xl font-black text-[#fb0303]">{e.day}</span>
                  <span className="text-3xl font-extrabold">{e.month}</span>
                </div>
                <p className="mt-1 flex max-w-[11rem] items-start gap-1.5 text-right text-xs leading-snug text-[#1b1b1b]/70">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#fb0303]" />
                  {e.location}
                </p>
              </div>

              <div className="mt-5 aspect-[16/9] overflow-hidden border-2 border-[#1b1b1b]">
                <Photo id={e.image} alt={e.name} w={900} />
              </div>

              <h3 className="sr-display mt-5 text-4xl font-black leading-none">
                {e.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.categories.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#1b1b1b]/70">{e.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Race day flow */}
      <Section id="race-day" className="bg-[#2774a1] text-white">
        <div className="mb-16 max-w-3xl">
          <Heading>How a race comes together.</Heading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white">
            From the first poster to the final result, these five steps are
            covered by the same team.
          </p>
        </div>
        <RaceDay />
      </Section>

      {/* Team */}
      <Section id="team">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Heading>Who leads us.</Heading>
          <dl className="divide-y divide-[#1b1b1b]/15 border-y border-[#1b1b1b]/15">
            {TEAM.map((t) => (
              <div
                key={t.name}
                className="grid gap-1 py-6 sm:grid-cols-[14rem_1fr] sm:items-baseline"
              >
                <dt className="text-sm text-[#1b1b1b]/60">{t.role}</dt>
                <dd className="sr-display text-4xl font-extrabold leading-none">
                  {t.name}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="bg-[#c60c0c] text-white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Heading>Planning an event?</Heading>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
              Tell us what you’re planning, such as a race, a conference, or a
              launch, and we’ll get back to you.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="https://wa.me/628122516443" variant="light" external>
                <MessageCircle className="h-4 w-4" /> Message on WhatsApp
              </Button>
              <Button
                href="mailto:ptsurakartarahayusportainment@gmail.com"
                variant="outlineLight"
              >
                <Mail className="h-4 w-4" /> Send an email
              </Button>
            </div>
          </div>

          <ul className="space-y-7 text-sm">
            <li className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="text-white/90">Contact person</div>
                <a
                  href="tel:+628122516443"
                  className="text-lg font-semibold underline-offset-4 hover:underline"
                >
                  0812-2516-443
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="text-white/90">Email</div>
                <a
                  href="mailto:ptsurakartarahayusportainment@gmail.com"
                  className="break-all text-lg font-semibold underline-offset-4 hover:underline"
                >
                  ptsurakartarahayusportainment@gmail.com
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="text-white/90">Address</div>
                <div className="text-lg font-semibold leading-snug">
                  Jl. Mojo No. 21, RT 003/RW 006, Karangasem, Kec. Laweyan, Kota
                  Surakarta, Jawa Tengah 57145
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Map placeholder: replace with a Google Maps iframe */}
        <div className="mt-14 flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-lg bg-gray-200 text-gray-400 sm:aspect-[21/7]">
          <MapPin className="h-10 w-10" />
          <span className="text-sm">Embed Google Maps here</span>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[#1b1b1b]/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="sr-display flex h-9 w-9 items-center justify-center rounded-md bg-[#fb0303] text-xl font-black text-white">
                SR
              </span>
              <span className="text-sm font-semibold">
                PT Surakarta Rahayu Sportainment
              </span>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#1b1b1b]/70">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="hover:text-[#c60c0c]">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-2 border-t border-[#1b1b1b]/10 pt-6 text-xs text-[#1b1b1b]/60 md:flex-row">
            <span>
              © {new Date().getFullYear()} PT Surakarta Rahayu Sportainment. All
              rights reserved.
            </span>
            <span>Photos on Unsplash by {CREDITS.join(", ")}.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
