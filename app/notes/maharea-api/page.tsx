import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "How I Reverse Engineered MahaRERA's Internal APIs — Aadith S",
  description:
    "A walkthrough of how I reverse engineered MahaRERA's undocumented internal APIs to build InfraLens — a construction intelligence platform.",
};

export default function MahaRERAArticle() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Back link */}
        <Link
          href="/#notes"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Engineering Notes
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">
            Engineering Notes
          </p>
          <h1 className="text-3xl font-semibold text-text leading-tight mb-4">
            How I Reverse Engineered MahaRERA&apos;s Internal APIs
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="font-mono">Aadith S</span>
            <span>·</span>
            <span>2026</span>
            <span>·</span>
            <span>InfraLens</span>
          </div>
          <div className="w-10 h-0.5 bg-green mt-6" />
        </div>

        {/* Article body — fill this in */}
        <article className="prose-custom space-y-6 text-base text-subtle leading-relaxed">

          <p>
            MahaRERA — the Maharashtra Real Estate Regulatory Authority — is a
            government portal that holds data on thousands of registered
            real-estate projects: developer details, project timelines,
            completion status, and unit inventory. But it has no public API.
          </p>

          <p>
            This is the story of how I built one anyway.
          </p>

          <h2 className="text-xl font-semibold text-text mt-10 mb-3">
            Why I needed the data
          </h2>
          <p>
            {/* TODO: Explain the motivation behind InfraLens and why MahaRERA data was valuable */}
            [Fill in — what problem were you solving? What was the use case for InfraLens?]
          </p>

          <h2 className="text-xl font-semibold text-text mt-10 mb-3">
            The recon phase
          </h2>
          <p>
            {/* TODO: Walk through how you opened DevTools, identified XHR requests, studied the request/response shape */}
            [Fill in — browser DevTools, network tab, what you noticed about the API structure, session tokens, pagination patterns]
          </p>

          <h2 className="text-xl font-semibold text-text mt-10 mb-3">
            What the API actually looked like
          </h2>
          <p>
            {/* TODO: Show anonymized request/response examples, headers, auth mechanism */}
            [Fill in — endpoint patterns, query params, response shape, any quirks]
          </p>

          <h2 className="text-xl font-semibold text-text mt-10 mb-3">
            Building the crawler
          </h2>
          <p>
            {/* TODO: How you built the Go crawler — rate limiting, retry logic, idempotency, cron scheduling */}
            [Fill in — Go implementation, how you handled rate limits, idempotent sync strategy]
          </p>

          <h2 className="text-xl font-semibold text-text mt-10 mb-3">
            Snapshot diffing for change detection
          </h2>
          <p>
            {/* TODO: The diffing approach — how you compared states over time and surfaced changes */}
            [Fill in — how snapshot diffing works, what schema looks like, how diffs are stored]
          </p>

          <h2 className="text-xl font-semibold text-text mt-10 mb-3">
            What I learned
          </h2>
          <p>
            {/* TODO: Key takeaways — technical and otherwise */}
            [Fill in — lessons about government APIs, data engineering, robustness]
          </p>

        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/#notes"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Engineering Notes
          </Link>
        </div>
      </div>
    </div>
  );
}
