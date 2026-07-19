# Spot & Report Architecture

> A deliberately simple architecture that uses OpenAI to transform observations into structured incident reports while remaining easy to understand, test and extend.

---

**Document:** ARCHITECTURE.md

**Version:** 1.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 19 July 2026

---

# Purpose

This document describes the architecture of Spot & Report.

Rather than documenting implementation details, it explains the major structural decisions that shape the application.

Specifically, it defines:

- how the system is organised,
- how information flows through the reporting journey,
- where OpenAI is used,
- how trust boundaries are enforced,
- and how the architecture supports future workflows without introducing unnecessary complexity today.

Frameworks, libraries and deployment technologies are documented separately in `TECH_STACK.md`.

---

# Relationship to Product Scope

The architecture exists to support the Build Week MVP defined in `MVP_SCOPE.md`.

The MVP intentionally delivers one complete reporting experience:

1. Capture evidence.
2. Confirm location.
3. Answer guided questions.
4. Generate an AI-assisted report.
5. Review the report.
6. Submit.
7. Receive confirmation.

Every architectural decision should make this journey easier to build, easier to test and easier to evolve.

The architecture intentionally avoids solving problems that the MVP does not yet have.

---

# Architecture at a Glance

Spot & Report is implemented as a **mobile-first modular monolith**.

The browser provides a simple guided reporting experience while trusted server-side components perform validation, OpenAI orchestration and report submission.

The application deliberately separates product logic from external providers.

OpenAI improves report quality but never becomes the source of truth.

The user always reviews and approves the final report before submission.

Future workflows can reuse the same architectural foundations without requiring the current MVP to become a generic reporting platform.

---

# Architectural Style

The Build Week MVP adopts a **modular monolith** architecture.

The application is deployed as a single system while maintaining clear internal boundaries between:

- User Experience
- Reporting Workflow
- Domain Model
- AI Services
- Location Services
- Submission Services
- External Integrations

This approach was selected because it delivers the fastest path to a reliable production-quality MVP.

Distributed architectures such as microservices would introduce deployment, testing and operational complexity without improving the user experience.

If future scale justifies further decomposition, existing module boundaries provide natural extraction points.

Architecture should evolve in response to demonstrated needs—not anticipated ones.

---

# Architecture Principles

The following principles guide every architectural decision.

## Simplicity Before Abstraction

Prefer the simplest architecture capable of solving the current problem.

Abstractions should emerge from repeated requirements rather than speculation.

---

## Product Before Technology

The architecture exists to support the reporting experience.

Technology choices should never complicate the user journey.

---

## Clear Responsibility Boundaries

Every major module should have a single, clearly defined responsibility.

Business logic, AI integration, user interface and external systems should remain loosely coupled.

---

## One-Way Data Flow

Information should move predictably through the application.

```
Capture
    ↓
Validate
    ↓
Enrich
    ↓
Review
    ↓
Submit
    ↓
Confirm
```

Every transition should be explicit and observable.

---

## Human-Centred AI

OpenAI assists users.

It does not replace them.

Users remain responsible for reviewing every report before submission.

---

## Trust Through Validation

External systems—including AI models—should never be treated as authoritative.

All external information must be validated before becoming part of the application's internal state.

---

## Build for Today's Problem

The architecture should support future reporting workflows without attempting to implement them today.

Reusable patterns should emerge naturally as the product grows.

---

# System Context

Spot & Report sits between members of the public and organisations responsible for receiving incident reports.

Its purpose is not to replace government systems.

Its purpose is to dramatically improve the quality, consistency and completeness of information before it reaches them.

```
          Member of the Public
                    │
                    ▼
          Spot & Report Platform
                    │
                    ▼
       Responsible Organisation
```

Rather than asking users to navigate complex reporting processes, Spot & Report provides a guided experience that prepares a structured report ready for submission.

The platform becomes an intelligent preparation layer rather than another reporting authority.

---

# Build Week Implementation Boundary

The Build Week MVP intentionally implements only the functionality required to demonstrate one complete reporting workflow.

## Implemented

- Bird Report workflow
- Image capture and upload
- Location confirmation
- Guided reporting questions
- OpenAI-assisted report generation
- User review
- Report submission
- Submission confirmation

## Architecturally Supported

The following capabilities are intentionally deferred but influenced the overall architecture:

- Additional incident workflows
- Multiple submission destinations
- Multilingual reporting
- User accounts
- Notifications
- Offline reporting
- Administrative dashboards
- Government integrations

The architecture should make these additions straightforward without introducing unnecessary complexity into the MVP.

---

# High-Level Architecture

The system consists of four primary layers.

```
                    User

                     │

                     ▼

      Mobile-first Web Application

────────────────────────────────────────

 Image

 Location

 Guided Questions

 Review

 Confirmation

────────────────────────────────────────

                     │

                     ▼

         Spot & Report Server

────────────────────────────────────────

 Workflow

 Validation

 OpenAI Orchestration

 Canonical Report Builder

 Submission Service

────────────────────────────────────────

             │                │

             ▼                ▼

          OpenAI      Report Destination
```

The browser manages user interaction.

The server owns trust boundaries.

External services remain isolated behind internal interfaces.

---

# Key Architectural Decisions

| Decision | Choice | Reason |
|-----------|---------|--------|
| Overall Architecture | Modular Monolith | Fast to build, test and deploy while maintaining clean boundaries |
| User Experience | Mobile-first Web Application | No installation required and immediately accessible |
| AI Integration | Server-side OpenAI orchestration | Protect credentials and centralise validation |
| Workflow | Guided multi-step experience | Reduce reporting friction |
| Internal Model | Canonical Report Object | Prevent coupling to external reporting systems |
| Submission | Adapter pattern | Support multiple future destinations |
| User Control | Mandatory review before submission | Ensure responsible use of AI |
| State | Single workflow state | Predictable transitions and easier debugging |

These decisions intentionally optimise for reliability, maintainability and demonstration quality rather than architectural novelty.

---

# Reporting Workflow

The reporting workflow represents the core behaviour of the application.

Each stage prepares the information required by the next while preserving a predictable user experience.

```
Start
   │
   ▼
Capture Evidence
   │
   ▼
Confirm Location
   │
   ▼
Guided Questions
   │
   ▼
OpenAI Assistance
   │
   ▼
User Review
   │
   ▼
Submission
   │
   ▼
Confirmation
```

Each stage has a single responsibility.

Progression is only permitted when the current stage has been completed successfully.

This makes the workflow easy to reason about, easy to validate and resilient to partial failures.

---

# Domain Model

The application is organised around one primary business concept:

**Incident Report**

Every component ultimately contributes towards constructing, validating or submitting this report.

The report maintains a clear distinction between:

- User-provided information
- Device-collected information
- AI-generated assistance
- User-approved content
- Submission metadata

This separation ensures the origin of every piece of information remains transparent throughout the reporting process.

---

# Canonical Report

Before submission, all workflow data is transformed into a single canonical report object.

This object becomes the authoritative internal representation of an incident report.

It includes:

- Workflow type
- Incident description
- Images
- Location
- Guided answers
- AI-assisted summary
- User confirmation
- Submission metadata

External reporting destinations should adapt to this model—not the other way around.

This prevents the application's domain model from becoming tightly coupled to any individual government agency or submission endpoint.

---

# Application Structure

The implementation follows a feature-oriented structure.

```
src/

├── app/
│
├── features/
│     └── bird-report/
│
├── core/
│     ├── reporting/
│     ├── ai/
│     ├── location/
│     └── submission/
│
├── integrations/
│
└── shared/
```

Responsibilities remain organised around product concepts rather than technical frameworks.

Only functionality that is genuinely shared across workflows belongs inside the shared core.

Everything else remains owned by the feature that requires it.

This keeps the architecture easy to navigate while avoiding premature generalisation.

---

# Data Flow

The reporting workflow follows a deliberate one-way data flow that keeps state predictable and trust boundaries explicit.

```
User Input
      │
      ▼
Workflow State
      │
      ▼
Input Validation
      │
      ▼
OpenAI Request
      │
      ▼
Structured AI Response
      │
      ▼
Schema Validation
      │
      ▼
Canonical Report
      │
      ▼
User Review
      │
      ▼
Submission
      │
      ▼
Submission Result
```

Information only moves forward after each stage has successfully completed.

This approach simplifies debugging, improves reliability and ensures that incomplete or untrusted data never progresses further through the workflow.

---

# OpenAI Integration

OpenAI provides the intelligence layer for the Build Week MVP.

Rather than replacing user input, it enriches the information collected during the reporting workflow.

The current implementation uses OpenAI to:

- Interpret visible evidence within submitted images.
- Organise guided answers into structured information.
- Draft concise incident reports.
- Improve clarity and readability.
- Highlight potentially missing information.
- Express uncertainty where evidence is insufficient.

OpenAI does **not**:

- Diagnose disease.
- Confirm species with certainty.
- Determine official risk.
- Make enforcement decisions.
- Submit reports automatically.

Every OpenAI response is treated as advisory rather than authoritative.

The application—not the model—owns the reporting workflow.

---

# Responsible AI Contract

The Build Week MVP follows five architectural rules when integrating OpenAI.

## 1. Minimum Necessary Information

Only information required for the current reporting task is sent to the model.

Unrelated application state is never included.

---

## 2. Structured Responses

OpenAI is instructed to return structured outputs that match an expected schema.

Free-form responses are never trusted automatically.

---

## 3. Validation Before Trust

Every model response is:

- Parsed.
- Validated.
- Normalised.

Invalid responses are rejected rather than silently accepted.

---

## 4. Human Approval

Users always review the completed report before submission.

AI assists preparation.

People remain responsible for submitted information.

---

## 5. Honest Uncertainty

When evidence is insufficient, the model should acknowledge uncertainty rather than invent conclusions.

The application values trustworthy reports over confident guesses.

---

# Validation & Trust Boundaries

Trust decreases as information moves further from the application.

Accordingly, validation occurs at every architectural boundary.

| Boundary | Validation |
|----------|------------|
| User Input | Required fields, file types, question completion |
| Browser | Form validation, image constraints, permissions |
| Server | Business rules, canonical report validation |
| OpenAI | Structured schema validation and response normalisation |
| Submission | Payload validation and destination compatibility |

No external response becomes part of the application state without validation.

This applies equally to browser APIs, AI services and submission destinations.

---

# Submission Architecture

Spot & Report deliberately separates report preparation from report delivery.

Before submission, every workflow produces a single canonical report.

```
Workflow
      │
      ▼
Canonical Report
      │
      ▼
Submission Service
      │
      ▼
Destination Adapter
      │
      ▼
Receiving Organisation
```

The submission service never depends directly on one external reporting system.

Instead, adapters translate the canonical report into the format required by each destination.

For the Build Week MVP, only a single submission destination is required.

Future integrations should extend the adapter layer rather than modifying the reporting workflow.

---

# Project Structure

The application is organised around product responsibilities rather than technical layers.

```
src/

├── app/
│
├── features/
│     └── bird-report/
│
├── core/
│     ├── reporting/
│     ├── ai/
│     ├── location/
│     └── submission/
│
├── integrations/
│
└── shared/
```

Each feature owns its own interface components, workflow logic and validation.

Shared capabilities are extracted only when they provide genuine reuse.

This structure keeps the codebase easy to understand while avoiding unnecessary abstraction.

---

# Implementation Traceability

As implementation progresses, architectural responsibilities should map directly to implementation.

| Architecture Responsibility | Planned Implementation |
|-----------------------------|------------------------|
| Bird Report Workflow | `src/features/bird-report/` |
| Reporting Core | `src/core/reporting/` |
| OpenAI Orchestration | `src/core/ai/` |
| Location Services | `src/core/location/` |
| Submission Services | `src/core/submission/` |
| OpenAI Integration | `src/integrations/ai/` |
| Submission Adapter | `src/integrations/submission/` |

This table should be updated whenever significant architectural changes occur.

The goal is to ensure that architectural documentation always reflects the implementation.

---

# Future Evolution

The architecture intentionally focuses on one complete workflow.

Future capabilities are expected to build upon the existing foundations rather than replacing them.

Examples include:

- Additional incident workflows.
- Multiple submission destinations.
- Government APIs.
- Multilingual reporting.
- Offline synchronisation.
- User accounts.
- Notifications.
- Administrative dashboards.
- Organisation-specific routing.
- Analytics and operational reporting.

These capabilities should be introduced only when supported by demonstrated product requirements.

The Build Week MVP deliberately avoids speculative infrastructure.

---

# Relationship to Other Documents

This document explains how Spot & Report is organised.

Supporting documentation provides additional context.

| Document | Responsibility |
|----------|----------------|
| `VISION.md` | Why the product exists |
| `MVP_SCOPE.md` | What the Build Week MVP delivers |
| `PROJECT.md` | Engineering philosophy |
| `WORKFLOW.md` | Development process |
| `DEFINITION_OF_DONE.md` | Quality standards |
| `TECH_STACK.md` | Implementation technologies |
| `DECISIONS.md` | Significant architectural decisions |
| `CHANGELOG.md` | Completed changes |
| `BUILD_LOG.md` | Development journal |

Together these documents describe the product from vision through implementation.

---

# Final Principle

Architecture should make the product easier to build—not more impressive to describe.

Every architectural decision should improve one or more of the following:

- Simplicity.
- Reliability.
- Maintainability.
- Testability.
- Trust.

If a decision adds complexity without improving the product or developer experience, it should be reconsidered.

Build only the architecture the product needs today.

Design it carefully enough that tomorrow's architecture has somewhere sensible to grow.
