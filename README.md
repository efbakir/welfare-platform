# Welfare Platform — Corporate Benefits Prototype

A high-fidelity, interactive React SPA for a modern corporate welfare platform. Built with Vite, React, React Router, and Tailwind CSS. Design system derived from the Studio HR reference.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

- **Design system** — Tokens (colors, typography, radii, shadows, spacing) in `src/index.css` via `@theme`.
- **Mock data** — `src/data/mock.json` (user, family, budget, feed, recommendations, marketplace, daycare, charity).
- **Layout** — `Shell`, `Sidebar`, `PageHeader` in `src/components/layout/`.
- **UI** — `Button`, `Card`, `Input`, `Badge`, `StatCard`, `ModuleCard` in `src/components/ui/`.
- **Views** — Dashboard (`/`), Profile (`/profile`), Wallet (`/wallet`), Marketplace (`/marketplace`).
- **AI** — Collapsible `AiPanel` (bottom-right) on all views.

## Routes

| Path         | View        |
| ------------ | ----------- |
| `/`          | Dashboard   |
| `/profile`   | Life stage & recommendations |
| `/wallet`    | Credits & family allocation |
| `/marketplace` | Categories, daycare, charity |

No backend; all data from `mock.json` and local state.

---

## Running on a friend’s PC (or another machine)

### 1. Put the project on GitHub (one-time, on your machine)

If the project isn’t a Git repo yet:

```bash
cd /path/to/welfare-platform
git init
git add .
git commit -m "Initial commit"
```

Create a new repo on [GitHub](https://github.com/new) (e.g. `welfare-platform`), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/welfare-platform.git
git branch -M main
git push -u origin main
```

### 2. Your friend: clone and run

On your friend’s PC:

```bash
git clone https://github.com/YOUR_USERNAME/welfare-platform.git
cd welfare-platform
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### 3. Getting your updates

When you change code and push:

```bash
git add .
git commit -m "Describe your changes"
git push
```

Your friend pulls and restarts the dev server:

```bash
git pull
npm install
npm run dev
```

(`npm install` only needed if you changed `package.json`. Restart `npm run dev` so new files and big changes are picked up.)

---

## Publishing (deploy online)

**Vercel (recommended, free):**

1. Push the project to GitHub (see above).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. “Add New Project” → import `welfare-platform`.
4. Leave defaults (Build: `npm run build`, Output: from Vite).
5. Deploy. You get a URL like `welfare-platform.vercel.app` and every push to `main` can auto-deploy.

**Netlify:** Same idea — connect the GitHub repo, build command `npm run build`, publish directory `dist`.

**GitHub Pages:** Use the `vite-plugin-gh-pages` approach or deploy the `dist` folder to the `gh-pages` branch; repo must be public for free hosting.
