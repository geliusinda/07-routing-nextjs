import axios, { type AxiosResponse } from 'axios';
import type {
  Note,
  NewNote,
  FetchNotesParams,
  FetchNotesResponse,
} from '@/types/note';

const api = axios.create({
  timeout: 15000,
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
});
export async function fetchNotes({
  page,
  perPage = 12,
  search = '',
  tag,
  signal,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params: { page, perPage, search, ...(tag && { tag }) },
    signal,
  });
  return response.data;
}
export async function createNote(note: NewNote): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', note);
  return response.data;
}
export async function deleteNote(id: Note['id']): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(
  id: Note['id'],
  signal?: AbortSignal,
): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${encodeURIComponent(id)}`, {
    signal,
  });
  return data;
}
