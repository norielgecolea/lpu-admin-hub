# LPU Admin Hub

Administrative services dashboard for Lyceum of the Philippines University – Laguna.

## Live site

Works with:

- GitHub Pages project URL: `https://<your-username>.github.io/lpu-admin-hub/`
- Custom domain (recommended): root of your domain, e.g. `https://adminhub.lpulaguna.com/`

The production build uses `base-href=/` so assets load correctly on a custom domain.

## Development

```bash
npm install
npm start
```

Open http://localhost:4200/

## Build for GitHub Pages

```bash
npm run build:gh-pages
```

Output is written to `dist/lpu-admin-hub/browser`.

## GitHub Pages setup

1. Push this repository to GitHub (`main` branch).
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Add your **Custom domain** (if using one) and enable **Enforce HTTPS** after DNS is verified.
5. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).

### Custom domain DNS tip

Point your domain/subdomain to GitHub Pages:

- Apex domain: `A` records to GitHub Pages IPs, or `ALIAS`/`ANAME` if supported
- Subdomain: `CNAME` record to `<your-username>.github.io`

## Service links

| Service | URL |
| --- | --- |
| MIS Helpdesk | https://helpdesk.lpulaguna.com |
| LMS | https://lms.lpulaguna.edu.ph |
| Office 365 | https://office.com |
| ERP | https://erp.lpulaguna.edu.ph |
| Dorado (Payslips) | https://dorado.grantthorntonsolutions.ph/1.0.0.17871/Account/Login |
| Reservation System | https://reservation.lpulaguna.com |
| Internet Access | http://web.lpu-laguna.edu.ph:8090 |
