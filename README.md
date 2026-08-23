# hugo-foxx

> Bear blog implementation, with foxx design.

![Minimum Hugo Version: v.0.141.0](https://img.shields.io/static/v1?label=Hugo&message=&ge;%20v0.141.0&color=ca187d&logo=hugo)
![CSS baseline 2019](https://img.shields.io/static/v1?label=Baseline&message=2019&color=e44d26&logo=css&logoColor=e44d26)
![Javascript ECMAScript 2019](https://img.shields.io/static/v1?label=ES&message=10&color=f7df1e&logo=javascript)
![GitHub License: MIT](https://img.shields.io/github/license/foxihd/hugo-brewm)
![GitHub Code Size](https://img.shields.io/github/languages/code-size/foxihd/hugo-foxx?color=00bce2)
![GitHub Repo Size](https://img.shields.io/github/repo-size/foxihd/hugo-foxx)
![GitHub Sponsor](https://img.shields.io/github/sponsors/foxihd?label=Sponsor&logo=GitHub&color=6a00d1)

Demosite: [https://foxihd.github.io/hugo-foxx/en/](https://foxihd.github.io/hugo-foxx/en/)

> [!NOTE]
> A short note from the author:  
>  
> This is a cherry picked [hugo-brewm](https://github.com/foxihd/hugo-brewm) based theme optimized for bilingual single author with a fresh design.
> Most [hugo-brewm](https://github.com/foxihd/hugo-brewm) configurations are compatible with this theme so you can switched seamlessly with minimal changes.
> Some content authoring features are retained, some notable feature that is removed is footer and font selection options.
> All assets are reduced to less than half, If your site is rated 98% more carbon friendly with hugo-brewm, then with this theme your site likely becomes 99% more carbon friendly than the average site.  
>
> Please feel free to contribute as well!

![Home page with posts listing on 1080px viewport](https://raw.githubusercontent.com/foxihd/hugo-foxx/main/images/tn.png)
***Figure 1.*** Home page with posts listing on 1080px viewport .

> [!TIP]
> Always keep hugo-foxx up-to-date for better user experience, maximum performance and resource efficiency, by run the following command:  
> `git submodule update --remote --merge themes/hugo-foxx`

![Article with complex elements/shortcodes](https://raw.githubusercontent.com/foxihd/hugo-foxx/main/images/screenshot.png)
***Figure 2.*** Article with complex elements/shortcodes on 1500px viewport.

## Feature Highlights

> [!IMPORTANT]
> There is no guarantee regarding accessibility.
> Meanwhile this theme is capable of achieving WAVE's AIM Score of 10, the outcome ultimately depends on content authoring.
> Always use alt text, pay attention to content structure, and use accent colors with sufficient contrast.

- **Reader-first**: Prioritizes speed[^1], privacy[^2], readability and accessibility with personalized settings for colors and fonts (It's Tracker Free!).
- **Inclusive**: Graceful degradation design[^3] oriented with improved semantic HTML structure & WAI-ARIA attribute, RSS/reader-mode optimized, printer-friendly full static website that remains fully functional even when JavaScript is disabled! The theme is even compatible with terminal browsers such as Lynx or W3M.
- **Scalable**: Start small and grow into a thriving digital garden; Despite being optimized for single authors, hugo-foxx still capable of making bilingual site with multiple taxonomies, optional Pagefind search integration, subscribable section and terms-specific or site-wide over RSS, external feed embed over RSS, and comments over Fediverse (Mastodon & Bluesky).
- **Frameworkless**: Lower maintenance & carbon footprint by lesser resource usage. Hugo-foxx's combined JavaScript and stylesheet assets (excluding optional external libraries like MathJax, Katex or PageFind) totaling under ~52KiB and compressed to less than ~20KiB when Gzipped!

> [!IMPORTANT]
> Do not fork this repo if you want to use this theme to build your site! see the README.md on [hugo-brewm](https://github.com/foxihd/hugo-brewm) for installation.

## Compatible Configs

```toml
## Base URL for the site
baseURL = 'https://example.com'
## Site title
title = 'Example'
## Use hugo-brewm theme
theme = 'hugo-foxx'
## Enable Git information for pages, (e.g. lastMod date information)
enableGitInfo = true
## Convert all URLs to absolute URLs
canonifyURLs = true
## Default language for content
defaultContentLanguage = 'en'
## Put default language in subdirectory
defaultContentLanguageInSubdir = true
## Generate a robots.txt
enableRobotsTXT = true
## Use sections for main menu
# sectionPagesMenu = 'main'
## Files to ignore when building site
ignoreFiles = [ '\.redacted', '\.old','\.bak', '\.tmp', '\.swp', '\.DS_Store']

## markup configuration
[markup]

    [markup.highlight]
        ## Enable code fence highlighting
        codeFences = true
        ## Use hugo-brewm classes for verbatim styling
        noClasses = false

    [markup.goldmark.extensions]
        [markup.goldmark.extensions.passthrough]
            ## Enable internal math render
            enable = true
            ## Set math delimiters
            [markup.goldmark.extensions.passthrough.delimiters]
                block = [['\[', '\]'], ['$$', '$$'], ['\begin{equation}', '\end{equation}'], ['\begin{align}', '\end{align}']]
                inline = [['\(', '\)'], ['$', '$'] ]

## Taxonomy register
[taxonomies]
    category = 'categories'
    tag = 'tags'
    author = 'author'
    # series = 'series'
    # lenses = 'lenses'
    # cameras = 'cameras'

## Site parameters
[params]
    ## Site title
    title = "Example"
    ## Site description
    description = "An ExampleSite built with Hugo and Hugo-Brewm theme"
    ## Copyright notice on colophon
    copyright = "Copyright 2025 © Author"
    ## Enable extended metadata (social cards)
    extMeta = true
    ## Default social card image, recommended resolution: 1200 x 630px
    # images = "example.com/img/social-share.jpg"
    ## Do not block AI user agent for robot.txt
    AllowAIRobots = false

    ## At the moment, analytics can be added manually by creating a custom template at `mysite/layouts/partials/analytics.html`
    [params.analytics]
        ## Choose where to append analytics script: use 'head' to place within <head> tags, or 'body' to place before closing </body> tag.
        append = 'body'

    ## Author information
    [params.author]
        ## site author's name
        name = 'Author Name'
        ## Author's email
        email = 'email@example.com'

    ## Comments configuration
    [params.comments]
        ## Disable comments (disable fediverse comments)
        disabled = false

    ## Favicon configuration
    [params.favicon]
        # png = '/favicon-96x96.png'
        # svg = '/favicon.svg'
        # ico = '/favicon.ico'
        # apple = '/apple-touch-icon.png'
        # appTitle = 'App Title'
        # webmanifest = '/site.webmanifest'

    ## Fediverse integration settings for verification
    [params.fediverse]
        ## Fediverse instance URL
        instance = 'example.com'
        ## Fediverse username
        username = 'username'

    ## Home page display settings
    [params.home]
        ## Disable slide carousel
        disableSlide = false
        ## Disable taxonomy listing carousel
        disableListing = false

    ## Logo configuration
    [params.logo]
        ## define `#logomark` `content` in CSS
        ## logoInlineCSS = false
        ## Light mode logo mark
        logoMark = 'https://example.com/logoMark.svg'
        ## Dark mode logo mark
        logoMarkDark = 'https://example.com/logoMarkDark.svg'
        ## Enable logo type
        logoType = true

    ## Search configuration
    [params.RSS]
        limit = 15 # item limit default: 15
        content = 15 # limit item with full content

    ## Adjust color scheme for accent, background, foreground and midtone
    [params.style]
        [params.style.light]
            ac = '#800'
            bg = '#eee'
            fg = '#111'
            mid = 'gray'
            [params.style.light.less]
                ac = 'red'
            [params.style.light.more]
        [params.style.dark]
            ac = '#f80'
            bg = '#000'
            fg = '#fff'
            mid= 'gray'
            [params.style.dark.less]
            [params.style.dark.more]

    ## Search configuration
    [params.search]
        ## Enable search functionality, please index your site first
        enable = true
        ## Use pagefind search when javascript enabled, currently only 'pagefind' is supported, further options to be determined
        pagefind = true
        ## fallback searchbox when javascript disabled, currently the options limited to 'mojeek', otherwise duckduckgo will be used
        # fallback = 'mojeek'

    ## Extended Metadata and Social card configuration
    [params.socialCard]
        ## Enable twitter and opengraph social cards (same as .Params.extMeta)
        enable = true
        ## Default social card image, same as .Params.images
        # images = "img/social-share.jpg"
        ## Enable Twitter cards
        # twitter = true
        ## Twitter creator handle
        # twitterCreator = "@username"
        ## Twitter site handle
        # twitterSite = "@username"

        ## Enable OpenGraph
        # opengraph = true
        ## Facebook App ID
        # facebookAppID = "123456789"
        ## Facebook Admin ID
        # facebookAdmin = "USER_ID"

        ## Schema.org (EXPERIMENTAL, not fully supported body tags)
        # schema = true
        ## JsonLD (EXPERIMENTAL, cannot validate permalink)
        # jsonLD = true

    ## Typography settings
    [params.typeface]
        ## Use web safe fonts (will overide font selection below)
        webSafe = false
        ## Reduce icon subset for base-ui to only 38 icon (save up to 15KB)
        minimalUI = true
```

## Additional Configs

```
[params]
    // Enable Appearance Panel
    enableAppearance = true
```

## Quick Command

### Install Theme as Submodule

```sh
git submodule add https://github.com/foxihd/hugo-foxx themes/hugo-foxx
```

### Init Submodule on Fresh Repository clone

```sh
git submodule update --init --recursive
```

### Update Theme as Submodule

```sh
git submodule update --remote --merge themes/hugo-foxx
```

### Remove Theme as Submodule

```sh
git submodule deinit -f themes/hugo-foxx
git rm -r --cached themes/hugo-foxx
rm -R themes/hugo-foxx
```

## Quick Links

- hugo-brewm:  [`hugo.brewm.co`](https://hugo.brewm.co)
- hugo-foxx:  [`hugo.foxx.ink`](https://hugo.foxx.ink)

## Special Thanks

This project could not be made, without a lot efforts of — thank to:

- [Aliftype/Amiri](https://github.com/aliftype/amiri) — for Amiri.
- [Alvarotrigo on Codepen](https://codepen.io/alvarotrigo/pen/rNbxNWg) — for Logotype.
- [Antijingoist/opendyslexic/](https://github.com/antijingoist/opendyslexic/) — for OpenDyslexic typeface.
- [Dpecos/Mastodon Comments](https://github.com/dpecos/mastodon-comments) — for Mastodon comments.
- [GoogleFonts/Inconsolata](https://github.com/googlefonts/Inconsolata) — for teletype typeface.
- [IcoMoon](https://icomoon.io) — for icon font.
- [Mrozilla on codepen](https://codepen.io/mrozilla/pen/OJJNjRb) — for dark/light mode toggle style.
- [Msurguy/Flow Lines](https://github.com/msurguy/flow-lines) — for generated feature images.
- [Nsideras/Bluesky JS Comments](https://github.com/nsideras/bluesky-js-comments) - for Bluesky comments.
- [Slashformotion/Hugo Tufte](https://github.com/slashformotion/hugo-tufte) — for figure, marginpar, epigraph and section shortcodes.

## License

This theme is released under the MIT License.

[^1]: Note that actual speeds may vary depending on content and configuration, user devices and policy of your hosting provider. Here are some benchmarks from the exampleSite that deployed [under a minute](https://github.com/foxihd/hugo-brewm/actions) on GitHub Pages; [Websitecarbon.com](https://www.websitecarbon.com/website/foxihd-github-io-hugo-brewm-en/).

[^2]: This theme does not include a cookie consent banner or any pre-configured web analytics or advertisements. While comments from the fediverse can be viewed without cookies, the usage of custom web analytics & advertisements may require cookie consent banner. Please brew yourself.

[^3]: This theme is intended for browsers from 2019 or later and does not support Internet Explorer and Opera Mini.
