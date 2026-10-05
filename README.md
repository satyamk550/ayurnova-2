# 🌿 AyurNova

### Digital Panchakarma & Ayurveda Healthcare Management Platform

> **AyurNova** is a full-stack healthcare management platform focused on digitizing the Panchakarma treatment lifecycle and connecting patients, Ayurvedic practitioners, therapists, Panchakarma centres, and healthcare administrators through a unified digital system.

The project is being developed as a **learning-focused full-stack application**, inspired by real-world Ayurveda healthcare management platforms and designed to explore backend engineering, database architecture, healthcare workflows, scheduling systems, role-based access control, inventory management, and AI-assisted healthcare features.

---

## 🚧 Project Status

**Current Stage: Frontend Prototype + Backend Architecture in Development**

The current repository contains the core frontend interface and role-based dashboard structure.

The backend is being developed incrementally using **Python, Flask/FastAPI and MySQL**, following a modular architecture.

### Development Progress

| Module | Status |
|---|---|
| Landing Page | ✅ Completed |
| Authentication UI | ✅ Completed |
| Patient Dashboard | ✅ Completed |
| Doctor Dashboard | ✅ Completed |
| Government Dashboard | ✅ Completed |
| Role-based UI | ✅ Completed |
| Backend Architecture | 🔄 In Progress |
| REST API | 🔄 In Progress |
| MySQL Database | 🔄 In Progress |
| Authentication & RBAC | 🔄 In Progress |
| Patient Management | 🔄 In Progress |
| Doctor / Consultation Module | 🔄 In Progress |
| Panchakarma Treatment Management | 🔄 In Progress |
| Therapy Scheduling | 🔄 In Progress |
| Therapist & Room Management | 🔄 Planned |
| Inventory Management | 🔄 Planned |
| Billing & Payments | 🔄 Planned |
| Notifications | 🔄 Planned |
| AI Assistant | 🔄 Planned |
| Redis Caching | 🔄 Planned |
| FHIR / ABDM Integration | 🔭 Future |

---

# 🎯 Vision

Panchakarma treatment is not a single appointment.

A complete treatment journey can involve:

**Patient → Consultation → Assessment → Treatment Planning → Pre-treatment → Therapy Sessions → Therapist → Room → Medicines / Consumables → Progress Tracking → Follow-up**

AyurNova aims to model this entire lifecycle digitally.

Instead of building isolated features such as appointment booking or patient registration, the project focuses on creating a **connected healthcare workflow** where different modules share the same underlying patient and treatment information.

---

# 🧩 Core Problem

Traditional healthcare workflows in smaller Ayurveda and Panchakarma centres can involve a mixture of:

- Paper-based patient records
- Manual appointment scheduling
- Treatment registers
- Therapist allocation
- Room allocation
- Medicine and consumable tracking
- Separate billing systems
- Manual follow-up records
- Fragmented patient history

This creates problems such as:

- Duplicate data
- Scheduling conflicts
- Difficult treatment tracking
- Poor visibility into patient history
- Manual inventory management
- Limited analytics
- Difficulty coordinating multiple departments

**AyurNova explores how these workflows can be connected through one digital platform.**

---

# 💡 Proposed Solution

AyurNova is designed around a central healthcare workflow:

```text
Patient
   │
   ▼
Registration
   │
   ▼
Consultation
   │
   ▼
Clinical Assessment
   │
   ▼
Panchakarma Treatment Plan
   │
   ├───────────────┐
   ▼               ▼
Poorva Karma   Treatment Sessions
                   │
                   ├── Therapist
                   ├── Room
                   ├── Therapy
                   └── Consumables
                           │
                           ▼
                       Inventory
                           │
                           ▼
                      Treatment
                       History
                           │
                           ▼
                       Follow-up
```

The goal is to create a connected data model instead of independent CRUD modules.

---

# 👥 User Roles

AyurNova is designed around multiple user roles.

### 🧑‍⚕️ Doctor

Doctors can eventually:

- Manage assigned patients
- View patient history
- Record consultations
- Create treatment plans
- Prescribe medicines
- Plan Panchakarma therapies
- Monitor treatment progress
- Add clinical notes

---

### 🧑‍🦱 Patient

Patients can eventually:

- Create and manage their profile
- View treatment history
- Book appointments
- View upcoming therapy sessions
- Track treatment progress
- View prescriptions
- Receive notifications
- Access relevant healthcare documents

---

### 🧑‍🔬 Therapist

Therapists will be responsible for:

- Viewing assigned sessions
- Checking treatment schedules
- Recording session observations
- Updating session status
- Tracking assigned patients

---

### 🏥 Panchakarma Centre

A centre-level administration layer is planned to manage:

- Doctors
- Therapists
- Treatment rooms
- Therapy schedules
- Inventory
- Centre appointments
- Treatment packages
- Operational information

---

### 🏛️ Government / Healthcare Administrator

The government-facing layer is intended primarily for **aggregated and authorized information**, such as:

- Registered centres
- Practitioner statistics
- Treatment utilization
- Regional trends
- Programme monitoring
- Aggregated treatment outcomes
- Healthcare analytics

> Patient-level information should be protected through authentication, authorization and consent-based access.

---

# 🏗️ System Architecture

The initial architecture follows a **modular monolith** approach.

Microservices are intentionally not being introduced at the beginning because the project is primarily focused on understanding backend architecture and business workflows.

```text
                         ┌───────────────────────┐
                         │       AyurNova        │
                         │    Web Frontend       │
                         │   HTML / CSS / JS     │
                         └───────────┬───────────┘
                                     │
                                  REST API
                                     │
                         ┌───────────▼───────────┐
                         │     Backend API       │
                         │   Python / Flask      │
                         └───────────┬───────────┘
                                     │
             ┌───────────────────────┼───────────────────────┐
             │                       │                       │
       ┌─────▼─────┐           ┌─────▼─────┐           ┌─────▼─────┐
       │   Auth    │           │  Patient  │           │  Centre   │
       │   & RBAC  │           │ Management│           │ Management│
       └─────┬─────┘           └─────┬─────┘           └─────┬─────┘
             │                       │                       │
             └───────────────────────┼───────────────────────┘
                                     │
                            ┌────────▼────────┐
                            │ Clinical Layer  │
                            └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │ Panchakarma     │
                            │ Treatment Plans │
                            └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │ Therapy Sessions│
                            └────────┬────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
              ┌─────▼─────┐    ┌─────▼─────┐   ┌────▼─────┐
              │ Therapist │    │   Rooms    │   │Inventory │
              │ Management│    │ Scheduling │   │ & Stock  │
              └───────────┘    └───────────┘   └────┬─────┘
                                                     │
                                              ┌──────▼──────┐
                                              │   Billing   │
                                              │ & Payments  │
                                              └──────┬──────┘
                                                     │
                                             ┌───────▼──────┐
                                             │    MySQL     │
                                             │   Database   │
                                             └──────────────┘
```

---

# 🧱 Backend Architecture

The backend is being structured around separation of responsibilities.

```text
backend/
│
├── app.py
│
├── config/
│   ├── database.py
│   └── settings.py
│
├── routes/
│   ├── auth.py
│   ├── patients.py
│   ├── doctors.py
│   ├── appointments.py
│   ├── consultations.py
│   ├── treatments.py
│   ├── therapy_sessions.py
│   ├── inventory.py
│   └── billing.py
│
├── models/
│   ├── user.py
│   ├── patient.py
│   ├── doctor.py
│   ├── centre.py
│   ├── treatment.py
│   ├── therapy.py
│   ├── session.py
│   └── inventory.py
│
├── services/
│   ├── auth_service.py
│   ├── patient_service.py
│   ├── treatment_service.py
│   ├── scheduling_service.py
│   ├── inventory_service.py
│   └── billing_service.py
│
├── repositories/
│   ├── patient_repository.py
│   ├── treatment_repository.py
│   └── session_repository.py
│
└── utils/
    ├── auth.py
    ├── validators.py
    └── helpers.py
```

The exact structure may evolve during development.

---

# 🗄️ Database Architecture

The database is designed around relationships between patients, treatments, sessions and healthcare resources.

### Core entities

```text
Users
 │
 ├── Patients
 ├── Doctors
 ├── Therapists
 └── Administrators

Patients
 │
 ├── Consultations
 ├── Assessments
 ├── Treatment Plans
 ├── Prescriptions
 └── Treatment History

Treatment Plans
 │
 ├── Treatment Phases
 └── Therapy Sessions
       │
       ├── Therapist
       ├── Room
       ├── Therapy
       └── Consumables

Inventory
 │
 ├── Medicines
 ├── Consumables
 ├── Batches
 └── Stock Movements

Billing
 │
 ├── Invoices
 ├── Payments
 └── Treatment Packages
```

### Planned relational model

```text
users
  │
  ├──────── patients
  │             │
  │             ├── consultations
  │             ├── assessments
  │             └── treatment_plans
  │                          │
  │                          └── therapy_sessions
  │                                  │
  │                    ┌─────────────┼──────────────┐
  │                    │             │              │
  │                therapist       room          therapy
  │                                                  │
  │                                             consumables
  │                                                  │
  │                                              inventory
  │
  └──────── doctors
```

---

# 🌿 Panchakarma Treatment Lifecycle

One of the core concepts of AyurNova is representing Panchakarma as a **treatment lifecycle rather than a single appointment**.

```text
Initial Consultation
        │
        ▼
Assessment
        │
        ▼
Treatment Planning
        │
        ▼
┌───────────────────────┐
│      Poorva Karma     │
│   Pre-treatment       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│    Pradhana Karma     │
│   Main Treatment      │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│     Paschat Karma     │
│   Post-treatment      │
└───────────┬───────────┘
            │
            ▼
       Follow-up
            │
            ▼
     Outcome Tracking
```

Each treatment may contain multiple sessions.

```text
Treatment Plan #102

├── Therapy: Abhyanga
│   ├── Session 1
│   ├── Session 2
│   └── Session 3
│
├── Therapy: Swedana
│   ├── Session 1
│   └── Session 2
│
└── Therapy: Basti
    ├── Session 1
    ├── Session 2
    └── Session 3
```

---

# 📅 Therapy Scheduling

The scheduling system is designed to prevent resource conflicts.

Before creating a therapy session, the backend will eventually verify:

```text
Patient availability
        +
Therapist availability
        +
Room availability
        +
Centre capacity
        +
Treatment plan validity
```

Example:

```text
10:00 AM

Therapist A → Patient 1
Room 03     → Patient 1

Attempt:

Therapist A → Patient 2
Room 03     → Patient 2

Result:

❌ Therapist conflict
❌ Room conflict
```

This transforms scheduling from a simple calendar into an actual backend business rule.

---

# 📦 Inventory Management

Treatment sessions can consume medicines and other treatment resources.

Example:

```text
Abhyanga Session
       │
       ▼
100 ml Herbal Oil Used
       │
       ▼
Inventory Transaction
       │
       ▼
Stock Updated
```

Planned inventory capabilities include:

- Medicine management
- Consumable management
- Stock levels
- Batch tracking
- Expiry tracking
- Stock movements
- Treatment consumption
- Low-stock alerts

---

# 💳 Billing

The billing module is planned around treatment packages and services.

Example:

```text
Panchakarma Package
₹15,000

Paid
₹5,000

Remaining
₹10,000
```

Planned entities:

```text
Treatment Package
       │
       ├── Package Sessions
       ├── Invoice
       └── Payments
```

---

# 🔐 Authentication & Authorization

AyurNova uses role-based access control as part of its planned backend architecture.

```text
                 Authentication
                       │
                       ▼
                  User Identity
                       │
                       ▼
                     Role
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Patient       Doctor       Admin
          │            │            │
       Patient       Clinical    Management
       Data          Data        Data
```

Planned security features:

- Password hashing
- Authentication
- Role-based authorization
- Secure sessions / tokens
- Input validation
- API access control
- Rate limiting
- Audit logs
- Environment-based secrets
- Database protection

---

# ⚡ Planned Redis Layer

Redis will be introduced after the core backend is functional.

Potential use cases:

```text
Redis
 │
 ├── Session storage
 ├── Caching
 ├── Rate limiting
 ├── Temporary booking locks
 └── Background task support
```

Redis is **not required for the first version**.

---

# 🤖 AI Assistance

AI is planned as an **assistive layer**, not as an autonomous medical decision-maker.

Potential applications include:

- Patient education
- Ayurveda FAQ assistant
- Clinical note summarization
- Treatment-history summarization
- Document extraction
- Administrative assistance

Example:

```text
Doctor's Clinical Notes
          │
          ▼
      AI Service
          │
          ▼
Structured Summary
          │
          ▼
   Doctor Review
          │
          ▼
Final Clinical Record
```

> AI-generated information will not replace professional medical judgment.

---

# 🔗 Future Interoperability

A future goal is to make AyurNova compatible with healthcare interoperability standards such as **FHIR** and potentially the **Ayushman Bharat Digital Mission (ABDM)** ecosystem.

Planned architecture:

```text
AyurNova Internal Data
          │
          ▼
   FHIR Mapping Layer
          │
          ▼
Integration Adapter
          │
          ▼
Future ABDM Integration
```

This layer is **future work and is not currently implemented**.

---

# 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Tailwind CSS

### Backend

- Python
- Flask / FastAPI
- REST APIs

### Database

- MySQL

### Planned Infrastructure

- Redis
- Docker
- Background workers
- Object storage

### AI

- Python-based AI/ML services
- LLM APIs / local models depending on implementation

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- MySQL Workbench

---

# 📁 Current Repository Structure

```text
ayurnova-2/
│
├── assets/
│   └── css/
│
├── scripts/
│
├── landingpage.html
├── login.html
├── signup.html
├── role.html
│
├── patient-dashboard.html
├── doctor-dashboard.html
├── government-dashboard.html
│
├── auth.js
├── chatbot.js
│
└── README.md
```

> The backend structure will be introduced as backend development progresses.

---

# 🚀 Running the Current Frontend

Clone the repository:

```bash
git clone https://github.com/satyamk550/ayurnova-2.git
```

Move into the project:

```bash
cd ayurnova-2
```

Open the frontend using a local development server.

For example, with VS Code:

```text
Right Click → Open with Live Server
```

or use any static HTTP server.

---

# 🔮 Development Roadmap

## Phase 1 · Frontend

- [x] Landing page
- [x] Login / Signup UI
- [x] Role selection
- [x] Patient dashboard
- [x] Doctor dashboard
- [x] Government dashboard
- [ ] Frontend API integration

---

## Phase 2 · Backend Foundation

- [ ] Flask/FastAPI setup
- [ ] MySQL connection
- [ ] Database schema
- [ ] Environment configuration
- [ ] REST API structure
- [ ] Error handling
- [ ] Request validation

---

## Phase 3 · Authentication

- [ ] User registration
- [ ] Login
- [ ] Password hashing
- [ ] Authentication tokens/sessions
- [ ] Role-based authorization
- [ ] Protected routes

---

## Phase 4 · Clinical Management

- [ ] Patient profiles
- [ ] Doctor profiles
- [ ] Consultations
- [ ] Clinical notes
- [ ] Patient history
- [ ] Prakriti assessment
- [ ] Vikriti assessment
- [ ] Prescriptions

---

## Phase 5 · Panchakarma

- [ ] Treatment plans
- [ ] Poorva Karma
- [ ] Pradhana Karma
- [ ] Paschat Karma
- [ ] Therapy management
- [ ] Treatment sessions
- [ ] Progress tracking
- [ ] Follow-up

---

## Phase 6 · Resource Management

- [ ] Therapist management
- [ ] Room management
- [ ] Therapy scheduling
- [ ] Availability checking
- [ ] Conflict detection
- [ ] Inventory
- [ ] Consumable tracking

---

## Phase 7 · Finance

- [ ] Treatment packages
- [ ] Invoices
- [ ] Payments
- [ ] Package balance
- [ ] Billing history

---

## Phase 8 · Advanced Backend

- [ ] Redis
- [ ] Background jobs
- [ ] Notifications
- [ ] Caching
- [ ] Booking locks
- [ ] Audit logs

---

## Phase 9 · AI

- [ ] AI healthcare assistant
- [ ] Patient education assistant
- [ ] Clinical note summarization
- [ ] Treatment history summarization

---

## Phase 10 · Interoperability

- [ ] FHIR data mapping
- [ ] Healthcare data exchange
- [ ] ABDM research
- [ ] ABDM integration exploration

---

# 📊 Long-Term Architecture

The architecture may eventually evolve toward:

```text
                        ┌─────────────────┐
                        │ Web / Mobile UI │
                        └────────┬────────┘
                                 │
                         ┌───────▼───────┐
                         │ Load Balancer │
                         └───────┬───────┘
                                 │
                  ┌──────────────┼──────────────┐
                  │              │              │
             API Server 1   API Server 2   API Server 3
                  │              │              │
                  └──────────────┼──────────────┘
                                 │
                         ┌───────▼───────┐
                         │     Redis     │
                         └───────┬───────┘
                                 │
                         ┌───────▼───────┐
                         │    MySQL      │
                         │   Database    │
                         └───────────────┘

                    Additional Services
                           │
              ┌────────────┼─────────────┐
              ▼            ▼             ▼
          AI Service   Notifications   Analytics
```

This architecture is **future-oriented** and will only be introduced when the project requires it.

---

# 📚 Learning Objectives

AyurNova is being developed as a practical backend and full-stack learning project.

The project is intended to provide hands-on experience with:

- Full-stack application architecture
- REST API development
- Python backend development
- Relational database design
- SQL
- Authentication
- Authorization
- Role-Based Access Control
- Database relationships
- Transactions
- Scheduling systems
- Concurrency and resource locking
- Inventory workflows
- Billing systems
- Caching with Redis
- AI integration
- Healthcare data modelling
- API design
- Docker
- Scalable system architecture

---

# 🔒 Privacy & Security

AyurNova is an educational project and is **not intended for real-world clinical use** in its current state.

No real patient information should be uploaded or stored in development environments.

Healthcare applications require appropriate:

- Data protection
- Consent management
- Access control
- Encryption
- Auditability
- Regulatory compliance
- Security testing

These considerations will be explored as the project evolves.

---

# ⚠️ Disclaimer

AyurNova is a **learning and development project**.

It is not a medical device, clinical decision-support system, or substitute for professional medical advice.

Any AI functionality developed within the project is intended for educational and assistive purposes only.

---

# 🎓 Project Purpose

The primary purpose of AyurNova is to understand how a real-world healthcare management platform can be designed and implemented from the ground up.

The project takes inspiration from existing Ayurveda healthcare-management systems while independently implementing its own architecture and workflows for educational purposes.

The goal is not to reproduce an existing commercial product, but to learn from the architectural problems such systems need to solve.

---

# 👨‍💻 Author

**Satyam Kumar**

B.Tech Blockchain Engineering Student

Interested in:

- Backend Development
- Artificial Intelligence & Machine Learning
- Blockchain & Web3
- System Architecture
- Healthcare Technology

---

# 📌 Project Status

**Active Development**

The frontend prototype is available in this repository.

Backend development and database implementation are currently being built incrementally.

⭐ If you're interested in the architecture or development process, feel free to explore the repository and follow the project as it evolves.

---
