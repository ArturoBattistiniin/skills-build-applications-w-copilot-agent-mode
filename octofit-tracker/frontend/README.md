# OctoFit Tracker presentation tier

Run the React application with `npm run dev` on port `5173`. React Router
provides navigation for activities, leaderboard, teams, users, and workouts.

The API URL is constructed using Vite's
`import.meta.env.VITE_CODESPACE_NAME`. In Codespaces, define
`VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` using the
Codespaces name (not a URL). Copy `.env.example` as a starting point. Vite
loads environment files at startup, so restart the dev server after changing
one. When the variable is unset or invalid, the app falls back to
`http://localhost:8000`.

Resource views support API responses returned as an array or as a paginated
object with a `results` or `data` array.
