import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type {
  Note,
  NewNote,
  FetchNotesParams,
  FetchNotesResponse,
} from '@/types/note';

export function createNotesApi(api: AxiosInstance) {
  async function fetchNotes({
    page,
    perPage = 12,
    search = '',
    tag,
    signal,
  }: FetchNotesParams): Promise<FetchNotesResponse> {
    const response = await api.get<FetchNotesResponse>('/notes', {
      params: { page, perPage, search, ...(tag && { tag }) },
      signal,
    });
    return response.data;
  }
  async function createNote(note: NewNote): Promise<Note> {
    const response = await api.post<Note, AxiosResponse<Note>, NewNote>(
      '/notes',
      note,
    );
    return response.data;
  }
  async function deleteNote(id: Note['id']): Promise<Note> {
    const response = await api.delete<Note>(`/notes/${encodeURIComponent(id)}`);
    return response.data;
  }

  async function fetchNoteById(
    id: Note['id'],
    signal?: AbortSignal,
  ): Promise<Note> {
    const { data } = await api.get<Note>(`/notes/${encodeURIComponent(id)}`, {
      signal,
    });
    return data;
  }

  return { fetchNotes, createNote, deleteNote, fetchNoteById };
}

const api = axios.create({ baseURL: '/api', timeout: 15000 });

export const { fetchNotes, createNote, deleteNote, fetchNoteById } =
  createNotesApi(api);
