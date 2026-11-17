# Platform Jumper

A small Phaser 3 platform-jumper game built with TypeScript and Vite. Jump between
platforms in a compact arena.

## Get started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Move with **A/D** or the **left/right arrow
keys**. Jump with **W**, **Space**, or the **up arrow** (jumping works while
standing on a platform).

## Project structure

- `src/main.ts` — Phaser game configuration and platform-jumper scene
- `src/style.css` — page and canvas styling
- `index.html` — browser entry point

## Commands

- `npm run dev` — start the development server with hot reload
- `npm run build` — type-check and create a production build in `dist/`
- `npm run preview` — serve the production build locally

Add new Phaser scenes in `src/` and register them in the `scene` list in
`src/main.ts` as the game grows. Static assets can be placed in `public/` and
referenced from the game by their root-relative paths.