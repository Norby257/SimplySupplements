# SimplySupplements - Accessible E-Commerce Platform

Accessible e-commerce platform featuring event-driven architecture, WCAG compliance, and distributed systems at scale.

# Features

Simply Supplements is an accessibility focused e-commerce platform for ordering supplements online that anyone can use. The goal is to create an accessible platform so that all users can use it.
The following technologies will be supported:

- Semantic HTML
- Aria Patterns
- Screen Readers (NVDA, VoiceOver)
- Keyboard navigation
- Search by voice (stretch goal)
- Event-Driven Architecture
- Kafka message bus and message processing
- Database schema design to support 100K inventory, orders, and user data.

# Tech Stack

## Core frontend:

- React 18 with Typescript
- Next.js 14

### A11y Tooling:

- @axe-core/react (for automated testing)
- eslint-plugin-jsx-a11y (linting)
- react-aria (accessible hooks)

### Testing:

- Jest + React testing library
- Playwright (E2E with a11y checks)
- axe DevTools
- NVDA/VoiceOver testing

## Backend:

- .NET 8 api
- Event streaming
- PostGreSQL
- Redis

### Backend testing

- Unit test cases
- Load testing

## Infrastructure:

- Kubernetes
- Terraform
- Docker
- CI/CD

# Testing Strategy

To ensure quality code, the test strategy includes the following:

- Automated testing to ensure frontend components are WCAG compliant
- Manual testing to ensure compatibility with screen-reader technologies

# Installation - coming soon

# Usage - coming soon
