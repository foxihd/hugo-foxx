---
author : ['Author Name']
title: "Configure Pagefind"
description: "How to configure Pagefind in hugo foxx theme"
date: 2025-01-26
type: article
draft: false
translationKey: pagefind
coffee: 1
tags: ['configuration', 'pagefind']
categories: ['configuration']
---

## Setting up search in Hugo configuration

To enable search functionality, you'll need to modify your `config.toml` file. First, enable the search button using `.params.search`. Then activate `.params.pagefind`, if you skip this step, the theme will default to using DuckDuckGo instead.

```toml
[params]
  search = true
  pagefind = true
```

### Creating search page

Unlike hugo-brewm theme, this theme use single page for search by configuring new page with search layout.
Create `search.en.md`:

```yaml
---
title: "Search"
type: "search"
menus:
    main:
        identifier : "Search"
---
```

## Setting up your CI/CD pipeline

To create the search index, add this command to your CI/CD pipeline's build step:

```yaml
- name: Index pagefind
  run: npx pagefind --source "public"
```