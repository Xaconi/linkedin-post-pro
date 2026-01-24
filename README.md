# LinkedIn Post Pro

Genera posts optimizados para LinkedIn en español usando IA (Claude).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **AI**: Claude API (Anthropic)
- **Emails**: Resend
- **Payments**: Stripe (future)
- **Deploy**: Vercel

## Requirements

- Node.js 18.17 or later
- npm 9+ or pnpm 8+

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Xaconi/linkedin-post-pro.git
   cd linkedin-post-pro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   - Clerk (authentication)
   - Supabase (database)
   - Anthropic (AI)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for the complete list. Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `ANTHROPIC_API_KEY` | Claude API key |

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Project Structure

```
linkedin-post-pro/
├── app/                    # Next.js App Router
│   ├── (public)/           # Public routes (landing, auth)
│   ├── styles/             # SCSS modules
│   ├── layout.tsx          # Root layout
│   └── globals.scss        # Global styles
├── features/               # Feature modules
│   └── landing/            # Landing page feature
├── shared/                 # Shared components
│   └── ui/                 # Reusable UI components
├── config/                 # App configuration
│   ├── features.ts         # Feature flags
│   ├── site.ts             # Site metadata
│   └── constants.ts        # App constants
├── lib/                    # Utilities
│   └── utils/              # Helper functions
├── types/                  # TypeScript types
└── .claude/                # AI workflow system
```

## Contributing

This project uses a multi-agent AI workflow system. See [CLAUDE.md](./CLAUDE.md) for:

- Development workflows
- PR guidelines
- Code standards
- Agent system documentation

## License

Private - All rights reserved.
