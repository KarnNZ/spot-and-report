# Spot & Report AI Operating Manual

> Operating instructions for AI coding assistants contributing to the Spot & Report project.

---

**Document:** AGENTS.md

**Version:** 2.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 20 July 2026

---

# Purpose

This document defines how AI coding assistants should operate within the Spot & Report repository.

It establishes the expected engineering behaviour, development workflow and decision-making process for all AI-assisted contributions.

This document focuses on **how to work**, not **what to build**.

Product direction remains defined by the project's documentation and explicit user instructions.

---

# AI Operating Principles

Every contribution should follow these principles.

- Think before coding.
- Prefer the smallest working solution.
- Protect MVP scope.
- Protect repository consistency.
- Update documentation when required.
- Never surprise the project owner.
- Leave the repository better than you found it.

When uncertain:

> **Choose the simpler solution.**

---

# Document Precedence

When working within the Spot & Report repository, use the following order of precedence.

1. Current explicit user instructions
2. `.codex/PROJECT.md`
3. `docs/MVP_SCOPE.md`
4. `docs/PRINCIPLES.md`
5. `docs/ARCHITECTURE.md`
6. `docs/UI.md`
7. `docs/TECH_STACK.md`
8. `.codex/WORKFLOW.md`
9. `.codex/DEFINITION_OF_DONE.md`
10. `.codex/TASKS.md`

If documentation appears to conflict, prefer the higher-priority document unless the user explicitly instructs otherwise.

When uncertainty remains, ask for clarification rather than making assumptions.

---

# Primary Objective

Build a production-quality, mobile-first MVP that enables members of the public to prepare a high-quality incident report in under 60 seconds.

Every implementation should move the project closer to this objective.

---

# Repository Priorities

When making engineering decisions, optimise in the following order:

1. ✅ Correctness
2. ✅ User Experience
3. ✅ Maintainability
4. ✅ Performance
5. ✅ Future Flexibility

Never sacrifice clarity for optimisation.

---

# Scope Guardrails

The current MVP supports one workflow only.

> Report a sick or dead wild bird.

Do not introduce additional workflows or functionality without explicit approval.

Examples outside MVP scope include:

- User accounts
- Administration portals
- Analytics dashboards
- Notifications
- Plugin systems
- Generic workflow engines
- Multi-tenant architecture
- Future incident types

When uncertain:

Stay inside MVP scope.

---

# Before Writing Code

Before implementing any solution, ask:

- Does existing documentation already answer this?
- Does similar code already exist?
- Can existing components be reused?
- Is this inside MVP scope?
- Can this be implemented more simply?
- Is another dependency really necessary?

Prefer understanding before implementation.

---

# Engineering Principles

## Always Do

- Build one feature at a time.
- Keep files focused.
- Keep functions small.
- Keep components small.
- Use explicit naming.
- Prefer composition.
- Write readable code.
- Improve existing code where appropriate.
- Keep changes easy to review.

## Never Do

- Over-engineer.
- Optimise prematurely.
- Rewrite working code unnecessarily.
- Add abstraction "just in case."
- Introduce speculative architecture.
- Add unnecessary dependencies.
- Solve hypothetical future problems.

Build today's product.

Document tomorrow's ideas.

---

# Execution Workflow

Every task should follow the same workflow.

```text
Receive Task
      │
      ▼
Read Relevant Documentation
      │
      ▼
Confirm MVP Scope
      │
      ▼
Implement Smallest Working Solution
      │
      ▼
Validate Behaviour
      │
      ▼
Review Code Quality
      │
      ▼
Update Documentation
      │
      ▼
Complete
```

Never skip understanding in order to code faster.

---

# Architecture Rules

Prefer:

- Feature-based organisation
- Small modules
- Explicit data flow
- Pure functions
- Composition
- Simple interfaces

Avoid introducing:

- Event buses
- Service locators
- Registries
- Plugin systems
- Generic factories
- Empty abstractions

Architecture should emerge through proven need—not prediction.

---

# UI & UX Expectations

Follow docs/UI.md.

Every interface should feel:

- Calm
- Friendly
- Trustworthy
- Accessible
- Mobile-first
- Human-centred

Optimise for:

- One-handed use
- Minimal typing
- Large touch targets
- Clear progress
- Low cognitive load

Technology should remain almost invisible.

---

# Responsible AI

AI exists to improve report quality.

AI may:

- Improve readability.
- Structure information.
- Generate summaries.
- Highlight missing information.
- Preserve uncertainty.

AI must never:

- Invent facts.
- Diagnose disease.
- Claim certainty where uncertainty exists.
- Replace human judgement.
- Imply government authority.
- Claim submission unless technically true.

Human review is always the final step.

---

# Browser-First Philosophy

Before adding a dependency ask:

1. Can modern browsers already solve this?
2. Can this be implemented simply ourselves?
3. Does it materially improve the MVP?
4. Is the dependency actively maintained?

Prefer native browser capabilities whenever practical.

---

# Coding Standards

Use:

- TypeScript strict mode
- Explicit types
- Small functions
- Small components
- Meaningful names
- Self-documenting code

Avoid:

- `any`
- Dead code
- Hidden behaviour
- Large files
- Unused imports
- Debug code

Comments should explain **why**, not **what**.

---

# Testing Expectations

Prefer:

- Behavioural tests
- Deterministic tests
- Realistic workflows
- Readable test cases

Every completed feature should be validated before completion.

---

# Documentation Responsibilities

When making meaningful changes:

- Update relevant documentation.
- Record important architectural decisions.
- Update docs/BUILD_LOG.md.
- Update docs/CHANGELOG.md where appropriate.
- Keep documentation consistent.

Documentation is part of the product.

---

# Repository Mindset

Think like a senior engineer.

Every contribution should:

- Improve the repository.
- Reduce complexity.
- Increase clarity.
- Be easy to maintain.
- Be easy to understand.

Never optimise for cleverness.

Optimise for longevity.

---

# Never Assume

Never:

- Invent requirements.
- Expand scope.
- Remove documentation without updating related files.
- Change behaviour without justification.
- Rewrite code simply because another approach exists.

If requirements are unclear:

Ask.

Do not guess.

---

# Definition of a Good Contribution

A good contribution:

- Solves one clearly defined problem.
- Introduces minimal risk.
- Remains within MVP scope.
- Updates documentation where necessary.
- Leaves the repository easier to understand.
- Can be reviewed quickly.
- Improves the product.

Small, thoughtful improvements are preferred over large rewrites.

---

# Change Review Checklist

Before considering work complete, confirm:

- ✅ Requested outcome achieved.
- ✅ MVP scope preserved.
- ✅ Code remains simple.
- ✅ Mobile-first behaviour maintained.
- ✅ Accessibility considered.
- ✅ Tests pass.
- ✅ Documentation updated.
- ✅ No unnecessary dependencies introduced.

---

# Repository Personality

The repository should always feel:

- Professional
- Calm
- Practical
- Thoughtful
- Consistent
- Production-ready

Avoid unnecessary experimentation unless explicitly requested.

---

# When Requirements Are Unclear

If uncertainty exists:

- Choose the simplest solution.
- Preserve existing behaviour.
- Stay within MVP scope.
- Request clarification when necessary.

Never invent product requirements.

---

# Definition of Success

A successful contribution should:

- Improve the user experience.
- Improve maintainability.
- Improve repository consistency.
- Maintain architectural clarity.
- Move the MVP closer to completion.

Every contribution should leave the repository in a better state than it was found.

---

# Final Principle

AI is an engineering partner—not the owner of the product.

Its role is to accelerate thoughtful engineering while respecting the project's philosophy, architecture and quality standards.

Build with clarity.

Build with purpose.

Build practical intelligent software that creates meaningful value.