import { pay } from 'site.config'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Section, Container } from '@/components/craft'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}

const Header = () => {
  return (
    <Section className="py-6 md:py-6">
      <Container className="py-6 md:py-6">
        <nav className="flex gap-4 justify-between items-center">
          <h2 className="font-medium">
            <Link href="/" className="group">
              {pay.name}
            </Link>
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </Container>
    </Section>
  )
}

const Footer = () => {
  return (
    <Section className="py-6 md:py-6">
      <Container className="py-6 md:py-6">
        <footer className="text-muted-foreground">
          <p>
            © {pay.name}, 2025 / made at <a href="https://9d8.dev">9d8</a>
          </p>
        </footer>
      </Container>
    </Section>
  )
}
