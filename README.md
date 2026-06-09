# Burger Builder

A React web application for building custom burgers. Users can assemble a burger from individual ingredients, see the price and calories update in real time, and place an order with delivery details.

## Features

- **Burger constructor** — add and remove ingredients (patty, bacon, cheese, lettuce, tomato, and more); price and calorie count update live
- **Burger catalog** — browse a menu of pre-built burgers with ratings and prices
- **Checkout** — order form with full name, email, phone number, and delivery address; optional fast delivery
- **Authentication** — sign up and log in via Firebase Auth; saved burgers stored per user in Firestore
- **Account page** — view and manage saved burgers
- **Dark / light theme** — persisted in localStorage
- **Multilingual UI** — English and Ukrainian via i18next; language detected automatically from the browser
- **Responsive layout** — mobile navigation menu included
- **E2E tests** — Playwright test suite

## Tech Stack

| Area | Library |
|---|---|
| UI | React 19, TypeScript |
| Build | Vite |
| State | Redux Toolkit |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| Backend | Firebase Authentication, Firestore |
| Styling | SCSS |
| Animations | Framer Motion |
| i18n | i18next, react-i18next |
| Notifications | React Toastify |
| Slider | Swiper |
| Testing | Playwright |

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication (Email/Password) and Firestore enabled

### Installation

```bash
git clone https://github.com/your-username/burger-builder.git
cd burger-builder
npm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

All values are available in your Firebase project settings under **General → Your apps → Web app**.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Tests

```bash
npx playwright test
```

## Project Structure

```
src/
├── assets/          # Ingredient and burger images
├── components/      # Feature components (Burger, Checkout, Account, …)
├── context/         # ThemeContext, AuthContext
├── hooks/           # useBuilder — burger state via Redux
├── locales/         # en / uk translation files
├── pages/           # Page-level components
├── routes/          # Lazy-loaded route wrappers
├── store/           # Redux slices (auth, build)
├── firebase.ts      # Firebase initialisation
└── mockedData.ts    # Ingredient and burger catalog data
```
