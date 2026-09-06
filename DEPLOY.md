# Deploying to Vercel

Your project is production-ready (Next.js — Vercel auto-detects everything, no
config needed). You just need to sign in with your own Vercel account.

## Option A — Vercel CLI (fastest, ~2 minutes)

Open a terminal in this folder and run:

```bash
cd /Users/waseemkoli/Portfolio
npx vercel login
```

- Choose **Continue with GitHub** (or email). Follow the browser prompt.
- If you don't have a Vercel account yet, this same flow creates a free one.

Then deploy to production:

```bash
npx vercel --prod
```

First run asks a few questions — press Enter for the defaults:

- *Set up and deploy?* → **Y**
- *Which scope?* → your account
- *Link to existing project?* → **N**
- *Project name?* → e.g. `waseem-kohli-portfolio`
- *In which directory is your code located?* → `./`
- It auto-detects **Next.js** — accept the defaults.

When it finishes it prints your live URL, e.g.
`https://waseem-kohli-portfolio.vercel.app`. That `.vercel.app` URL **is** your
free hosting + domain — it's live worldwide, HTTPS included.

Re-deploy anytime after changes with `npx vercel --prod`.

## Option B — GitHub + Vercel dashboard (best for auto-deploys)

1. Create a repo on GitHub and push this folder to it.
2. Go to https://vercel.com/new → **Import** that repo.
3. Framework is auto-detected as Next.js → click **Deploy**.

Now every `git push` auto-deploys. Great for ongoing updates.

## After you have your live URL — update one file

Open [`src/data/site.ts`](src/data/site.ts) and set `seo.url` to your real URL
so canonical links, the sitemap and the social-preview (Open Graph) image point
to the right place:

```ts
url: "https://waseem-kohli-portfolio.vercel.app", // ← your actual URL
```

Then re-deploy (`npx vercel --prod`, or push to GitHub).

## Custom domain (e.g. waseemkohli.dev)

The free `.vercel.app` URL needs nothing extra. For a custom domain:

1. **Buy the domain** from any registrar (Namecheap, GoDaddy, Cloudflare, or buy
   it directly inside Vercel → *Domains*). Buying a domain costs money, so this
   step is yours to do.
2. In your Vercel project → **Settings → Domains → Add** → type your domain.
3. Vercel shows the exact DNS records to add:
   - Apex domain (`waseemkohli.dev`) → an **A record** to `76.76.21.21`.
   - `www` → a **CNAME** to `cname.vercel-dns.com`.
   (If you bought the domain inside Vercel, this is automatic.)
4. Wait for DNS to propagate (minutes to a couple of hours). HTTPS is automatic.

Tell me your final URL/domain and I'll update `site.ts` for you.
