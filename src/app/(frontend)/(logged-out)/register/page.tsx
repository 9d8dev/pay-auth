import { RegisterForm } from '@/components/auth/register-form'
import { Section, Container } from '@/components/craft'

import Link from 'next/link'

export default function RegisterPage() {
  return (
    <Section>
      <Container>
        <h1>Sign Up</h1>
        <RegisterForm />
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link className="text-foreground" href="/login">
            Login Now
          </Link>
        </p>
      </Container>
    </Section>
  )
}
