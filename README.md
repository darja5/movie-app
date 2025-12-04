# Movie App

**Author:** Darja Peternel

---

## Description

This is a movie browsing app built with Next.js and TypeScript. Users can search for movies, view popular movies, and see detailed information about each movie. The app features infinite scroll, lazy-loaded images, and a responsive UI.

---

## Features Implemented

- Infinite scroll for movie lists
- Search functionality
- Movie details page with dynamic routing
- Rating stars displayed for movies
- Fallbacks for missing data (e.g., no overview or missing images)
- Header with logo linking to home page and clearing search query
- Lazy loading for images
- Dockerized for standalone deployment

---

## Requirements Not Implemented

- None; all requested features have been implemented.

---

## Issues Faced During Implementation

- Handling duplicate movie IDs when loading more movies with infinite scroll. Solved using a `Map` to ensure uniqueness.
- Next.js Image Optimization did not work properly in Docker standalone build. Solved by using `unoptimized` on the `<Image>` component and configuring `domains` in `next.config.js`.
- `useSearchParams()` needed proper handling to ensure search query is cleared when navigating back to home.
- Minor UI/UX adjustments were required to make cards consistent in size and improve hover/click effects.
- Docker build initially used a Node.js version mismatch in the image; resolved by using Node 20.

---

## Improvements with More Time

- Add pagination for better performance on very large movie lists.
- Add unit/integration tests to cover components and API calls.

---

## Running the App

### Locally

```bash
npm install
npm run dev
```

### Using Docker

- Make sure your environment variables are set in the Dockerfile or `.env.local`:
  - `NEXT_PUBLIC_TMDB_KEY`
  - `TMDB_API_KEY`

- Build the Docker image:

```bash
docker build -t movie-app .
```

- Run the Docker container:

```bash
docker run -p 3000:3000 movie-app
```

Access the app at http://localhost:3000.
