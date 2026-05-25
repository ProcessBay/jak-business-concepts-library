---
type: atom
title: IaaS vs PaaS vs SaaS
aliases: [Cloud Service Models, IaaS PaaS SaaS Stack, Cloud Computing Tiers]
category: concept
applicable_to: [B2B, technology, software, IT, cloud_computing]
key_metrics: [responsibility_split_per_layer, cost_per_layer, abstraction_level]
related:
  - "specializes: As-a-Service Business Model"
  - "see_also: Cloud Deployment Models"
  - "see_also: SaaS Business Model"
sources: [_Sources/As-a-Service_Business_Models-2]
source_pages: "22-25"
tags: [concept, cloud, IaaS, PaaS, SaaS, abstraction]
created: 2026-05-23
---

# IaaS vs PaaS vs SaaS

## Definition

The three foundational layers of cloud computing as a service. They differ by what's abstracted/managed by the provider vs. the customer. **IaaS (Infrastructure-as-a-Service)** — provider handles servers, storage, networking, virtualization; customer manages OS, runtime, middleware, data, applications. Example: AWS EC2, Azure VMs. **PaaS (Platform-as-a-Service)** — provider adds OS, runtime, middleware; customer manages only application code and data. Example: Heroku, Google App Engine. **SaaS (Software-as-a-Service)** — provider handles everything; customer just uses the application. Example: Salesforce, Microsoft 365. Pereira's framing: each layer trades customer control for provider convenience; choosing the right layer depends on the customer's need for customization vs. speed-to-deploy.

## Key attributes

- **Three layers, increasing abstraction** — IaaS (most customer control) → PaaS → SaaS (most provider control)
- **Cost shifts** — IaaS often cheaper per hour but customer absorbs ops cost; SaaS more per user but ops cost = 0
- **Time-to-deploy varies** — SaaS instant, PaaS days/weeks, IaaS weeks/months
- **Skill requirements differ** — IaaS needs sysadmins/devops; PaaS needs developers; SaaS needs only end users
- **Lock-in trade-off** — IaaS provides more portability; SaaS provides less (data is captive)
- **Use case fit varies** — choose based on what you want to control vs. abstract away

## When to use which

- **Use IaaS when**: need full control of OS/middleware; legacy migration; specific compliance; bursty compute that benefits from cloud economics
- **Use PaaS when**: want fast app deployment; have devs but don't want devops; standard runtimes (Python, Node, Java); rapid prototyping
- **Use SaaS when**: standard business need (CRM, HR, email); want zero ops; small team without IT expertise; need instant deployment

## When NOT to use cloud at all

- Strict on-premises regulatory requirements
- Extreme data sovereignty needs
- Edge computing where latency requires local processing
- Cost-optimized for stable workloads (sometimes on-prem is cheaper at scale)

## Common pitfalls

- Choosing IaaS when SaaS would solve the actual need
- Choosing SaaS when customization needs require IaaS/PaaS
- Treating PaaS as IaaS (and missing its benefits) or as SaaS (and missing its flexibility)
- Underestimating lock-in differences (SaaS data extraction can be hard)
- Failing to model TCO accurately (IaaS hidden ops costs surprise teams)

## Key metrics

- TCO per layer (Total Cost of Ownership over 3-5 year horizon)
- Time-to-deploy
- Lock-in score (data portability, API compatibility, contractual)
- Required headcount per layer

## Decision questions

- What do we genuinely need to control vs. what can we abstract away?
- For our use case: would faster deployment (SaaS) or more customization (IaaS) win?
- What's our 3-year TCO at each layer?
- How much vendor lock-in are we willing to accept?

## Canonical examples

- **IaaS**: AWS EC2, Microsoft Azure VMs, Google Compute Engine, Digital Ocean, Rackspace (page 24)
- **PaaS**: Heroku, Google App Engine (Python/PHP/Node deployment) (page 24)
- **SaaS**: Salesforce, Microsoft 365, Google Workspace, Slack, Zoom, Notion

## Related concepts

- [[As-a-Service Business Model]] — _specializes_
- [[SaaS Business Model]] — _see_also_ (the dominant cloud model)
- [[Cloud Deployment Models]] — _see_also_ (Public/Private/Hybrid — orthogonal axis)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[SaaS Business Model]] — _auto_ (score 8.5: tags×4.0, applicable_to×1.0, title×1.5, alias×2.0)
- [[High-Touch vs Low-Touch Sales]] — _auto_ (score 7.8: tags×4.0, applicable_to×2.0, category×0.8, alias×1.0)
- [[AI-as-a-Service]] — _auto_ (score 6.0: tags×2.0, applicable_to×3.0, alias×1.0)
- [[Brand Identity]] — _auto_ (score 4.8: tags×2.0, applicable_to×2.0, category×0.8)
- [[Community vs Commercial Open-Source]] — _auto_ (score 4.8: tags×2.0, applicable_to×2.0, category×0.8)
- [[Customer Experience]] — _auto_ (score 4.8: tags×2.0, applicable_to×2.0, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/As-a-Service_Business_Models-2]] — pages 22-25 (SaaS, IaaS, PaaS sections)
