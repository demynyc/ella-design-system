# Building and publishing the Ella website

The site you edit lives in `ui_kits/website/`. The site visitors get is built
from it into `docs/`, which is what GitHub Pages serves.

## Build

```bash
npm install        # first time only
npm run build
```

This compiles the code ahead of time and pre-renders every page (both
languages, every article and symptom) into real HTML with its own address,
title, description and sharing preview. It also writes `sitemap.xml` and
`robots.txt`. Run it after every change, then commit `docs/` along with your
edits.

To preview the built site locally, serve the project folder and open
`http://localhost:8765/docs/`:

```bash
python3 -m http.server 8765
```

## Publish on GitHub Pages

One-time setting: in the repository, **Settings → Pages → Build and
deployment**, choose **Deploy from a branch**, branch `main`, folder `/docs`.
After that, every push to `main` updates the site.

## Connect ellabienestar.com

1. At the domain registrar, add these DNS records:

   | Type  | Name | Value                    |
   |-------|------|--------------------------|
   | A     | @    | 185.199.108.153          |
   | A     | @    | 185.199.109.153          |
   | A     | @    | 185.199.110.153          |
   | A     | @    | 185.199.111.153          |
   | AAAA  | @    | 2606:50c0:8000::153      |
   | AAAA  | @    | 2606:50c0:8001::153      |
   | AAAA  | @    | 2606:50c0:8002::153      |
   | AAAA  | @    | 2606:50c0:8003::153      |
   | CNAME | www  | demynyc.github.io     |

   Remove any other A/AAAA records on `@` (for example a registrar parking page).

2. Wait until the records are live (usually under an hour; check with
   `dig ellabienestar.com +short`, which should list the four IPs above).

3. In `site.config.json`, set `"useCustomDomain": true`, run `npm run build`,
   commit and push. The build adds `docs/CNAME` and switches every canonical
   and sharing link to `https://ellabienestar.com`.

4. In **Settings → Pages**, enter `ellabienestar.com` as the custom domain and,
   once GitHub has issued the certificate, tick **Enforce HTTPS**.

Do step 3 only after step 2: once `CNAME` is published, the github.io address
redirects to the domain, so the domain has to work first.

## Private files

`uploads/`, `screenshots/` and the old prebuilt `Ella Website.html` /
`ella-website-share.html` were removed from the repository and its history.
The originals are in `~/Projects/Ella-private-backup/`. They are listed in
`.gitignore` so they cannot be committed again by accident.
