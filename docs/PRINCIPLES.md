# Spot & Report Principles

> Enduring principles that guide every product, engineering and AI decision made within Spot & Report.

---

**Document:** PRINCIPLES.md

**Version:** 1.0

**Status:** Locked

**Owner:** Project Owner

**Last Updated:** 19 July 2026

---

# Manifesto

Technology should remove friction, not create it.

Reporting an important real-world incident should never require navigating complex forms, understanding government processes or knowing which organisation is responsible.

People should simply be able to observe something important, report it with confidence and continue with their day.

The role of Spot & Report is not to make reporting more sophisticated.

Its role is to make reporting dramatically easier.

Every decision made within this project should support that belief.

---

# Purpose

Spot & Report exists to make reporting real-world incidents dramatically simpler.

These principles provide the foundation for every product, engineering and design decision.

Whenever new features, technologies or workflows are proposed, they should be evaluated against these principles before implementation begins.

The objective is not to build the largest reporting platform.

The objective is to build the reporting platform that people are most willing to use.

---

# Product Principles

## 1. Simplicity First

Reporting an incident should feel straightforward.

Every screen, interaction and workflow should reduce effort rather than introduce it.

Complexity belongs inside the software—not in the hands of the user.

---

## 2. Solve Real Problems

Every feature should address a genuine reporting need.

Ideas that do not improve the reporting experience should not be added simply because they are technically interesting.

Practical value always outweighs novelty.

---

## 3. Respect People's Time

People report incidents because they care.

The platform should respect that effort by making every interaction purposeful.

Users should never be asked for information that the system can reasonably determine itself.

Every unnecessary tap, question or decision reduces the likelihood that an incident will be reported.

Every saved second increases the likelihood that it will.

---

## 4. Reduce Friction

The platform should remove unnecessary effort wherever possible through:

- Guided questions.
- Intelligent defaults.
- Automatic location.
- Image capture.
- AI-assisted report preparation.
- Clear review before submission.

Users should spend their time describing the incident—not operating the software.

---

## 5. One Excellent Workflow Before Many Average Ones

A complete, polished reporting experience is more valuable than several unfinished workflows.

Every workflow introduced should achieve the same standard of simplicity, reliability and trust before new workflows are added.

Quality scales better than quantity.

---

# Responsible AI Principles

## 6. AI Should Assist, Not Replace

Artificial intelligence exists to help people produce better reports.

It should never replace human judgement or accountability.

Users remain responsible for reviewing and approving every submission.

AI should improve confidence—not remove responsibility.

---

## 7. Trust Is Earned

People report incidents because they expect them to be taken seriously.

The platform should reward that trust by being:

- Transparent.
- Reliable.
- Predictable.
- Honest about uncertainty.
- Respectful of user input.

When evidence is incomplete, the system should communicate uncertainty rather than invent confidence.

Trust is built through honesty.

---

# Engineering Principles

## 8. Mobile First

Many reports are created outdoors and under time pressure.

The experience should always be designed for a mobile phone before a desktop computer.

Desktop support remains important, but mobile usability is the primary design constraint.

---

## 9. Clear Responsibility

Every component should have one well-defined responsibility.

Business logic, AI services, integrations and user interface concerns should remain clearly separated.

Simple systems are easier to understand, maintain, test and improve.

---

## 10. Build for Growth Without Building the Future Today

The architecture should support future expansion without implementing features that have no demonstrated need.

Reusable patterns should emerge naturally as the platform evolves.

Avoid speculative engineering.

---

## 11. Open Standards Where Possible

The platform should avoid unnecessary coupling to specific vendors or external systems.

Internal models should represent the Spot & Report domain rather than the requirements of any individual integration.

This preserves flexibility as the platform grows.

---

# User Experience Principles

Every interaction should make reporting:

- Faster.
- Easier.
- More accurate.
- More complete.
- More trustworthy.

The interface should feel:

- Calm.
- Approachable.
- Trustworthy.
- Responsive.
- Accessible.

Users should focus on reporting the incident—not learning how to use the application.

The best interface is often the one that requires the fewest explanations.

---

# Engineering Philosophy

Engineering decisions should prioritise:

- Simplicity.
- Readability.
- Maintainability.
- Reliability.
- Testability.
- Security.
- Long-term sustainability.

The project should avoid unnecessary frameworks, abstractions and infrastructure until a demonstrated requirement exists.

The simplest architecture capable of solving today's problem is usually the correct one.

Good engineering removes complexity.

Great engineering prevents it from appearing in the first place.

---

# Documentation Philosophy

Documentation exists to explain decisions—not duplicate implementation.

Each document should have one clearly defined responsibility.

When documentation overlaps, it should be refactored rather than repeated.

Good documentation should answer:

- Why was this decision made?
- What problem does it solve?
- How should future contributors think about it?

Documentation should evolve alongside the product.

---

# Decision Framework

Before implementing a significant change, ask:

1. Does this solve a genuine user problem?
2. Does it simplify or complicate the reporting experience?
3. Does it strengthen user trust?
4. Is AI genuinely improving the outcome?
5. Can the architecture support this without unnecessary complexity?
6. Would we still build this if implementation were significantly harder?

If uncertainty remains, prefer the option that:

- Reduces complexity.
- Strengthens trust.
- Respects the user's time.
- Improves maintainability.
- Keeps reporting simple.

Those decisions are rarely the wrong ones.

---

# Applying These Principles

These principles are intended to guide decisions long after the initial MVP has been delivered.

When product priorities conflict, these principles should be used to determine the appropriate direction.

Not every decision will be easy.

The principles exist to make difficult decisions more consistent.

---

# Final Principle

Technology will evolve.

AI models will improve.

Reporting requirements will change.

These principles should remain stable.

Spot & Report is not trying to build the most sophisticated reporting platform.

It is trying to build the reporting platform people are most willing to use.

Every design decision.

Every architectural choice.

Every line of code.

Every AI interaction.

Should move the product closer to that goal.

When in doubt, make reporting simpler.