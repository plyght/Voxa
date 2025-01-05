# remark-github-alerts

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

1. Ported from [antfu/markdown-it-github-alerts](https://github.com/antfu/markdown-it-github-alerts)
1. Support GitHub-style alerts for remark
1. Check out the [demo](https://remark-github-alerts.vercel.app)

## Usage

Install the package:

```sh
ni remark-github-alerts
```

Add the plugin to your `processor`:

```ts
import remarkGithubAlerts from "remark-github-alerts"

const processor = unified()
  .use(remarkParse)
  .use(remarkGithubAlerts)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
```

Import the styles:

```ts
import "remark-github-alerts/styles/github-colors-light.css"
import "remark-github-alerts/styles/github-colors-dark-class.css"
// or
// import "remark-github-alerts/styles/github-colors-dark-media.css"
import "remark-github-alerts/styles/github-base.css"
```

If you are using Nextra, you can add the plugin to your `next.config.mjs`:

```ts
import nextra from "nextra"
import remarkGithubAlerts from "remark-github-alerts"

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    remarkPlugins: [remarkGithubAlerts],
  },
})

export default withNextra()
```

If you also want to use mdx, you need to use `rehype-raw` and set `passThrough` option:

```ts
import nextra from "nextra"
import rehypeRaw from "rehype-raw"
import remarkGithubAlerts from "remark-github-alerts"

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    remarkPlugins: [remarkGithubAlerts],
    rehypePlugins: [
      [
        rehypeRaw,
        {
          passThrough: ["mdxjsEsm", "mdxJsxFlowElement"],
        },
      ],
    ],
  },
})

export default withNextra()
```

## Check Also

- [GitHub-style alerts](https://github.com/orgs/community/discussions/16925)
- [markdown-it-github-alerts](https://github.com/antfu/markdown-it-github-alerts)
- [vscode-markdown-alert](https://github.com/KeJunMao/vscode-markdown-alert)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/remark-github-alerts?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/remark-github-alerts
[npm-downloads-src]: https://img.shields.io/npm/dm/remark-github-alerts?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/remark-github-alerts
[bundle-src]: https://img.shields.io/bundlephobia/minzip/remark-github-alerts?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=remark-github-alerts
[license-src]: https://img.shields.io/github/license/hyoban/remark-github-alerts.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hyoban/remark-github-alerts/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/remark-github-alerts
