# Public assets

## Your profile photo  📸

Drop your photo here as **`profile.jpg`**:

```
public/profile.jpg
```

It appears in the **About** section, inside the animated gradient ring.

- Recommended: a square-ish image, at least **600×600px**, well-lit, face centered.
- Supported: `.jpg` / `.png` / `.webp`. If you use a different name or format,
  update the `photo` field in [`src/data/site.ts`](../src/data/site.ts)
  (e.g. `photo: "/profile.png"`).
- **If this file is missing, nothing breaks** — the site automatically shows a
  stylized "WK" monogram instead. Add the photo whenever you're ready.

## Social preview image (Open Graph)

You don't need to add one. The site generates a branded 1200×630 preview
automatically from [`src/app/opengraph-image.tsx`](../src/app/opengraph-image.tsx).
To use your own instead, add `public/og.png` and reference it in the layout metadata.
