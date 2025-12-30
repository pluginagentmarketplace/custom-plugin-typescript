---
name: assess
description: Assess Your Current Skills - Evaluate expertise and get personalized recommendations
allowed-tools: Read, Glob

# Command Configuration
input_validation:
  track:
    type: string
    enum: [frontend, backend, devops, data, ai, security, career, all]
    default: all
    required: false

exit_codes:
  0: success
  1: assessment_incomplete
  2: invalid_track

help_text: |
  Usage: /assess [track]

  Examples:
    /assess          - Full assessment across all tracks
    /assess frontend - Assess frontend skills only
    /assess backend  - Assess backend skills only
---

# Assess Your Current Skills

Evaluate your expertise across the 7 specialization tracks and get personalized recommendations.

## 📊 Quick Assessment

Rate your experience level (1-5) for each track:

### Frontend & UI Development
- HTML/CSS/JavaScript: ___
- React or Vue: ___
- TypeScript: ___
- Mobile (React Native/Flutter): ___

### Backend & Database Engineering
- Backend framework (Node/Python/Java): ___
- SQL/Database design: ___
- API design: ___
- Data processing: ___

### DevOps & Cloud Infrastructure
- Docker/Containers: ___
- Kubernetes: ___
- Cloud platform (AWS/GCP/Azure): ___
- CI/CD pipelines: ___

### Data Engineering & Analytics
- SQL: ___
- Data pipelines: ___
- Machine learning: ___
- Analytics/BI tools: ___

### AI & Emerging Technologies
- Python/ML frameworks: ___
- Large Language Models: ___
- Blockchain/Web3: ___
- Game development: ___

### Security, QA & Best Practices
- Secure coding: ___
- Testing/Test automation: ___
- API security: ___
- Performance optimization: ___

### Career & Leadership
- Technical mentoring: ___
- Team management: ___
- Product thinking: ___
- Technical communication: ___

## 🎯 Scoring Guide

**1-2**: Beginner - Just starting, need fundamentals
**3**: Intermediate - Working knowledge, ready to deepen
**4**: Advanced - Strong expertise, ready to specialize
**5**: Expert - Leadership ready, can mentor others

---

After assessing, use `/roadmap` to get your personalized learning plan!
