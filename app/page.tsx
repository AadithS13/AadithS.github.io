import Image from "next/image";
import { Github, Mail, Linkedin, MapPin } from "lucide-react";
import Sidebar from "@/components/Sidebar";

/* ─── Data ───────────────────────────────────────────────────── */

const highlights = [
  "TDD author & cross-team lead for Customer KYC Deduplication — Kafka-orchestrated multi-service flow covering GST/PAN-based duplicate prevention and merge-with-verified-parent flow → reduced duplicates by 35%, improved reporting accuracy by 25%.",
  "Designed and delivered Site Deduplication with a three-layer strategy: creation-time lookup, pincode-matched nudging, and geocode-based bulk cleanup → cut address duplicates by 30%.",
  "Built Deal Mining Flow ingesting RERA and external data to generate leads, infer project stage, and assign cross-sell deals → +15% lead generation, +5–10% deal conversion.",
  "Built People Entity Framework with persona-based schema and role-access model → onboarded 1M+ active users.",
  "Core contributor to internal CRM built from the ground up, integrated with Microsoft Dynamics ERP for financial data sync.",
  "Integrated Ozonetel CTI into the CRM enabling in-app click-to-call, call logging, and sales activity tracking for field sales.",
];

const experience = [
  {
    role: "Software Engineer 2",
    company: "Infra.Market",
    period: "Apr 2024 — Present",
    location: "Bangalore, India",
    items: [
      {
        heading: "KYC Deduplication",
        body: "TDD author & cross-team lead for Customer KYC Deduplication — Kafka-orchestrated multi-service flow covering GST/PAN-based duplicate prevention, nudging during creation, and a merge-with-verified-parent flow. Reduced duplicates by 35% and improved reporting accuracy by 25%.",
      },
      {
        heading: "Site Deduplication",
        body: "TDD author & lead for Site Deduplication — three-layer strategy: prevention via existing-site lookup at creation, pincode-matched nudging to surface similar sites, and geocode-based bulk data cleanup. Cut address duplicates by 30%.",
      },
      {
        heading: "Deal Mining Flow",
        body: "TDD author & lead — ingested RERA and external data sources, built automated pipeline to generate leads, identify new customers, infer project stage to predict product needs, and assign cross-sell deals to relevant BU sales officers. +15% lead generation, +5–10% deal conversion.",
      },
    ],
  },
  {
    role: "Software Engineer",
    company: "Infra.Market",
    period: "Jul 2023 — Mar 2024",
    location: "Chennai, India",
    items: [
      {
        heading: "People Entity Framework",
        body: "Built a persona-based schema with role-access model that onboarded 1M+ active users across the platform.",
      },
      {
        heading: "Internal CRM",
        body: "Core contributor to building the company's internal CRM from the ground up. Integrated with Microsoft Dynamics ERP for financial data sync.",
      },
      {
        heading: "Ozonetel CTI Integration",
        body: "Integrated Ozonetel CTI calling platform into the CRM, enabling in-app click-to-call, call logging, and sales activity tracking for the field sales team.",
      },
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Infra.Market",
    period: "Feb 2023 — Jun 2023",
    location: "Hyderabad, India",
    items: [
      {
        heading: "Customer Service Revamp",
        body: "Led revamp of legacy Customer Service codebase — audited and updated deprecated APIs, created new endpoints, ensured backward compatibility, and completed schema migrations.",
      },
      {
        heading: "Moonshot Award",
        body: "Won Moonshot Award at IM Hackathon 2023. Acquired proficiency in Golang and TypeScript through hands-on production work.",
      },
    ],
  },
];

const skills: Record<string, string[]> = {
  "Languages & Frameworks": ["Go (Golang)", "TypeScript", "Python"],
  "Messaging & APIs": ["Apache Kafka", "gRPC", "RESTful APIs", "JWT"],
  Databases: ["PostgreSQL", "MySQL"],
  "System Design": [
    "Event-driven architecture",
    "Microservices",
    "Deduplication systems",
    "TDD authorship",
  ],
  Observability: ["Grafana", "Prometheus", "New Relic", "Loggly"],
  "CI/CD & VCS": ["GoCD", "Git", "Bitbucket"],
  Tools: ["JIRA", "Confluence", "Postman", "Agile/Scrum"],
};

const projects = [
  {
    name: "InfraLens",
    emoji: "🚀",
    tagline:
      "Construction intelligence platform with incremental crawling, change detection, historical tracking, and search APIs.",
    description:
      "Reverse-engineers MahaRERA APIs, performs incremental synchronization, tracks project-level changes through snapshot diffing, and exposes search APIs over normalized real-estate data.",
    stack: ["Go", "PostgreSQL", "Docker", "REST APIs", "Cron", "Data Engineering"],
    github: "https://github.com/AadithS13/InfraLens",
    image: "/projects/infralens-crawler.png",
    imageAlt: "InfraLens crawler interface",
    highlights: [
      "Reverse-engineered undocumented MahaRERA APIs for incremental data sync",
      "Snapshot diffing to detect and track project-level changes over time",
      "Normalized real-estate data exposed through clean search APIs",
      "Cron-driven pipeline with idempotent crawl and deduplication logic",
    ],
  },
  {
    name: "FlowOrchestrator",
    emoji: "⚙️",
    tagline:
      "Kafka-powered workflow engine with retries, DLQ processing, idempotency, and production-grade observability.",
    description:
      "Distributed workflow orchestration platform built with Kafka and Go, featuring retries, DLQ handling, idempotent processing, observability, and fault-tolerant order workflows.",
    stack: ["Go", "Kafka", "PostgreSQL", "Prometheus", "Grafana", "Docker"],
    github: "https://github.com/AadithS13/FlowOrchestrator",
    image: "/projects/floworchestrator-grafana.png",
    imageAlt: "FlowOrchestrator Grafana dashboard",
    highlights: [
      "Kafka-based async state machine with RETRYING_PAYMENT and DLQ states",
      "Idempotency keys scoped per attempt to allow genuine retries",
      "Prometheus metrics + Grafana dashboard included out of the box",
      "Load-tested end-to-end with automated scripts",
    ],
  },
];

/* ─── Section heading component ─────────────────────────────── */
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-text">{title}</h2>
      <div className="w-10 h-0.5 bg-green mt-2" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content */}
      <main className="md:ml-56 flex-1 px-6 md:px-14 lg:px-20 py-14 md:py-16 pt-20 md:pt-16 max-w-3xl">

        {/* ── About ─────────────────────────────────────────── */}
        <section id="about" className="mb-20 scroll-mt-8">
          <SectionHeading title="About" />
          <p className="text-subtle leading-relaxed mb-6">
            I&apos;m <span className="text-text font-medium">Aadith S</span>, a
            Bengaluru-based backend software engineer with ~3 years of experience
            designing and managing event-driven microservices at{" "}
            <span className="text-text">Infra.Market</span>. I&apos;ve authored
            technical design documents and led the delivery of critical systems
            including KYC deduplication, site deduplication, and deal mining
            flows. Proficient in Go, Kafka, gRPC, and PostgreSQL — with a strong
            emphasis on data integrity and system reliability.
          </p>

          <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">
            Experience Highlights
          </p>
          <ul className="space-y-2.5">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-subtle leading-relaxed">
                <span className="text-green mt-1 flex-shrink-0">›</span>
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Experience ────────────────────────────────────── */}
        <section id="experience" className="mb-20 scroll-mt-8">
          <SectionHeading title="Experience" />
          <div className="space-y-10">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                  <div>
                    <h3 className="text-base font-semibold text-text">{job.role}</h3>
                    <p className="text-sm text-subtle">{job.company}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs font-mono text-muted">{job.period}</p>
                    <p className="text-xs text-muted">{job.location}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-3 pl-0">
                  {job.items.map((item, j) => (
                    <div key={j}>
                      <p className="text-sm text-text font-medium">{item.heading}:</p>
                      <p className="text-sm text-subtle leading-relaxed mt-0.5">{item.body}</p>
                    </div>
                  ))}
                </div>
                {i < experience.length - 1 && (
                  <div className="mt-8 border-t border-border" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────── */}
        <section id="skills" className="mb-20 scroll-mt-8">
          <SectionHeading title="Skills" />
          <div className="space-y-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex flex-col sm:flex-row gap-2 sm:gap-8">
                <p className="text-xs font-mono text-muted uppercase tracking-wider w-full sm:w-44 flex-shrink-0 pt-0.5">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono text-subtle border border-border px-2.5 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ──────────────────────────────────────── */}
        <section id="projects" className="mb-20 scroll-mt-8">
          <SectionHeading title="Projects" />
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.name}
                className="group border border-border rounded-lg overflow-hidden bg-surface hover:border-muted transition-colors"
              >
                {/* Screenshot */}
                <div className="relative w-full h-48 overflow-hidden bg-bg border-b border-border">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-text flex items-center gap-2">
                        <span>{project.emoji}</span> {project.name}
                      </h3>
                      <p className="text-sm text-subtle mt-0.5 leading-snug">
                        {project.tagline}
                      </p>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-text transition-colors flex-shrink-0 mt-0.5"
                      aria-label={`${project.name} on GitHub`}
                    >
                      <Github size={16} />
                    </a>
                  </div>

                  <p className="text-xs text-muted leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <ul className="space-y-1 mb-4">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-subtle">
                        <span className="text-green mt-0.5 flex-shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────── */}
        <section id="contact" className="mb-16 scroll-mt-8">
          <SectionHeading title="Contact" />
          <p className="text-sm text-subtle mb-8 leading-relaxed">
            Open to backend engineering roles and interesting technical
            conversations. Usually respond same day.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={15} className="text-muted flex-shrink-0" />
              <span className="text-subtle">Bengaluru, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={15} className="text-muted flex-shrink-0" />
              <a
                href="mailto:aadithsuresh10@gmail.com"
                className="text-subtle hover:text-text transition-colors"
              >
                aadithsuresh10@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Github size={15} className="text-muted flex-shrink-0" />
              <a
                href="https://github.com/AadithS13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle hover:text-text transition-colors"
              >
                github.com/AadithS13
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Linkedin size={15} className="text-muted flex-shrink-0" />
              <a
                href="https://linkedin.com/in/aadith-s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle hover:text-text transition-colors"
              >
                linkedin.com/in/aadith-s
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
