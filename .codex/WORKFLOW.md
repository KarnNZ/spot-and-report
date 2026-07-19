# Spot & Report Engineering Workflow

> A lightweight, repeatable process for turning an agreed objective into validated, reviewable work.

---

**Document:** WORKFLOW.md  
**Version:** 1.0  
**Status:** Locked  
**Owner:** Project Owner  
**Last Updated:** 19 July 2026

---

# Purpose

This document defines the standard engineering workflow for Spot & Report.

It describes how work moves from an agreed objective to a validated and reviewable implementation.

The workflow applies equally to:

- Human engineers
- AI coding assistants
- Documentation changes
- Product changes
- Engineering tasks
- Bug fixes
- Refactoring

The workflow is intentionally lightweight.

It exists to create clarity, reduce avoidable rework and ensure every task produces an understandable outcome.

---

# Relationship to Project Governance

This document answers:

> How do we work?

The wider documentation structure is:

- **PROJECT.md** defines how the project thinks.
- **MVP_SCOPE.md** defines what belongs in the MVP.
- **WORKFLOW.md** defines how work is performed.
- **DEFINITION_OF_DONE.md** defines how completion is verified.
- **ARCHITECTURE.md** describes how the system is organised.
- **DECISIONS.md** records important product and engineering decisions.
- **CHANGELOG.md** records meaningful completed changes.
- **BUILD_LOG.md** records build progress, challenges and lessons.

If this workflow conflicts with the Engineering Constitution, **PROJECT.md** takes precedence.

---

# Definition of Ready

A task is ready to begin when:

- The objective is clearly understood.
- The expected outcome is known.
- Success can be evaluated.
- The task aligns with the agreed MVP scope.
- Relevant dependencies are known.
- Important assumptions have been identified.
- Significant ambiguity has been resolved.

Do not begin implementation when the task is still unclear.

Seek clarification before code creates commitment.

## Output

A ready task has:

- A clear objective
- A defined outcome
- Known scope
- Known dependencies
- Identified assumptions
- No unresolved blocking ambiguity

---

# Engineering Lifecycle

Every task should follow the same lifecycle.

The depth of each stage may vary depending on the size of the task, but no stage should be ignored without reason.

---

## 1. Understand the Problem

### Purpose

Establish a clear understanding of the problem before proposing or implementing a solution.

### Actions

- Read the task carefully.
- Identify the user or engineering problem being solved.
- Review relevant project documentation.
- Review the agreed MVP boundary.
- Inspect related code and existing behaviour.
- Identify how similar problems are currently solved.
- Confirm the expected outcome.
- Identify assumptions, constraints and unanswered questions.

Do not begin by writing code.

Begin by understanding what success looks like.

### Output

- Problem understood
- Desired outcome understood
- Relevant documentation reviewed
- Existing behaviour inspected
- Constraints identified
- Assumptions identified
- Blocking questions resolved or escalated

---

## 2. Plan

### Purpose

Define the smallest reasonable path from the current state to the desired outcome.

### Actions

- Identify the files likely to change.
- Identify existing code that can be reused.
- Identify dependencies involved.
- Identify tests or validation likely to be required.
- Identify documentation that may need updating.
- Identify risks and unknowns.
- Break large work into smaller logical steps where necessary.
- Avoid including unrelated improvements.

The plan should solve the agreed problem without expanding the task.

### Output

- Objective restated
- Affected files identified
- Reusable functionality identified
- Dependencies identified
- Validation approach identified
- Documentation impact identified
- Risks identified
- Smallest reasonable implementation plan selected

---

## 3. Design

### Purpose

Confirm that the proposed solution fits the current codebase and avoids unnecessary structural change.

### Actions

Ask:

- Can existing code be extended?
- Can an existing component or function be reused?
- Does the solution follow established project patterns?
- Can the problem be solved without introducing another abstraction?
- Are responsibilities clearly separated?
- Does the design introduce hidden behaviour?
- Is a new dependency genuinely required?
- Is an architectural decision being made?
- Is the design proportionate to the size of the problem?

For small tasks, this stage may be brief.

For larger tasks, document the proposed design before implementation.

### Output

- Solution shape understood
- Existing patterns respected
- Responsibilities identified
- New abstractions justified or avoided
- New dependencies justified or avoided
- Architectural impact understood
- Design ready for implementation

---

## 4. Confirm Scope

### Purpose

Prevent the implementation from expanding beyond the agreed objective or MVP boundary.

### Actions

Confirm:

- The task directly supports the agreed objective.
- The task remains within `MVP_SCOPE.md`.
- No unrelated features have been added.
- Future improvements have not become current requirements.
- Optional enhancements are separated from required work.

Ask:

> Does every proposed change contribute directly to the approved outcome?

If the answer is no, remove it from the task or seek approval before continuing.

Future ideas should be recorded rather than implemented silently.

### Output

- Approved scope confirmed
- Non-essential work removed
- Future ideas recorded separately
- No unapproved feature expansion
- Implementation boundary understood

---

## 5. Implement

### Purpose

Produce the approved change using the agreed design and existing project conventions.

### Actions

- Implement only the approved scope.
- Follow existing naming and structural conventions.
- Keep functions and components focused.
- Reuse existing code where appropriate.
- Keep state and data flow explicit.
- Handle expected loading, success and error states.
- Preserve accessibility requirements.
- Preserve mobile-first behaviour.
- Avoid speculative code.
- Avoid unrelated refactoring.
- Keep the project runnable throughout the change where practical.

When unexpected complexity appears, stop and reassess rather than forcing the original plan.

### Output

- Approved functionality implemented
- Scope maintained
- Existing conventions followed
- Responsibilities remain clear
- Expected states handled
- No speculative functionality introduced
- Implementation ready for self-review

---

## 6. Self-Review

### Purpose

Inspect the implementation critically before formal validation or external review.

### Actions

Review the change as though it had been submitted by another engineer.

Look for:

- Incorrect behaviour
- Missing states
- Unclear naming
- Oversized functions or components
- Dead code
- Debug code
- Unnecessary duplication
- Unnecessary abstraction
- Hidden side effects
- Inconsistent patterns
- Accessibility regressions
- Mobile usability issues
- Security or privacy concerns
- Changes outside the agreed scope

Compare the final implementation against the original objective and plan.

### Output

- Implementation reviewed
- Obvious defects addressed
- Naming clarified
- Dead and debug code removed
- Unnecessary complexity reduced
- Scope reconfirmed
- Implementation ready for validation

---

## 7. Validate

### Purpose

Confirm that the implementation behaves correctly and has not unintentionally damaged existing functionality.

### Actions

Run all validation appropriate to the task.

This may include:

- Type checking
- Linting
- Automated tests
- Build verification
- Manual workflow testing
- Mobile viewport testing
- Keyboard testing
- Screen reader checks
- Error-state testing
- Loading-state testing
- Regression checks
- Browser checks

Validate behaviour rather than relying only on successful compilation.

For user-facing changes, test the actual journey a user will complete.

### Output

- Relevant automated checks pass
- Build succeeds where applicable
- Intended behaviour verified
- Existing related functionality verified
- Mobile experience checked
- Accessibility checked where relevant
- Error and loading states checked
- Validation failures resolved or documented

---

## 8. Update Documentation

### Purpose

Keep project documentation aligned with the implementation.

### Actions

Determine whether the change affects:

- User-facing behaviour
- MVP scope
- System architecture
- Technology choices
- Setup instructions
- Development instructions
- Public project information
- Engineering decisions
- Release history
- Build progress

Update only the documents affected by the change.

Documentation should describe the current project—not the project as it existed before the task.

### Output

- Documentation impact assessed
- Relevant documentation updated
- Outdated statements removed
- Setup or usage instructions remain accurate
- Documentation matches current behaviour

---

## 9. Record Decisions

### Purpose

Preserve the reasoning behind important product and engineering choices.

### Actions

Add an entry to `DECISIONS.md` when the task introduces a meaningful decision involving:

- Product direction
- MVP scope
- Architecture
- Data handling
- AI behaviour
- Security or privacy
- Accessibility
- Technology selection
- Dependency selection
- Integration strategy
- Significant trade-offs

Record:

- Date
- Decision
- Context
- Reasoning
- Alternatives considered
- Trade-offs
- Consequences

Routine implementation details do not require decision records.

### Output

- Decision significance assessed
- Important decisions recorded
- Alternatives captured where relevant
- Trade-offs documented
- Future contributors can understand why the choice was made

---

## 10. Prepare for Review

### Purpose

Present the completed work in a form that another engineer can assess efficiently.

### Actions

Prepare a concise summary containing:

- Objective
- What changed
- Why it changed
- Files modified
- Validation performed
- Decisions made
- Trade-offs accepted
- Known limitations
- Follow-up work, if any

Keep known future improvements separate from the completed task.

Do not describe unfinished work as complete.

### Output

- Change summary prepared
- Files modified identified
- Validation results included
- Trade-offs disclosed
- Limitations disclosed
- Follow-up work separated
- Work ready for review

---

## 11. Review Against the Definition of Done

### Purpose

Confirm that the task meets the project's completion standard.

### Actions

Apply `DEFINITION_OF_DONE.md`.

Review each relevant checklist item.

Do not mark the task complete because implementation has stopped.

Mark it complete only when the applicable completion criteria have been satisfied.

Where an item is not applicable, use professional judgement and explain the exception when necessary.

### Output

- Definition of Done reviewed
- Applicable checklist items satisfied
- Exceptions identified and justified
- Remaining work identified
- Completion status determined honestly

---

## 12. Commit

### Purpose

Create a clear and meaningful record of completed work.

### Actions

- Commit a complete logical unit of work.
- Keep unrelated changes out of the commit.
- Review the staged files before committing.
- Use a clear, specific commit message.
- Confirm sensitive information is not included.
- Confirm generated or temporary files are not included accidentally.

Good commit messages describe the completed outcome.

Examples:

- `Add bird incident photo capture`
- `Validate report location before review`
- `Improve mobile report confirmation screen`
- `Document initial architecture decision`
- `Fix inaccessible progress indicator`

Avoid vague messages such as:

- `updates`
- `fixes`
- `changes`
- `misc`
- `work`

### Output

- Logical change committed
- Staged files reviewed
- Commit message clearly describes the outcome
- No unrelated files included
- No secrets or sensitive data included
- Repository history remains understandable

---

## 13. Record Progress

### Purpose

Maintain an accurate history of meaningful project progress.

### Actions

Where appropriate:

- Add completed user-facing or engineering changes to `CHANGELOG.md`.
- Add build progress, challenges and lessons to `BUILD_LOG.md`.
- Update task tracking to reflect the actual state of the work.
- Record deferred improvements without presenting them as complete.

Not every minor edit requires a changelog entry.

Record changes that materially affect the product, architecture, development process or public build story.

### Output

- Task status updated
- Meaningful change recorded
- Build progress captured where relevant
- Deferred work recorded separately
- Public project history remains accurate

---

# AI Coding Assistant Workflow

AI coding assistants follow the same engineering lifecycle as human contributors.

Before implementation, an AI coding assistant should:

1. Read the request.
2. Review relevant project documentation.
3. Inspect relevant files and existing patterns.
4. Restate the objective.
5. Identify affected files.
6. Identify assumptions, risks and ambiguity.
7. Propose the smallest reasonable solution.
8. Confirm scope before implementation.

During implementation, an AI coding assistant should:

1. Implement only the approved objective.
2. Follow existing project conventions.
3. Avoid speculative architecture.
4. Avoid unrelated changes.
5. Stop when unexpected complexity or ambiguity appears.
6. Explain significant decisions.

After implementation, an AI coding assistant should:

1. Review its own changes.
2. Run relevant validation.
3. Update affected documentation.
4. Identify decisions that should be recorded.
5. Apply the Definition of Done.
6. Summarise the completed work.
7. Disclose limitations, assumptions and uncompleted work.

AI-generated code is not considered complete merely because it was generated successfully.

It must be understood, reviewed and validated.

---

# Scope Escalation

Stop and seek approval when:

- Requirements are ambiguous.
- The expected outcome is unclear.
- Multiple materially different solutions are available.
- The requested work expands beyond `MVP_SCOPE.md`.
- A new major dependency is required.
- A significant architectural change is required.
- Security or privacy may be affected.
- AI behaviour or safety boundaries may change.
- User experience may change substantially.
- Existing functionality would need to be removed or reworked.
- The task is significantly larger than originally understood.

When escalating, explain:

- What changed
- Why the original plan is no longer sufficient
- Available options
- Recommended option
- Trade-offs
- Impact on scope and time

Clarification is preferable to implementation based on unsupported assumptions.

---

# Stop Conditions

Pause implementation immediately when:

- The solution becomes substantially more complex than planned.
- Work begins expanding beyond the approved objective.
- A simpler solution becomes apparent.
- Existing architecture behaves differently than expected.
- Validation reveals a wider regression.
- Required information is missing.
- Assumptions are replacing evidence.
- Security or privacy concerns appear.
- The implementation would misrepresent AI capability.
- The task cannot meet the Definition of Done without changing scope.

When a stop condition occurs:

1. Pause.
2. Describe the issue.
3. Reassess the plan.
4. Seek clarification or approval where necessary.
5. Continue only with a confirmed approach.

Stopping early is preferable to completing the wrong solution.

---

# Small Changes

Minor changes do not require unnecessary ceremony.

Examples include:

- Correcting a spelling error
- Updating a broken documentation link
- Adjusting a small label
- Removing an unused import
- Making an obvious formatting correction

For small changes:

- Confirm the objective.
- Make the focused change.
- Validate the affected area.
- Review the Definition of Done.
- Commit clearly.

The workflow should scale with the risk and complexity of the task.

Lightweight does not mean careless.

---

# Urgent Fixes

Urgency may shorten planning, but it does not remove validation.

For urgent fixes:

1. Confirm the failure.
2. Identify the smallest safe correction.
3. Avoid unrelated changes.
4. Validate the affected behaviour.
5. Check for regression.
6. Document the fix.
7. Record follow-up work separately.

Do not use urgency to justify speculative or unreviewed changes.

---

# Workflow Completion

The workflow is complete when:

- The objective has been addressed.
- The implementation has been reviewed.
- Relevant validation has passed.
- Documentation is accurate.
- Important decisions are recorded.
- The Definition of Done has been applied.
- The change is committed as a logical unit.
- Meaningful progress has been recorded where appropriate.

Completion of the workflow does not mean the entire product is finished.

It means the current task has reached an honest, reviewable conclusion.

---

# Final Principle

Understand before planning.

Plan before implementing.

Review before validating.

Validate before declaring completion.

Every task should end with a clear outcome, an accurate record and increased confidence in the project.