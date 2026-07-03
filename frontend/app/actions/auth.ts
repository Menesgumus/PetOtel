'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api/client';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { error: 'Invalid email or password' };
    }

    const data = await res.json();
    
    if (data.token) {
      const cookieStore = await cookies();
      
      cookieStore.set('auth_token', data.token, {
        httpOnly: true,
        secure: process.env.APP_COOKIE_SECURE === 'true' || (process.env.APP_COOKIE_SECURE === undefined && process.env.NODE_ENV === 'production'),
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      // Redirect to dashboard after successful login
      redirect('/admin/dashboard');
    } else {
      return { error: 'Invalid response from server' };
    }
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      throw error; // Let Next.js handle the redirect
    }
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  redirect('/admin/login');
}
