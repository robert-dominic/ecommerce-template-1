# Ecommerce Template

A minimal e-commerce starter built with Next.js, TypeScript and Tailwind CSS. Intended as a lightweight template for small shops and admin workflows.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

## Description

This template provides:
- A shop frontend with product listing and product detail pages
- A simple cart and checkout flow (supports WhatsApp order integration)
- Admin area to create, edit and delete products
- React context-based state management and reusable hooks

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (auth + database)
- Lucide React (icons)

## Features

- Responsive UI with Tailwind
- Admin dashboard with product management
- WhatsApp order integration (pre-filled message)
- Skeleton loading states for improved UX

## Getting started

Prerequisites:
- Node.js 18+
- npm (or pnpm/yarn)

Install:

```bash
npm install
```

Environment:
Create a `.env.local` with the following (example):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
STRIPE_SECRET_KEY=sk_test_...
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Deploy:
- This project is ready for deployment on Vercel. Make sure to set the environment variables in your Vercel project settings.

Notes:
- The WhatsApp phone number used for orders is defined in `app/hooks/useWhatsAppOrder.ts`.
- If you removed any sample data, ensure your Supabase DB has required tables (`products`, `admin_users`, etc.).

## License

MIT
