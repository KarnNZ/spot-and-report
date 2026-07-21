# Spot & Report

![Status](https://img.shields.io/badge/status-Build%20Week%202026-blue)
![Development](https://img.shields.io/badge/development-active-success)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6)
![React](https://img.shields.io/badge/React-19-61DAFB)
![OpenAI](https://img.shields.io/badge/OpenAI-Powered-412991)
![License](https://img.shields.io/badge/license-MIT-green)

> **A mobile-first, AI-assisted incident reporting platform built during OpenAI Build Week 2026.**

Spot & Report helps people report important incidents in under **60 seconds** by combining photos, location, structured information and responsible AI into a simple guided reporting experience.

The Build Week MVP focuses on reporting **sick or dead wild birds**, while laying the foundations for a configurable incident reporting platform capable of supporting many different incident types in the future.

> **Spot it. Report it.**

---

# 📱 Hero Image

> *(Replace this section with the final mobile application mock-up or hero image.)*

A full-width screenshot of the completed application should be displayed here.

---

# 🌍 Why Spot & Report?

Reporting important incidents is often slower and more complicated than it should be.

People frequently need to:

- Find the correct organisation
- Locate the appropriate reporting form
- Re-enter the same information multiple times
- Attach photos manually
- Explain observations from scratch

That friction means many incidents are never reported.

Spot & Report removes that friction by guiding people through a simple reporting workflow that captures the information they already have before responsibly using AI to prepare a high-quality report ready for human review.

Technology should remove complexity—not create it.

---

# 🎯 Build Week MVP

The OpenAI Build Week MVP intentionally focuses on a single workflow:

> **Report a Sick or Dead Wild Bird**

Building one exceptional workflow creates a strong foundation for future incident types without compromising quality.

---

# ✨ Key Features

- 📱 Mobile-first user experience
- 📷 Camera and photo upload support
- 🔎 Optional, reviewable AI-assisted image observations
- 📍 Automatic location capture
- 🤖 Responsible AI-assisted report preparation
- 📝 Structured incident summaries
- 👤 Human review before submission
- ♿ Accessibility-first design
- 🌍 Platform designed for future expansion

---

# 🎨 Design Principles

The experience is intentionally designed to feel:

- ✅ Calm
- ✅ Friendly
- ✅ Trustworthy
- ✅ Accessible
- ✅ Government-neutral
- ✅ Mobile-first
- ✅ Human-centred

Users shouldn't need to understand the technology.

They should simply move from:

> **"I've found something."**

to

> **"My report is ready."**

---

# 🏗️ Architecture at a Glance

```text
User
   │
   ▼
Capture Photos
   │
   ▼
Collect Location
   │
   ▼
AI Report Builder
   │
   ▼
Human Review
   │
   ▼
Report Submission
```

The architecture deliberately remains simple, modular and easy to extend.

For the complete design see **docs/ARCHITECTURE.md**.

---

# 🚀 Project Status

| Item | Status |
|------|--------|
| Stage | 🚧 Build Week MVP |
| Development | Active |
| Platform | Mobile-first Web Application |
| AI | OpenAI |
| Current Workflow | Bird Reporting |
| Long-Term Vision | Configurable Incident Platform |

---

# 📈 Build Week Progress

- ✅ Product Vision
- ✅ Brand Identity
- ✅ Repository Created
- ✅ Documentation
- ✅ User Experience Design
- ✅ Architecture
- 🚧 MVP Development
- ⏳ Testing & Refinement
- ⏳ Demo Video
- ⏳ Submission

Daily progress and engineering decisions are documented in **docs/BUILD_LOG.md**.

---

# ⚙️ Technology Stack

The MVP is built using a modern, production-ready web stack.

- ▲ Next.js
- ⚛️ React
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🤖 OpenAI API
- 🗄️ Supabase Postgres and private Storage
- ✅ Zod
- 🌐 Modern Browser APIs

See **docs/TECH_STACK.md** for the complete technology rationale.

Supabase environment, migration and private-bucket setup is documented in
**docs/SUPABASE_SETUP.md**.

The image-analysis safety boundary and approval flow are documented in
**docs/AI_IMAGE_ANALYSIS.md**.

---

# 📚 Repository Guide

Spot & Report documentation is intentionally organised into focused documents.

Each document has a single responsibility.

Together they form an engineering handbook describing the product, the engineering process and the evolution of the project.

---

## Repository Structure

```text
                                   README
                                      │
          ┌───────────────────────────┴───────────────────────────┐
          │                                                       │
          ▼                                                       ▼
   Product Documentation                              Engineering Documentation
          │                                                       │
          ├── VISION.md                                           ├── WORKFLOW.md
          ├── PRINCIPLES.md                                       ├── DEFINITION_OF_DONE.md
          ├── MVP_SCOPE.md                                        ├── IMPLEMENTATION_PLAN.md
          ├── UI.md                                               ├── BUILD_LOG.md
          ├── ARCHITECTURE.md                                     └── CHANGELOG.md
          ├── TECH_STACK.md
          ├── DECISIONS.md
          └── ROADMAP.md
```
---

## 🧭 Product Documentation

| Document | Purpose |
|----------|---------|
| `docs/VISION.md` | Why Spot & Report exists |
| `docs/PRINCIPLES.md` | Enduring product and engineering principles |
| `docs/MVP_SCOPE.md` | Defines the Build Week MVP |
| `docs/UI.md` | Product design and interaction standards |
| `docs/ARCHITECTURE.md` | High-level system architecture |
| `docs/TECH_STACK.md` | Technology choices and rationale |
| `docs/DECISIONS.md` | Significant product and engineering decisions |
| `docs/ROADMAP.md` | Planned product evolution |

---

## 🔧 Engineering Documentation

| Document | Purpose |
|----------|---------|
| `.codex/WORKFLOW.md` | Development workflow and engineering process |
| `.codex/DEFINITION_OF_DONE.md` | Quality standards and completion criteria |
| `docs/IMPLEMENTATION_PLAN.md` | Recommended build sequence for the MVP |
| `docs/BUILD_LOG.md` | Engineering journal and development progress |
| `docs/CHANGELOG.md` | Version history and completed changes |

---

## 📖 Recommended Reading Order

1. README
2. VISION
3. PRINCIPLES
4. MVP_SCOPE
5. UI
6. ARCHITECTURE
7. TECH_STACK
8. IMPLEMENTATION_PLAN
9. DECISIONS
10. ROADMAP
11. WORKFLOW
12. DEFINITION_OF_DONE
13. BUILD_LOG
14. CHANGELOG

---

# 💡 Documentation Philosophy

Every document exists for a single purpose.

Information should only exist in one place.

Keeping each document focused makes the repository easier to navigate, maintain and extend as the project grows.

---

# 🚀 Quick Start

```bash
git clone https://github.com/<username>/spot-and-report.git

cd spot-and-report

npm install

npm run dev
```

---

# 📸 Screenshots

> *(To be added during development.)*

This section will showcase:

- 🏠 Home Screen
- 📷 Camera Workflow
- 🤖 AI Review Screen
- 📤 Report Submission
- 📱 Mobile Experience

---

# 🔮 Future Vision

Today's MVP validates a single reporting workflow.

```text
Bird Reports
      │
      ▼
Wildlife Reporting
      │
      ▼
Biosecurity Reporting
      │
      ▼
Environmental Reporting
      │
      ▼
Community Incident Reporting
      │
      ▼
Configurable Incident Reporting Platform
```

The long-term vision is to support governments, councils, organisations and communities with a configurable reporting platform while preserving the same simple user experience.

---


# 🙏 Acknowledgements

Spot & Report is built by **MadLabz** as part of **OpenAI Build Week 2026**.

The project demonstrates how thoughtful engineering, responsible AI and human-centred design can simplify real-world reporting.

---

# 💙 Final Thought

Technology is only valuable when it makes people's lives easier.

Spot & Report exists to remove friction from reporting important incidents, allowing communities, organisations and governments to receive better information while making the reporting experience dramatically simpler for the people who need it.

---

> **Spot it. Report it.**
