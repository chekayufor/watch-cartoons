# Watch Cartoons

A React site for watching kids' cartoons from YouTube: search, show buttons, a player and a list of episodes.

It is a static site with no server and no database, and it works **without a YouTube API key**.

- Built-in catalogue: `src/data/videos.js` (78 videos from 10 shows). To add a video, copy its id from a YouTube link (`youtube.com/watch?v=<id>`) and add an entry.
- Optional live search: put a YouTube Data API v3 key in `REACT_APP_YOUTUBE_KEY` (see `.env.example`). If the key is missing, wrong or out of quota, the site falls back to the built-in catalogue automatically.

## Run locally

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

The finished site is in the `build` folder.

## Free deployment

- **Vercel**: Import Git Repository → Framework: Create React App → Deploy (`vercel.json` is already set up).
- **Netlify**: Import from Git (`netlify.toml` is already set up), or drag the `build` folder onto https://app.netlify.com/drop

For live search, add `REACT_APP_YOUTUBE_KEY` under Environment Variables in Vercel/Netlify and redeploy.
