# SimplySupplements - Accessible E-Commerce Platform

Accessible e-commerce platform featuring event-driven architecture, WCAG compliance, and distributed systems at scale.

# Features

Simply Supplements is an accessibility focused e-commerce platform for ordering supplements online that anyone can use. The goal is to create an accessible platform so that all users can use it.
The following technologies will be supported:

- Semantic HTML
- Aria Patterns
- Screen Readers (NVDA, VoiceOver)
- Keyboard navigation
- Search by voice
- Event-Driven Architecture
- Kafka message bus and message processing
- Database schema design to support 100K inventory, orders, and user data.

# Tech Stack

## Core frontend:

- React 19 with Typescript
- Vite

### A11y Tooling:

- eslint-plugin-jsx-a11y (linting)
- react-aria (accessible hooks)

### Testing:

- Vitest + React testing library
- Playwright (E2E with a11y checks)
- NVDA/VoiceOver testing

## Backend:

> For full backend details, setup instructions, and architecture see the [Backend README](https://github.com/Norby257/simplySupplements-backend/blob/main/README.md).

- .NET 8 REST API with event-driven, service-oriented architecture
- PostgreSQL · Redis · Apache Kafka
- Deployed via Docker, Kubernetes, and Terraform

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

# Usage

To run the tests locally, run `vitest run`. Alternatively, `npm test` works too.
