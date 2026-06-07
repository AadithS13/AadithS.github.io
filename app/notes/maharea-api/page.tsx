import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "How I Reverse Engineered MahaRERA's Internal APIs — Aadith S",
  description:
    "A walkthrough of how I reverse engineered MahaRERA's undocumented internal APIs to build InfraLens — covering recon, crawler design, snapshot diffing, and change detection.",
};

/* ── Prose sub-components ──────────────────────────────────── */
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-text mt-14 mb-4">{children}</h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base text-subtle leading-relaxed mb-4">{children}</p>
  );
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm text-green bg-surface border border-border px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}
function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="font-mono text-sm text-subtle bg-surface border border-border rounded-lg px-5 py-4 overflow-x-auto my-6 leading-relaxed">
      {children}
    </pre>
  );
}
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm font-mono border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-xs text-muted uppercase tracking-wider border-b border-border pb-2 pr-6"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/50">
              {row.map((cell, j) => (
                <td key={j} className="text-subtle py-2 pr-6 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function MahaRERAArticle() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Back */}
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
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="font-mono">Aadith S</span>
            <span>·</span>
            <span>2026</span>
            <span>·</span>
            <span>InfraLens</span>
          </div>
          <div className="w-10 h-0.5 bg-green mt-6" />
        </div>

        {/* Body */}
        <article className="space-y-0">

          <H2>Why I needed the data</H2>
          <P>
            Real estate in India is notoriously opaque. Builders announce
            projects, deadlines slip, unit inventory changes quietly, and buyers
            rarely have a clean way to track any of it. RERA was supposed to fix
            that — every state now mandates that developers register projects and
            file regular updates. The data is technically public.
          </P>
          <P>
            But &quot;technically public&quot; and &quot;actually usable&quot; are very different
            things.
          </P>
          <P>
            I was building InfraLens — a construction intelligence platform in
            the spirit of Biltrax. The goal was to crawl MahaRERA
            (Maharashtra&apos;s RERA portal), normalize the data across projects and
            promoters, and expose it via a REST API with field-level change
            history. Which builder keeps extending completion dates? Which
            projects flipped from &quot;Under Approval&quot; to &quot;Ongoing&quot; last month?
            That&apos;s the kind of signal that&apos;s genuinely valuable, and it requires
            a machine-readable feed — not a government web portal.
          </P>
          <P>
            MahaRERA has no public API. So I went and found the one it was
            already using.
          </P>

          <H2>The recon phase</H2>
          <P>
            The portal (<Code>maharerait.maharashtra.gov.in</Code>) is an
            Angular single-page application. The first thing I noticed when I
            opened the Network tab in DevTools was the traffic pattern: every
            time I navigated to a project page, the browser fired a flurry of
            POST requests, not GETs. That was already unusual — REST convention
            would use GET for reads, but government backends often don&apos;t bother
            with conventions.
          </P>
          <P>
            I clicked into one of the requests. The URL structure made the
            backend layout obvious immediately:
          </P>
          <Pre>{`https://maharerait.maharashtra.gov.in/api/
  maha-rera-public-view-project-registration-service/
  public/projectregistartion/
  getProjectGeneralDetailsByProjectId`}</Pre>
          <P>
            The service names were long and descriptive — a gift from whoever
            designed this microservice architecture. Each service name told me
            exactly what it returned. Within a few minutes of watching the
            network tab I had the full picture: seven distinct POST endpoints
            fire for a single project view.
          </P>
          <P>
            The next question was authentication. Every request carried an{" "}
            <Code>Authorization: Bearer &lt;token&gt;</Code> header. I needed
            to know where that token came from.
          </P>
          <P>
            I searched the JS bundle for <Code>authenticatePublic</Code> — and
            there it was:
          </P>
          <Pre>{`https://maharerait.maharashtra.gov.in/api/
  maha-rera-login-service/login/authenticatePublic`}</Pre>
          <P>
            The auth endpoint accepted a JSON body with{" "}
            <Code>userName</Code> and <Code>password</Code>. But the
            credentials weren&apos;t plaintext. They were CryptoJS-encrypted blobs,
            hardcoded directly in the compiled Angular source:
          </P>
          <Pre>{`U2FsdGVkX18wiIEtItrcwDDt9WRsC8ZkSL/H9nN/0R8OElYaU3TbVvNkHWK1L8rn
U2FsdGVkX1//DxUv3f29Wg1Saion+lM8Ju2Yz4rocrw=`}</Pre>
          <P>
            This is the &quot;public view&quot; account — the credentials the Angular app
            uses to authenticate anonymous visitors. The encryption is theater;
            the app decrypts it client-side, meaning it&apos;s just obfuscated
            plaintext. I didn&apos;t need to decrypt them — I just needed to send
            them as-is to the auth endpoint, and the server accepted them fine.
            The server-side knows how to unwrap its own scheme.
          </P>
          <P>
            The auth response came back wrapped in an envelope:
          </P>
          <Pre>{`{
  "message": "Success",
  "status": "200",
  "responseObject": {
    "accessToken": "eyJ...",
    "refreshToken": "...",
    "expires_in": 6000
  }
}`}</Pre>
          <P>
            Token TTL was 6000 seconds — about 100 minutes. Every API endpoint
            used the same <Code>responseObject</Code> wrapper, which made
            deserialization uniform across all calls.
          </P>
          <P>
            The last piece was ID structure. I noticed the project detail page
            URLs used sequential integers:{" "}
            <Code>/project-details/12</Code>,{" "}
            <Code>/project-details/13</Code>. I tried hitting the
            general-details endpoint with <Code>projectId: 1</Code> and got a
            valid project back. Then 2. Then 3. Sequential integer primary keys,
            starting from 1, with no gaps until you hit the upper boundary of
            registered projects. No cursor, no offset pagination — just a range
            of IDs.
          </P>

          <H2>What the API actually looked like</H2>
          <P>
            All seven endpoints follow the same pattern: POST to a named
            endpoint under the base URL, send a JSON body with the relevant IDs,
            get back a <Code>responseObject</Code>. The endpoints themselves are
            named like Java method calls — verbose but self-documenting.
          </P>
          <Table
            headers={["Endpoint", "Request body", "Returns"]}
            rows={[
              ["getProjectGeneralDetailsByProjectId", "{ projectId }", "Name, RERA number, status, type, dates, userProfileId"],
              ["getProjectAndAssociatedPromoterDetails", "{ projectId }", "Promoter name (fallback)"],
              ["fetchPromoterGeneralDetails", "{ userProfileId, projectId }", "PAN, GSTIN, promoter type"],
              ["getProjectLandAddressDetails", "{ projectId }", "Plot and street-level address"],
              ["getPromoterAddressDetails", "{ userProfileId, projectId }", "Promoter's office address"],
              ["getProjectProfessionalByType", "{ projectId, professionalTypeName }", "Architects, structural engineers"],
              ["getAgentByProjectId", "{ projectId }", "Registered real estate agents"],
            ]}
          />
          <P>
            Notice that promoter calls require <Code>userProfileId</Code>,
            which only comes from the general details response. This creates a
            dependency: you have to call{" "}
            <Code>getProjectGeneralDetailsByProjectId</Code> first, then fan
            out the rest in parallel.
          </P>
          <P>
            The response shapes had some quirks worth noting. The JSON field
            names contain typos that are presumably baked into the backend and
            will never be fixed:
          </P>
          <Pre>{`{
  "projectRegistartionNo": "P51700002065",
  "projectProposeComplitionDate": "2021-12-31"
}`}</Pre>
          <P>
            <Code>registartion</Code> and <Code>complition</Code> — both
            misspelled. Your Go structs have to match the wire format exactly,
            so these typos end up immortalized in your struct tags.
          </P>
          <P>
            Another gotcha:{" "}
            <Code>fetchPromoterGeneralDetails</Code> often returns a{" "}
            <Code>promoterName</Code> that is an empty string, even for
            projects where the promoter is clearly registered. The name is
            reliably present in{" "}
            <Code>getProjectAndAssociatedPromoterDetails</Code> instead, under{" "}
            <Code>promoterDetails.promoterName</Code>. The crawler fetches both
            and falls back to the association endpoint when the general one is
            empty.
          </P>

          <H2>Building the crawler</H2>
          <P>
            The crawler is written in Go. The design goals were: don&apos;t get
            blocked, don&apos;t duplicate work, and handle the token lifecycle
            transparently.
          </P>
          <P>
            <strong className="text-text">Auth and token management.</strong>{" "}
            The client holds a token in memory with an expiry timestamp. Before
            every request, it checks whether the token is still valid. If not,
            it re-authenticates. To avoid a mid-crawl expiry while requests are
            in flight, I refresh two minutes early — at 98 minutes instead of
            100:
          </P>
          <Pre>{`c.tokenExpiry = time.Now().Add(98 * time.Minute)`}</Pre>
          <P>
            Token access is guarded by a <Code>sync.RWMutex</Code> since
            multiple goroutines share the same client. Reads take an{" "}
            <Code>RLock</Code>; writes (replacing the token after re-auth) take
            a full <Code>Lock</Code>.
          </P>
          <P>
            <strong className="text-text">Worker pool.</strong> The crawler
            runs 5 goroutines consuming from a buffered job channel. The main
            goroutine fills the channel with project IDs from{" "}
            <Code>START_ID</Code> to <Code>END_ID</Code>; workers pull IDs and
            process them. Each worker sleeps 300ms between projects — enough to
            avoid triggering any rate limiting without being so slow that a
            crawl of 50,000 projects takes days.
          </P>
          <Pre>{`const workers = 5
const rateDelay = 300 * time.Millisecond`}</Pre>
          <P>
            At 5 workers × 300ms delay, that&apos;s roughly 16 projects per second
            sustained, well within what the portal handles interactively.
          </P>
          <P>
            <strong className="text-text">Per-project fan-out.</strong> Within
            each project, the 6 secondary calls fire in parallel via goroutines
            and channels. Each goroutine sends into a typed result channel; the
            main goroutine receives from all six after fanning out. This brings
            the per-project latency down to roughly the slowest individual call
            rather than the sum of all seven.
          </P>
          <P>
            <strong className="text-text">Not-found handling.</strong> A 404
            from any endpoint is typed as <Code>ErrNotFound</Code> and treated
            as a skip, not a failure. The ID space has gaps — project IDs that
            were registered and later cancelled, or ID ranges that were never
            allocated. The crawler logs these as <Code>[SKIP]</Code> and moves
            on.
          </P>
          <P>
            <strong className="text-text">Idempotency.</strong> Projects are
            upserted by <Code>maha_id</Code> (the MahaRERA internal integer).
            If the crawler runs twice over the same range, the second pass
            updates existing rows rather than inserting duplicates.
          </P>

          <H2>Snapshot diffing for change detection</H2>
          <P>
            This is the part that turns a crawler into an intelligence product.
          </P>
          <P>
            Every time the crawler processes a project, it serializes the{" "}
            <Code>ProjectGeneral</Code> response to JSON and computes an MD5
            checksum. It then fetches the most recent snapshot for that project
            from the database.
          </P>

          {/* Architecture diagram */}
          <div className="my-8 border border-border rounded-lg overflow-hidden">
            <Image
              src="/projects/infralens-architecture.svg"
              alt="InfraLens pipeline architecture — from MahaRERA API through crawler, change detection, and REST API"
              width={760}
              height={1020}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          <P>
            The checksum comparison is the fast path. Most projects on any
            given crawl haven&apos;t changed, so most runs hit{" "}
            <Code>[SAME]</Code> immediately without touching{" "}
            <Code>project_changes</Code> at all.
          </P>
          <P>
            When the checksum differs, the crawler decodes the old snapshot&apos;s
            raw JSON back into a <Code>ProjectGeneral</Code> struct and compares
            seven tracked fields:
          </P>
          <Pre>{`var trackedFields = []struct {
    name string
    get  func(*model.ProjectGeneral) string
}{
    {"project_status",
        func(p *model.ProjectGeneral) string { return p.ProjectStatusName }},
    {"project_current_status",
        func(p *model.ProjectGeneral) string { return p.ProjectCurrentStatus }},
    {"proposed_completion_date",
        func(p *model.ProjectGeneral) string { return p.ProjectProposeComplitionDate }},
    {"project_name",
        func(p *model.ProjectGeneral) string { return p.ProjectName }},
    {"total_units",
        func(p *model.ProjectGeneral) string { return fmt.Sprintf("%d", p.TotalNumberOfUnits) }},
    {"total_sold_units",
        func(p *model.ProjectGeneral) string { return fmt.Sprintf("%d", p.TotalNumberOfSoldUnits) }},
    {"rera_registration_no",
        func(p *model.ProjectGeneral) string { return p.ProjectRegistrationNo }},
}`}</Pre>
          <P>
            Each changed field produces one row in{" "}
            <Code>project_changes</Code>:
          </P>
          <Pre>{`field_name               | old_value       | new_value       | detected_at
-------------------------+-----------------+-----------------+--------------------
project_status           | Under Approval  | Ongoing         | 2026-06-06 09:33:55
proposed_completion_date | 2024-12-31      | 2025-06-30      | 2026-05-01 02:10:00`}</Pre>
          <P>
            A snapshot is always written at the end, regardless of whether
            anything changed. This gives you a full crawl history — you can
            reconstruct the state of any project at any point in time.
          </P>
          <P>
            The design deliberately stores raw JSON in the snapshot, not a
            normalized form. Normalization happens at diff time. This means you
            can add new tracked fields later without re-crawling — just re-diff
            the existing snapshots.
          </P>

          <H2>What I learned</H2>
          <P>
            <strong className="text-text">
              Government APIs are often just the backend of their own frontend.
            </strong>{" "}
            The MahaRERA portal doesn&apos;t have a public API, but it has a private
            one it uses to serve its own pages. If the data is on the page, it
            came from an API call — find it in the network tab.
          </P>
          <P>
            <strong className="text-text">
              Encrypted credentials in client-side code aren&apos;t credentials at all.
            </strong>{" "}
            The CryptoJS blobs in the Angular bundle are obfuscation, not
            protection. The moment any browser can decrypt and use them,
            they&apos;re effectively public. A well-designed system would use a
            server-side proxy for the public session, so the credentials never
            reach the client.
          </P>
          <P>
            <strong className="text-text">POST for reads is a smell, not a blocker.</strong>{" "}
            Using POST for all reads means you lose HTTP caching and can&apos;t
            construct queries from URLs — but it doesn&apos;t stop you from calling
            the endpoints. It does suggest the backend was designed as a
            form-handler first, REST API second.
          </P>
          <P>
            <strong className="text-text">
              Typos in wire formats are permanent fixtures.
            </strong>{" "}
            <Code>projectRegistartionNo</Code> is in the production database
            schema. It will never change because changing it would break every
            client. Map to sane names in your local models and move on.
          </P>
          <P>
            <strong className="text-text">
              MD5 is enough for change detection.
            </strong>{" "}
            MD5 has known collision vulnerabilities in adversarial contexts. It
            doesn&apos;t matter here — you&apos;re computing a checksum of your own
            serialized data to detect whether it changed between two crawls, not
            verifying authenticity.{" "}
            <Code>crypto/md5</Code> is faster than SHA-256 and the output is
            the same for this use case.
          </P>
          <P>
            The data that platforms like Biltrax sell exists in government
            registries. It just requires someone to go get it, normalize it, and
            make it queryable. The hard part isn&apos;t the crawling — it&apos;s the
            change detection layer that makes the data a live feed rather than a
            snapshot.
          </P>
          <P>
            InfraLens source is on GitHub. The crawler, change detection, and
            REST API are all in Go. Pull requests open.
          </P>

        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/#notes"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            <ArrowLeft size={14} />
            Engineering Notes
          </Link>
          <a
            href="https://github.com/AadithS13/InfraLens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-text transition-colors font-mono"
          >
            github.com/AadithS13/InfraLens ↗
          </a>
        </div>

      </div>
    </div>
  );
}
