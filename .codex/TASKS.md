# Spot & Report — Codex Task Queue

> The live implementation queue for building the Spot & Report MVP.

---

**Document:** `.codex/TASKS.md`

**Version:** 2.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 20 July 2026

---

# Purpose

This document tracks the current implementation work for Spot & Report.

Unlike `docs/IMPLEMENTATION_PLAN.md`, which defines the complete build strategy, this document focuses only on the work that is currently active or immediately upcoming.

Its purpose is to help AI coding assistants and human developers maintain focus by answering a single question:

> **What should be built next?**

Detailed implementation guidance, acceptance criteria and long-term sequencing remain documented elsewhere.

---

# Relationship to Other Documents

Each engineering document has a distinct responsibility.

| Document | Responsibility |
|----------|----------------|
| `docs/IMPLEMENTATION_PLAN.md` | Overall build strategy and implementation phases |
| `.codex/TASKS.md` | Current implementation priorities |
| `.codex/WORKFLOW.md` | Standard engineering workflow |
| `.codex/DEFINITION_OF_DONE.md` | Quality standards for task completion |
| `AGENTS.md` | AI operating instructions |

Avoid duplicating information between these documents.

---

# How to Use This File

Before beginning implementation:

1. Read `AGENTS.md`.
2. Read `.codex/PROJECT.md`.
3. Review the relevant product documentation.
4. Read `.codex/WORKFLOW.md`.
5. Read `.codex/DEFINITION_OF_DONE.md`.
6. Read this document.
7. Confirm the current active task.
8. Implement one coherent task at a time.
9. Update this file when priorities change.
10. Record meaningful progress in `docs/BUILD_LOG.md`.
11. Update `docs/CHANGELOG.md` if user-visible behaviour changes.

Only one primary implementation task should be active at any time.

---

# Current Objective

Build a production-quality, mobile-first MVP that allows members of the public to report a sick or dead wild bird in under 60 seconds.

The completed reporting journey should be:

```text
Start Report
      │
      ▼
Add Photo
      │
      ▼
Confirm Location
      │
      ▼
Answer Guided Questions
      │
      ▼
Generate AI-Assisted Report
      │
      ▼
Review Report
      │
      ▼
Submit
      │
      ▼
Confirmation
```

Current implementation efforts should prioritise delivering this end-to-end workflow before introducing additional functionality.

---

# Active

## Task 2 — Application Foundation

**Status:** In progress

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 2.

### Objective

Build the shared application shell.

Expected work includes:

- global layout
- design tokens
- reusable buttons
- typography
- loading states
- feedback components
- page container
- progress indicator

---

# Next

The following tasks should be completed in order unless priorities change.

---

## Task 3 — Landing Screen

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 3.

### Objective

Create the application's opening experience.

Expected work includes:

- project identity
- application introduction
- Start Bird Report button
- responsive mobile layout
- accessible content

---

## Task 4 — Reporting Workflow

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 4.

### Objective

Build the reporting workflow framework.

Expected work includes:

- workflow navigation
- workflow state
- progress tracking
- step routing
- validation flow

---

## Task 5 — Photo Capture

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 5.

### Objective

Allow users to capture or upload photographic evidence.

---

## Task 6 — Location Confirmation

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 6.

### Objective

Capture and confirm the report location.

---

## Task 7 — Guided Questions

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 7.

### Objective

Collect the minimum information required to produce a useful report.

---

## Task 8 — OpenAI Report Assistance

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 8.

### Objective

Generate an AI-assisted report summary using the approved OpenAI integration.

---

## Task 9 — Review Screen

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 9.

### Objective

Allow users to review and edit the complete report before submission.

---

## Task 10 — Submission

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 10.

### Objective

Submit the validated canonical report.

---

## Task 11 — Confirmation

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 11.

### Objective

Provide a clear confirmation experience after successful submission.

---

## Task 12 — Testing

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 12.

### Objective

Implement automated testing across the MVP.

---

## Task 13 — Continuous Integration

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 13.

### Objective

Create the project's CI workflow.

---

## Task 14 — Accessibility Review

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 14.

### Objective

Review the application against accessibility and mobile usability standards.

---

## Task 15 — Performance Review

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 15.

### Objective

Improve reliability and performance before release.

---

## Task 16 — Deployment

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 16.

### Objective

Deploy the MVP to production.

---

## Task 17 — Build Week Submission

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 17.

### Objective

Prepare the final Build Week submission package.

---

---

# Blocked Decisions

The following decisions must be confirmed before their related implementation phases begin.

## OpenAI Model

Select the production model after evaluating:

- structured output reliability,
- latency,
- image understanding,
- operational cost,
- and overall user experience.

---

## Submission Destination

Confirm the final destination for submitted reports.

Possible options include:

- demonstration endpoint,
- structured email,
- approved webhook,
- downloadable report,
- or another explicitly approved destination.

---

## Persistence

Determine whether submitted reports require any persistent storage.

Do not introduce a database unless a clear product requirement exists.

---

## Image Processing

Confirm the preferred approach for handling mobile images.

Evaluate:

- resizing,
- compression,
- upload performance,
- and image quality.

---

# Completed

The following project milestones have already been completed.

## Task 1 — Initialise the Application

**Status:** Completed

**Reference**

`docs/IMPLEMENTATION_PLAN.md` — Phase 1.

### Objective

Create the initial Spot & Report application using the approved technology stack.

### Deliverables

- Initialise Next.js.
- Configure React.
- Enable strict TypeScript.
- Configure Tailwind CSS.
- Use the App Router.
- Create the initial `src/` structure.
- Preserve all existing documentation.
- Keep the repository clean.

### Validation

The following commands completed successfully:

```bash
npm run lint
npm run typecheck
npm run build
```

### Definition of Done

Task completion must satisfy `.codex/DEFINITION_OF_DONE.md`.

---

## Repository Foundation

- Repository created.
- Project structure established.
- Documentation framework completed.
- Repository standards defined.
- AI operating guidance established.

---

## Product Definition

- Vision documented.
- Product principles documented.
- MVP scope defined.
- User experience guidance completed.
- System architecture documented.
- Technology stack selected.
- Product roadmap prepared.
- Implementation strategy completed.

---

## Engineering Foundation

- Engineering workflow defined.
- Definition of Done established.
- AI project guidance completed.
- Repository cleaned and organised.
- License completed.
- Documentation reviewed for consistency.

The repository is now ready for implementation.

---

# Deferred

The following work is intentionally outside the Build Week MVP.

Do not implement these features unless the project scope is explicitly expanded.

## Product Features

- User accounts
- User profiles
- Saved report history
- Notifications
- Public incident maps
- Organisation dashboards
- Administrative portals
- Analytics dashboards

---

## Technical Features

- Multiple reporting workflows
- Generic workflow engine
- Offline-first synchronisation
- Native mobile applications
- Multi-region deployment
- Enterprise role management
- Plugin architecture
- Multi-tenant support

---

## Future AI Features

- Automated diagnosis
- Fully automated report submission
- Long-term learning systems
- Advanced workflow automation
- Predictive incident analysis

These features may be considered after the MVP successfully demonstrates the core reporting journey.

---

# Task Update Rules

This document should remain concise and focused on current execution.

When updating this file:

1. Move completed work into **Completed** when appropriate.
2. Promote the next task into **Active**.
3. Update any blocked decisions.
4. Remove completed short-term priorities.
5. Keep only one primary implementation task active.
6. Avoid duplicating implementation details already documented elsewhere.

Detailed implementation guidance belongs in `docs/IMPLEMENTATION_PLAN.md`.

Quality requirements belong in `.codex/DEFINITION_OF_DONE.md`.

Engineering workflow belongs in `.codex/WORKFLOW.md`.

---

# Final Principle

This document exists to answer one question:

> **What should be built next?**

It is not an implementation guide.

It is not a product specification.

It is not a quality checklist.

Its purpose is to maintain implementation focus.

Build one coherent task at a time.

Keep the implementation aligned with the project documentation.

Prefer simplicity over complexity.

Deliver the smallest complete solution that moves the Spot & Report MVP closer to production.
