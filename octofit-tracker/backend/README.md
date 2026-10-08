# OctoFit Tracker API

The Express API runs on port `8000` and connects to MongoDB database `octofit_db`.
Set `MONGODB_URI` to override the default local MongoDB connection string.

Run `npm run dev` for development, `npm run build` to compile TypeScript, and
`npm start` to run the compiled server.
Run `npm run seed` to seed `octofit_db` with repeatable sample data for users,
teams, activities, leaderboard entries, and workouts.

The `/api/` endpoint lists the available resources and the API base URL. In
GitHub Codespaces, the URL is built from `CODESPACE_NAME`; locally it defaults
to `http://localhost:8000`.

| Resource | List | Create |
| --- | --- | --- |
| Users | `GET /api/users/` | `POST /api/users/` |
| Teams | `GET /api/teams/` | `POST /api/teams/` |
| Activities | `GET /api/activities/` | `POST /api/activities/` |
| Leaderboard | `GET /api/leaderboard/` | `POST /api/leaderboard/` |
| Workouts | `GET /api/workouts/` | `POST /api/workouts/` |
