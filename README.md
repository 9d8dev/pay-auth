# 9d8/pay-auth

![CleanShot 2024-12-06 at 11 29 43@2x](https://github.com/user-attachments/assets/e0f8e5b3-42af-41b1-af4d-516698f1726e)

A modern, full-stack starter template powered by PayloadCMS and Next.js. Built with performance and developer experience in mind.

[![Deploy](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/9d8dev/pay&project-name=pay&repository-name=pay&branch=main)

## Features

- **Next.js 15** with App Router
- **PayloadCMS** for content management
- **PostgreSQL** database with Neon
- **AWS S3** for media storage
- **Authentication** with Server Actions & JWT
- **Tailwind CSS** & **shadcn/ui** for styling
- **Responsive** & **Mobile-First** design
- **TypeScript** for type safety
- **brijr/craft** utilities included

## Prerequisites

Before you begin, ensure you have:

- Node.js (^18.20.2 or >=20.9.0)
- pnpm package manager
- PostgreSQL database (local or cloud)
- AWS S3 bucket for media storage
- Basic knowledge of TypeScript and React

## Quick Start

1. Clone and install dependencies:

```bash
git clone https://github.com/9d8dev/pay.git
cd pay
pnpm install
```

2. Set up your environment:

```bash
cp .env.example .env
```

3. Configure your `.env` file with:

```env
# Database Configuration
DATABASE_URI=your_postgres_connection_string
PAYLOAD_SECRET=your_secure_secret_key

# S3 Configuration
S3_BUCKET=your_bucket_name
S3_REGION=your_bucket_region
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
```

4. Start the development server:

```bash
pnpm dev
```

5. Visit http://localhost:3000/admin to create your first admin user

## Detailed Setup Guide

### Database Setup

1. **Local PostgreSQL:**

   - Install PostgreSQL on your machine
   - Create a new database
   - Use the connection string: `postgresql://username:password@localhost:5432/database`

2. **Cloud PostgreSQL (Recommended):**
   - Create a database on [Neon](https://neon.tech)
   - Copy the connection string from your dashboard
   - Enable SSL mode with `?sslmode=require`

### AWS S3 Configuration ([Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html))

1. Create an S3 bucket:

   - Go to AWS Console > S3
   - Create a new bucket
   - Enable public access settings
   - Configure CORS for your domain

2. Create IAM credentials:

   - Create a new IAM user
   - Attach `AmazonS3FullAccess` policy
   - Save the access key and secret

3. Configure bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## Development

### Project Structure

```
pay/
├── src/
│   ├── app/           # Next.js app router
│   ├── collections/   # PayloadCMS collections
│   ├── components/    # React components
│   └── lib/          # Utility functions
├── public/           # Static assets
└── package.json      # Dependencies
```

### Key Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm generate:types` - Generate PayloadCMS types

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

### Database Deployment

- Use PostgreSQL (We recommend [Neon](https://neon.tech), or any other cloud provider with PostgreSQL support)
- Enable serverless pooling
- Configure connection pooling

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Support

- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Payload Discord Community](https://discord.gg/payload)
- [Issue Tracker](https://github.com/9d8dev/pay/issues)

## License

MIT [9d8](https://github.com/9d8dev)

## Authentication

### Features
- Server-side authentication using Next.js Server Actions
- JWT-based session management with secure HTTP-only cookies
- Built-in login, register, and logout functionality
- Protected routes with automatic redirects
- TypeScript types for auth responses
- Pre-build App Users collection at `collections/AppUsers.ts`

### Usage

1. **Login Form**
tsx
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return <LoginForm />
}
```

2. **Register Form**
```tsx
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return <RegisterForm />
}
```

3. **Logout Button**
```tsx
import { LogoutButton } from '@/components/auth/logout-button'

export default function NavBar() {
  return <LogoutButton />
}
```

4. **Protected Routes**
Create a layout.tsx in your protected route directory:
```tsx
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/actions/auth'
import { cookies } from 'next/headers'

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) {
    redirect('/login')
  }

  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  return <>{children}</>
}
```

### Auth Actions

The following server actions are available in `@/lib/actions/auth`:

- `loginUser({ email, password })` - Authenticates user and sets session
- `registerUser({ email, password })` - Creates new user and logs them in
- `logoutUser()` - Ends session and redirects to home
- `getUser()` - Returns current authenticated user or null

```
