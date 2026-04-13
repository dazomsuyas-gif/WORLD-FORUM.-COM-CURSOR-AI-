# WORLD FORUM

**WORLD FORUM** is a cinematic global knowledge and lifestyle platform:
Knowledge Hub, Language Academy, Story World, Community, Marketplace, Payments,
Admin, and a WhatsApp AI bot.

## Local development

From `world-forum/`:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current status

- **Phase 1–4**: Next.js App Router + TypeScript + Tailwind scaffold, brand tokens, core layout, homepage shell
- **Phase 5 MVP**: Markdown-backed Knowledge Hub categories + article pages + `/search`
- **Core routes**: About, Contact, Why Choose Us, Legal, Auth shells, Languages/Stories/Community/Marketplace shells

## Content

Knowledge articles live in:

- `content/knowledge/<category>/<slug>.md`

## Notes

- Do **not** commit `.env*` or secrets.
- If Google Fonts is blocked on your network, the app still builds (fonts are loaded via `<link>` with fallbacks).
