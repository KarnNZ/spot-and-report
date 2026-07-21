# Spot & Report Engineering Decisions

> A record of significant product, architecture and engineering decisions made throughout the development of Spot & Report.

---

**Document:** DECISIONS.md

**Version:** 2.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 21 July 2026

---

# Purpose

Engineering decisions shape the long-term quality of a project.

This document records the most significant architectural, product and engineering decisions made during the development of Spot & Report, together with the reasoning behind them.

Its purpose is to explain **why** decisions were made—not simply **what** was implemented.

Future contributors should update this document whenever a significant decision changes.

The objective is to preserve engineering knowledge that might otherwise be lost over time.

---

# Decision Philosophy

Engineering decisions should favour simplicity, maintainability and demonstrable user value.

Where multiple technically acceptable solutions exist, prefer the solution that:

- Reduces unnecessary complexity.
- Protects the agreed MVP scope.
- Improves long-term maintainability.
- Supports responsible AI.
- Produces a better user experience.
- Can be clearly demonstrated and understood.
- Leaves room for future evolution.

Every decision should solve today's problem without unnecessarily limiting tomorrow's possibilities.

---

# When to Record a Decision

Create a new Architecture Decision Record (ADR) when a decision:

- Significantly affects the architecture.
- Influences long-term maintainability.
- Changes user experience in a meaningful way.
- Alters AI behaviour or safety.
- Introduces or removes major technologies.
- Changes security or privacy assumptions.
- Is likely to be questioned by future contributors.

Minor implementation details should remain in source control history rather than becoming ADRs.

---

# Decision Lifecycle

Each Architecture Decision Record has one of the following statuses.

| Status | Meaning |
|---------|---------|
| Proposed | Under discussion and not yet adopted. |
| Accepted | The current agreed approach. |
| Superseded | Replaced by a newer ADR. |
| Deprecated | No longer recommended for future work. |

ADR numbers are permanent.

Numbers should never be reused, even if a decision is later superseded or deprecated.

---

# Decision Format

Each ADR follows the same structure.

- Status
- Context
- Decision
- Alternatives Considered
- Consequences
- Review Trigger (where applicable)
- Related Documents

Using a consistent format makes decisions easier to understand and review.

---

# Decision Index

| ID | Decision | Status |
|----|----------|--------|
| ADR-001 | Mobile-First Web Application | Accepted |
| ADR-002 | Modular Monolith | Accepted |
| ADR-003 | Server-Side OpenAI Integration | Accepted |
| ADR-004 | Human Review Before Submission | Accepted |
| ADR-005 | Canonical Report Object | Accepted |
| ADR-006 | One Workflow Before Many | Accepted |
| ADR-007 | Submission Adapters | Accepted |
| ADR-008 | Avoid Premature Infrastructure | Accepted |
| ADR-009 | Responsible AI Through Validation | Accepted |
| ADR-010 | Documentation as a First-Class Deliverable | Accepted |
| ADR-011 | AI Assists Rather Than Decides | Accepted |
| ADR-012 | Public Reporting Without Authentication | Accepted |
| ADR-013 | Server-Only Supabase Persistence | Accepted |

---

# ADR-001 — Mobile-First Web Application

**Status:** Accepted

### Context

Most incident reports occur outdoors using a mobile phone.

Reducing reporting friction is more valuable than maximising platform-specific capabilities.

### Decision

Build Spot & Report as a responsive, mobile-first web application.

### Alternatives Considered

- Native iOS application
- Native Android application
- Cross-platform mobile application

### Consequences

**Benefits**

- No installation required.
- Immediate accessibility.
- Faster iteration.
- Single codebase.
- Easier demonstrations.
- Lower maintenance.

**Trade-offs**

- Limited access to some native device capabilities.
- Native applications may provide additional value in the future.

### Review Trigger

Review this decision if:

- Offline-first becomes an MVP requirement.
- Native device capabilities become essential.
- Browser limitations materially affect usability.

### Related Documents

- MVP_SCOPE.md
- UI.md

---

# ADR-002 — Modular Monolith

**Status:** Accepted

### Context

The MVP consists of a single guided reporting workflow.

Distributed services would increase operational complexity without improving user value.

### Decision

Use a modular monolith with clearly defined internal boundaries.

### Alternatives Considered

- Microservices
- Multiple deployable services
- Event-driven architecture

### Consequences

**Benefits**

- Simpler deployment.
- Easier debugging.
- Lower operational overhead.
- Faster development.
- Clear module boundaries.
- Natural extraction points later.

**Trade-offs**

- All modules share a deployment boundary.

### Review Trigger

Review if:

- Independent scaling becomes necessary.
- Multiple teams begin developing independent services.
- Deployment frequency differs significantly between modules.

### Related Documents

- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md

---

# ADR-003 — Server-Side OpenAI Integration

**Status:** Accepted

### Context

OpenAI requires protected credentials and trusted orchestration.

### Decision

Execute all OpenAI requests from trusted server-side components.

### Alternatives Considered

- Browser-based API calls
- Third-party AI gateway

### Consequences

**Benefits**

- API keys remain protected.
- Centralised validation.
- Easier monitoring.
- Better prompt management.
- Consistent AI behaviour.

**Trade-offs**

- Requires server-side infrastructure.

### Review Trigger

Review if:

- OpenAI introduces secure browser-side authentication.
- Infrastructure requirements change significantly.

### Related Documents

- ARCHITECTURE.md
- TECH_STACK.md

---

# ADR-004 — Human Review Before Submission

**Status:** Accepted

### Context

Public incident reports may contain incomplete or incorrect information.

Regardless of how reports are prepared, users should always have the opportunity to review the final report before submission.

### Decision

Require users to review and approve every report before submission.

### Alternatives Considered

- Automatic submission
- Optional review

### Consequences

**Benefits**

- Greater trust.
- Responsible AI.
- User accountability.
- Reduced risk of incorrect submissions.
- Better transparency.

**Trade-offs**

- One additional interaction before submission.

### Related Documents

- UI.md
- MVP_SCOPE.md

---

# ADR-005 — Canonical Report Object

**Status:** Accepted

### Context

Different organisations may require different submission formats.

The application should avoid coupling its internal model to external systems.

### Decision

Represent every report internally using a single canonical report object.

Submission destinations convert from this shared model.

### Alternatives Considered

- Destination-specific report models.
- Workflow-specific report structures.

### Consequences

**Benefits**

- Cleaner architecture.
- Easier integrations.
- Improved testability.
- Supports future workflows.

**Trade-offs**

- Adapter implementations are required.

### Review Trigger

Review if:

- Multiple fundamentally different report types emerge.
- The canonical model becomes unnecessarily complex.

### Related Documents

- ARCHITECTURE.md

---

# ADR-006 — One Workflow Before Many

**Status:** Accepted

### Context

A polished demonstration is more valuable than numerous incomplete workflows.

The objective of the MVP is to prove the incident-reporting platform rather than maximise feature count.

### Decision

Focus the MVP entirely on Bird Reports.

The wider Incident Reporting Engine will be introduced after the initial workflow has been validated.

### Alternatives Considered

- Multiple partially completed workflows.
- Generic reporting engine from day one.

### Consequences

**Benefits**

- Higher quality.
- Easier testing.
- Better user experience.
- Clearer demonstrations.
- Reduced scope risk.

**Trade-offs**

- Reduced immediate feature breadth.

### Review Trigger

Review once:

- Bird reporting has been validated.
- Additional incident categories are prioritised.

### Related Documents

- MVP_SCOPE.md
- ROADMAP.md
- IMPLEMENTATION_PLAN.md

---

# ADR-007 — Submission Adapters

**Status:** Accepted

### Context

Submission destinations are expected to evolve over time.

Different organisations may require different submission mechanisms, formats or authentication methods.

### Decision

Separate report preparation from report delivery using submission adapters.

Each destination should implement its own adapter while consuming the same canonical report object.

### Alternatives Considered

- Direct submission logic throughout the application.
- Destination-specific reporting workflows.

### Consequences

**Benefits**

- Cleaner architecture.
- Easier integrations.
- Lower maintenance.
- Better testability.
- Supports future government and enterprise integrations.

**Trade-offs**

- Slightly more abstraction during initial implementation.

### Review Trigger

Review if:

- All destinations converge on a common submission protocol.
- Adapter complexity outweighs the flexibility it provides.

### Related Documents

- ARCHITECTURE.md
- TECH_STACK.md

---

# ADR-008 — Avoid Premature Infrastructure

**Status:** Accepted

### Context

Many architectural patterns solve problems that the MVP does not yet have.

Building infrastructure before genuine demand increases complexity without delivering immediate value.

### Decision

Delay additional infrastructure until supported by demonstrated requirements.

### Alternatives Considered

- Message queues
- Distributed event buses
- Microservices
- Complex orchestration platforms

### Consequences

**Benefits**

- Lower complexity.
- Faster development.
- Easier debugging.
- Better maintainability.
- Simpler demonstrations.

**Trade-offs**

- Some future scaling work may require architectural evolution.

### Review Trigger

Review if:

- Performance bottlenecks emerge.
- Independent scaling becomes necessary.
- Multiple reporting workflows introduce operational complexity.

### Related Documents

- ARCHITECTURE.md
- IMPLEMENTATION_PLAN.md

---

# ADR-009 — Responsible AI Through Validation

**Status:** Accepted

### Context

Large language model output should never be assumed correct.

AI responses become trusted application data only after validation.

### Decision

Validate every OpenAI response before it becomes trusted application data.

### Alternatives Considered

- Trust model output directly.
- Minimal validation.
- Manual validation only.

### Consequences

**Benefits**

- Greater reliability.
- Improved security.
- Better user trust.
- Predictable behaviour.
- Safer AI integration.

**Trade-offs**

- Additional validation logic.
- Slight increase in implementation complexity.

### Review Trigger

Review if:

- Model capabilities significantly improve.
- Validation requirements evolve.
- Regulatory requirements change.

### Related Documents

- ARCHITECTURE.md
- MVP_SCOPE.md

---

# ADR-010 — Documentation as a First-Class Deliverable

**Status:** Accepted

### Context

Clear documentation improves maintainability, onboarding and long-term evolution.

Documentation is part of the product rather than an afterthought.

### Decision

Treat documentation as a first-class engineering deliverable.

Documentation should evolve alongside the implementation and remain consistent with the current state of the project.

### Alternatives Considered

- README only.
- Documentation after implementation.
- Minimal internal documentation.

### Consequences

**Benefits**

- Better knowledge sharing.
- Easier onboarding.
- Clear engineering decisions.
- Improved maintainability.
- Stronger judging experience.
- Better long-term sustainability.

**Trade-offs**

- Additional upfront effort.
- Documentation must be maintained as the project evolves.

### Related Documents

All repository documentation.

---

# ADR-011 — AI Assists Rather Than Decides

**Status:** Accepted

### Context

Artificial intelligence can significantly improve report quality but should not replace human judgement.

Public incident reporting requires transparency, accountability and user confidence.

### Decision

AI will assist users by:

- organising information,
- improving clarity,
- generating structured summaries,
- identifying missing information,
- suggesting improvements.

AI will never become the final decision-maker.

Users remain responsible for reviewing and approving every report before submission.

### Alternatives Considered

- Fully autonomous AI reporting.
- AI-generated reports without review.
- Rules-based report generation only.

### Consequences

**Benefits**

- Supports responsible AI.
- Builds user trust.
- Reduces unsupported conclusions.
- Aligns with public-sector expectations.
- Preserves human accountability.

**Trade-offs**

- Requires an additional review step.
- Some users may ignore AI suggestions.

### Related Documents

- MVP_SCOPE.md
- UI.md

---

# ADR-012 — Public Reporting Without Authentication

**Status:** Accepted

### Context

The primary objective of Spot & Report is to reduce the friction involved in public incident reporting.

Requiring account creation before submitting a report would introduce unnecessary barriers during the MVP.

### Decision

The MVP will not require user authentication before submitting a report.

Future authentication may be introduced where it provides genuine user value rather than unnecessary friction.

### Alternatives Considered

- Mandatory user accounts.
- Social login.
- Government identity providers.

### Consequences

**Benefits**

- Faster reporting.
- Higher completion rates.
- Lower abandonment.
- Better accessibility.
- Simpler demonstrations.

**Trade-offs**

- No personal report history.
- Additional anti-spam measures may be required in future.
- Limited user-specific functionality.

### Review Trigger

Review if:

- User history becomes a priority.
- Government integrations require identity verification.
- Abuse prevention requires stronger identity controls.

### Related Documents

- MVP_SCOPE.md
- UI.md

---

# ADR-013 — Server-Only Supabase Persistence

**Status:** Accepted

### Context

The MVP must record completed reports and evidence photos reliably without exposing privileged storage or database access to an unauthenticated browser. The Vercel deployment boundary also limits Function request bodies to 4.5 MB.

### Decision

Persist reports in Supabase Postgres and photos in a private Supabase Storage bucket through a trusted Next.js server boundary.

The browser sends multipart form data only to Spot & Report. The server performs authoritative validation before using the Supabase service role. Reports use row-level security with no anonymous public policies, and Storage objects use server-generated paths.

Apply a 4 MB photo limit consistently at the browser, server, database and bucket boundaries. This leaves room for multipart overhead below Vercel's 4.5 MB request-body limit while preserving server-mediated uploads.

If photo upload succeeds and database insertion fails, attempt compensating object cleanup and never return a successful submission result.

### Alternatives Considered

- Direct browser-to-Supabase uploads.
- Public Storage objects.
- A separate backend service.
- Continuing simulated persistence.
- Raising the photo limit and bypassing the Vercel Function boundary.

### Consequences

**Benefits**

- Privileged credentials remain server-only.
- Runtime validation protects the persistence boundary.
- Photos are private by default.
- Reports receive durable identifiers and confirmation metadata.
- The modular submission layer remains compatible with future destination adapters.

**Trade-offs**

- Multipart requests must remain below the deployment request-body limit.
- Submission depends on Supabase availability.
- Upload and database insertion require compensating cleanup rather than a cross-service transaction.
- Stored reports are not yet delivered to an external agency.

### Review Trigger

Review if:

- Photo requirements exceed the server request-body limit.
- Direct-to-storage uploads can be introduced without weakening the approved trust model.
- Agency delivery, retention automation or authenticated administration becomes approved scope.

### Related Documents

- ARCHITECTURE.md
- TECH_STACK.md
- SUPABASE_SETUP.md

---

# Future Decisions

Not every engineering decision has been made.

Future Architecture Decision Records may include the following areas.

## Architecture

- Offline-first support.
- Background synchronisation.
- Multi-region deployment.
- Event-driven processing.

## Artificial Intelligence

- Future OpenAI model upgrades.
- Prompt versioning.
- Vision model improvements.
- Confidence scoring.

## Infrastructure

- Caching.
- Monitoring.
- Observability.

## Security

- Authentication.
- Authorisation.
- Rate limiting.
- Abuse prevention.
- Audit logging.

## Internationalisation

- Multilingual interface.
- Translation workflows.
- Regional reporting requirements.

## Government & Enterprise

- Official submission APIs.
- Authentication providers.
- Enterprise reporting workflows.
- Government partnerships.

## Scalability

- Additional incident categories.
- Multi-tenant architecture.
- Reporting analytics.
- Administrative portals.

New decisions should always be added as additional ADRs.

Historical decisions should never be deleted.

Superseded decisions should remain available to preserve engineering history.

---

# Final Principle

Good engineering is not defined by never changing direction.

It is defined by making thoughtful decisions, documenting the reasoning behind them and improving them as new evidence becomes available.

Every Architecture Decision Record should help future contributors understand not only **what** Spot & Report became, but **why** it became that way.

Well-documented decisions reduce uncertainty, preserve engineering knowledge and enable the project to evolve with confidence.
