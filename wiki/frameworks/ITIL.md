---
type: atom
title: ITIL
aliases: [Information Technology Infrastructure Library, ITIL Framework, ITIL 4, IT Service Management]
category: framework
applicable_to: [IT, services, ops, enterprise, support, infrastructure]
key_metrics: [incident_resolution_time, mean_time_to_recovery, change_success_rate, service_availability, customer_satisfaction_csat]
related:
  - "see_also: COBIT"
  - "complements: PRINCE2"
  - "specializes: IT Service Management"
sources: [_Sources/Project_Management_Frameworks-yca3ot]
source_pages: "93-97"
tags: [project_management, framework, IT, ITIL, ITSM, service_management, operations]
created: 2026-06-16
---

# ITIL

## Definition

ITIL (Information Technology Infrastructure Library) is a globally adopted IT service management (ITSM) framework — initially developed by the UK's Central Computer and Telecommunications Agency (CCTA) in the 1980s, with ITIL 4 (released 2019) being the current version incorporating DevOps, Agile, and Lean. Pereira describes it as organized around a **five-stage Service Lifecycle**: Service Strategy, Service Design, Service Transition, Service Operation, and Continual Service Improvement. ITIL provides best-practice guidance — not prescriptive rules — for delivering IT services that align with business objectives, with each lifecycle stage covering specific processes (incident management, change management, problem management, capacity planning, and dozens more).

## Key attributes

- **Five-stage Service Lifecycle** — Strategy, Design, Transition, Operation, Continual Service Improvement
- **Process-rich** — dozens of named processes (incident, change, problem, release, capacity, configuration management)
- **Service Strategy aligns IT with business** — portfolio definition, market analysis, strategic offerings
- **Service Transition manages risk of change** — change/release/deployment management
- **Service Operation runs the steady state** — incident/problem/request/access/event management
- **Customer-centric framing** — services exist to deliver value to customers
- **Adaptable, not prescriptive** — explicitly designed to be tailored to organizational context
- **Aligns with ISO/IEC 20000, ISO 27001, COBIT** — industry-standard interoperability

## When to use

- IT operations and shared-services organizations needing standardized practices
- Enterprises wanting auditable IT service quality
- Organizations whose IT supports business-critical services with uptime requirements
- Contexts requiring ITSM certification or ISO/IEC 20000 alignment
- IT functions transitioning from reactive firefighting to proactive service management
- Combined with COBIT for governance and ITIL for execution

## When NOT to use

- Startup or small IT teams where ITIL's process weight exceeds the team's capacity
- Greenfield product development (ITIL is for services, not products in flux)
- Organizations unwilling to invest in ITIL training and certification
- Cultures that interpret ITIL processes as bureaucracy rather than service discipline
- Contexts where DevOps-style continuous delivery makes Service Transition processes feel heavy

## Common pitfalls

- Adopting ITIL processes without leadership sponsorship — Pereira flags executive support as essential
- Implementing the full framework wholesale instead of tailoring to maturity and need
- Process for process's sake — losing the customer-value framing
- Treating Continual Service Improvement as optional rather than the core engine
- Friction with DevOps culture if change management feels like a brake on deployment
- Stale documentation as services evolve faster than ITIL artifacts are updated

## Key metrics

- **Incident resolution time** — and mean-time-to-recovery (MTTR)
- **Change success rate** — % of changes deployed without rollback or incident
- **Service availability** — uptime % against SLAs
- **First-call resolution rate** — % of incidents resolved at first contact
- **Customer satisfaction (CSAT)** — service consumer satisfaction
- **Problem closure rate** — root-cause issues resolved per period
- **Service-level achievement** — % of SLAs met across the portfolio

## Decision questions

- Do we have executive sponsorship for the cultural change ITIL requires?
- Which lifecycle stages and processes are most relevant to our maturity level today?
- Are we tailoring ITIL to fit, or applying it wholesale and hoping?
- How will we reconcile ITIL change management with DevOps continuous delivery?
- Are we measuring service value to customers, or just process compliance?

## Canonical examples

- UK government IT — ITIL's origin context, CCTA in the 1980s (page 94)
- Enterprise IT shared services (Fortune 500 IT departments broadly)
- Managed service providers — ITIL is foundational to the MSP industry
- ITIL 4 organizations integrating DevOps and Agile (page 94)
- Healthcare IT and financial services IT — common ITIL adopters

## Related concepts

- [[COBIT]] — _see_also_ (governance counterpart; ITIL executes, COBIT governs)
- [[PRINCE2]] — _complements_ (project methodology that often delivers ITIL service changes)
- [[ISO 20000]] — _see_also_ (the IT service management standard ITIL aligns with)
- [[DevOps]] — _see_also_ (modern continuous-delivery culture ITIL 4 integrates)
- [[Service Lifecycle]] — _see_also_ (ITIL's organizing structure)

## Sources

- [[_Sources/Project_Management_Frameworks-yca3ot]] — pages 93-94 (ITIL definition, history, evolution to ITIL 4), pages 94-95 (key principles, Service Lifecycle five stages), pages 95-97 (benefits, implementation considerations)
