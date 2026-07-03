import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api/client';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    
    // We proxy the formData directly to the Spring Boot backend
    const res = await fetch(`${API_BASE_URL}/admin/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Do not set Content-Type, fetch will set it with the correct boundary for formData
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: `Backend upload failed: ${res.status} ${errorText}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Media upload proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
