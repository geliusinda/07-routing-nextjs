import type { NextRequest } from 'next/server';
import { noteHub } from '@/lib/api/server';

type RouteContext = { params: Promise<{ id?: string[] }> };

async function handleNotes(request: NextRequest, { params }: RouteContext) {
  const ids = (await params).id ?? [];
  const [id] = ids;
  if (ids.length > 1 || (id && !/^[\w-]+$/.test(id))) {
    return Response.json({ message: 'Note not found' }, { status: 404 });
  }

  const method = request.method;
  if ((method === 'POST' && id) || (method === 'DELETE' && !id)) {
    return Response.json({ message: 'Method not allowed' }, { status: 405 });
  }

  let data: unknown;
  if (method === 'POST') {
    try {
      data = await request.json();
    } catch {
      return Response.json({ message: 'Invalid note data' }, { status: 400 });
    }
  }

  try {
    const response = await noteHub.request({
      method,
      url: id ? `/notes/${id}` : '/notes',
      params: Object.fromEntries(request.nextUrl.searchParams),
      data,
      signal: request.signal,
      validateStatus: () => true,
    });
    if (response.status === 204) return new Response(null, { status: 204 });
    if (response.status >= 400) {
      return Response.json(
        { message: 'NoteHub request failed' },
        { status: response.status },
      );
    }
    return Response.json(response.data, { status: response.status });
  } catch {
    return Response.json(
      { message: 'NoteHub is unavailable' },
      { status: 502 },
    );
  }
}

export { handleNotes as GET, handleNotes as POST, handleNotes as DELETE };
