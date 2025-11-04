import React, { useState, useEffect, useCallback, useRef } from 'react';
import ContextMenu from './ContextMenu';
import NotificationModal from './NotificationModal';
import useWindows from '../hooks/useWindows';
import useVolume from '../hooks/useVolume';
import { useLanguage } from '../hooks/useLanguage';

import Taskbar from './Taskbar';
import DesktopAppsLayout from '../layouts/DesktopAppsLayout';
import Windows from './Window/Windows';

import ContactMe from './Window/ContactMe';
import MyProjects from './Window/MyProjects';
import Pictures from './Window/Pictures';
import Notepad from './Window/Notepad';
import Terminal from './Window/Terminal';
import Paint from './Window/Paint';
import Minesweeper from './Window/Minesweeper';
import InternetExplorer from './Window/InternetExplorer';
import Winamp from './Window/Winamp';
import FileManager from './Window/FileManager';
import EmailClient from './Window/EmailClient';
import ComposeEmail from './Window/EmailClient/ComposeEmail';

import { desktopApps } from '../data/desktopApps';
import type { Entity, WindowEntity } from '../types';

interface DesktopProps {
  currentUser: string | null;
  onLogout?: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ currentUser, onLogout }) => {
  const { currentLanguage } = useLanguage();

  const handleLogout = () => {
    // Close all windows first to ensure proper cleanup
    setWindows([]);
    // Give time for cleanup before calling parent logout
    setTimeout(() => {
      onLogout?.();
    }, 150);
  };
  const [showHeader, setShowHeader] = useState(false);
  const [windows, setWindows] = useState<WindowEntity[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<Set<string>>(new Set());
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'desktop' | 'icon'; iconId?: string } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const { openWindowIds, addWindow, removeWindow, loadState: loadWindowsState } = useWindows();
  const { playAudio, unmuteAudio } = useVolume();

  const components: Record<string, any> = {
    Terminal: Terminal,
    ContactMe: EmailClient,
    MyProjects: MyProjects,
    Pictures: Pictures,
    Notepad: Notepad,
    Paint: Paint,
    Minesweeper: Minesweeper,
    InternetExplorer: InternetExplorer,
    Winamp: Winamp,
    Music: Winamp,
    FileManager: (props: any) => <FileManager {...props} type="projects" />,
    OurComputer: (props: any) => <FileManager {...props} type="computer" />,
    Clients: (props: any) => <FileManager {...props} type="clients" />,
    OurDocuments: (props: any) => <FileManager {...props} type="ourDocuments" />,
    OurTeam: (props: any) => <FileManager {...props} type="ourTeam" />,
    EmailClient: EmailClient,
    Email: EmailClient,
    ComposeEmail: (props: any) => <ComposeEmail {...props} onSend={(data: any) => {
      const mailtoLink = `mailto:${data.to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
      window.location.href = mailtoLink;
      props.onClose?.();
    }} />,
    MyCV: () => <div className="p-4">MyCV component coming soon...</div>,
    Documents: () => <div className="p-4">Documents component coming soon...</div>,
    Calendar: () => <div className="p-4">Calendar component coming soon...</div>,
    Doom: () => <div className="p-4">Doom component coming soon...</div>,
    ContactDetails: () => <Notepad startInMarkdownMode={true} initialText={`## Contact

LET'S GET IN TOUCH

Codepoets Digital LLP

Contact: +91-97 22 55 88 00 , +64-221 711 622, +61 424 499 997

E-Mail: wearecodepoets@gmail.com, himanshu@codepoets.co.in

Gandhinagar, India

Address: A2/02, Tower IV, INFOCITY, Infocity, Gandhinagar, Gujarat 382007

Bengaluru, India
Address: No 13-14, 1st Floor, SV Complex, Kothanur Main Road, I.P Nagar, Bengaluru 560078

Perth, Australia
Address: 4A Rupert street, Maylands, Perth, WA, Australia 6008

Auckland, New Zealand
Address: 300 Richmond Serviced Office, Grey Lynn, Auckland – 1021

Instagram: @codepoets_

Behance: /codepoets
`} />,
    OurServices: () => <Notepad startInMarkdownMode={true} initialText={`# **DESIGN**

## **Brand Design**

* **Discovery & audit** : We inventory your brand assets, audience signals, and competitors to map gaps/opportunities and define success metrics.
* **Logo & Brand guidelines** : We design a scalable logo suite and codify exact usage rules (clear space, sizes, color/mono, motion) to ensure consistency.
* **Brand UI kit (for web/app design systems)** : We deliver tokens, components, states, and accessibility specs in Figma/code so engineering can ship faster.
* **Master Brand Book (usage rules, do/don't, templates)** : We compile visual, verbal, and motion standards into a practical handbook with ready-to-use templates.

## **Brand Strategy**

* **Naming & nomenclature systems** : We create legally screenable, memorable names and a coherent taxonomy for products, tiers, and releases.
* **Brand architecture** : We structure how master, sub-brands, and products relate to reduce confusion and concentrate equity.
* **Tone of voice & editorial style guide** : We define voice principles, grammar, and message patterns so all content sounds unmistakably "you."
* **Go-to-market & launch playbook** : We plan channels, moments, assets, KPIs, and runbooks for a de-risked launch.
* **Audience personas & JTBD maps** : We model segments, pains/gains, and jobs-to-be-done to steer product, content, and UX.
* **Competitive & white-space analysis** : We benchmark features and positioning to find defendable territory you can own.
* **Messaging architecture** : We build a hierarchy of core story, proof points, and variants tailored by audience and funnel stage.
* **Measurement framework (brand KPIs, tracking)** : We define brand metrics, events, and dashboards to track awareness, preference, and lift.

## **Branding Collaterals**

* **Stationery** : We produce print-ready, branded business cards, letterheads, and envelopes with vendor specs.
* **Sales templates (decks, one-pagers, proposals, case studies)** : We create modular, on-brand sales collateral optimized for fast editing.
* **Email signatures & internal docs** : We standardize email signatures and document skins for a consistent internal/external presence.
* **Event kits (badges, lanyards, backdrops, booths)** : We design scalable event assets with production files and fabrication guidance.
* **Packaging & label templates** : We engineer dielines, finishes, and compliance marks for manufacturable packaging.
* **Press/media kit & PR assets** : We bundle bios, logos, product imagery, and boilerplates for instant media readiness.
* **Ecommerce assets** : We deliver PDP imagery, size charts, icons, and conversion-oriented banners in required ratios.
* **Brand guideline documents (PDF, web style guide, Figma library)** : We publish living guidelines and component libraries teams can actually use.

## **Print Design**

* **Brochures & flyers (bi/tri-fold, inserts)** : We lay out content and visuals for clear scanning and print fidelity.
* **Posters, billboards & OOH** : We design large-format creative with distance legibility, contrast, and spec-perfect files.
* **Catalogs, reports & whitepapers (incl. data layout)** : We craft long-form layouts with accessible charts and cross-refs.
* **Magazine/newspaper/digital ads** : We build ad variants per placement specs and brand goals.
* **Workspace branding design** : We translate brand into spatial graphics, signage, and wayfinding.
* **Menus, POS/POP design** : We design purchase-point materials that speed decisions and increase AOV.
* **Exhibition graphics & stall design** : We plan modular stalls, flows, and graphics ready for fabrication.

## **Social Media Design**

* **Channel branding (profile, cover, highlight sets)** : We set up clean, platform-native branding that scales across devices.
* **Post templates (static, carousels, infographics)** : We build editable templates that keep content consistent and fast to ship.
* **Story/Reels/TikTok templates & cover systems** : We design vertical, motion-ready packs optimized for retention.
* **Short-form motion graphics packages** : We produce reusable motion assets (openers, lower thirds, transitions) for quick edits.
* **Ad creatives (feed, story, vertical video variants)** : We deliver performance-minded ad sets with copy/visual fits for each placement.
* **UGC kits (sticker packs, GIFs)** : We create branded overlays that spark creator participation.
* **Social visual playbook (layout rules, cadence, do/don't)** : We document layouts, rhythms, and QA checks to keep teams aligned.

---

# **WEB 2.0**

## **Web Design & Development**

* **UX research & User Journey** : We collect qualitative/quant data and map journeys to prioritize high-impact flows.
* **Wireframes & prototyping (low/high-fi)** : We iterate clickable prototypes to validate IA and interactions before build.
* **Responsive front-end** : We code accessible, component-based UI that renders fast across breakpoints.
* **CMS** : We implement and configure a CMS (headless or traditional) with roles, models, and workflows.
* **E-commerce** : We set up storefronts, product models, payments, and optimized checkout with analytics hooks.
* **Apps & integrations** : We connect CRMs, payments, auth, and 3rd-party APIs with secure data flows.
* **Performance & accessibility** : We tune Core Web Vitals and WCAG 2.2 AA so pages are fast and inclusive.
* **Security hardening** : We enforce HTTPS, headers, auth, rate limits, CSP, and secret hygiene to reduce attack surface.
* **Analytics & instrumentation** : We define events and wire GA4/GTM/BI so behavior is measurable end-to-end.
* **QA & testing** : We run cross-browser/device tests and automated checks to prevent regressions.
* **DevOps** : We set up CI/CD, environments, IaC, and monitoring for reliable deployments.
* **Migrations & replatforming** : We move sites with redirects, content transforms, and zero-downtime plans.
* **Maintenance & SLA** : We provide updates, patches, and prioritized support with defined response times.

## **Web Apps**

* **SAAS development** : We design and ship multi-tenant apps with billing, roles, and observability.
* **SPA/PWA development** : We build installable, offline-capable web apps with push and background sync.
* **Frontend development** : We implement accessible, testable component libraries and state management.
* **Backend development** : We architect secure APIs, data models, and jobs with logging and guardrails.
* **Microsite and landing pages** : We craft fast, conversion-focused pages with experimentation hooks.

## **Mobile Apps**

* **UX/UI Design** : We design native-feeling flows, patterns, and components for mobile ergonomics.
* **Native Apps** : We build Swift/Kotlin apps that leverage device capabilities and platform guidelines.
* **Cross-platform Apps** : We deliver Flutter/React Native apps for shared codebases without losing UX polish.

## **Digital Marketing**

* **Integrated strategy & channel mix planning** : We allocate budgets across channels with goals, audiences, and tests.
* **Content marketing (pillars, calendars, production)** : We plan and produce pillar/cluster content aligned to search and funnel.
* **Social media management** : We run publishing, community, and reporting with playbooks and SLAs.
* **Paid media (Search, Social, Display, Video, Programmatic)** : We set up full-funnel campaigns with creative testing and lift measurement.
* **Funnels & landing pages (copy, design, build)** : We create message-matched pages that convert and are easy to iterate.
* **Email & marketing automation** : We implement journeys, segmentation, and scoring in your ESP/CRM.
* **Influencer marketing management** : We source, brief, and measure creators with compliance and attribution.
* **Online PR & outreach** : We secure placements and backlinks with story pitches and media kits.
* **Reputation management (reviews, listings)** : We optimize listings, solicit reviews, and monitor brand health.

## **SEO**

* **Technical SEO audit** : We diagnose crawl, indexation, CWV, and rendering issues and deliver fixes.
* **Information architecture & keyword mapping** : We map intent to pages and internal links for scalable relevance.
* **On-page & Off-page SEO** : We optimize content/markup and run ethical link acquisition to build authority.
* **Content SEO (briefs, long-form, topical clusters)** : We produce briefs and content that win queries and depth.
* **Local SEO (GBP, citations, local landing pages)** : We optimize profiles and local pages to capture nearby demand.
* **International SEO (hreflang, geotargeting)** : We structure language/region variants for correct discovery.
* **Image/Video/News SEO** : We implement media markup and feeds for rich surfaces.
* **GenAI SEO** : We use AI to scale briefs and variants safely while enforcing E-E-A-T and de-duplication.
* **Monitoring & reporting (rank tracking, KPI dashboards)** : We track rankings, traffic, and conversions in a single view.

---

# **WEB 3.0**

## **AI**

* **AI strategy & readiness (use-case discovery workshops)** : We identify high-ROI AI use cases, data needs, risks, and a phased roadmap.
* **GenAI apps (chatbots, copilots, content assistants, voicebots)** : We build task-specific assistants wired to your tools and data with guardrails.
* **RAG systems & knowledge bases (doc ingestion, vector search)** : We ingest your documents and enable grounded Q&A with citations.
* **Prompt engineering & evaluation frameworks** : We design prompts and tests that make outputs reliable and measurable.
* **Fine-tuning & adapters; safety/guardrails (policy, filters)** : We specialize or constrain models with adapters and policy filters.
* **Vision (OCR, detection, classification), Speech (ASR/TTS)** : We implement image/text/speech pipelines for automation and accessibility.
* **Agentic workflows & orchestration (multi-tool agents)** : We orchestrate tool-using agents that plan, call APIs, and verify steps.
* **Data pipelines (ETL, labeling, governance, privacy)** : We build secure data flows and labeling ops with lineage and retention controls.
* **On-edge/on-prem AI (latency, cost, compliance)** : We deploy models locally for speed, cost, or data residency needs.
* **AI Threat Modeling (LLM-specific + STRIDE/LINDDUN), data-flow & abuse-case mapping** : We map attack surfaces and misuse paths unique to LLMs and agents.
* **LLM Red Teaming (prompt injection, jailbreaks, tool/agent abuse, data exfiltration)** : We simulate adversarial prompts to expose and fix failure modes.
* **Content Safety Pipelines (toxicity, self-harm, PII/PHI, hallucination checks, policy tuning)** : We screen and throttle unsafe outputs before they reach users.
* **RAG Security (source access control, retrieval allowlists, egress filters, citation integrity)** : We enforce who can be retrieved, what can be returned, and how it's cited.
* **Model & Endpoint Security (authN/Z, mTLS/OAuth2, rate limiting, quota, abuse detection)** : We protect model endpoints and usage with identity, quotas, and anomaly checks.
* **Data Protection & Privacy (minimization, redaction, encryption, key management, DLP)** : We minimize, mask, encrypt, and monitor sensitive data end-to-end.
* **Privacy-Preserving AI (differential privacy, federated learning, HE/SMPC advisories)** : We design pipelines that learn from data without exposing it.
* **Incident Response for AI (runbooks for unsafe output, exfiltration, abuse; tabletop exercises)** : We define playbooks and drills for AI-specific incidents.
* **AI Governance, Risk & Compliance (model/system cards, policy mapping, approvals, audit trails)** : We formalize documentation, approvals, and audits to keep AI accountable.

## **Blockchain**

* **Feasibility & tokenomics workshops** : We validate use-cases and economics before writing code.
* **Smart contracts (Solidity/Rust), audits & threat modeling** : We build and rigorously review contracts for correctness and safety.
* **dApps (wallet connect, custody flows, fiat on-ramps)** : We develop user-friendly apps with secure wallet and payment integrations.
* **NFTs (strategy, minting, marketplaces, utilities)** : We design collections and smart utilities with minting and marketplace flow.
* **DAOs (governance, voting, treasury)** : We implement governance frameworks, voting modules, and treasury controls.
* **DeFi protocols & integrations** : We build/integrate lending, AMMs, staking, or yield systems with risk controls.
* **Oracles & off-chain/on-chain data bridges** : We connect reliable external data with manipulation-resistant patterns.
* **L2 scaling, gas optimization, cross-chain bridges** : We optimize fees and enable secure cross-chain interoperability.
* **Compliance workflows (KYC/AML), permissioned chains (Hyperledger)** : We implement regulated flows and enterprise chains with access controls.
* **On-chain analytics & dashboards** : We instrument contracts and build dashboards for health, usage, and risk.
* **Protocol & Architecture Security** : We analyze consensus, finality, and trust boundaries to harden the stack.
* **Smart Contract Security** : We apply manual review, fuzzing, and formal methods to eliminate vulnerabilities.
* **DeFi Security** : We test for oracle, flash-loan, and liquidity risks with guardrails.
* **Wallets, Custody & Key Management** : We design MPC/HSM key flows, policies, and recovery to keep assets safe.

## **Cryptocurrency & Tokenization**

* **Tokenization (incl. Real-World Assets, RWAs)** : We structure, issue, and manage compliant tokens that represent real or digital assets.
* **Token Design & Tokenomics** : We model supply, incentives, and utility with docs investors and users can trust.
* **ICO / TGE / Token Sale (Compliant Launch)** : We deliver sale contracts, KYC flows, and launch operations aligned with counsel.
* **Coin / Token Management (Post-Launch Ops)** : We run treasury, liquidity, governance, and incident playbooks post-TGE.
* **Exchange, Payments & On/Off-Ramps** : We integrate listings and fiat/crypto rails for smooth conversions.
* **NFTs & Membership Tokens** : We enable gated access, royalties, and community rewards via NFTs.
* **Stablecoins & Asset-Backed Coins** : We design collateral, transparency, and peg stability mechanisms.

## **Experiential Marketing (Immersive)**

* **Interactive installations (touch, gesture, motion, computer vision)** : We build real-time interactive brand experiences using sensors and CV.
* **Projection mapping & architectural wraps** : We map dynamic visuals onto physical structures with precise calibration.
* **Phygital activations (NFC/QR/IoT), smart retail** : We link physical spaces to digital journeys with trackable triggers.
* **Gamified brand experiences & scavenger hunts** : We design mechanics and leaderboards that drive dwell time and shareability.
* **Metaverse spaces/virtual venues & events** : We create persistent 3D brand worlds and host live, social events.
* **Hybrid/virtual event production (live streaming, virtual stages)** : We produce broadcast-quality streams with interactive stages and analytics.

---

# **AI mini examples**

**AI strategy & readiness**
• Situation: Team wants AI but doesn't know where to start.
• What we build: A 90-day roadmap with 3 use-cases, data owners, risks, and ROI.
• Outcome: Everyone knows what to build first and how to measure success.

**GenAI apps (chatbots, copilots, content assistants, voicebots)**
• Situation: Support agents spend hours answering repeat questions.
• What we build: A chatbot that reads your policies/CRM and answers with citations.
• Outcome: Faster replies for customers; agents handle only edge cases.

**RAG systems & knowledge bases**
• Situation: Staff can't find the latest SOPs.
• What we build: Searchable Q&A over your docs with source links for every answer.
• Outcome: Fewer "where is it?" pings, more confident, accurate answers.

**Prompt engineering & evaluation frameworks**
• Situation: Bot answers are inconsistent.
• What we build: Tested prompt templates and a 200-question eval suite.
• Outcome: Stable quality; you catch regressions before users do.

**Fine-tuning & adapters; safety/guardrails**
• Situation: The model doesn't know your domain language.
• What we build: Lightweight fine-tune (LoRA) + output filters for risky content.
• Outcome: On-brand answers that stay within policy.

**Vision (OCR, detection, classification), Speech (ASR/TTS)**
• Situation: Invoices are processed manually.
• What we build: OCR that extracts line items and posts them to your ERP.
• Outcome: Minutes per invoice become seconds; fewer typos.

**Agentic workflows & orchestration (multi-tool agents)**
• Situation: Finance ops reconcile subscriptions by hand.
• What we build: An agent that checks billing, emails vendors, and logs actions.
• Outcome: Routine tasks run themselves, with human approval on exceptions.

**Data pipelines (ETL, labeling, governance, privacy)**
• Situation: Training data is messy and sensitive.
• What we build: An ETL that anonymizes PII, versions datasets, and auto-labels.
• Outcome: Clean, compliant data that's ready for continuous training.

**On-edge/on-prem AI (latency, cost, compliance)**
• Situation: Data can't leave your network.
• What we build: A quantized model deployed on your servers.
• Outcome: Sub-second responses with full data residency.

---

**AI Threat Modeling**
• Situation: You're worried about prompt-injection and tool abuse.
• What we build: A diagram of attack paths with concrete mitigations.
• Outcome: Known risks, owners, and controls before going live.

**LLM Red Teaming**
• Situation: Testers can jailbreak your bot.
• What we build: Attack prompts + fixes (validation, allowlists, output checks).
• Outcome: The same tricks no longer work in production.

**Content Safety Pipelines**
• Situation: You must block toxic or PII-revealing outputs.
• What we build: Pre-publish safety checks and quarantine flows.
• Outcome: Safer responses and clear moderator review paths.

**RAG Security**
• Situation: Private docs leak to the wrong team.
• What we build: Indexes per department, scoped retrieval tokens, and redaction.
• Outcome: Users only see what they're allowed to see—by design.

**Model & Endpoint Security**
• Situation: Anyone can hammer your API.
• What we build: OAuth2/mTLS, rate limits, abuse detection, and quotas.
• Outcome: Only approved clients get in, and misuse gets flagged fast.

**Data Protection & Privacy**
• Situation: Regulators require strict data handling.
• What we build: Redaction at ingest, encryption at rest/in transit, retention rules.
• Outcome: Less exposure risk and easier audits.

**Privacy-Preserving AI**
• Situation: Stakeholders want insights without sharing raw data.
• What we build: Federated learning + differential privacy for aggregate stats.
• Outcome: You learn patterns without revealing individuals.

**Incident Response for AI**
• Situation: What if the bot hallucinates or leaks secrets?
• What we build: Runbooks, rollbacks, alerting, and comms templates.
• Outcome: Clear steps when things go wrong; faster recovery.

**AI Governance, Risk & Compliance**
• Situation: Leadership wants accountability.
• What we build: Model cards, approval gates, and audit logs mapped to policy.
• Outcome: Traceable decisions and easier sign-off.

---

# **Blockchain mini examples**

**Feasibility & tokenomics workshops**
• Situation: You're unsure if a token helps your product.
• What we build: Utility map, emissions/vesting plan, and risks.
• Outcome: Go/no-go clarity before any code.

**Smart contracts (Solidity/Rust), audits & threat modeling**
• Situation: You need a vesting + rewards contract.
• What we build: Secure contracts with manual review, fuzzing, and tests.
• Outcome: Safe deploys and fewer post-launch surprises.

**dApps (wallet connect, custody flows, fiat on-ramps)**
• Situation: New users struggle to buy and use tokens.
• What we build: A React dApp with WalletConnect, MPC custody, and fiat on-ramp.
• Outcome: Non-crypto users onboard in minutes.

**NFTs (strategy, minting, marketplaces, utilities)**
• Situation: You want memberships with perks.
• What we build: An NFT pass that unlocks gated content and discounts.
• Outcome: Fans get benefits; you track ownership on-chain.

**DAOs (governance, voting, treasury)**
• Situation: Your community wants a say.
• What we build: Snapshot voting + on-chain timelock and multisig treasury.
• Outcome: Proposals pass transparently and execute safely.

**DeFi protocols & integrations**
• Situation: You're adding lending to your app.
• What we build: Pool contracts with pause switches and health factor checks.
• Outcome: Users can borrow safely; risk is monitored.

**Oracles & off-chain/on-chain data bridges**
• Situation: You need reliable prices.
• What we build: TWAP-backed oracle with signed attestations and bounds.
• Outcome: Manipulation is harder; liquidations behave correctly.

**L2 scaling, gas optimization, cross-chain bridges**
• Situation: Gas fees are too high.
• What we build: Migrate to an L2, compress calldata, add a guarded bridge.
• Outcome: Cheaper transactions and multi-chain reach.

**Compliance workflows (KYC/AML), permissioned chains**
• Situation: Regulated partners require identity checks.
• What we build: KYC-gated flows and a permissioned Hyperledger channel.
• Outcome: Only verified entities can transact.

**On-chain analytics & dashboards**
• Situation: You can't see what users actually do.
• What we build: Event indexing + dashboards (TVL, holders, abnormal flows).
• Outcome: Real usage and risk are visible at a glance.

**Protocol & Architecture Security**
• Situation: You're launching a rollup.
• What we build: Review of liveness/finality, escape hatches, and sequencing risks.
• Outcome: Resilience against outages and censorship.

**Smart Contract Security**
• Situation: Concern about bugs/vulns.
• What we build: Manual review, invariants, reentrancy guards, role controls.
• Outcome: Stronger guarantees your code won't be exploited.

**DeFi Security**
• Situation: Flash-loan attacks worry you.
• What we build: Simulations, oracle sanity checks, and circuit breakers.
• Outcome: Protocol halts safely under manipulation.

**Wallets, Custody & Key Management**
• Situation: Keys are your biggest risk.
• What we build: MPC/HSM setup, policy-based approvals, and scheduled rotations.
• Outcome: Fewer single points of failure; safer treasury.

---

# **Cryptocurrency & Tokenization mini examples**

**Tokenization (Real-World Assets, RWAs)**
• Situation: You want to finance invoices faster.
• What we build: Whitelist-only tokens representing invoices + monthly attestations.
• Outcome: Investors fund assets; you unlock capital quickly.

**Token Design & Tokenomics**
• Situation: You need sustainable incentives.
• What we build: Capped supply, staking rewards, and fee-backed buybacks.
• Outcome: Clear utility and transparent value flows.

**ICO / TGE / Token Sale (Compliant Launch)**
• Situation: You're raising from the community.
• What we build: Sale contracts (soft/hard cap), KYC, vesting, refund logic.
• Outcome: Clean, compliant launch investors can trust.

**Coin / Token Management (Post-Launch Ops)**
• Situation: Liquidity and governance need ongoing care.
• What we build: AMM liquidity plans, incentive rebalancing, proposal tooling.
• Outcome: Healthier markets and active community decisions.

**Exchange, Payments & On/Off-Ramps**
• Situation: Users want in/out from fiat.
• What we build: CEX listing support, DEX pools, and fiat gateways.
• Outcome: Easy movement between INR/USD and your token.

**NFTs & Membership Tokens**
• Situation: You want VIP perks without logins.
• What we build: Token-gated web that unlocks events/perks for holders.
• Outcome: Perks follow the wallet, not emails.

**Stablecoins & Asset-Backed Coins**
• Situation: You need a predictable settlement value.
• What we build: Collateral rules, mint/burn flows, and live reserve attestations.
• Outcome: A stable unit users can trust for payments.
`} />,
    AboutUs: () => <Notepad startInMarkdownMode={true} initialText={`# About Us

---

> ## We make people...
>
> **Love your website…**
>
> **Buy your products…**
>
> **Experience your tech…**

---

## No over-strategizing. No bloating. No fuss.

With **more than a decade of experience**, we create highly functional, one-of-a-kind, award-winning digital products in the most uncomplicated way possible. That's not a brag, it's a promise – **to deliver tomorrow's creative solutions – today!**

---

## Who We Are

**Creativity is what drives us!** We do our best work when the guardrails are down and we can spread our wings. Although we are well-versed at coding, our people are far from cog – coders.

We consider our work as **a mix of art and technology!** We put not only our brain, but also heart and soul in what we do, which is what makes our work creatively poetic.

We define our work as **Code Poetries**, we call ourselves **Codepoets!**

---

## Awards & Recognition

* **Awwwards Nomination** × 1
* **Amazon Launchpad** × 2
* **Amazon Accelerate** × 1
* **Start Up India** – DIPP(5721)
* **IIM-I Campus Placements**
* **Google Network Partner**
* **Zoho Network Partner**
* **Microsoft Network Partner**
* **Amazon ATES Certified**

---

## Our Impact

| Metric | Count |
|--------|-------|
| **Clients** | 1355+ |
| **Websites** | 1820+ |
| **SaaS** | 20+ |
| **E-Commerce** | 90+ |
| **Branding** | 100+ |

---

> *"We don't just write code, we craft digital poetry."*
`} />,
    BlankNotepad: () => <Notepad initialText="" />,
    ScheduleMeeting: (props: any) => (
      <InternetExplorer
        {...props}
        initialUrl="https://codepoets.zohobookings.in/#/customer/codepoetspvtltd"
      />
    ),
    AgencyWebsite: (props: any) => (
      <InternetExplorer
        {...props}
        initialUrl="https://codepoets.digital"
      />
    ),
    ChatWithUs: (props: any) => {
      // Open WhatsApp in new tab and immediately close the window
      window.open('https://wa.me/919722558800/?text=Hello', '_blank');
      props.onClose?.();
      return null;
    },
    OurPictures: (props: any) => <FileManager {...props} type="ourPictures" />,
  };


  const [entities] = useState<Entity[]>(desktopApps);

  useEffect(() => {
    // Event listener for opening windows from other components
    const handleOpenWindowEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      const windowId = customEvent.detail;
      if (windowId) {
        openWindow(windowId);
      }
    };

    window.addEventListener('openWindow', handleOpenWindowEvent);

    loadWindowsState();

    try {
      const audio = new Audio('/sounds/start-windows.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Startup sound failed:', e));
    } catch (e) {
      console.log('Audio not supported');
    }
    unmuteAudio();

    openWindowIds.forEach(windowId => {
      openWindow(windowId);
    });

    setTimeout(() => {
      setShowNotification(true);
    }, 2000);

    return () => {
      window.removeEventListener('openWindow', handleOpenWindowEvent);

      const script = document.getElementById('spotify-player-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const toggleHeader = useCallback(() => {
    setShowHeader(prev => !prev);
  }, []);

  const openingRef = useRef<Set<string>>(new Set());

  const openWindow = useCallback((windowId: string) => {
    // Prevent duplicate opens
    if (openingRef.current.has(windowId)) {
      console.log('🎵 Window is already being opened, ignoring duplicate call:', windowId);
      return;
    }
    openingRef.current.add(windowId);

    console.log('openWindow called with ID:', windowId);
    console.log('Current entities:', entities.map(e => ({ id: e.id, component: e.component })));

    setWindows(prevWindows => {
      console.log('🎵 Current windows in state:', prevWindows.map(w => ({ id: w.id, component: w.component })));
      const existingWindow = prevWindows.find(window => window.id === windowId);

      if (existingWindow) {
        console.log('🎵 Window already exists, bringing to front:', existingWindow.id);
          const newZIndex = highestZIndex + 1;
        setHighestZIndex(newZIndex);

        return prevWindows.map(window =>
          window.id === windowId
            ? {
                ...window,
                zIndex: newZIndex,
                visible: true
              }
            : window
        );
      }

      console.log('🎵 No existing window found, creating new one');

      const entity = entities.find(e => e.id === windowId);
      if (!entity) {
        console.warn('Entity not found for ID:', windowId);
        return prevWindows;
      }

      console.log('Creating new window for entity:', entity);

      // Calculate new z-index - ComposeEmail should always be on top
      const maxCurrentZIndex = Math.max(...prevWindows.map(w => w.zIndex || 0), highestZIndex);
      const newZIndex = maxCurrentZIndex + 1;
      setHighestZIndex(newZIndex);

      const componentName = entity.component as keyof typeof components;
      const ComponentToRender = components[componentName];

      console.log('Component name:', componentName, 'Component found:', !!ComponentToRender);

      const newWindow: WindowEntity = {
        ...entity,
        component: entity.component,
        visible: true,
        zIndex: newZIndex,
        title: typeof entity.title === 'string'
          ? { en: entity.title, fr: entity.title }
          : entity.title,
        initPositionX: entity.initPositionX ?? 100,
        initPositionY: entity.initPositionY ?? 100,
        initWidth: entity.initWidth ?? 800,
        initHeight: entity.initHeight ?? 600,
        minWidth: entity.minWidth ?? 300,
        minHeight: entity.minHeight ?? 200,
        resizable: entity.resizable ?? true,
        menuHeaderItemsId: entity.menuHeaderItemsId || 'default',
        windowsHeaderLogo: entity.windowsHeaderLogo ?? false,
        isSearchVisible: entity.isSearchVisible ?? false,
        invisible: (entity as any).invisible ?? false,
        ...(entity.leftMenuType && { leftMenuType: entity.leftMenuType }),
        ...(entity.headerToolsId && { headerToolsId: entity.headerToolsId })
      };

      console.log('Created window:', newWindow);

      addWindow(windowId);

      // Clear the opening flag after a short delay
      setTimeout(() => {
        openingRef.current.delete(windowId);
      }, 100);

      return [...prevWindows, newWindow];
    });

    setActiveWindow(windowId);
  }, [entities, highestZIndex, addWindow]);

  const closeWindow = useCallback((windowId: string) => {
    console.log('🎵 Closing window:', windowId);

    // Clear from opening ref if it exists
    openingRef.current.delete(windowId);

    setWindows(prevWindows => {
      const windowToClose = prevWindows.find(w => w.id === windowId);
      console.log('🎵 Window to close:', windowToClose);
      const newWindows = prevWindows.filter(window => window.id !== windowId);
      console.log('🎵 Windows after close:', newWindows.map(w => w.id));
      removeWindow(windowId);
      return newWindows;
    });

    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow, removeWindow]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === windowId
          ? { ...window, visible: false }
          : window
      )
    );

    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const handleWindowClick = useCallback((windowId: string) => {
    console.log('🎯 handleWindowClick called with windowId:', windowId);
    console.log('🎯 Current activeWindow:', activeWindow);

    if (activeWindow !== windowId) {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);

      setWindows(prevWindows =>
        prevWindows.map(window =>
          window.id === windowId
            ? { ...window, zIndex: newZIndex, visible: true }
            : window
        )
      );

      // Only set the active window when it's different
      setActiveWindow(windowId);
      console.log('🎯 Setting activeWindow to:', windowId);
    }
  }, [highestZIndex, activeWindow]);

  const maximizeWindow = useCallback((windowId: string) => {
    setMaximizedWindows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(windowId)) {
        newSet.delete(windowId);
      } else {
        newSet.add(windowId);
      }
      return newSet;
    });

    handleWindowClick(windowId);
  }, [handleWindowClick]);

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (contextMenu && !(e.target as HTMLElement).closest('.context-menu')) {
      setContextMenu(null);
    }

    // Check if click is inside any window container
    const isClickInsideWindow = (e.target as HTMLElement).closest('.window-container');
    if (!isClickInsideWindow) {
      setActiveWindow(null);
    }
  }, [contextMenu]);

  const handleEntityAction = useCallback((action: string, ...args: any[]) => {
    console.log('handleEntityAction called with:', action, args);
    switch (action) {
      case 'openWindow':
        console.log('Opening window:', args[0]);
        openWindow(args[0]);
        break;
      case 'toggleHeader':
        toggleHeader();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }, [openWindow, toggleHeader]);

  const renderWindowComponent = useCallback((componentName: string) => {
    console.log('🎵 Rendering component:', componentName, 'Available components:', Object.keys(components));
    const ComponentToRender = components[componentName as keyof typeof components];

    if (!ComponentToRender) {
      console.warn(`Component "${componentName}" not found in components mapping`);
      return () => <div className="p-4 text-red-500">Component not found: {componentName}</div>;
    }

    // Return the component itself so Windows.tsx can call it with props
    return ComponentToRender;
  }, [components]);

  return (
    <div
      className="h-svh w-screen overflow-hidden bg-office-pic bg-no-repeat bg-cover bg-center relative"
      onClick={handleOutsideClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          type: 'desktop'
        });
      }}
    >

      <DesktopAppsLayout
        entities={entities}
        onToggle={(entityId) => handleEntityAction('openWindow', entityId)}
      />

      <Windows
        apps={windows.map((window) => ({
          id: window.id,
          header: {
            icon: window.iconSrc,
            title: typeof window.title === 'string' ? window.title : (window.title[currentLanguage] || window.title.en),
            buttons: ['minimize', 'maximize', 'close'],
            invisible: (window as any).invisible || false
          },
          defaultSize: {
            width: window.initWidth,
            height: window.initHeight
          },
          defaultOffset: {
            x: window.initPositionX,
            y: window.initPositionY
          },
          resizable: window.resizable,
          maximized: maximizedWindows.has(window.id),
          minimized: !window.visible,
          component: renderWindowComponent(window.component as string),
          zIndex: window.zIndex || 1,
          invisible: (window as any).invisible || false,
          injectProps: {}
        }))}
        onMouseDown={handleWindowClick}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        focusedAppId={activeWindow}
      />

      <Taskbar
        apps={windows.filter(w => w.component !== 'ComposeEmail').map((w, index) => ({
          id: w.id,
          title: typeof w.title === 'string' ? w.title : (w.title[currentLanguage] || w.title.en),
          component: w.component as string,
          minimized: !w.visible,
          maximized: maximizedWindows.has(w.id),
          zIndex: w.zIndex || 1
        }))}
        onFocusApp={(appId) => {
          console.log('🔥 onFocusApp called with appId:', appId);
          console.log('🔥 Current activeWindow:', activeWindow);
          console.log('🔥 Available windows:', windows.map(w => ({ id: w.id, visible: w.visible })));

          const window = windows.find(w => w.id === appId);
          console.log('🔥 Found window:', window ? { id: window.id, visible: window.visible } : 'NOT FOUND');

          if (window) {
            console.log('🔥 Window state check:');
            console.log('  - window.visible:', window.visible);
            console.log('  - window.id:', window.id);

            if (!window.visible) {
              console.log('🔥 RESTORING minimized window:', window.id);
              // Restore minimized window
              setWindows(prevWindows =>
                prevWindows.map(w =>
                  w.id === window.id ? { ...w, visible: true } : w
                )
              );
              // Focus the window
              handleWindowClick(window.id);
            } else {
              console.log('🔥 MINIMIZING visible window:', window.id);
              // If window is visible, minimize it (authentic Windows XP behavior)
              setWindows(prevWindows =>
                prevWindows.map(w =>
                  w.id === window.id
                    ? { ...w, visible: false }
                    : w
                )
              );
            }
          }
        }}
        onToggleStartMenu={toggleHeader}
        startMenuOpen={showHeader}
        onStartMenuItemClick={(entityId) => {
          console.log('🎯 Desktop received entityId from start menu:', entityId);
          if (entityId) {
            openWindow(entityId);
          } else {
            console.warn('🎯 Desktop: No entityId provided');
          }
        }}
        currentUser="CodePoets Team"
        onTriggerNotification={() => {
          setShowNotification(true);
        }}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        onLogout={handleLogout}
      />

      {contextMenu && (
        <div className="context-menu">
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            type={contextMenu.type}
            iconId={contextMenu.iconId}
            onClose={() => setContextMenu(null)}
            onRefresh={() => {
              console.log('Refresh desktop');
            }}
          />
        </div>
      )}

      <NotificationModal
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        showOnLogin={true}
        triggerShow={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default Desktop;