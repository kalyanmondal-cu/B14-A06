# FitLog — Workout Library

A dark, responsive workout library and daily training log built from a Figma-inspired UI. Users can browse workouts, sort/search the library, inspect full workout details, add up to five lifts to today's plan, save workouts for later, mark planned workouts as done, and keep their state after a reload.

## Technologies

- Next.js App Router + TypeScript
- React 19
- Tailwind CSS v4
- DaisyUI
- Lucide React icons
- FitLog REST API
- localStorage persistence

## Features

1. Figma-inspired responsive dark gym UI with neon-lime accent.
2. Workout library with API loading state, search, sorting, and responsive 4/3/2/1-column grids.
3. Dynamic workout detail routes with specs, instructions, media, and actions.
4. Today's Plan with a five-lift cap and live Exercises / Minutes / Calories metrics.
5. Saved workouts with persistent localStorage state.
6. Mark as Done and remove actions with toast feedback.
7. Navbar counters linked to My Plan.
8. Custom 404 page and deployment-safe dynamic routing.

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```bash
npm run build
npm start
```

