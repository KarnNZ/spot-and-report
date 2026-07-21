# Spot & Report Build Log

> A chronological engineering journal documenting the design, development and evolution of Spot & Report throughout OpenAI Build Week.

---

**Document:** BUILD_LOG.md

**Version:** 1.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 19 July 2026

---

# Purpose

This document records the journey of building Spot & Report.

Rather than describing the finished product, it captures the engineering process behind it—including planning, implementation, technical decisions, challenges, experiments and lessons learned.

The Build Log provides transparency into how the project evolved and serves as a permanent historical record of Build Week.

It is intended to demonstrate not only what was built, but how engineering decisions were made and refined over time.

---

# Build Philosophy

Spot & Report is being developed using an iterative engineering process centred around rapid experimentation, responsible AI and continuous refinement.

The objective is not simply to build working software, but to demonstrate how modern AI-assisted development can accelerate high-quality engineering while maintaining clear architectural thinking, responsible decision-making and production-quality standards.

---

# Build Principles

Throughout Build Week every implementation session should aim to leave the project in a better state than it was found.

Development is guided by the following principles:

- Ship working software frequently.
- Keep commits small and understandable.
- Prefer clarity over cleverness.
- Maintain production-quality standards.
- Document important decisions immediately.
- Test continuously.
- Avoid unnecessary complexity.
- Build reusable foundations.
- Build for users—not judges.

---

# Build Week Objectives

The primary objectives for Build Week are to:

- Deliver a polished production-quality MVP.
- Demonstrate responsible use of OpenAI technologies.
- Showcase AI-assisted software engineering.
- Produce professional engineering documentation.
- Create an excellent user experience.
- Build a compelling public demonstration.
- Establish foundations for future platform growth.

Success will be measured by quality, usability and engineering discipline rather than feature count.

---

# Build at a Glance

```
                     Spot & Report Build

✔ Project Started
        │
        ▼
✔ Planning & Architecture
        │
        ▼
✔ Documentation Complete
        │
        ▼
▶ Implementation Begins
        │
        ▼
○ Core MVP Complete
        │
        ▼
○ Testing & Refinement
        │
        ▼
○ Submission
```

This roadmap illustrates the current stage of development.

Progress should be updated as major milestones are completed.

---

# Milestone Timeline

| Milestone | Status |
|-----------|--------|
| Project vision defined | ✅ Complete |
| Brand established | ✅ Complete |
| Documentation framework completed | ✅ Complete |
| Repository created | ✅ Complete |
| Development environment configured | ✅ Complete |
| Core application implementation | ⏳ In Progress |
| AI reporting workflow | ⏳ Planned |
| End-to-end MVP complete | ⏳ Planned |
| Testing & refinement | ⏳ Planned |
| Build Week submission | ⏳ Planned |

This timeline should evolve alongside the project.

---

# Development Journal

The following journal records meaningful engineering progress throughout development.

Rather than documenting every code change, entries should focus on significant milestones, technical decisions, challenges and lessons learned.

---

## Journal Entry Template

### Date

**Objective**

Describe the primary goal for the session.

---

**Completed**

Summarise the work completed.

---

**Key Decisions**

Record important engineering or product decisions.

---

**Challenges**

Describe any significant technical or design challenges encountered.

---

**Lessons Learned**

Capture observations that may improve future work.

---

**Session Outcome**

**Confidence:** High / Medium / Low

**Build Health:** Excellent / Good / Needs Attention

**Blockers:** None or list active blockers.

---

**Next Steps**

Outline the next planned work.

---

# Journal Entries

---

## 20 July 2026

### Objective

Initialise the production-quality application baseline and begin the approved application foundation in small, reviewable slices.

---

### Completed

- Initialised Next.js 16.2.10 with React 19.2.7 and the App Router.
- Added a strict TypeScript configuration and `src/app/` structure.
- Configured Tailwind CSS 4.3.3 through PostCSS.
- Configured ESLint with Next.js Core Web Vitals and TypeScript rules.
- Added the local development, lint, type-check and production-build scripts.
- Generated the npm lockfile.
- Passed linting, strict type checking and the production build.
- Established semantic design tokens and global accessibility styles.
- Added the shared mobile-first `PageContainer` and `ScreenHeader` components.
- Added the minimal native `Button` and temporary `StepPlaceholder` components.
- Replaced the foundation placeholder with the real mobile-first landing screen and added the single safety placeholder route required by its primary action.
- Replaced the safety placeholder with clear public guidance and added the single photo placeholder route required by its primary action.
- Replaced the photo placeholder with native single-image selection, accessible MIME and 15 MB validation, a replaceable local preview and navigation to the single location placeholder.
- Replaced the location placeholder with browser geolocation, explicit permission and failure feedback, a 200-character manual fallback and navigation to the single questions placeholder.
- Added an in-memory report session that restores selected photo and location data across client-side report navigation.
- Replaced the questions placeholder with four focused report questions and extended the in-memory session to restore their answers.
- Replaced the review placeholder with a read-only summary of the collected report and added clear empty-session recovery.
- Added a reusable report progress indicator to the Safety, Photo, Location, Questions and Review screens.
- Added a pure report submission engine that validates completed report sessions and builds a canonical submission payload.
- Added a simulated submission service and confirmation screen, completing the MVP journey from landing page to temporary report reference.
- Established the Spot & Report visual identity with a shared typographic brand mark, refined semantic colours and application metadata.
- Refined the shared button, page container, screen header, placeholder, brand mark and report progress presentation for a more consistent mobile-first interface.
- Applied screen-level polish across the complete reporting journey, improving content grouping, form presentation, report scanning and confirmation hierarchy.
- Added deterministic Back navigation throughout the active report steps and aligned submission validation with the existing manual location fallback.
- Replaced the combined photo action with separate camera and existing-image choices after real-device testing exposed unreliable forced-camera behaviour.
- Replaced the temporary text brand mark with the final Spot & Report logo served from `public/branding` and verified it across its mobile placements.
- Added the shared Spot & Report brand mark to every active reporting step without changing report behaviour.
- Added understated MadLabz attribution to the landing and confirmation screens with a simple informational About page.
- Added a server-generated AI report summary step that remains fully editable before review and submission.

---

### Key Decisions

- Kept the first implementation increment limited to the runnable framework baseline.
- Deferred reusable components, MVP routes, tests, formatting and workflow state to separately approved commits.
- Used stable framework releases and avoided React Compiler or additional application dependencies.
- Defined the visual foundation through Tailwind's CSS-first theme configuration without adding a component library or font dependency.
- Kept the shared shell APIs fixed to current screen needs and isolated safe-area handling inside the page container.
- Preserved native button behaviour and kept placeholder screens explicitly free of workflow logic.
- Used a native GET form for landing-page navigation, avoiding client-side state and additional routing abstractions.
- Kept the safety screen informational and stateless, with native navigation to the unimplemented photo step.
- Kept preview object URLs inside the focused photo-picker client boundary, with no upload or server persistence.
- Kept geolocation request mechanics inside the focused location client boundary; location values are not submitted or placed in navigation URLs.
- Relied on secure-context browser geolocation, which requires HTTPS outside the localhost development exception, while keeping manual entry available when permission is denied or location is unavailable, unsupported or times out.
- Scoped the report session provider to the `/report` route tree and deliberately omitted browser or server persistence, so refreshing or restarting the application clears all report data.
- Kept the Questions screen to the four approved observation fields and added only the review placeholder required for forward navigation.
- Kept submission separate from review by routing the primary action only to a submit placeholder, without adding APIs or persistence.
- Kept progress presentational and explicit on each participating page, without changing workflow, navigation or report-session behaviour.
- Kept submission preparation separate from delivery: validation returns all errors and no network, persistence or UI integration occurs in the engine.
- Kept the end-to-end submission simulation local: the service reuses engine validation, waits 750 milliseconds and returns temporary confirmation metadata without a network request.
- Encapsulated the wordmark so future logo artwork can replace it without changing screen composition, navigation or workflow behaviour.
- Limited shared UI refinement to visual rhythm, typography and control treatment; public APIs and workflow behaviour remain unchanged.
- Reused existing tokens and direct feature styling for screen polish, preserving every route, validation rule, report-session update and simulated-submission behaviour.
- Kept confirmation as the terminal report screen and accepted either device coordinates or a trimmed manual description as a valid submission location, without changing backend behaviour or adding workflow steps.
- Retained the rear-camera hint only for Take Photo while allowing Upload Existing Photo to use the browser's normal image sources; both actions share validation, session, preview and submission behaviour.
- Preserved the prop-free `BrandMark` API while using the final logo's intrinsic dimensions and responsive CSS sizing, requiring no consuming-screen or workflow changes.
- Kept attribution outside the active reporting steps and reused one shared presentation so the workflow remains distraction-free.
- Kept OpenAI credentials and requests server-side, sent only normalized report evidence without photos or precise coordinates, and required human review of every generated summary.

---

### Challenges

AVG Web Shield intercepts HTTPS using a Windows-trusted root that is not included in Node.js's bundled certificate authorities. The install retained TLS verification by temporarily providing Node with the matching trusted local root; no certificate or npm security override was added to the repository.

Testing note: Camera capture was verified successfully on iPhone Safari over HTTPS. The black camera preview occurred only when the app was opened inside the Google app's embedded browser, indicating a browser-specific limitation rather than an application defect.

AI summaries use neutral, evidence-bound instructions and validation that rejects explicit diagnostic certainty. Users can edit or replace the generated text, and the final user-approved wording is included in the submission payload. Local live generation requires a server-only `OPENAI_API_KEY`; no browser-exposed OpenAI environment variable is used.

npm also reported a moderate advisory in Next.js's bundled PostCSS dependency. The current automated remediation would force a breaking downgrade to Next.js 9, so the current stable framework version was retained pending an upstream stable fix. The application does not process user-supplied CSS.

---

### Lessons Learned

Environment-specific trust-store differences should be diagnosed explicitly rather than bypassed by disabling TLS verification.

Dependency audit recommendations require engineering review before automated remediation is accepted.

---

### Session Outcome

**Confidence:** High

**Build Health:** Good

**Blockers:** None for project initialisation. The upstream PostCSS advisory remains a disclosed dependency risk.

---

### Next Steps

Await project owner approval before implementing the next Task 2 slice.

---

## 19 July 2026

### Objective

Establish a complete engineering foundation before implementation begins.

---

### Completed

- Defined the product vision.
- Finalised the MVP scope.
- Designed the overall architecture.
- Selected the technology stack.
- Established engineering principles.
- Created repository documentation.
- Planned development workflow.
- Recorded major engineering decisions.
- Produced the long-term roadmap.

---

### Key Decisions

- Mobile-first web application.
- Modular monolith architecture.
- Server-side OpenAI integration.
- Human review before report submission.
- Bird Report selected as the initial workflow.

---

### Challenges

Balancing long-term architectural thinking with the need to keep the Build Week MVP intentionally focused.

---

### Lessons Learned

Investing in planning and documentation before implementation significantly improves engineering clarity.

Well-defined architecture reduces uncertainty during development.

---

### Session Outcome

**Confidence:** High

**Build Health:** Excellent

**Blockers:** None

---

### Next Steps

Begin implementation of the reporting workflow.

---

# Technical Challenges

This section records interesting engineering challenges encountered throughout development.

Examples include:

- Prompt engineering.
- Structured AI output validation.
- Image processing.
- Geolocation.
- Performance optimisation.
- Accessibility improvements.
- Deployment issues.
- Integration challenges.
- User experience refinements.

Each challenge should include:

- Problem
- Investigation
- Solution
- Outcome

The objective is to preserve engineering knowledge rather than simply record bugs.

---

# AI Collaboration

One objective of this project is to demonstrate effective collaboration between human engineers and AI tools.

AI is used to assist with:

- Architecture exploration.
- Documentation.
- Code generation.
- Refactoring.
- UI iteration.
- Prompt engineering.
- Testing strategies.
- Engineering reviews.
- Technical brainstorming.

Human judgement remains responsible for:

- Product direction.
- Architectural decisions.
- Responsible AI.
- Final implementation decisions.
- Quality assurance.

AI accelerates engineering but does not replace engineering responsibility.

---

# Engineering Statistics

The following metrics provide a high-level overview of project progress.

| Statistic | Current |
|------------|--------:|
| Project Age | Day 1 |
| Documentation Files | 13 |
| Architecture Decisions | 10 |
| Major Milestones Completed | 4 |
| Git Commits | 0 |
| Features Completed | 0 |
| Bugs Resolved | 0 |
| Screens Produced | 0 |
| Demo Videos | 0 |
| AI Collaboration Sessions | 0 |

These values should be updated throughout development.

---

# Screenshots & Demonstrations

As development progresses, this section should include:

- User interface screenshots.
- Workflow demonstrations.
- Architecture diagrams.
- Development progress images.
- Demo recordings.
- Before-and-after comparisons.

Visual evidence helps demonstrate how the product matured throughout Build Week.

---

# Lessons Learned

This section captures broader observations that emerge throughout the project.

Topics may include:

- AI-assisted software engineering.
- Prompt engineering.
- Product design.
- User experience.
- Technical architecture.
- Development workflow.
- Build Week experience.

The emphasis should be on learning rather than simply recording success.

---

# Final Retrospective

This section should be completed after Build Week concludes.

Suggested topics include:

- What worked well.
- What could be improved.
- Technical achievements.
- Product insights.
- Engineering lessons.
- Future priorities.

The retrospective should provide an honest assessment of the project and identify opportunities for continued improvement.

---

# Looking Back

This document intentionally preserves the project as it unfolded.

Ideas changed.

Assumptions were challenged.

Designs evolved.

Technical decisions were refined.

Rather than rewriting history, this journal records the reality of building software—an iterative process of learning, experimentation and continuous improvement.

Understanding how Spot & Report evolved is as important as understanding the finished product itself.

The journey documented here reflects the engineering philosophy of the project: build thoughtfully, learn continuously and improve deliberately.

---

# Final Principle

Software is more than code.

It is the accumulation of ideas, decisions, experiments, iterations and lessons learned over time.

This Build Log preserves that journey so future contributors can understand not only what Spot & Report became, but how—and why—it evolved.

Every milestone recorded here should leave the project better than it was before.
