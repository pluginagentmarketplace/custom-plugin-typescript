---
name: explore
description: Explore All 65+ Developer Roles - Browse available specializations and career paths
allowed-tools: Read, Glob

# Command Configuration
input_validation:
  filter:
    type: string
    enum: [frontend, backend, devops, data, ai, security, career, all]
    default: all
    required: false

exit_codes:
  0: success
  1: invalid_filter
  2: no_results

help_text: |
  Usage: /explore [filter]

  Examples:
    /explore         - Show all 65+ roles
    /explore frontend - Filter frontend roles only
    /explore ai      - Filter AI/ML roles only
---

# Explore All 65+ Developer Roles

Discover your ideal role across 7 specialization tracks covering the complete developer ecosystem.

## 📋 All 65+ Roles by Category

### Frontend & UI Development (13 roles)
Frontend, Beginner Frontend, React, Next.js, Vue, Angular, Svelte, React Native, Flutter, iOS, Android, UX Design, Design Systems

### Backend & Database Engineering (12 roles)
Backend, Beginner Backend, Node.js, Python, Java, Spring Boot, Go, Rust, PHP, Kotlin, GraphQL, Databases

### DevOps & Cloud Infrastructure (8 roles)
DevOps, Beginner DevOps, AWS, GCP, Azure, Kubernetes, Docker, Terraform, Linux, Infrastructure

### Data Engineering & Analytics (8 roles)
Data Engineer, Data Scientist, Data Analyst, BI Analyst, Machine Learning, MLOps, Analytics Engineer, AI Agents

### AI & Emerging Technologies (6 roles)
AI Engineer, Prompt Engineer, AI Red Teaming, Game Developer, Server-Side Game Dev, Blockchain Developer

### Security, QA & Best Practices (7 roles)
Cybersecurity, API Security, QA Engineer, Code Review, Performance Testing, Frontend Performance, Backend Performance

### Career Paths & Leadership (6 roles)
Tech Lead, Engineering Manager, Product Manager, Technical Writer, DevRel Engineer, CTO

## 🎯 Role Explorer Guide

Use `/assess` to find your current level, then explore roles that align with your goals.

**Common Learning Paths:**
- Full-Stack: Frontend + Backend
- DevOps Specialist: DevOps + AWS + Kubernetes
- Data Professional: Data Engineer + SQL + Analytics
- AI Engineer: Python + ML + LLMs
- Security Focus: Any Track + Security Best Practices
- Leadership: Any Track + Career/Management

---

Use `/roadmap` to create your personalized learning plan!
