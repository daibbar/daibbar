# daibbar

> **Learn, build, document, and share.**

`daibbar` is a personal site and lightweight blogging engine built with Node.js, Express, EJS, and PostgreSQL. The landing page showcases recent projects and writing; the underlying app serves articles from a database.

The frontend is intentionally minimal — a red / white / black palette with Apple-inspired typography (large negative-tracked headlines, generous whitespace, sticky translucent nav, no framework).

---

## Stack

| Layer       | Tech                                          |
|-------------|-----------------------------------------------|
| Runtime     | Node.js 20                                    |
| Web server  | Express 5                                     |
| Templating  | EJS                                           |
| Database    | PostgreSQL 16                                 |
| Driver      | `pg` (connection pool)                        |
| Tooling     | `nodemon`, `dotenv`                           |
| Container   | Docker + docker-compose                       |
| Frontend    | Vanilla CSS, system font stack, no framework  |

---

## Project structure

```
daibbar/
├── Dockerfile               Image for the app container
├── docker-compose.yml       App + Postgres orchestration
├── package.json
├── .env.example
└── src/
    ├── server.js            Express entry point
    ├── db/
    │   ├── pool.js          PostgreSQL pool (reads DATABASE_URL)
    │   └── populatedb.js    One-shot: creates Article table + seed row
    ├── routes/              Express routers
    │   ├── articles.js
    │   └── projects.js      (stub)
    ├── controllers/         Route handlers
    │   ├── ArticlesController.js
    │   └── ProjectsController.js   (stub)
    ├── model/               Data access layer
    │   ├── Article.js
    │   └── Project.js              (stub)
    ├── views/               EJS templates
    │   ├── landing.ejs      Hero + Projects + Writing + About
    │   ├── index.ejs        /articles list
    │   └── About.ejs               (stub)
    └── public/
        └── style.css        Global styles
```

---

## Getting started

### Option A — Docker (recommended)

Brings up the app and Postgres together with one command.

```bash
git clone https://github.com/daibbar/daibbar.git
cd daibbar
cp .env.example .env   # fill in the values listed below
docker compose up
```

Visit **http://localhost:3000**. The first time you run it, seed the database:

```bash
docker compose exec app node src/db/populatedb.js
```

### Option B — Local

Requires Node.js 20+ and a running PostgreSQL 16 instance.

```bash
git clone https://github.com/daibbar/daibbar.git
cd daibbar
npm install
cp .env.example .env        # fill in the values
node src/db/populatedb.js   # create + seed the Article table
node src/server.js
```

Visit **http://localhost:3000**.

> **Note:** the `npm start` script currently points at `node server.js` (wrong path). Run `node src/server.js` directly until that's fixed.

---

## Environment variables

Create a `.env` file at the project root:

| Variable        | Read by         | Description                                      |
|-----------------|-----------------|--------------------------------------------------|
| `DATABASE_URL`  | app (`pool.js`) | Full Postgres connection string used by the app  |
| `DB_USER`       | docker-compose  | Postgres user provisioned in the container       |
| `DB_PASS`       | docker-compose  | Postgres password                                |
| `DB_NAME`       | docker-compose  | Postgres database name                           |

Example `.env` for the Docker setup:

```env
DB_USER=daibbar
DB_PASS=changeme
DB_NAME=daibbar
DATABASE_URL=postgresql://daibbar:changeme@postgres:5432/daibbar
```

For a local (non-Docker) setup, replace `postgres` with `localhost` (and adjust the port if your Postgres runs elsewhere).

---

## Routes

| Method | Path        | Handler                            | Description                              |
|--------|-------------|------------------------------------|------------------------------------------|
| GET    | `/`         | renders `views/landing.ejs`        | Landing page                             |
| GET    | `/articles` | `ArticlesController.getArticles`   | Lists all articles from the database     |
| any    | `*`         | 404 handler                        | Returns `Route existe pas`               |

Planned (currently stubs in the codebase):

- `/About`
- `/Projects`

---

## Database

A single table holds the article content:

```sql
CREATE TABLE IF NOT EXISTS Article (
  id    SERIAL PRIMARY KEY,
  title TEXT,
  body  TEXT
);
```

`src/db/populatedb.js` creates this table and inserts a seed row. Run it once after the first boot, then again any time the schema changes.

---

## Landing page anatomy

The home page (`/`) follows a deliberate **Proof → Knowledge → Person** scroll arc:

1. **Hero** — `Just Learn.` over `Learn, build, document, and share.`
2. **Recent projects** — 3-card grid with gradient cover tiles, project descriptions, and tech-stack pills
3. **Latest articles** — newsletter-style feed (date, title, one-line preview) ending in a `View all articles →` link
4. **About / Connect** — short bio next to GitHub / LinkedIn / X / Email links; doubles as the page footer

To edit:

- **Copy and structure** — `src/views/landing.ejs`
- **Look and feel** — `src/public/style.css` (CSS custom properties at the top control the palette and typography)

---

## Scripts

| Command                           | What it does                                           |
|-----------------------------------|--------------------------------------------------------|
| `node src/server.js`              | Boots the Express app on port 3000                     |
| `node src/db/populatedb.js`       | Creates the `Article` table and inserts a seed row     |
| `docker compose up`               | Starts app + Postgres                                  |
| `docker compose down`             | Stops both                                             |
| `docker compose exec app <cmd>`   | Runs `<cmd>` inside the running app container          |

---

## Roadmap

- [ ] Wire the landing-page article previews to real database rows
- [ ] Implement `/About` and `/Projects` pages (controllers, models, views)
- [ ] Replace placeholder project cards with real work
- [ ] Add CRUD endpoints for articles (create / edit / delete)
- [ ] Add authentication for admin actions
- [ ] Fix the `npm start` script path in `package.json`

---

## License

ISC
