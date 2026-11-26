# irtk-frontend

Information Retrieval Tool-Kit, the web interface. Built with Vue 2, Vuetify 1.5
and Element UI.

IRTK lets you upload a set of text documents (a corpus), or pick the NLTK
Brown corpus, and query it with classic information retrieval models. The API
is [irtk-backend](https://github.com/mohammedi-haroune/irtk-backend).

| Page | What it does |
|---|---|
| Corpus | name a new corpus, describe it and upload its `.txt` files |
| Corpus Selection | search the available corpora and select one |
| Corpus Browser | the first 200 characters of each document |
| Find Words | frequency and TF-IDF of a term in each document |
| Boolean Model | documents matching a query such as `Astronauts and not Moon` |
| Vector Model | inner product, Dice, cosine and Jaccard scores for a query |

The selected corpus is remembered by the backend session, so it survives a
page reload.

## Requirements

- Node.js 20.19 or newer (tested with Node 26)
- irtk-backend running on http://127.0.0.1:8000

## Setup and run

```
npm install
npm run serve
```

Open http://localhost:5173. The dev server forwards `/polls/` to the backend.
To use a backend on another address, set `IRTK_BACKEND`:

```
IRTK_BACKEND=http://192.168.1.10:8000 npm run serve
```

## Other commands

| Command | What it does |
|---|---|
| `npm run build` | production build in `dist/` |
| `npm run preview` | serve `dist/`, with the same `/polls/` forwarding |
| `npm test` | unit tests (Vitest) |
| `npm run lint` | ESLint |

A production build served without the preview server needs to know where the
API is. Build it with `VITE_API_URL=http://your-server:8000/polls/`, and add
the site's origin to `CORS_ALLOWED_ORIGINS` in the backend settings.

## Changes in 2026

The project had not run since 2018. To bring it back:

- `npm install` failed on Apple Silicon: the end-to-end test plugin downloads a
  chromedriver that only supports Intel Macs. Vue CLI 3 also uses webpack 4,
  which doesn't start on Node 17 or newer. The build now uses Vite 7 and the
  code stays on Vue 2 (2.7) and Vuetify 1.5.
- The Nightwatch and Jest tests tested a `HelloWorld` component that doesn't
  exist. They are replaced by Vitest tests of the search pages.
- The API address was hard-coded in two places, one with `127.0.0.1` and one
  with `localhost`. Both now use `/polls/` through the dev server, so the
  session cookie stays on one origin.
- The dev server port is now 5173, Vite's default, instead of 8080.
- Find Words and Vector Model opened one preview dialog per table row, stacked
  on top of each other. There is now one dialog.
- The result tables sorted by the first column ascending, so the best match was
  last. They now sort by TF-IDF or cosine, highest first.
- Each keystroke sends a query, and an older answer arriving last replaced the
  newer one, so the table could show results for "besoin i" while the field
  said "besoin information". Only the latest answer is shown now.
- Upload now confirms each file. Selecting a corpus updated the toolbar before
  the backend answered.
- The "Show file content" and "Statistics" buttons on document cards were never
  implemented and still do nothing.
