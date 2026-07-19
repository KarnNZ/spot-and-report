# Spot & Report — Implementation Plan

> The planned sequence for building, validating and demonstrating the Spot & Report Build Week MVP.

---

**Document:** IMPLEMENTATION_PLAN.md

**Version:** 1.1

**Status:** Versioned

**Owner:** Project Owner

**Last Updated:** 19 July 2026

---

# Purpose

This document defines the implementation sequence for the Spot & Report Build Week MVP.

It exists to ensure development progresses in a deliberate order that:

- Produces a working end-to-end product early.
- Protects the agreed MVP scope.
- Reduces rework.
- Maintains architectural consistency.
- Creates visible evidence of responsible AI and engineering quality.
- Supports a clear and compelling final demonstration.

This document defines **the order in which the product is built**.

It does not replace:

- `TASKS.md` — current development work.
- `ROADMAP.md` — future product evolution.
- `ARCHITECTURE.md` — technical organisation.
- `WORKFLOW.md` — engineering process.
- `DEFINITION_OF_DONE.md` — completion standards.

---

# Implementation North Star

Build the smallest complete version of the reporting journey first.

Then improve its intelligence, reliability and presentation without breaking the journey.

A complete but simple product is more valuable than several polished but disconnected features.

---

# Implementation Philosophy

Development should progress through complete, testable layers.

The preferred sequence is:

Repository Foundation

↓

Application Foundation

↓

End-to-End Vertical Slice

↓

Responsible AI Integration

↓

Reliability and Validation

↓

User Experience Polish

↓

Demonstration and Submission Readiness

Every completed phase should leave the application working and demonstrable.

---

# Build Week Priorities

When time or scope must be traded off, prioritise:

1. A working end-to-end reporting journey.
2. Meaningful and responsible GPT-5.6 functionality.
3. A coherent mobile user experience.
4. Reliability during judging and demonstration.
5. Clear evidence of Codex-assisted development.
6. Visual polish.
7. Optional enhancements.

Documentation and architecture should support delivery rather than delay it.

---

# Judging Alignment

Implementation decisions should strengthen at least one of the following areas.

## Technological Implementation

Demonstrate:

- Meaningful Codex-assisted development.
- Non-trivial GPT-5.6 integration.
- Clear system organisation.
- Reliable application behaviour.
- Genuine engineering effort.
- Thoughtful testing and validation.

## Design

Demonstrate:

- A complete and coherent product journey.
- Mobile-first interaction.
- Clear visual hierarchy.
- Accessible and understandable screens.
- Calm, trustworthy feedback.
- More than a technical proof of concept.

## Potential Impact

Demonstrate:

- A real public reporting problem.
- A clearly defined initial audience.
- Reduced reporting friction.
- Improved report quality.
- A credible path to wider incident categories and jurisdictions.

## Quality of the Idea

Demonstrate:

- A distinctive reporting experience.
- Responsible use of multimodal AI.
- Human review rather than uncontrolled automation.
- A reusable incident-reporting foundation.
- Clear differentiation from static forms and generic chatbots.

---

# Delivery Rules

Throughout implementation:

- Keep the application runnable.
- Build in small, reviewable increments.
- Protect the locked MVP scope.
- Prefer working vertical slices over isolated components.
- Use reusable foundations where they reduce duplication.
- Validate important behaviour immediately.
- Record meaningful decisions as they are made.
- Preserve evidence of how Codex and GPT-5.6 contributed.
- Avoid speculative infrastructure that the MVP does not require.

---

# Quality Gates

Each phase ends with an explicit gate.

Work should not progress beyond a gate when its critical exit criteria remain unmet.

A gate may only be bypassed when:

- The reason is documented.
- The risk is understood.
- A recovery plan exists.
- The project owner approves the decision.

---

# Phase 1 — Repository Foundation

## Objective

Establish a clean, understandable and reproducible project foundation.

## Deliverables

- Agreed repository structure.
- Foundation documentation.
- Local development environment.
- Build tooling.
- Linting and formatting.
- Testing framework.
- Environment-variable guidance.
- Initial continuous-integration checks.
- Open-source licence.
- Basic security and contribution guidance.

## Build Week Evidence

Record:

- Initial repository state.
- Documentation foundation.
- Codex planning sessions.
- Key human decisions.
- First successful build and test run.

## Quality Gate 1 — Foundation Ready

The phase is complete when:

- The repository is logically organised.
- Setup instructions are accurate.
- The application starts locally.
- Linting and tests execute.
- The production build succeeds.
- Existing work and Build Week work can be clearly distinguished where required.

---

# Phase 2 — Application Foundation

## Objective

Create the reusable structure required by the reporting journey.

## Deliverables

- Application routing.
- Shared page layout.
- Mobile viewport foundation.
- Design tokens.
- Typography and spacing foundation.
- Shared buttons and form controls.
- Progress indicator.
- Loading and error foundations.
- Accessible focus behaviour.
- Basic navigation and back behaviour.
- Report state management.

## Implementation Guidance

Build only the shared components required by the current user journey.

Do not attempt to create a complete general-purpose component library.

## Quality Gate 2 — Application Shell Ready

The phase is complete when:

- Core routes can be visited.
- Shared layout behaves consistently.
- Report state can survive movement between steps.
- Mobile layouts work at representative sizes.
- Keyboard and focus behaviour have an initial accessible baseline.

---

# Phase 3 — End-to-End Vertical Slice

## Objective

Produce the first complete reporting journey before deep visual polish or advanced AI integration.

## Initial Journey

1. Home
2. Safety guidance
3. Start report
4. Take or upload a photo
5. Confirm the photo
6. Confirm the location
7. Answer structured questions
8. Review the report
9. Submit
10. View confirmation

## Initial Implementation

The first vertical slice may use:

- Temporary submission storage.
- Stubbed AI responses.
- Development-only sample data.
- Basic visual presentation.

It must not use disconnected mock screens.

## Required Behaviour

A user must be able to:

- Begin a report.
- Move forward and backward safely.
- Preserve entered information.
- Replace a selected photo.
- confirm or adjust the location.
- Answer required questions.
- Review all information.
- Submit successfully.
- Receive clear confirmation.

## Demonstration Checkpoint

Record a short internal walkthrough of the complete journey.

This becomes the baseline against which later improvements are measured.

## Quality Gate 3 — Working Product

The phase is complete when:

- The entire reporting journey works.
- No critical step is represented only by a static mockup.
- State is preserved throughout the workflow.
- The primary happy path can be demonstrated without developer intervention.
- Blocking errors are handled clearly.

---

# Phase 4 — Responsible AI Integration

## Objective

Use GPT-5.6 to improve the quality, consistency and usefulness of the report while retaining human control.

## AI Responsibilities

AI may assist with:

- Interpreting visible evidence cautiously.
- Extracting relevant visual observations.
- Organising user-provided information.
- Generating a structured report summary.
- Improving clarity and readability.
- Identifying missing information.
- Preserving explicit uncertainty.

## AI Must Not

AI must not:

- Diagnose disease.
- Assert an animal species with unsupported certainty.
- Invent facts.
- Replace user-provided observations.
- Submit a report automatically.
- conceal that content was AI-assisted.

## Deliverables

- Server-side AI integration.
- Structured model output.
- Input and output validation.
- Safe fallback behaviour.
- Clear uncertainty language.
- Editable AI-generated summary.
- Human review before submission.
- AI disclosure in the interface.
- Handling for model errors and unavailable service.

## Evaluation Scenarios

Test with:

- Clear bird image.
- Poor-quality image.
- Image with multiple animals.
- Image containing no bird.
- Missing optional information.
- Conflicting user and model observations.
- Model timeout or failure.
- Unexpected model output.

## Build Week Evidence

Record:

- What Codex implemented.
- What GPT-5.6 performs at runtime.
- Which decisions remained human-owned.
- Important prompt or schema iterations.
- Examples of uncertainty and fallback handling.

## Quality Gate 4 — Responsible AI Ready

The phase is complete when:

- GPT-5.6 provides meaningful assistance.
- Outputs are validated before use.
- AI-generated content remains editable.
- Unsupported certainty is avoided.
- Failure does not block the entire reporting journey.
- Human review always occurs before submission.

---

# Phase 5 — Submission and Data Reliability

## Objective

Ensure completed reports are handled consistently and safely.

## Deliverables

- Final report schema.
- Submission service.
- Persistent or approved demonstration storage.
- Input validation.
- Submission status handling.
- Duplicate-submission protection where practical.
- Clear success and failure states.
- Privacy-conscious data handling.
- Development sample-report support.

## Quality Gate 5 — Reliable Reporting

The phase is complete when:

- Valid reports are stored or delivered successfully.
- Invalid reports cannot bypass validation.
- Submission failures preserve user progress.
- Repeated taps do not create uncontrolled duplicate reports.
- Sensitive configuration is not exposed to the client.
- Demonstration data can be reset or reproduced safely.

---

# Phase 6 — Validation and Resilience

## Objective

Increase confidence that the MVP works under realistic conditions.

## Validation Areas

- Unit testing.
- Integration testing.
- End-to-end happy-path testing.
- AI-output validation.
- Mobile browser testing.
- Accessibility review.
- Performance review.
- Error recovery.
- Slow-network behaviour.
- Empty and incomplete states.
- Permission-denied behaviour.
- Image-upload edge cases.

## Critical Test Journey

At minimum, automatically or manually verify:

Home

↓

Safety guidance

↓

Photo

↓

Location

↓

Questions

↓

AI-assisted review

↓

Submission

↓

Success

## Quality Gate 6 — Build Stable

The phase is complete when:

- The primary workflow passes consistently.
- No known critical defects remain.
- The production build succeeds.
- Core tests pass.
- Key mobile layouts have been checked.
- Critical errors provide a recovery path.
- The application remains usable when AI assistance fails.

---

# Phase 7 — User Experience Polish

## Objective

Improve clarity, trust and perceived quality without expanding product scope.

## Activities

- Refine visual hierarchy.
- Improve interface copy.
- Reduce unnecessary taps.
- Improve loading communication.
- Refine empty, error and success states.
- Add restrained state-transition motion.
- Improve touch-target comfort.
- Refine mobile spacing.
- Review the journey against `UI.md`.
- Review accessibility and reduced-motion behaviour.

## Rule

Polish must improve comprehension, confidence or speed.

Decoration alone is not sufficient justification.

## Quality Gate 7 — Coherent Experience

The phase is complete when:

- Every screen feels part of the same product.
- A first-time user can understand the next action quickly.
- The workflow remains achievable in approximately 60 seconds under normal conditions.
- AI assistance is visible but does not dominate.
- No screen feels like an unfinished technical interface.

---

# Phase 8 — Impact and Product Proof

## Objective

Demonstrate that the product solves a specific real-world problem rather than merely showcasing technology.

## Deliverables

- Clear initial user and stakeholder definitions.
- Before-and-after reporting comparison.
- Explanation of how friction is reduced.
- Example final structured report.
- Evidence supporting the under-60-second goal.
- Responsible-AI explanation.
- Credible future expansion narrative.
- Clear distinction from static reporting forms.

## Demonstration Questions

The final product should make it easy to answer:

- Who is this for?
- What problem does it solve?
- Why is the current process inadequate?
- What does AI improve?
- What remains under human control?
- Why is this better than a conventional online form?
- How could the foundation extend beyond bird reporting?

## Quality Gate 8 — Impact Clear

The phase is complete when:

- The problem and audience can be explained in one sentence.
- The demonstrated product directly addresses that problem.
- The value of GPT-5.6 is visible.
- The expansion story is credible without weakening the MVP focus.

---

# Phase 9 — Demonstration and Submission Readiness

## Objective

Prepare a reliable submission that judges can understand whether or not they run the application.

## Deliverables

- Publicly accessible working demo.
- Judge-friendly sample journey.
- Accurate README setup instructions.
- Sample data where necessary.
- Clear testing instructions.
- Repository licence.
- Updated screenshots.
- Final project description.
- Demo video under three minutes.
- Voiceover explaining:
  - What was built.
  - How Codex was used.
  - How GPT-5.6 is used.
- Codex `/feedback` session ID.
- Final BUILD_LOG and CHANGELOG entries.
- Verified repository links.
- Backup demo recording.

## Demo Resilience

Before recording or submitting:

- Use a stable demonstration environment.
- Prepare a representative sample image.
- Confirm model and submission services are available.
- Verify the happy path from a clean session.
- Avoid relying on hidden local configuration.
- Prepare graceful fallback behaviour.
- Test the exact public URL used by judges.

## Quality Gate 9 — Submission Ready

The project is ready when:

- The working application matches the video.
- The video clearly demonstrates the core workflow.
- The use of Codex and GPT-5.6 is explicit.
- Setup and testing instructions are accurate.
- The public demo works without developer assistance.
- Screenshots and written materials tell a coherent story.
- All submission requirements have been independently checked.

---

# Codex Collaboration Evidence

Throughout the build, preserve evidence of meaningful Codex collaboration.

Record:

- Planning and architectural assistance.
- Code-generation sessions.
- Refactoring and review support.
- Test-generation support.
- Debugging assistance.
- Documentation improvements.
- Product decisions proposed by Codex.
- Product decisions accepted, changed or rejected by the project owner.

The project owner remains responsible for:

- Product direction.
- Scope.
- Architecture approval.
- Responsible-AI boundaries.
- Design approval.
- Final code and submission quality.

The objective is not to claim that AI built the product independently.

The objective is to demonstrate effective human–AI engineering collaboration.

---

# Scope Reduction Order

When time becomes constrained, remove work in this order:

1. Optional motion.
2. Decorative visual enhancements.
3. Non-critical secondary states.
4. Additional incident categories.
5. Optional analytics.
6. Advanced location features.
7. Non-essential component abstractions.

Do not remove:

- The complete reporting journey.
- User review before submission.
- Responsible AI safeguards.
- Critical error handling.
- Judge-accessible demonstration support.
- Required submission evidence.

---

# Completion Standard

A feature is complete when:

- It works within the end-to-end journey.
- Its important states have been considered.
- Critical validation exists.
- Accessibility requirements are met.
- Tests or documented verification are complete.
- Relevant documentation is current.
- No known blocking issue remains.

A screen that looks complete but does not function within the reporting journey is not complete.

---

# Primary Implementation Risks

## Scope Creep

Risk:

Additional use cases weaken delivery of the bird-reporting MVP.

Response:

Protect `MVP_SCOPE.md` and defer expansion to `ROADMAP.md`.

## Infrastructure Overbuilding

Risk:

Time is spent creating abstractions that are not required by the MVP.

Response:

Build only what supports the demonstrated reporting journey.

## Disconnected Features

Risk:

Individual screens or AI experiments work but the complete journey does not.

Response:

Establish the vertical slice early and keep it operational.

## AI Overreach

Risk:

The model introduces unsupported certainty or replaces user judgement.

Response:

Validate outputs, preserve uncertainty and require human review.

## Demo Fragility

Risk:

The application depends on local configuration, unstable data or manual intervention.

Response:

Test the public demonstration path repeatedly and provide graceful fallbacks.

## Evidence Gaps

Risk:

The product is strong but the submission does not clearly show how Codex and GPT-5.6 contributed.

Response:

Maintain the BUILD_LOG, commit history, decision records and Codex session references throughout development.

---

# Build Order Summary

1. Repository Foundation
2. Application Foundation
3. End-to-End Vertical Slice
4. Responsible AI Integration
5. Submission and Data Reliability
6. Validation and Resilience
7. User Experience Polish
8. Impact and Product Proof
9. Demonstration and Submission Readiness

The order may change only through a documented decision.

---

# Relationship to Other Documents

`PROJECT.md` explains the project's engineering philosophy.

`VISION.md` defines the future the project seeks to create.

`PRINCIPLES.md` defines enduring product beliefs.

`MVP_SCOPE.md` defines what Build Week will deliver.

`USER_FLOW.md` defines what users do.

`UI.md` defines how the experience should feel.

`ARCHITECTURE.md` defines how the system is organised.

`WORKFLOW.md` defines how development work is performed.

`IMPLEMENTATION_PLAN.md` defines the order in which the MVP is built.

`TASKS.md` defines the work currently being executed.

`DEFINITION_OF_DONE.md` defines the quality required for completion.

---

# Final Principle

Build the complete experience before perfecting its individual parts.

A successful implementation is not measured by the number of components, prompts or technical systems created.

It is measured by whether a real person can complete an important report quickly, confidently and accurately—and whether the final product makes that achievement unmistakably clear.