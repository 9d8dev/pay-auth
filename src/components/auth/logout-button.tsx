'use client'

import { logoutUser } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  return <Button onClick={() => logoutUser()}>Logout</Button>
}
