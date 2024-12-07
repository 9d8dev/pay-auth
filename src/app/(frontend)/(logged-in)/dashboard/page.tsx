import { Section, Container } from '@/components/craft'
import { getUser } from '@/lib/actions/auth'
import { LogoutButton } from '@/components/auth/logout-button'

export default async function Admin() {
  const user = await getUser()

  return (
    <Section>
      <Container className="grid gap-6">
        <h1>Welcome, {user?.email}</h1>
        <LogoutButton />
      </Container>
    </Section>
  )
}
