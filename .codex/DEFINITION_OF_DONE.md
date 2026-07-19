# Spot & Report Definition of Done

> A practical quality gate for determining when work is genuinely complete.

---

**Document:** DEFINITION_OF_DONE.md  
**Version:** 1.0  
**Status:** Locked  
**Owner:** Project Owner  
**Last Updated:** 19 July 2026

---

# Purpose

This document defines the minimum quality standard required before any task can be considered complete.

A task is not complete simply because implementation has stopped.

It is complete when the agreed objective has been achieved, the work has been validated and every applicable quality requirement can be satisfied honestly.

---

# Guiding Principle

Done means:

- The objective has been achieved.
- The implementation is understandable.
- The solution remains appropriately simple.
- Existing functionality continues to work.
- The user experience has improved or remained excellent.
- Another engineer could confidently continue the project.

If these conditions are not met, the task is not done.

---

# How to Use This Checklist

Apply this checklist after implementation and validation have been completed.

Not every item applies to every task.

Where an item is not applicable, use professional judgement.

Do not mark an item complete without evidence.

A task should only be marked complete when every applicable item can honestly be satisfied.

---

# Definition of Done Checklist

## Product

- [ ] The agreed objective has been achieved.
- [ ] The completed work solves the intended problem.
- [ ] The implementation remains within the agreed MVP scope.
- [ ] No unnecessary functionality has been introduced.
- [ ] No unrelated work has been included.
- [ ] The completed work supports the project vision.
- [ ] Any deferred improvements have been recorded separately.

---

## User Experience

- [ ] The user journey remains simple and understandable.
- [ ] Existing user journeys continue to function as expected.
- [ ] The next action is clear to the user.
- [ ] User actions provide appropriate feedback.
- [ ] Mobile behaviour has been verified where relevant.
- [ ] Touch targets remain usable on mobile devices.
- [ ] Keyboard navigation has been considered where relevant.
- [ ] Screen reader behaviour has been considered where relevant.
- [ ] Colour contrast remains sufficient.
- [ ] Loading states are handled appropriately.
- [ ] Empty states are handled appropriately.
- [ ] Error states are handled appropriately.
- [ ] Validation messages are clear and useful.
- [ ] No unnecessary cognitive load has been introduced.
- [ ] No noticeable performance regression has been introduced.

---

## AI Behaviour

Where AI is involved:

- [ ] AI improves the user outcome rather than adding novelty.
- [ ] AI output is grounded in available user-provided information.
- [ ] AI does not invent facts.
- [ ] AI does not diagnose disease.
- [ ] AI does not identify bird flu.
- [ ] AI preserves uncertainty where appropriate.
- [ ] AI does not overstate confidence.
- [ ] AI does not imply government authority.
- [ ] AI does not claim successful submission unless submission actually occurred.
- [ ] The user can review and confirm AI-generated content.
- [ ] Failure or unavailable-AI states are handled safely.
- [ ] AI limitations remain clear to the user.

---

## Implementation

- [ ] The implementation follows `PROJECT.md`.
- [ ] Existing project conventions have been followed.
- [ ] The approved implementation plan has been respected.
- [ ] Responsibilities remain clear.
- [ ] Functions remain focused.
- [ ] Components remain focused.
- [ ] State and data flow remain understandable.
- [ ] Naming is clear and consistent.
- [ ] Behaviour is explicit rather than hidden.
- [ ] Existing functionality has been reused where appropriate.
- [ ] No unnecessary abstraction has been introduced.
- [ ] No speculative infrastructure has been introduced.
- [ ] No unrelated refactoring has been included.
- [ ] Duplication is acceptable or has been reduced where justified.
- [ ] Dead code has been removed.
- [ ] Commented-out code has been removed.
- [ ] Temporary implementation code has been removed.
- [ ] Debug code has been removed.
- [ ] Secrets and credentials have not been added to the repository.
- [ ] No obvious security issue has been introduced.
- [ ] No obvious privacy issue has been introduced.

---

## Dependencies

Where dependencies are affected:

- [ ] Existing browser or platform capabilities were considered first.
- [ ] The dependency is necessary.
- [ ] The dependency solves a current requirement.
- [ ] The dependency is actively maintained.
- [ ] The dependency is appropriate for the project.
- [ ] The dependency does not introduce disproportionate bundle size.
- [ ] The dependency does not introduce unacceptable security risk.
- [ ] No unnecessary dependency has been added.
- [ ] Removed dependencies are no longer referenced.

---

## Code Quality

- [ ] Type checking passes.
- [ ] Linting passes.
- [ ] Formatting checks pass where applicable.
- [ ] Automated tests pass where applicable.
- [ ] The production build succeeds where applicable.
- [ ] No obvious defects remain.
- [ ] No unresolved warnings remain without explanation.
- [ ] No unreachable code remains.
- [ ] No unnecessary imports remain.
- [ ] No temporary files have been included.
- [ ] No generated files have been included accidentally.
- [ ] Error handling is appropriate.
- [ ] Loading behaviour is appropriate.
- [ ] Edge cases have been considered.
- [ ] Code is readable without requiring additional explanation.

---

## Testing and Validation

- [ ] The intended behaviour has been verified.
- [ ] The complete affected workflow has been tested.
- [ ] Related existing functionality has been checked.
- [ ] Regression checks have been completed where appropriate.
- [ ] Manual testing has been completed where appropriate.
- [ ] Automated tests have been added or updated where they provide value.
- [ ] Success states have been tested.
- [ ] Loading states have been tested.
- [ ] Empty states have been tested.
- [ ] Error states have been tested.
- [ ] Invalid input has been tested where relevant.
- [ ] Boundary cases have been tested where relevant.
- [ ] Mobile viewport behaviour has been tested where relevant.
- [ ] Keyboard behaviour has been tested where relevant.
- [ ] Accessibility behaviour has been tested where relevant.
- [ ] Browser-specific behaviour has been checked where relevant.
- [ ] Validation results are known and can be summarised.

---

## Data, Security and Privacy

Where user or application data is involved:

- [ ] Only necessary data is collected.
- [ ] Sensitive data is not exposed unnecessarily.
- [ ] Sensitive values are not logged.
- [ ] User input is validated.
- [ ] File input is validated where applicable.
- [ ] Location data is handled deliberately.
- [ ] Image metadata is considered where applicable.
- [ ] Error messages do not expose sensitive implementation details.
- [ ] Permission requests are clearly explained.
- [ ] Data handling matches the stated user experience.
- [ ] No unsupported assumption has been made about user consent.
- [ ] Security or privacy trade-offs have been documented where necessary.

---

## Documentation

- [ ] Documentation impact has been assessed.
- [ ] Relevant documentation has been updated.
- [ ] Documentation reflects the current implementation.
- [ ] Outdated statements have been removed.
- [ ] Setup instructions remain accurate.
- [ ] Usage instructions remain accurate.
- [ ] Architecture documentation has been updated where required.
- [ ] Technology documentation has been updated where required.
- [ ] MVP scope documentation has been updated where required.
- [ ] Important decisions have been recorded in `DECISIONS.md`.
- [ ] Meaningful completed changes have been recorded in `CHANGELOG.md` where appropriate.
- [ ] Build progress or lessons have been recorded in `BUILD_LOG.md` where appropriate.
- [ ] Code comments explain why rather than restating what the code does.
- [ ] Public documentation does not overstate completed capability.
- [ ] Deferred work is clearly separated from completed work.

---

## Review

- [ ] The implementation has been self-reviewed.
- [ ] The final change has been compared with the original objective.
- [ ] The final change has been compared with the approved scope.
- [ ] All modified files are understood.
- [ ] Unintended changes have been removed.
- [ ] Naming has been reviewed.
- [ ] Complexity has been reviewed.
- [ ] Accessibility has been reviewed where relevant.
- [ ] Security and privacy have been reviewed where relevant.
- [ ] Known limitations have been identified.
- [ ] Trade-offs have been identified.
- [ ] No known blocking issue remains.
- [ ] Another engineer could understand the change.
- [ ] Another engineer could continue the work confidently.
- [ ] The change could be reviewed without requiring hidden context.
- [ ] The work is small enough to review confidently.

---

## Review Questions

Every applicable question should be answered **Yes**.

- [ ] Has the agreed objective been achieved?
- [ ] Does the completed work solve the intended problem?
- [ ] Is the implementation within scope?
- [ ] Is this the simplest maintainable solution currently justified?
- [ ] Is the implementation understandable?
- [ ] Does the implementation follow existing project patterns?
- [ ] Has unnecessary complexity been avoided?
- [ ] Does existing functionality continue to work?
- [ ] Is the user experience still excellent?
- [ ] Has relevant validation been completed?
- [ ] Is the documentation accurate?
- [ ] Are important decisions recorded?
- [ ] Are known limitations disclosed?
- [ ] Would I merge this confidently?
- [ ] Would I demonstrate this publicly?
- [ ] Could another engineer continue from here confidently?

If any required answer is **No**, the task requires further work or an explicitly documented exception.

---

## Commit Readiness

- [ ] The staged files have been reviewed.
- [ ] The commit contains one logical unit of work.
- [ ] No unrelated files are included.
- [ ] No secrets or credentials are included.
- [ ] No temporary or generated files are included accidentally.
- [ ] The commit message describes the completed outcome clearly.
- [ ] Repository history will remain understandable.
- [ ] The task summary accurately describes what was completed.
- [ ] Validation results are included in the task summary.
- [ ] Limitations and follow-up work are disclosed.

---

## Release Readiness

Where the task contributes to a release or public demonstration:

- [ ] The affected workflow is stable.
- [ ] The affected workflow can be demonstrated successfully.
- [ ] No known blocking issue remains.
- [ ] Failure states are handled acceptably.
- [ ] User-facing language is accurate.
- [ ] AI capability is represented honestly.
- [ ] Documentation reflects the demonstrated capability.
- [ ] The implementation is safe to merge.
- [ ] The implementation is safe to demonstrate.
- [ ] The implementation is safe for another engineer to continue.
- [ ] The completed work meets the quality standard of this project.

---

# Exceptions

Not every task requires:

- New automated tests
- Documentation changes
- Architecture changes
- Dependency review
- AI review
- Release validation

An item may be treated as not applicable when there is a clear and reasonable basis.

Exceptions should not be used to avoid necessary work.

Where an omitted item creates meaningful risk, record:

- The item omitted
- Why it does not apply or cannot be completed
- The risk created
- Any required follow-up work

The checklist exists to improve quality—not create unnecessary bureaucracy.

---

# Completion Statement

Before marking a task complete, confirm:

- [ ] The problem has been solved.
- [ ] The agreed scope has been maintained.
- [ ] The implementation is understandable.
- [ ] The solution remains appropriately simple.
- [ ] Existing functionality continues to work.
- [ ] Relevant validation has passed.
- [ ] Documentation reflects reality.
- [ ] Known limitations are disclosed.
- [ ] No blocking issue remains.
- [ ] Another engineer can continue confidently.

When every applicable statement is true, the task is complete.

---

# Final Principle

Done is not when work stops.

Done is when the completed work meets the quality standard of this project.

If this checklist cannot honestly be completed, the task is not yet done.