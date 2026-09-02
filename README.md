# TDS Properties

A database-free, premium real-estate website built with Next.js 15, TypeScript, Tailwind, Framer Motion, Lenis, Vercel Blob, GitHub Contents API, and Resend.

## Local setup

1. Install Node.js 20.9+ and run `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the values below.
3. Run `npm run dev`, then open `http://localhost:3000`.

The public site works immediately using the committed files in `data/properties.json` and `data/settings.json`. The editor can be viewed locally, but publishing requires GitHub configuration.

## Environment variables

| Variable | Required for | Notes |
| --- | --- | --- |
| `ADMIN_EMAIL` | Admin access | The only email allowed to request a code. |
| `RESEND_API_KEY` | OTP and enquiries | Verify a sending domain in Resend before production. |
| `JWT_SECRET` | Admin access | Use a long random string; changing it logs users out. |
| `GITHUB_TOKEN` | Publishing editor changes | Fine-grained GitHub PAT, restricted to this repository. |
| `GITHUB_REPO` | Publishing editor changes | `owner/repository`. |
| `GITHUB_BRANCH` | Publishing editor changes | Usually `main`. |
| `BLOB_READ_WRITE_TOKEN` | Admin image uploads | Vercel Blob token. External image URLs remain available without it. |

## GitHub publishing

Create a **fine-grained personal access token** in GitHub with access restricted to this one repository. Under Repository permissions, grant **Contents: Read and write**. Put it in `GITHUB_TOKEN`. The admin editor commits `data/properties.json` and `data/settings.json` through the Contents API. A Vercel Git deployment follows each save, normally becoming live in roughly 40 seconds.

Never expose `GITHUB_TOKEN`, `JWT_SECRET`, the Resend key, or the Blob token in a `NEXT_PUBLIC_` variable.

## Resend

Add and verify your sending domain in Resend, then replace `onboarding@resend.dev` in the two API routes with a sender at that domain. This is required before a production deployment can reliably deliver login codes and enquiries.

## Vercel deployment

1. Push this folder to a GitHub repository.
2. Import that repository in Vercel; its Next.js framework preset is detected automatically.
3. Create a Blob store in Vercel if you want managed uploads.
4. Add every environment variable above to Production, Preview, and Development as appropriate.
5. Deploy. Set the canonical domain in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` if it differs from `tdsproperties.in`.

## Content model

All public content is driven from the two JSON files. `properties.json` contains listings; `settings.json` includes hero, contact, SEO, lists, testimonials, staff, and more. The supplied six listings use Unsplash imagery for initial presentation—replace those URLs with licensed property photography before launch.

## Security notes

Admin OTP codes are never stored in a database. A ten-minute signed, httpOnly challenge cookie holds a hash of the generated code. Successful verification produces a seven-day, strict, secure, httpOnly session cookie. OTP requests and verification attempts are both limited to five per window. The middleware blocks `/admin/*` and mutating admin API routes without a valid session.
