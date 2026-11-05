# BiteForge

A React web application for building custom burgers. Users can assemble a burger from individual ingredients, see the price and calories update in real time, and place an order with delivery details.

## Features

- **Burger constructor** — add and remove ingredients (patty, bacon, cheese, lettuce, tomato, and more); price and calorie count update live
- **Burger catalog** — browse a menu of pre-built burgers with ratings and prices
- **Checkout** — order form with full name, email, phone number, and delivery address; optional fast delivery
- **Authentication** — sign up and log in via Firebase Auth; orders stored per user in Firestore
- **Account page** — view and manage saved orders
- **Dark / light theme** — persisted in localStorage
- **Multilingual UI** — English and Ukrainian via i18next; language detected automatically from the browser
- **Responsive layout** — mobile navigation menu included

## Tech Stack

| Area          | Library                              |
| ------------- | ------------------------------------ |
| UI            | React 19, TypeScript                 |
| Build         | Vite                                 |
| State         | Redux Toolkit                        |
| Routing       | React Router v7                      |
| Forms         | React Hook Form + Zod                |
| Backend       | Firebase Authentication, Firestore   |
| Styling       | SCSS                                 |
| Animations    | Framer Motion                        |
| i18n          | i18next, react-i18next               |
| Notifications | React Toastify                       |
| Slider        | Swiper                               |
| Testing       | Vitest (unit), Playwright (e2e)      |
| Code quality  | ESLint, Prettier, husky, lint-staged |
| Hosting       | Cloudflare Workers (static assets)   |

## Getting Started

### Prerequisites

- Node.js 22+ (the version is pinned in `.nvmrc` — run `nvm use` if you use nvm)
- A Firebase project with Authentication (Email/Password) and Firestore enabled

### Installation

```bash
git clone git@github.com:dugasova/BiteForge.git
cd BiteForge
npm install
```

`npm install` also enables the git pre-commit hook (via the `prepare` script).

### Environment Variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

All values are available in your Firebase project settings under **General → Your apps → Web app**. The `.env` file is git-ignored — never commit it.

### Development

```bash
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

| Script                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                            |
| `npm run build`        | Type-check and build for production into `dist/`     |
| `npm run preview`      | Serve the production build locally                   |
| `npm run lint`         | Run ESLint                                           |
| `npm run lint:fix`     | Run ESLint and auto-fix what it can                  |
| `npm run format`       | Format all files with Prettier                       |
| `npm run format:check` | Check formatting without changing files              |
| `npm run typecheck`    | Run the TypeScript compiler without emitting files   |
| `npm test`             | Run unit tests (Vitest)                              |
| `npm run test:watch`   | Run unit tests in watch mode                         |
| `npm run test:e2e`     | Run end-to-end tests (Playwright, starts dev server) |

Before the first e2e run, install the browsers: `npx playwright install`.

## Code Quality

- **Prettier** formats the code (config in `.prettierrc.json`); **ESLint** checks it (`eslint.config.js`, with `eslint-config-prettier` so the two don't conflict).
- **Pre-commit hook** — husky runs lint-staged on every commit: staged `.ts`/`.tsx` files go through `eslint --fix` and `prettier --write`, other text files through Prettier only.
- **CI** — GitHub Actions (`.github/workflows/ci.yml`) runs on pushes and pull requests to `main`: format check → lint → typecheck → unit tests → build.
- **Editor** — `.editorconfig` and `.gitattributes` keep indentation and LF line endings consistent; VS Code suggests the recommended extensions from `.vscode/extensions.json`.

## Deployment

The site is hosted on **Cloudflare Workers** (static assets) with Git integration:

- every merge to `main` builds and deploys the production site;
- every other branch is built and uploaded as a preview version, without touching production.

Deployment settings live in `wrangler.jsonc`: the `dist/` folder is served as static assets, and `not_found_handling: "single-page-application"` returns `index.html` for unknown paths so React Router can handle deep links.

The `VITE_FIREBASE_*` variables must be set in the Cloudflare dashboard as **build variables** — Vite embeds them into the bundle at build time.

## Project Structure

```
src/
├── assets/          # Ingredient, burger and logo images
├── components/      # Feature components (Burger, Checkout, Account, …)
├── context/         # Theme context and helpers
├── HOC/             # AuthGuard — protects routes for signed-in users
├── hooks/           # useAuth, useBuilder
├── locales/         # en / uk translation files
├── pages/           # Layout and page-level components
├── routes/          # Lazy-loaded route wrappers
├── services/        # Firestore access (orders)
├── store/           # Redux slices (auth, build) with unit tests
├── types/           # Shared TypeScript types
├── firebase.ts      # Firebase initialisation
├── i18n.ts          # i18next setup
└── mockedData.ts    # Ingredient and burger catalog data
tests/               # Playwright e2e tests
```
