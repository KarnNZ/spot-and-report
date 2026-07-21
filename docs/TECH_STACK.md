# Spot & Report Technology Stack

> A focused, modern technology stack selected to deliver a polished mobile reporting experience quickly, securely and reliably.

---

**Document:** TECH_STACK.md

**Version:** 1.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 21 July 2026

---

# Purpose

This document records the technologies selected to implement Spot & Report.

It explains:

- which technologies are used,
- what responsibility each technology owns,
- why each technology was selected,
- how the stack supports the Build Week MVP,
- and which technical choices remain intentionally deferred.

This document records implementation choices.

The organisation of the system, data flow and architectural boundaries are documented separately in `docs/ARCHITECTURE.md`.

---

# Relationship to the Architecture

Spot & Report uses a mobile-first modular monolith.

The technology stack must support:

- a responsive guided reporting workflow,
- browser-based image capture and upload,
- location confirmation,
- trusted server-side OpenAI integration,
- structured report generation,
- user review,
- report submission,
- and straightforward deployment.

Technology choices should preserve the architectural principles established in `docs/ARCHITECTURE.md`:

- simplicity before abstraction,
- clear responsibility boundaries,
- server-side trust boundaries,
- structured and validated AI output,
- mandatory human review,
- and minimal operational complexity.

The stack should make the architecture easier to implement—not reshape it around individual tools.

---

# Technology Selection Principles

Every technology included in the Build Week stack should satisfy at least one demonstrated product requirement.

The selection process follows these principles.

## Prefer Familiar and Proven Technologies

Build Week is not the appropriate time to introduce unnecessary technical uncertainty.

Technologies should be stable, well documented and suitable for production use.

---

## Minimise Operational Complexity

The MVP should be straightforward to develop, deploy, monitor and debug.

A single application and deployment pipeline are preferred over multiple services.

---

## Protect the User Experience

Technology decisions should support:

- fast loading,
- responsive interactions,
- mobile accessibility,
- recoverable errors,
- and a short reporting journey.

The user should never experience complexity simply because the underlying implementation is sophisticated.

---

## Keep External Providers Replaceable

External services should be accessed through internal interfaces and adapters.

Provider-specific request and response formats should not become part of the product domain.

---

## Use Type Safety at Trust Boundaries

User input, browser APIs, OpenAI responses and submission payloads must be validated before entering trusted application state.

Static typing supports development, but runtime validation remains necessary wherever data enters from outside the application.

---

## Add Dependencies Deliberately

Every dependency increases maintenance, security and upgrade responsibilities.

A dependency should be introduced only when it provides clear value over a small, understandable internal implementation.

---

# Stack at a Glance

| Responsibility | Selected Technology |
|---|---|
| Application framework | Next.js |
| User interface | React |
| Programming language | TypeScript |
| Styling | Tailwind CSS |
| AI provider | OpenAI |
| AI integration | Official OpenAI JavaScript/TypeScript SDK |
| Runtime validation | Zod |
| Browser capabilities | Media Capture, File and Geolocation APIs |
| Server operations | Next.js server-side handlers |
| Database | Supabase Postgres |
| Object storage | Private Supabase Storage bucket |
| Persistence integration | Official Supabase JavaScript/TypeScript SDK |
| Testing | Vitest, React Testing Library and Playwright |
| Code quality | ESLint and Prettier |
| Package management | npm |
| Source control | Git and GitHub |
| Hosting | Vercel |
| Continuous integration | GitHub Actions |
| Monitoring | Lightweight application logging and deployment monitoring |
| Submission destination | Supabase persistence; external-agency delivery deferred |

The final repository must remain the source of truth.

This document should be updated whenever the implemented stack changes materially.

---

# Application Framework

## Next.js

Spot & Report uses Next.js as its application framework.

Next.js supports both the browser experience and trusted server-side operations within one deployable application.

It is responsible for:

- application routing,
- page rendering,
- server-side request handling,
- API boundaries,
- environment configuration,
- production builds,
- and deployment integration.

### Why Next.js

Next.js was selected because it:

- supports the modular-monolith architecture,
- allows frontend and server responsibilities to coexist cleanly,
- reduces the need for a separate backend deployment,
- provides mature routing and rendering capabilities,
- supports secure server-side OpenAI calls,
- integrates naturally with Vercel,
- and is suitable for rapid development without being limited to prototypes.

The MVP does not require a separately deployed API service.

A separate backend should only be introduced if future operational requirements clearly justify it.

---

# User Interface

## React

React provides the component model for the reporting experience.

It is used for:

- reporting screens,
- workflow navigation,
- guided questions,
- image previews,
- location confirmation,
- report review,
- loading states,
- error recovery,
- and submission confirmation.

### Why React

React supports:

- reusable interface components,
- predictable state-driven rendering,
- mature accessibility patterns,
- strong integration with Next.js,
- and effective testing through component-level tools.

Components should remain focused on presentation and user interaction.

OpenAI provider logic, submission credentials and authoritative business validation must not be placed inside client components.

---

# Programming Language

## TypeScript

TypeScript is used across the application.

It provides shared types for:

- incident reports,
- workflow state,
- evidence,
- locations,
- guided answers,
- OpenAI assistance,
- canonical reports,
- submission requests,
- and submission results.

### Why TypeScript

TypeScript was selected because it:

- improves confidence during refactoring,
- makes responsibility boundaries more explicit,
- reduces common data-shape errors,
- improves editor and Codex assistance,
- and allows browser and server code to share clear contracts.

TypeScript types do not replace runtime validation.

Information received from users, browsers, OpenAI or submission destinations must still be validated before it is trusted.

---

# Styling and Design System

## Tailwind CSS

Tailwind CSS provides the primary styling system.

It supports:

- mobile-first responsive layouts,
- consistent spacing,
- reusable visual tokens,
- accessible interaction states,
- and rapid interface refinement.

### Why Tailwind CSS

Tailwind was selected because it:

- supports fast iteration during Build Week,
- reduces context switching between component and stylesheet files,
- encourages consistent design decisions,
- works well with reusable React components,
- and avoids the overhead of adopting a large component framework.

The interface should not depend on Tailwind-specific decisions outside presentation components.

Product logic must remain independent from styling technology.

---

## Shared Interface Components

Spot & Report should maintain a small internal set of shared components for repeated interface patterns.

Examples may include:

- buttons,
- cards,
- form controls,
- progress indicators,
- alerts,
- loading states,
- modal or confirmation interfaces,
- and page containers.

The project should avoid introducing a large generic design system before repeated needs are demonstrated.

Accessibility and visual consistency matter more than the number of available components.

---

# Artificial Intelligence

## OpenAI

OpenAI provides the intelligence layer for the Build Week MVP.

The application uses OpenAI to assist with:

- image interpretation,
- organisation of guided answers,
- structured report drafting,
- clarity improvements,
- missing-information detection,
- and uncertainty communication.

OpenAI does not own:

- workflow state,
- report validity,
- official diagnosis,
- risk classification,
- destination selection,
- or report submission.

---

## Official OpenAI SDK

The official OpenAI JavaScript/TypeScript SDK is used within trusted server-side code.

The SDK must not be called directly from browser components.

### Why the Official SDK

The official SDK provides:

- maintained API integration,
- typed request construction,
- supported authentication,
- structured response handling,
- and clearer migration paths as OpenAI capabilities evolve.

Provider calls should remain behind an internal AI service interface.

This prevents OpenAI-specific transport details from spreading throughout the application.

---

## Structured AI Output

OpenAI responses should use structured output wherever practical.

The expected response should be represented by:

- a TypeScript type,
- a runtime validation schema,
- and a normalised internal result.

A representative result may contain:

```text
AIReportAssistance
├── observations
├── suggestedSummary
├── missingInformation
├── uncertainty
├── safetyFlags
└── modelMetadata
```

Raw model output must never pass directly into a submission payload.

The application must parse, validate and normalise every response first.

---

## Model Selection

The exact OpenAI model should be selected based on the requirements of the implemented task.

Selection criteria include:

- image understanding,
- structured-output reliability,
- latency,
- cost,
- and suitability for public demonstration.

The model identifier should be configured through environment variables rather than scattered throughout application code.

This document should record the final model after implementation and testing.

```text
OPENAI_MODEL=<selected-model>
```

Model selection is an implementation decision, not a domain concept.

Changing the model should not require changes to the reporting workflow.

---

# Runtime Validation

## Zod

Zod provides runtime schema validation.

It should be used at boundaries where TypeScript alone cannot guarantee the shape or validity of data.

Examples include:

- form submissions,
- server requests,
- environment variables,
- OpenAI structured responses,
- canonical reports,
- and external submission responses.

### Why Zod

Zod was selected because it:

- integrates naturally with TypeScript,
- provides reusable runtime schemas,
- produces understandable validation errors,
- and helps keep static and runtime contracts aligned.

Validation schemas should remain close to the application boundary or domain concept they protect.

They should not become one unstructured global collection.

---

# Browser Capabilities

The MVP should prefer browser-native capabilities where they are sufficient.

## Media Capture and File APIs

Browser media and file capabilities support:

- direct camera capture on compatible devices,
- selection of existing images,
- image preview,
- file metadata inspection,
- and basic client-side validation.

A standard file upload must remain available when direct camera capture is unsupported or denied.

---

## Geolocation API

The browser Geolocation API supports automatic location detection.

The workflow must also support manual confirmation or correction.

Location permission should be requested only when required and with clear user context.

The application must not assume geolocation will always be available.

---

## Browser Storage

Temporary browser storage may be used to preserve active workflow progress when it materially improves reliability.

It must not silently become a long-term report database.

Any stored report information should have:

- a defined purpose,
- minimal retained data,
- a clear expiry or removal strategy,
- and no embedded secrets.

Persistent user accounts and long-term report history remain outside MVP scope.

---

# Server-Side Operations

Trusted operations should execute through server-side Next.js boundaries.

These operations include:

- OpenAI authentication and requests,
- authoritative input validation,
- image preparation where required,
- canonical report construction,
- submission credentials,
- rate limiting,
- and error normalisation.

The browser should receive only the information required to continue the user experience.

Raw provider errors, credentials and sensitive configuration must remain server-side.

---

# Workflow State

The reporting journey should maintain one clear source of truth for active report state.

The MVP should begin with React and framework-native state capabilities rather than introducing a large external state-management library.

State requirements include:

- current reporting step,
- image selection,
- confirmed location,
- guided answers,
- AI generation status,
- review status,
- submission status,
- and recoverable errors.

An additional state-management dependency should only be adopted if the implemented workflow becomes difficult to reason about without it.

The stack should not solve hypothetical state complexity.

---

# Forms

Form handling should prioritise clarity and reliability.

For a relatively small guided workflow, controlled inputs and shared validation schemas may be sufficient.

A dedicated form library should only be added if it materially improves:

- validation integration,
- accessibility,
- field-state handling,
- or maintenance.

The project should avoid adopting a large form abstraction simply because forms are present.

The implemented choice should be recorded here once confirmed.

---

# Images

Images are the largest and most variable payload in the reporting workflow.

The implementation should support:

- file-type validation,
- file-size limits,
- user preview,
- replacement and removal,
- orientation handling where required,
- and resizing or compression before external transfer where practical.

Image processing should preserve enough quality for useful interpretation while avoiding unnecessary upload size and latency.

The selected image-processing approach should remain proportional to the MVP.

A dedicated external image pipeline is not required unless the implementation demonstrates a clear need.

---

# Report Submission

Spot & Report validates a canonical report before recording it through a trusted server boundary.

The submission implementation should consist of:

```text
Canonical Report
      ↓
Next.js Submission Boundary
      ↓
Private Supabase Storage + Postgres
      ↓
Persistent Confirmation
```

The browser sends one multipart request to the application. The server repeats all authoritative validation, uploads the photo to a private bucket, inserts the report record and returns only safe confirmation metadata. The Supabase service-role credential exists only in server code.

The application accepts photos up to 4 MB. Vercel Functions impose a 4.5 MB request-body limit, and the lower application limit leaves room for multipart encoding overhead without changing to direct browser uploads.

Persistence records the report inside Spot & Report. It does not falsely imply delivery to a government or other external agency; destination adapters remain deferred.

---

# Data Storage

Supabase Postgres stores the validated report fields and immutable confirmation metadata. Supabase Storage stores the selected evidence photo in the private `report-photos` bucket under a server-generated object path.

Row-level security is enabled and no anonymous access policies are created. The application server uses the service role after validating each request. Original filenames are retained only as bounded metadata and never determine object paths.

If the photo upload succeeds but the database insert fails, the submission service attempts compensating object cleanup and never reports success. Retention and external-agency delivery policies remain future operational decisions.

---

# Testing

The testing stack should provide confidence across domain logic, interface behaviour and the complete reporting journey.

## Vitest

Vitest is used for fast unit and service tests.

Appropriate targets include:

- workflow rules,
- canonical report construction,
- validation schemas,
- AI-response normalisation,
- and submission-result handling.

---

## React Testing Library

React Testing Library is used for component and interaction tests.

Appropriate targets include:

- guided questions,
- validation feedback,
- workflow navigation,
- loading states,
- review controls,
- and error recovery.

Tests should focus on user-observable behaviour rather than implementation details.

---

## Playwright

Playwright is used for end-to-end testing of the primary workflow.

The critical path is:

```text
Start
→ Add Image
→ Confirm Location
→ Answer Questions
→ Generate Report
→ Review
→ Submit
→ Confirm
```

External services should be mocked or controlled where necessary so automated tests remain predictable.

At least one production-like demonstration path should also be tested against the configured integrations before submission.

---

# Code Quality

## ESLint

ESLint provides static code-quality checks.

It should identify:

- common programming errors,
- unsafe patterns,
- inconsistent imports,
- and framework-specific issues.

---

## Prettier

Prettier provides consistent formatting.

Formatting should be automated rather than debated during development.

---

## TypeScript Compiler

The TypeScript compiler provides the authoritative static type check.

The repository should pass:

```bash
npx tsc --noEmit
```

before MVP completion.

---

# Package Management

## npm

npm is used for package installation and script execution.

A single lockfile must be committed to the repository.

Dependencies should not be added without a clear implementation need.

Useful scripts should include, where applicable:

```json
{
  "dev": "Start local development",
  "build": "Create the production build",
  "start": "Run the production build",
  "lint": "Run static analysis",
  "typecheck": "Run TypeScript validation",
  "test": "Run automated tests",
  "test:e2e": "Run end-to-end tests"
}
```

The exact commands should reflect the implemented repository configuration.

---

# Source Control

## Git

Git provides version control.

Commits should represent meaningful development steps and follow the process defined in `.codex/WORKFLOW.md`.

---

## GitHub

GitHub hosts the repository and provides:

- source backup,
- change history,
- collaboration,
- issue tracking where used,
- pull-request review where appropriate,
- and continuous-integration triggers.

Repository visibility and reviewer access should follow the Build Week submission requirements and project privacy decision.

Secrets must never be committed to GitHub.

---

# Continuous Integration

## GitHub Actions

GitHub Actions should validate the repository on relevant pushes and pull requests.

The minimum pipeline should run:

1. Dependency installation.
2. Linting.
3. Type checking.
4. Unit tests.
5. Production build.

End-to-end tests may be included when they can run reliably within the available environment.

A failed quality check should remain visible rather than being ignored for demonstration convenience.

---

# Hosting and Deployment

## Vercel

Vercel is the preferred hosting platform for the Build Week MVP.

It supports:

- Next.js deployment,
- preview environments,
- managed production builds,
- environment variables,
- server-side handlers,
- deployment logs,
- and rapid iteration.

### Why Vercel

Vercel was selected because it:

- minimises infrastructure setup,
- aligns closely with Next.js,
- supports one deployable application,
- makes previewing changes straightforward,
- and allows development effort to remain focused on the product.

The MVP does not require containers, orchestration or dedicated cloud infrastructure.

Hosting should be reconsidered only if a demonstrated technical or organisational requirement cannot be met by the current platform.

---

# Environment Configuration

Configuration and secrets should be provided through environment variables.

Representative variables may include:

```text
OPENAI_API_KEY=
OPENAI_MODEL=
SUBMISSION_DESTINATION=
SUBMISSION_API_KEY=
APPLICATION_URL=
```

The exact names should reflect the implementation.

The repository should include an example environment file containing variable names without secret values:

```text
.env.example
```

Production secrets must remain within the hosting environment.

No secret may be:

- committed to source control,
- exposed through client-side bundles,
- written into screenshots,
- or included in public documentation.

---

# Monitoring and Diagnostics

The MVP should use lightweight diagnostics appropriate to its scale.

The implementation should make it possible to investigate:

- failed OpenAI calls,
- invalid model responses,
- failed submissions,
- unexpected server errors,
- and deployment failures.

Diagnostics should capture technical context without unnecessarily recording report contents or personal information.

A complex observability platform is not required for Build Week.

Additional monitoring should be introduced only when it provides clear operational value.

---

# Accessibility Support

The stack should use native web semantics wherever possible.

Implementation should support:

- keyboard interaction,
- accessible form labels,
- screen-reader-friendly updates,
- visible focus,
- meaningful heading hierarchy,
- reduced-motion preferences,
- sufficient contrast,
- and mobile-friendly touch targets.

Accessibility should be achieved primarily through correct HTML and component behaviour rather than relying on an accessibility library to repair structural problems later.

---

# Performance Strategy

The selected stack should remain responsive on mobile devices and variable network connections.

Primary performance measures include:

- limiting initial client-side JavaScript,
- loading only what the active workflow requires,
- resizing images where appropriate,
- avoiding unnecessary external requests,
- showing progress during OpenAI operations,
- preserving state during recoverable failures,
- and preventing duplicate submissions.

Performance work should focus first on the end-to-end reporting journey.

---

# Dependency Policy

Dependencies should be introduced only when they satisfy a clear requirement.

Before adding a package, consider:

1. Can the platform or framework already perform this task?
2. Is the package actively maintained?
3. Does it support TypeScript?
4. Does it materially reduce complexity?
5. What security or upgrade responsibilities does it introduce?
6. Will it increase the client bundle?
7. Is the project depending on it for a core business capability?

Build Week speed is not a reason to accumulate unnecessary dependencies.

Simple code that the team understands is often preferable to another abstraction.

---

# Explicitly Rejected Complexity

The Build Week MVP does not require:

- microservices,
- container orchestration,
- message brokers,
- event streaming,
- a generic workflow engine,
- a dedicated API gateway,
- multi-region deployment,
- multiple databases,
- a large enterprise design system,
- a complex global state library,
- or a separate machine-learning service.

These technologies may be valuable in other contexts.

They do not currently solve a demonstrated Spot & Report requirement.

---

# Implementation Traceability

As development progresses, each technology should map to a real implementation location.

| Technology Responsibility | Implementation Location |
|---|---|
| Next.js application | `src/app/` |
| Bird Report interface | `src/features/bird-report/` |
| Reporting domain | `src/core/reporting/` |
| OpenAI orchestration | `src/core/ai/` |
| OpenAI provider adapter | `src/integrations/ai/` |
| Location handling | `src/core/location/` |
| Submission service | `src/core/submission/` |
| Submission adapter | `src/integrations/submission/` |
| Shared interface components | `src/shared/` |
| Runtime schemas | Confirm during implementation |
| Unit tests | Confirm during implementation |
| End-to-end tests | Confirm during implementation |
| CI workflow | `.github/workflows/` |

This table must be updated to reflect the actual repository.

Planned paths should not be presented as implemented paths after development begins.

---

# Adding or Replacing Technology

A technology change should be made only when it:

- solves a demonstrated problem,
- improves security or reliability,
- materially reduces implementation complexity,
- improves the reporting experience,
- or is required by an approved product decision.

Before replacing an existing technology, document:

- the problem with the current choice,
- the proposed replacement,
- the expected benefit,
- the migration cost,
- and the effect on the MVP timeline.

Significant technology decisions should also be recorded in `docs/DECISIONS.md`.

---

# Relationship to Other Documents

This document records the technologies selected to implement Spot & Report.

The most closely related documents are:

| Document | Responsibility |
|---|---|
| `docs/ARCHITECTURE.md` | Defines how the system is organised |
| `docs/IMPLEMENTATION_PLAN.md` | Describes the recommended implementation sequence |
| `docs/DECISIONS.md` | Records significant technical decisions and trade-offs |
| `.codex/WORKFLOW.md` | Defines the engineering workflow |
| `.codex/DEFINITION_OF_DONE.md` | Defines quality standards for completed work |

Technology changes should be recorded in this document.

Architectural consequences should be reflected in `docs/ARCHITECTURE.md`.

The reasoning behind significant technology changes should be captured in `docs/DECISIONS.md`.

---

# Final Principle

The best technology stack is not the one containing the most tools.

It is the smallest coherent set of technologies capable of delivering a reliable, trustworthy and polished product.

Choose proven tools.

Keep boundaries clear.

Protect the user experience.

Introduce complexity only after the product earns the need for it.
