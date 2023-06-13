# @sentry/nextjs font inlining bug

## next.js Font optimization

Next.js has a feature where it can optimize fonts loaded from google or typekit. The result of this optimization is that the font-loading is inlined into the html file.

e.g. the following link tag in the `_document.ts` file:

```html
<link rel="stylesheet" href="https://use.typekit.net/plm1izr.css" />
```

will be replaced with:

```html
<style data-href="https://use.typekit.net/plm1izr.css">
  @import url("https://p.typekit.net/p.css?...");
  @font-face {
    font-family: "birra-2";
    src: url("https://use.typekit.net/...") format("woff2");
    /* ...etc */
  }
</style>
```

I recently discovered this optimization didn't work anymore, and after a lot of debugging I found out that the `@sentry/nextjs` package is the culprit.

The `autoInstrumentServerFunctions` somehow disables next.js' font inlining feature. This setting is turned on by default, in this repository it is turned off in the `next.config.js` file.

## Steps to reproduce

1. `npm install`
2. `npm run build`
3. open `./.next/server/pages/index.html`, you will see that the font-loading is inlined (search for `@font-face`)

4. now open `next.config.js` and comment out the `autoInstrumentServerFunctions` line
5. `npm run build`
6. open `./.next/server/pages/index.html`, you will see that the font-loading is not inlined anymore (search for `@font-face`)
