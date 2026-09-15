# PAST-FORWARD website

Source for the PAST-FORWARD project website, published at **https://past-forward.github.io/**.

Built with [Quarto](https://quarto.org). Content is plain text (`.qmd`) files — no CMS, no build step beyond Quarto itself. This guide is for consortium partners who want to add a news post or a research output (publication, dataset, tool, or deliverable) without needing to know how the rest of the site works.

## Before you start

- Install [Quarto](https://quarto.org/docs/get-started/) so you can preview your changes locally.
- Clone this repo and open a terminal in it.
- To preview the site as you edit: `quarto preview` (auto-reloads in your browser).
- To just check everything builds: `quarto render`.

If you're not comfortable with git, ask a maintainer to help — you write the content, someone else can commit/push/publish it for you.

## Adding a news post

News posts live in `posts/`, one folder per post.

1. Duplicate an existing post folder, e.g. `posts/2026-02-15-kickoff-meeting/`, and rename it with the date and a short slug: `posts/YYYY-MM-DD-your-slug/`.
2. Inside it, edit `index.qmd`'s front matter:

   ```yaml
   ---
   title: "Your post title"
   description: "One-sentence summary shown in the News list."
   date: 2026-06-01
   author:
     - name: Your Name
       affiliation: Your Institution
   categories: [consortium, events, WP1]   # free-form tags, any you like
   draft: false                             # must be false to appear
   ---
   ```
3. Write the post body in Markdown below the front matter.
4. Optional image: add it inside the same folder and reference it with `image: your-image.jpg` in the front matter (path relative to the folder).
5. Set `draft: false` and save. The post appears automatically on the [News](news.qmd) page and the homepage, newest first — no other file needs editing.

## Adding a research output

Research outputs live in `research-outputs/`, sorted into **four subfolders by type**. Which subfolder you use determines both the `categories` value you must set and which page(s) the item shows up on:

- it always appears in the unified list on the [Research](research.qmd) page, and
- it also appears on that type's own page (Publications / Datasets / Tools & Data / Deliverables).

A ready-to-copy template with these instructions is also in `research-outputs/_TEMPLATE.qmd`.

**General steps, all types:**

1. Create a new `.qmd` file in the right subfolder (see below), e.g. `research-outputs/publications/my-paper.qmd`. If the item needs its own images or files, make it a folder instead: `research-outputs/publications/my-paper/index.qmd`.
2. Fill in the front matter (fields below).
3. Write any extra detail in the body — shown when someone clicks through from the list.
4. Set `draft: false` and save. It shows up automatically, sorted by date, no other file needs editing.

### Publications

Folder: `research-outputs/publications/`

```yaml
---
title: "Paper title"
description: "One or two sentence summary."
date: 2026-06-01
author:
  - name: Author Name
    affiliation: Institution
categories: [Publications]
draft: false
---
```

### Datasets

Folder: `research-outputs/datasets/`

```yaml
---
title: "Dataset name"
description: "One or two sentence summary."
date: 2026-06-01
author:
  - name: Author Name
    affiliation: Institution
categories: [Datasets]
draft: false
---
```

### Tools & Data

Folder: `research-outputs/tools-data/`

```yaml
---
title: "Tool name"
description: "One or two sentence summary."
date: 2026-06-01
author:
  - name: Author Name
    affiliation: Institution
categories: [Tools & Data]
draft: false
---
```

### Deliverables

Folder: `research-outputs/deliverables/`

```yaml
---
title: "D1.1 Deliverable name"
description: "One or two sentence summary."
date: 2026-06-01
author:
  - name: Author Name
    affiliation: Institution
categories: [Deliverables]
draft: false
---
```

**Important:** the `categories` value must exactly match the subfolder you used (`Publications`, `Datasets`, `Tools & Data`, or `Deliverables`) — it's what drives the icon shown on the card. Putting a file in the wrong subfolder, or a mismatched `categories` value, is the most common mistake.

An optional `image: cover.jpg` (path relative to the file) adds a cover image to the card; without one, a category icon is shown automatically.

## Publishing your changes live

Editing and pushing files to `main` updates the *source* on GitHub, but **does not** by itself update the live site at past-forward.github.io — that requires a separate publish step:

```
quarto publish gh-pages
```

Ask a maintainer to run this after your pull request is merged (or ask about setting up automatic deployment on push, so this manual step isn't needed).
