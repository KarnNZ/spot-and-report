# Spot & Report Engineering Constitution

> "Build practical intelligent software that creates meaningful value."
>
> — MadLabz

---

**Document:** PROJECT.md

**Version:** 1.0

**Status:** Locked

**Owner:** Project Owner

**Last Updated:** 19 July 2026

---

# Purpose

This document defines the engineering philosophy that guides every decision made throughout the Spot & Report project.

It exists to provide a consistent set of principles for product, engineering and architecture regardless of who contributes to the project.

Whether software is written by a human engineer or an AI coding assistant, every implementation should align with this constitution.

This document intentionally changes very rarely.

Experience may improve the implementation of these principles, but the principles themselves should remain stable.

If implementation decisions ever conflict with this document, this document takes precedence unless explicitly superseded by the project owner.

---

# Vision

Spot & Report exists to make incident reporting dramatically simpler.

The first implementation focuses on reporting sick or dead wild birds, but the underlying platform is intentionally designed to support many different incident types over time.

Examples include:

- Wildlife incidents
- Biosecurity threats
- Invasive species
- Illegal dumping
- Flooding
- Storm damage
- Environmental hazards
- Road hazards
- Community infrastructure issues

Success is not measured by the number of workflows supported.

Success is measured by how well each workflow solves a real problem for the people using it.

Every new workflow should meet the same standard of simplicity, accessibility and trust established by the first.

---

# Core Values

Every decision made throughout this project should reflect the following values.

## Solve Real Problems

Technology should solve genuine problems experienced by real people.

Avoid building features simply because they are technically interesting.

Practical value always takes priority over novelty.

---

## Keep Users at the Centre

Every engineering decision should improve the experience of the person reporting an incident.

If a solution benefits the architecture but makes the user experience more complicated, reconsider the solution.

Technology exists to serve people—not the other way around.

---

## Prefer Simplicity

Simple systems are easier to understand, maintain and improve.

Complexity should only be introduced when it creates clear, measurable value.

Every unnecessary abstraction increases the long-term cost of the project.

---

## Build Responsibly

The project should earn trust through transparency, accuracy and honesty.

Never overstate what the software can do.

Never allow convenience to replace responsible engineering.

Trust is built through consistent behaviour over time.

---

## Deliver Quality

Quality is not an optional enhancement added at the end of a project.

It is a characteristic of every decision made throughout development.

Reducing scope is acceptable.

Reducing quality is not.

---

## Learn Through Shipping

Real users provide better feedback than hypothetical discussions.

Complete valuable work.

Release it.

Learn from real-world experience.

Then improve.

---

## Think Long Term

Every decision should balance today's needs with tomorrow's opportunities.

Avoid premature architecture while remaining aware of the broader vision.

The goal is not to predict the future.

The goal is to remain adaptable when it arrives.

---

# Project Goal

Build a production-quality, mobile-first MVP of Spot & Report.

The MVP enables members of the public to prepare a high-quality report about sick or dead wild birds in under sixty seconds.

The project should demonstrate:

- Excellent user experience
- Responsible AI usage
- Thoughtful engineering
- Mobile-first design
- Accessibility
- Public development transparency

Bird reporting is the first implementation—not the long-term product.

The long-term vision is a configurable incident reporting platform capable of supporting governments, councils, organisations and communities around the world.

---

# North Star

Every engineering decision should reduce the time, effort or uncertainty involved in reporting an incident.

If a feature does not make reporting easier, faster or more trustworthy, it probably does not belong in the MVP.

The simplest successful experience is usually the best experience.

---

# Product Philosophy

Technology should remain almost invisible.

Users should simply move from:

> "I've found something."

to

> "My report is ready."

The application should feel:

- Calm
- Friendly
- Trustworthy
- Professional
- Modern
- Accessible
- Human-centred

Avoid making the product feel like government software.

Avoid making the product feel like enterprise software.

The user should never need to understand the technology behind the experience.

They should only feel confident that the application is helping them complete an important task quickly and correctly.

Every screen should reduce effort.

Every interaction should build confidence.

---

# Build Week Philosophy

Spot & Report is being developed during OpenAI Build Week 2026.

The objective is not to build the largest application.

The objective is to build the highest-quality MVP possible within the available time.

Working software takes priority over speculative architecture.

When choosing between:

- adding another feature, or
- improving an existing experience,

prefer improving the existing experience.

Finish before expanding.

Ship before polishing.

Learn before scaling.

A small product executed exceptionally well creates more value than an ambitious product left unfinished.

---

# Engineering Philosophy

Engineering should favour clarity over cleverness.

Build software that another engineer can confidently understand, review and improve months after it was written.

Prefer software that is:

- Simple
- Readable
- Explicit
- Incremental
- Easy to review
- Easy to maintain

Avoid software that becomes:

- Clever
- Overly abstract
- Prematurely optimised
- Speculative
- Difficult to understand

Small improvements made consistently produce stronger systems than occasional large rewrites.

Engineering excellence is measured by the quality of decisions rather than the quantity of code.

---

# Scope Discipline

The MVP intentionally solves one workflow.

Report sick or dead wild birds.

Every proposed feature should answer one question:

> Does this make reporting an incident easier?

If the answer is no, it probably does not belong in the MVP.

Future ideas should be captured.

They should not automatically become implementation work.

Protecting the scope is one of the most important responsibilities of the project.

Focus creates quality.

Expanding too early creates complexity.

---

# Non-Goals

The purpose of the MVP is **not** to:

- Replace existing government reporting systems.
- Diagnose disease.
- Identify bird flu.
- Demonstrate every possible future capability.
- Build reusable infrastructure prematurely.
- Maximise feature count.

The purpose is to validate one exceptional reporting workflow.

Success is achieved by solving one problem exceptionally well—not by partially solving many.

# Rule of Three

Reusable infrastructure should only be extracted after at least three genuine use cases exist.

Until then:

- Prefer straightforward implementations.
- Accept small amounts of duplication.
- Build only what today's product requires.

Architecture should emerge from proven patterns rather than hypothetical future requirements.

Reusable software is discovered through experience—not predicted through speculation.

---

# Browser Native Philosophy

Modern web browsers provide an increasingly capable application platform.

Before introducing a dependency, first ask:

> Can the browser already do this?

Where practical, prefer native browser capabilities such as:

- Geolocation API
- Camera API
- File Upload API
- Clipboard API
- Web Share API
- Notifications API (where appropriate)

Every unnecessary dependency increases long-term maintenance, bundle size and complexity.

The browser should always be the first framework considered.

---

# User Experience Principles

User experience is the product.

Technology exists to support the experience—not become the experience.

Every interaction should reduce effort, increase confidence and guide the user naturally toward completing their report.

Design should prioritise:

- Mobile-first experiences.
- One-handed operation.
- Minimal typing.
- Clear progress.
- Large touch targets.
- Calm visual design.
- Immediate feedback.
- Reduced cognitive load.

Users should never wonder:

- What should I do next?
- Has anything happened?
- Did my action succeed?

The interface should answer those questions naturally.

When in doubt, remove complexity rather than explaining it.

---

# Accessibility

Accessibility is a core characteristic of quality software.

It is never an enhancement added later.

Every person should be able to report an incident regardless of ability, device or circumstance.

Prioritise:

- Semantic HTML.
- Keyboard accessibility.
- Screen reader compatibility.
- Sufficient colour contrast.
- Clear validation messages.
- Large interactive controls.
- Readable typography.

Accessibility should be considered during design and implementation—not during final testing.

Designing for accessibility almost always improves usability for everyone.

---

# AI Principles

Artificial Intelligence exists to improve report quality.

It does not replace human judgement.

AI may:

- Improve readability.
- Organise information.
- Generate structured summaries.
- Highlight missing information.
- Improve consistency.
- Preserve uncertainty where appropriate.

AI must never:

- Invent facts.
- Diagnose disease.
- Identify bird flu.
- Remove uncertainty.
- Misrepresent confidence.
- Imply government authority.
- Claim that a report has been officially submitted unless that is technically true.

The user remains responsible for confirming the accuracy of every report before submission.

Responsible AI is measured not by how much AI is used, but by whether it genuinely improves the outcome.

---

# Architecture Principles

Architecture should remain intentionally simple.

Prefer systems that are:

- Modular.
- Explicit.
- Composable.
- Easy to understand.
- Easy to extend.

Avoid introducing architecture that exists only to solve hypothetical future problems.

In particular, avoid unnecessary:

- Workflow engines.
- Plugin systems.
- Service locators.
- Event buses.
- Generic factories.
- Registry patterns.

Software should be organised around clear responsibilities rather than abstract layers.

The simplest architecture that successfully solves today's problem is usually the correct architecture.

---

# Success Criteria

The project will be considered successful when:

- A first-time user immediately understands what to do.
- A report can be prepared in under sixty seconds.
- AI improves report quality without replacing human judgement.
- The experience feels excellent on a mobile device.
- The application is accessible and easy to use.
- The product can be confidently demonstrated in under three minutes.
- Organisations immediately understand how it complements existing reporting processes.
- The repository demonstrates thoughtful engineering and responsible AI usage.

Long-term success is measured not only by software delivered, but by trust earned from the people who rely on it.

---

# Engineering Oath

Every line of code should make Spot & Report:

- Simpler.
- Clearer.
- More accessible.
- More trustworthy.
- Easier to maintain.

Every design decision should improve the experience of reporting an incident.

Every architectural decision should create clarity rather than complexity.

If a change does not improve either the product or the experience of using it, it should be reconsidered.

The success of this project is not measured by the amount of software produced.

It is measured by the value created for the people who use it.

---

# Final Principle

Build practical intelligent software that creates meaningful value.

Deliver one exceptional workflow before expanding to many.

Quality is remembered long after feature count is forgotten.

Build software that people trust.

Build software that engineers enjoy maintaining.

Build software that genuinely makes someone's day a little easier.

---

> *This constitution exists to guide engineering decisions, not restrict innovation.*
>
> *It should evolve only when experience demonstrates a better way of building excellent software.*
>
> *Until then, consistency is a feature.*