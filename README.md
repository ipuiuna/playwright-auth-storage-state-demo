# Playwright Working With Auth

![Playwright](https://img.shields.io/badge/playwright-1.47.0-45ba4b?logo=playwright&logoColor=white&style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D5.0-3172c9?style=flat-square&logo=typescript&logoColor=white)

A clean, production-ready example of **Playwright + TypeScript** that demonstrates real-world authentication patterns:

- UI login + API testing in the same test
- Reuse of `storageState` (login once → reuse everywhere)
- Page Object Model
- Data Factory pattern for user/message creation
- Proper `await test.step()` usage to avoid `ERR_ABORTED` errors

Target application: https://practicesoftwaretesting.com

## Project Structure
```bash
.
├── .auth/                        # Saved authentication states (gitignored)
├── .github/
│   └── workflows/                # CI (optional)
├── lib/
│   ├── datafactory/
│   │   ├── createMessage.ts      # Creates support message via API
│   │   └── register.ts           # Registers user via API
│   └── pages/
│       ├── account/
│       │   └── messages.page.ts  # Messages page object
│       └── login/
│           └── loginpage.ts      # Login page object
├── tests/
│   └── messages.spec.ts          # Main end-to-end test
├── node_modules/
├── playwright-report/            # HTML report after execution
├── test-results/                 # Screenshots/videos on failure
├── .env                          # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Features & Best Practices

| Feature                            | Why it matters                                           |
|------------------------------------|-----------------------------------------------------------|
| Full TypeScript + strict mode      | Type safety and excellent IDE support                     |
| Page Object Model                  | Clean, maintainable locators                              |
| Data Factory (API helpers)         | Fast & reliable user/message creation                     |
| `storageState` reuse               | Login once → reuse in API calls and future tests         |
| `await test.step()` usage          | Prevents `net::ERR_ABORTED; maybe frame was detached?`    |
| `.env` + `dotenv` loading          | Secrets and URLs out of source code                       |
| `baseURL` in config                | Clean `page.goto()` calls                                 |

## Environment Variables (.env)
API_URL=https://www.practicesoftwaretesting.com/api

## Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/playwright-working-with-auth.git
cd playwright-working-with-auth
npm install

# Install browsers
npx playwright install --with-deps

# Run tests (headless)
npx playwright test

# Run with UI Mode (recommended)
npx playwright test --ui

# View report
npx playwright show-report

