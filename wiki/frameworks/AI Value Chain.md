---
type: atom
title: AI Value Chain
aliases: [AI Pipeline, ML Lifecycle, AI Production Stack]
category: framework
applicable_to: [B2B, AI, technology, data, software]
key_metrics: [data_quality_score, model_accuracy, deployment_latency, monitoring_alert_rate, time_to_production]
related:
  - "specializes: Value Chain Analysis"
  - "see_also: AI-as-a-Service"
  - "see_also: Continuous Improvement"
sources: [_Sources/AI_Business_Models-2xspgi-2]
source_pages: "51-60"
tags: [framework, AI, value_chain, ML_lifecycle, MLOps]
created: 2026-05-23
---

# AI Value Chain

## Definition

The AI Value Chain maps the sequential stages required to deliver value from AI: (1) **Data Generation and Collection** — sourcing raw data from sensors, transactions, behaviors, third-party datasets; (2) **Data Storage and Management** — infrastructure to store, version, govern, and access data at scale; (3) **Data Analysis and Insights** — exploration, transformation, and feature engineering; (4) **AI Model Development** — algorithm selection, training, tuning, validation; (5) **Deployment** — operationalizing models into products and workflows; (6) **Monitoring** — ensuring ongoing performance, detecting drift, retraining as needed. Pereira frames each stage as a value-creation opportunity AND a potential bottleneck — most AI initiatives fail not at model development but at data quality or deployment/monitoring.

## Key attributes

- **Six sequential stages** — Data Gen → Storage → Analysis → Model Dev → Deployment → Monitoring
- **Value created cumulatively** — each stage adds value; weakest link caps the whole
- **Most failures upstream OR downstream** — bad data sinks models; bad deployment sinks bad models that work in lab
- **Continuous loop** — monitoring feeds back into data collection and model iteration
- **Tooling has matured per stage** — Snowflake/Databricks (data); MLflow/Weights & Biases (model dev); SageMaker/Vertex (deployment); Arize/WhyLabs (monitoring)
- **Talent specialization per stage** — data engineers, ML engineers, MLOps engineers all distinct roles

## The six stages

1. **Data Generation and Collection** — sensors, transactions, scraping, third-party feeds, synthetic data
2. **Data Storage and Management** — data lakes, warehouses, feature stores, governance
3. **Data Analysis and Insights** — EDA, feature engineering, labeling, augmentation
4. **AI Model Development** — algorithm selection, training, validation, hyperparameter tuning
5. **Deployment** — model serving, A/B testing, integration into products/workflows
6. **Monitoring** — performance tracking, drift detection, retraining triggers, observability

## When to use

- Diagnosing where AI initiative is bottlenecked
- Building an AI strategy with explicit attention to all six stages
- Investment prioritization across MLOps/data infrastructure
- Talent planning (which roles to hire for which stage)
- Vendor evaluation per stage

## When NOT to use

- For pure consumer applications where AI is one feature
- As a substitute for product-market fit (the value chain produces working AI; it doesn't make AI customers want)
- For non-AI projects (it's specifically the AI lifecycle)

## Common pitfalls

- Over-investing in model development while data quality is weak
- Under-investing in monitoring (models silently degrade post-deployment)
- Treating ML lifecycle as one-time (it's continuous)
- Hiring data scientists without data engineers (data is the bottleneck)
- Skipping the data analysis stage (jumping from raw data to modeling produces garbage)

## Key metrics per stage

- **Data Gen/Collection**: data volume, ingestion success rate
- **Storage/Management**: query latency, data freshness, governance compliance
- **Analysis/Insights**: feature coverage, label quality, EDA depth
- **Model Dev**: accuracy, F1, hyperparameter sweep efficiency
- **Deployment**: time-to-prod, deployment success rate, rollback frequency
- **Monitoring**: drift detection latency, retrain frequency, model uptime

## Decision questions

- Which stage is our weakest link?
- Where are we spending vs. where would investment yield most?
- Do we have specialized talent at each stage, or generalists trying to do all?
- What's our model lifecycle (how often do we retrain), and is it appropriate?
- How do we know when a deployed model is degrading?

## Canonical examples

- **Google** — strong end-to-end; Search/Ads as the AI product (pages 88-90)
- **Amazon** — data → personalization → fulfillment AI; deep integration (pages 91-92)
- **Netflix** — recommendation engine across full value chain
- **OpenAI** — strong on stages 1-4 (data, training, model dev); deployment via API (page 95-97)
- **Tesla** — strong on stages 1, 4-6; fleet generates data; OTA deployment

## Related concepts

- [[Value Chain Analysis]] — _specializes_ (Porter's VCA applied to AI)
- [[AI-as-a-Service]] — _see_also_ (AIaaS providers operate the full chain)
- [[Continuous Improvement]] — _see_also_ (monitoring → retraining is the CI loop)

<!-- jak-link:auto-begin -->
<!-- Auto-discovered by jak-link. Editorial lines above are preserved. -->
- [[Technology Partnership]] — _auto_ (score 8.8: tags×4.0, applicable_to×4.0, category×0.8)
- [[AI-as-a-Service]] — _auto_ (score 8.5: tags×2.0, applicable_to×4.0, title×1.5, alias×1.0)
- [[Value Chain Analysis]] — _auto_ (score 6.8: tags×2.0, applicable_to×1.0, title×3.0, category×0.8)
- [[Narrow vs General AI]] — _auto_ (score 6.5: tags×2.0, applicable_to×3.0, title×1.5)
- [[Product Development Lifecycle (9 Stages)]] — _auto_ (score 5.8: tags×2.0, applicable_to×2.0, category×0.8, alias×1.0)
- [[Create-Deliver-Capture Value]] — _auto_ (score 5.2: tags×2.0, applicable_to×1.0, title×1.5, category×0.8)
<!-- jak-link:auto-end -->
## Sources

- [[_Sources/AI_Business_Models-2xspgi-2]] — pages 51-60 (The AI Value Chain section, all six stages)
