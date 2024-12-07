'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginResponse, loginUser } from '@/lib/actions/auth'
import { SubmitButton } from './submit-button'

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res: LoginResponse = await loginUser({ email, password })

    setIsPending(false)

    if (res.error) {
      setError(res.error || 'Email or password is incorrect')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <form className="grid gap-6 my-6" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" className="focus:outline-none" />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="focus:outline-none"
      />
      {error && <p className="text-red-500">{error}</p>}
      <SubmitButton loading={isPending} text="Login" />
    </form>
  )
}
