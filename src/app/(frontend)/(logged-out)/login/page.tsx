import { LoginForm } from '@/components/auth/login-form'
import { Section, Container } from '@/components/craft'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <Section>
      <Container>
        <h1>Login</h1>
        <LoginForm />
        <p className="text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link className="text-foreground" href="/register">
            Sign Up Now
          </Link>
        </p>
      </Container>
    </Section>
  )
}
