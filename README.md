# WhileTrue

![Team Logo](./logo_small.png)

WhileTrue is a company founded in the marketing science industry.

Table of Contents
---
- [What is WhileTrue?](#what-is-whiletrue)
- [People](./team/)
- [Diversity](./team/diversity.md)
- [Product & Research](./product_research/)
    - [Market](./product_research/market.md)
    - [Roadmap](./product_research/roadmap.md)
- [High-Level Architecture](#high-level-architecture)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

## What is WhileTrue?
WhileTrue is a SaaS that generates personalized marketing copy (for emails, SMS, etc) given the limited user data of a regulated industry such as finance.

[Demo Video](https://youtu.be/Wli1LPV6Mn0)

Access [WhileTrue here](https://uninterested-field-production.up.railway.app/)

## High-Level Architecture 
![Architecture](./src/architecture-diagram.jpg)

## Getting Started

These instructions are how to get the app up and running locally.

### Setup

Clone the repository `git clone https://github.com/dcsil/WhileTrue.git && cd WhileTrue/src`

You will need the following ENV Variables exported:

```
CLIENT_URL=http://localhost:3000
DATABASE_URL=${POSTGRES_DB_URL}
JWT_SECRET={JWT_SECRET, can use "secret"}
OPENAI_API_KEY=${OPENAI_API_KEY}
```

### If running locally on docker

Goto [package.json](./src/app/package.json) and change the line
`"proxy": "http://localhost:8080"` to `"proxy": "http://server:8080"`

1. Run docker compose build `docker-compose -p whiletrue --build --no-cache`
2. Create DB: `docker-compose -p whiletrue run --rm server npm run generate`
3. Migrate DB: 
4. Run: `docker-compose -p whiletrue up`

The app will be accessible on `localhost:3000` with the server on `localhost:8080`.

### If running locally
1. Install dependencies `cd app && npm install && cd ../server && npm install`
2. Run client `cd app && npm start`
3. Open a new terminal window and run server `cd server && npm start`

## Deployment

### Continuous Integration

Github Actions is used for continuous integration.

### Logging

LogDNA is used to implement logging.

### Exception Handling

Sentry is used to implement exception handling.
