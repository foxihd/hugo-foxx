# hugo-foxx

> Bear blog implementation, with foxx design.

![Minimum Hugo Version: v.0.141.0](https://img.shields.io/static/v1?label=Hugo&message=&ge;%20v0.141.0&color=ca187d&logo=hugo)
![CSS baseline 2019](https://img.shields.io/static/v1?label=Baseline&message=2019&color=e44d26&logo=css&logoColor=e44d26)
![Javascript baseline 2019](https://img.shields.io/static/v1?label=Baseline&message=2019&color=f7df1e&logo=javascript)
![GitHub License: MIT](https://img.shields.io/github/license/foxihd/hugo-brewm)
![GitHub Code Size](https://img.shields.io/github/languages/code-size/foxihd/hugo-foxx?color=00bce2)
![GitHub Repo Size](https://img.shields.io/github/repo-size/foxihd/hugo-foxx)
![GitHub Sponsor](https://img.shields.io/github/sponsors/foxihd?label=Sponsor&logo=GitHub&color=6a00d1)

![Term/Author page on 1200px viewport.](https://raw.githubusercontent.com/foxihd/hugo-foxx/main/images/tn.png)
***Figure 1.*** Term/Author page on 1200px viewport.

![Atricle with complex element/shortcode](https://raw.githubusercontent.com/foxihd/hugo-foxx/main/images/screenshot.png)
***Figure 2.*** Article with complex elements/shortcodes on 1500px viewport.

> [!NOTE]
> A short note from the author:  
>  
> This is a cherry picked [hugo-brewm](https://github.com/foxihd/hugo-brewm) based theme optimized for bilingual single author with a fresh design.
> Most [hugo-brewm](https://github.com/foxihd/hugo-brewm) configurations are compatible with this theme so you can switched seamlessly with minimal changes.
> Some content authoring features are retained, some notable feature that is removed is footer and font selection options.
> All assets are reduced to less than half, If your site is rated 98% more carbon friendly with hugo-brewm, then with this theme your site likely becomes 99% more carbon friendly than the average site.  
>
> Please feel free to contribute as well!

> [!IMPORTANT]
> Do not fork this repo if you want to use this theme to build your site! see the README.md on [hugo-brewm](https://github.com/foxihd/hugo-brewm) for installation.

## Additional Config

```
[params]
    // Enable Appearance Panel
    enableAppearance = true

    // Adjust color
    [params.style]
        [params.style.light]
            ac = '#800'
            bg = '#fff'
            fg = '#000'
            [params.style.light.less]
            [params.style.light.more]
        [params.style.dark]
            ac = '#f80'
            bg = '#000'
            fg = '#fff'
            [params.style.light.less]
            [params.style.light.more]
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