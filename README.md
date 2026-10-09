# JD Electrical — 1000x Demo Experience

A ground-up rebuild of [jdelectrical.co.za](https://jdelectrical.co.za) as a modern,
interactive, lead-generating demo — crafted by **Business Hustle** for Jan Cilliers
(master electrician, Alberton, Gauteng).

Everything on the site uses **JD Electrical's real information**: the actual logo,
brand colours extracted from the logo (#045191 blue / #FECC00 yellow), real service
catalogue, registration numbers, photos and the Master Electricians accreditation.

## What makes it 1000x

| Original site | This demo |
|---|---|
| Static WordPress brochure | Interactive single-page experience with scroll animations |
| "GET A QUOTE" PDF-style form | **AI Instant Estimate** — describe a job, get scope + indicative ZAR range + compliance flags in seconds |
| Enquiries land in a stale inbox | Every enquiry lands on a **Live Leads Board** with AI-drafted scope, indicative value and one-tap Call/WhatsApp |
| No emergency path | Persistent emergency band + floating **WhatsApp button** wired to Jan's real number |
| Desktop-era WordPress theme | Mobile-first, dark premium design in the real JD brand colours |
| Nothing for the pitch | Working **AI Tool Idea Generator** (the exact tool promised in the email) + a "Reply to Liam" CTA |

## Feature list

- **AI Instant Estimate** (4-step wizard) — sector → job details → AI estimate (scope,
  ZAR price range, SANS compliance notes, urgency) → lead capture with WhatsApp handoff
- **Live Leads Board** — real-time pipeline view (New → Contacted → Quoted → Won),
  auto-refresh every 30s, seeded with clearly-labelled sample leads
- **AI Tool Idea Generator** — one sentence in, three practical SA-specific automation
  ideas out (effort ratings, impact, "start this week" steps)
- **Credential system** — marquee ticker + verification grid with every real registration
  number (DoL GS01479, Reg IT9819/07, VAT, BEE Level 4, Compensation Fund, Momentum liability)
- **Loadshedding / backup power** section — generators, solar, pumps & tanks
- **Service area chips** — Alberton, East Rand, greater Gauteng
- Floating WhatsApp CTA with prefilled message, `tel:` links everywhere
- Prisma + SQLite lead storage, REST APIs, zod-free validation, toasts on every action

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion ·
Prisma + SQLite · z-ai-web-dev-sdk (server-side LLM for estimates & idea generation)

## Run locally

```bash
bun install
bun run db:push        # create the SQLite schema
bun run dev            # http://localhost:3000
```

Optional: seed the demo leads board with sample rows:

```bash
bun run scripts/seed-leads.ts
```

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/estimate` | POST | AI job estimate (scope, price range, compliance) |
| `/api/ideas` | POST | Business Hustle AI Tool Idea Generator |
| `/api/leads` | GET/POST | Live leads board read/write |

## Pushing to GitHub over SSH

This repo is configured for SSH pushes. `scripts/git-ssh-wrapper.cjs` is a
zero-ssh-binary GIT_SSH implementation (Node + ssh2) so the sandbox can push
without an OpenSSH client:

```bash
git remote add origin git@github.com:<user>/<repo>.git
GIT_SSH="$PWD/scripts/git-ssh-wrapper.cjs" git push -u origin main
```

On any normal machine with OpenSSH installed, plain `git push` works too —
the deploy key fingerprint is ed25519, comment `liam@businesshustle.co.za`.

## Credits

- Business information, logo & photos: [JD Electrical](https://jdelectrical.co.za)
  (© 2024 JD Electrical) — demo prepared with permission-style intent for Jan Cilliers
- Original WordPress design credit: Pink Chicken Graphics
- Demo experience & AI automation: Business Hustle (Liam Brooks)
