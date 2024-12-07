'use server'

import { cookies, headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import config from '@payload-config'
import configPromise from '@payload-config'
import { AppUser } from '@/payload-types'
import { redirect } from 'next/navigation'

// Auth Types

type LoginParams = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  error?: string
}

export type Result = {
  exp?: number
  token?: string
  user?: AppUser
}

export type RegisterResponse = {
  success: boolean
  error?: string
}

// Auth Actions

export async function getUser(): Promise<AppUser | null> {
  const headers = await getHeaders()
  const payload: Payload = await getPayload({ config: await configPromise })

  const { user } = await payload.auth({ headers })
  return user || null
}

export async function loginUser({ email, password }: LoginParams): Promise<LoginResponse> {
  const payload = await getPayload({ config })

  try {
    const result: Result = await payload.login({
      collection: 'app-users',
      data: { email, password },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    console.error('Login error: ', error)
    return { success: false, error: 'An error occurred' }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')
  redirect('/')
}

export async function registerUser({ email, password }: LoginParams): Promise<RegisterResponse> {
  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'app-users',
      data: { email, password },
    })

    const loginResponse = await loginUser({ email, password })

    if (loginResponse.success) {
      return { success: true }
    } else {
      return {
        success: false,
        error: 'User created but auto-login failed. Please try logging in manually.',
      }
    }
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof Error && error.message.includes('duplicate key error')) {
      return { success: false, error: 'An account with this email already exists' }
    }

    return { success: false, error: 'An error occurred during registration' }
  }
}
