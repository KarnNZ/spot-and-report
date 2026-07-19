# Spot & Report — Product Design Manual

> **Design principles, interaction standards and user experience guidance for the Spot & Report MVP.**

Good design removes uncertainty before it removes effort.

---

**Document:** UI.md

**Version:** 3.0

**Status:** Living

**Owner:** Project Owner

**Last Updated:** 20 July 2026

---

# Purpose

This document defines the design philosophy, interaction standards and user experience principles that guide every interface within Spot & Report.

Rather than prescribing colours, components or implementation details, it establishes the principles that ensure every screen remains consistent, trustworthy and accessible.

The goal is not simply to create an attractive interface.

The goal is to help ordinary people successfully report important incidents with confidence.

Whenever design decisions conflict, this document should take precedence over personal preference.

---

# At a Glance

| | |
|---|---|
| **Primary Experience** | Mobile-first guided incident reporting |
| **Primary Goal** | Help first-time users complete a report confidently |
| **Interaction Model** | One clear objective and primary action per screen |
| **Accessibility Standard** | WCAG AA minimum |
| **Guiding Principle** | Clarity before decoration |

---

# Relationship to Product Scope

`MVP_SCOPE.md` defines what the Build Week experience must deliver.

This document defines how that experience should communicate, behave and feel.

The reporting journey described in this manual translates the MVP scope into a consistent, intuitive and trustworthy interface.

---

# Design Goal

Every interaction should reduce the effort required to report an incident.

A first-time user should be able to successfully complete a report without training, documentation or prior experience.

Success is measured by:

- Clarity
- Confidence
- Completion

—not visual complexity.

---

# UI North Star

Every screen should help a first-time user complete the next step with confidence.

Whenever multiple design options exist, choose the solution that makes the next action more obvious.

If a design decision does not make reporting easier, it should be reconsidered.

---

# Design Philosophy

Spot & Report exists to help people report important incidents quickly, accurately and confidently.

Technology should remain almost invisible.

Users should focus on the incident—not the application.

The interface should quietly guide users through the reporting process without overwhelming them with options or unnecessary information.

Good design reduces uncertainty.

Great design makes reporting feel effortless.

---

# Design Decision Framework

When multiple design solutions are technically acceptable, prefer the solution that:

- Reduces reporting friction.
- Requires fewer decisions.
- Requires fewer taps.
- Requires less typing.
- Improves accessibility.
- Increases confidence.
- Supports completion within 60 seconds.
- Leaves room for future growth.

The simplest solution that successfully solves the user's problem is usually the correct solution.

---

# Core Design Principles

Every interface should prioritise:

- Simplicity over decoration.
- Clarity over cleverness.
- Speed over unnecessary options.
- Consistency over novelty.
- Accessibility from the beginning.
- Confidence through feedback.
- Progressive disclosure where appropriate.
- Trust through transparency.

Every design decision should reduce cognitive load.

---

# Five-Second Rule

A first-time user should understand within five seconds:

- Where they are.
- What they should do next.
- What will happen after completing the action.

If additional explanation is required, simplify the interface rather than adding more instructions.

---

# Progressive Disclosure

Only present information required for the current step.

Avoid exposing advanced functionality before it becomes useful.

Users should never feel overwhelmed by unnecessary choices.

Complexity should be revealed gradually as the reporting process naturally progresses.

Reducing visible complexity improves confidence, reduces cognitive load and increases completion rates.

---

# Interaction Philosophy

Every interaction should answer three questions:

1. What am I doing?
2. Why am I doing it?
3. What happens next?

Interactions should never surprise the user.

Every meaningful action should receive clear feedback.

Users should always remain in control of the reporting process.

Whenever uncertainty exists, explain it.

Confidence is built through predictability.

---

# Mobile-First Philosophy

The primary experience is mobile.

Desktop layouts should evolve naturally from the mobile experience—not the reverse.

Interfaces should remain comfortable to use with one hand whenever practical.

Design for real-world environments where users may be:

- Standing
- Walking
- Outdoors
- Wearing gloves
- Working in poor weather
- Using older mobile devices

The interface should remain usable wherever incidents are encountered—not just at a desk.

---

# Accessibility

Accessibility is a design requirement—not a feature added later.

Spot & Report should meet **WCAG AA** standards as a minimum.

Every interface should support:

- Screen readers.
- High colour contrast.
- Visible focus states.
- Large touch targets.
- Plain language.
- Readable typography.
- Reduced-motion preferences.
- Consistent interaction patterns.
- Keyboard accessibility where applicable.

Designing for accessibility improves the experience for everyone.

Accessibility should influence every design decision from the beginning rather than being added at the end.

---

# Visual Language

The visual language should support usability before aesthetics.

Interfaces should feel:

- Calm
- Spacious
- Modern
- Trustworthy
- Minimal
- Consistent

Visual polish should reinforce usability—not compete with it.

Users should naturally focus on completing their report rather than admiring the interface.

---

# Brand Personality

Spot & Report should feel:

- Calm
- Trustworthy
- Helpful
- Respectful
- Friendly
- Professional
- Modern
- Community-focused
- Government-neutral

Avoid experiences that feel:

- Bureaucratic
- Corporate
- Sales-focused
- Experimental
- Over-designed
- Technically intimidating
- Gamified

The application should feel like a trusted public utility rather than a commercial product.

---

# Colour System

Colour communicates meaning—not decoration.

Use colour consistently to reinforce:

- Primary actions
- Success
- Warnings
- Errors
- Guidance
- Progress
- Information

Never rely solely on colour to communicate important information.

Every coloured element should have a functional purpose.

Future implementations should use semantic colour tokens rather than hard-coded colours.

Examples include:

- Primary
- Secondary
- Surface
- Background
- Success
- Warning
- Danger
- Information
- Border
- Disabled

---

# Typography System

Typography should prioritise readability above personality.

Use:

- Clear heading hierarchy.
- Readable body text.
- Comfortable spacing.
- Consistent sizing.
- Predictable alignment.

Avoid decorative typography.

Reading should never become the difficult part of reporting.

---

# Spacing System

Whitespace should organise information—not simply fill empty space.

Use consistent spacing throughout the interface.

As a general rhythm:

- 4px — compact adjustments
- 8px — closely related elements
- 16px — standard spacing
- 24px — grouped content
- 32px — section separation
- 48px — major layout separation

Consistent spacing creates rhythm, improves scanning and reduces cognitive load.

---

# Layout

Every screen should contain:

- Clear page title.
- One primary objective.
- Predictable structure.
- Consistent spacing.
- One visually dominant primary action.

Layouts should remain visually balanced without feeling crowded.

Users should instantly recognise where important information lives.

---

# Motion

Motion should improve understanding—not provide decoration.

Use animation only to:

- Reinforce navigation.
- Explain state changes.
- Acknowledge completed actions.
- Communicate progress.
- Improve perceived responsiveness.

Animations should remain subtle, purposeful and fast.

Respect reduced-motion accessibility preferences.

Motion should reduce uncertainty rather than attract attention.

---

# Screen Anatomy

Every screen should follow a consistent structure whenever practical.

```
Progress (optional)

↓

Page Title

↓

Short supporting guidance

↓

Primary content

↓

Primary action

↓

Secondary action (optional)
```

Every screen should have:

- One clear objective.
- One obvious primary action.
- Minimal supporting text.
- Predictable navigation.
- Immediate feedback.
- A clear path forwards and backwards.

Users should never wonder what they are expected to do next.

---

# Navigation

Navigation should immediately answer:

- Where am I?
- What do I do next?
- How do I go back?

Navigation should never become part of the problem being solved.

Avoid hidden navigation wherever practical.

Confusion slows reporting.

---

# Action Controls

Primary actions should always receive the greatest visual emphasis.

Button labels should describe exactly what will happen.

Prefer:

- Start Report
- Take Photo
- Confirm Location
- Review Report
- Submit Report

Avoid vague labels such as:

- Continue
- Proceed
- Execute
- Confirm

Only one primary action should exist on each screen.

Secondary actions should remain available without competing for attention.

---

# Forms

Collect only information that genuinely improves the report.

Prefer:

- Radio buttons
- Selection controls
- Toggle buttons
- Checkboxes

Minimise typing wherever possible.

Group related questions together.

Validate clearly.

Never discard completed information following validation errors.

Typing is slower, more error-prone and more frustrating on mobile devices.

---

# Cards

Cards should group related information into clear, digestible sections.

Examples include:

- Photo previews
- Location summaries
- Question groups
- Report review
- Confirmation details

Cards should:

- Represent one logical concept.
- Improve scanning.
- Use consistent spacing.
- Avoid excessive nesting.

Cards organise information—they should not become decorative containers.

---

# Camera Experience

Capturing evidence should feel effortless.

The interface should:

- Launch quickly.
- Provide simple guidance.
- Display a large preview.
- Allow immediate retakes.
- Clearly confirm successful capture.

The photograph is often the most valuable part of the report.

The application should treat it accordingly.

---

# Maps & Location

Location confirmation should be quick and reassuring.

Users should immediately understand:

- Their current location.
- The reported location.
- How to confirm it.

Avoid requiring unnecessary precision.

Most users are confirming—not surveying.

---

# AI Interaction

Artificial Intelligence exists to improve report quality—not replace human judgement.

AI should:

- Improve clarity.
- Structure information.
- Generate concise summaries.
- Highlight missing information.
- Preserve uncertainty where appropriate.
- Explain meaningful changes.

AI should never:

- Invent facts.
- Diagnose disease.
- Replace user judgement.
- Claim certainty without evidence.
- Submit reports automatically.
- Dominate the interface.

Human review always remains the final step before submission.

---

# Trust & Transparency

Users should always understand:

- What information is being collected.
- Why it is required.
- How it will be used.
- When the report will be submitted.
- Whether AI has modified their report.
- That they remain in control until submission.

Trust should be earned through transparency rather than complexity.

---

# Content Writing

Every word in the interface should help users complete their task.

Use:

- Plain language.
- Short sentences.
- Active voice.
- Action-focused labels.

Avoid:

- Technical terminology.
- Government jargon.
- AI jargon.
- Long explanations.
- Marketing language.

Clear writing is part of good design.

---

# Touch Targets & Mobile Ergonomics

The interface should remain comfortable to use with one hand whenever practical.

Interactive elements should:

- Be at least 44 × 44 pixels.
- Have sufficient spacing.
- Respect device safe areas.
- Remain usable outdoors.
- Never rely on hover interactions.
- Avoid gesture-only interactions.

Primary actions should remain comfortably within thumb reach wherever practical.

---

# Feedback & Progress

Users should always understand what the application is doing.

Provide clear feedback during:

- Image processing.
- AI report generation.
- Location confirmation.
- Submission.
- Errors.
- Successful completion.

Waiting should never feel uncertain.

Whenever practical, explain what is happening rather than simply displaying a loading indicator.

---

# Empty States

Empty states should clearly explain:

- Why nothing is displayed.
- What the user should do next.
- How to begin.

Blank screens should never feel like failures.

Every empty state should encourage meaningful action.

---

# Loading States

Loading experiences should reassure users that progress is occurring.

Whenever practical:

- Show progress.
- Explain the current step.
- Set expectations.
- Prevent duplicate actions.

Avoid indefinite loading indicators.

---

# Error States

Errors should remain calm, constructive and actionable.

Every error should explain:

- What happened.
- Why it happened (when known).
- How the user can recover.

Avoid technical language.

Never blame the user.

Preserve previously entered information whenever possible.

---

# Success States

Success screens should:

- Confirm completion.
- Reinforce confidence.
- Explain what happens next.
- Offer one obvious next action.

Completion should feel reassuring rather than celebratory.

Users should leave knowing their report has been successfully submitted.

---

# Component Behaviour

Reusable components should behave consistently across the application.

Buttons, cards, dialogs, forms, navigation and feedback components should operate predictably regardless of where they appear.

Users should never need to relearn interactions between screens.

Consistency builds confidence.

---

# Screen Quality Checklist

Before considering any screen complete, confirm that it:

- Has one clear purpose.
- Makes the primary action immediately obvious.
- Requires minimal reading.
- Requires minimal typing.
- Supports one-handed mobile use.
- Uses consistent spacing.
- Meets accessibility requirements.
- Provides appropriate feedback.
- Maintains user trust.
- Supports completion within the overall 60-second reporting goal.

If any item cannot be answered confidently, the design should be reviewed before implementation.

---

# Anti-Patterns

Avoid:

- Multiple competing primary actions.
- Long forms.
- Excessive scrolling.
- Tiny touch targets.
- Hidden navigation.
- Technical language.
- Confirmation fatigue.
- Busy layouts.
- Decorative animations.
- AI jargon.
- Unnecessary permissions.
- Surprising behaviour.

Every unnecessary interaction increases friction.

---

# Measuring Good Design

The interface is successful when:

- A first-time user immediately understands every screen.
- Most reports can be completed without assistance.
- The complete reporting workflow typically finishes within 60 seconds.
- Users rarely need to substantially rewrite AI-generated summaries.
- Users feel confident their report has been submitted successfully.
- The interface fades into the background, allowing users to focus on the incident rather than the application.

Good design is measured by successful reporting—not visual complexity.

---

# UI Evolution Principles

The interface will continue to evolve as Spot & Report grows.

Future improvements should:

- Preserve consistency.
- Reduce friction.
- Improve accessibility.
- Simplify interactions.
- Increase user confidence.
- Avoid unnecessary visual redesigns.

Evolution should feel natural rather than disruptive.

A familiar interface is often more valuable than a novel one.

---

# Related Documents

This document defines how the Spot & Report experience should look, behave and feel.

The following documents provide the most relevant supporting context.

## Product

- `README.md` — Project overview
- `VISION.md` — Why the product exists
- `PRINCIPLES.md` — Enduring product and engineering principles
- `MVP_SCOPE.md` — Defines the Build Week MVP

## Engineering

- `ARCHITECTURE.md` — System organisation
- `TECH_STACK.md` — Technology choices and rationale
- `IMPLEMENTATION_PLAN.md` — Recommended build sequence

## Project Development

- `DECISIONS.md` — Significant product and engineering decisions
- `BUILD_LOG.md` — Development journal
- `CHANGELOG.md` — Version history

## AI Development

- `.codex/PROJECT.md`
- `.codex/WORKFLOW.md`
- `.codex/DEFINITION_OF_DONE.md`
- `.codex/TASKS.md`

Together, these documents define the complete product experience, from vision through implementation.

---

# Final Thought

People rarely remember the interface itself.

They remember whether reporting felt simple, trustworthy and effortless.

Every design decision should reduce friction.

Every interaction should build confidence.

Every screen should help users move naturally to the next step.

Because the best interface is one people barely notice.

It quietly helps them do something important—and then gets out of the way.