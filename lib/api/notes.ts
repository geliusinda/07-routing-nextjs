import type { AxiosInstance, AxiosResponse } from 'axios';
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
    const response: AxiosResponse<FetchNotesResponse> = await api.get(
      '/notes',
      {
        params: { page, perPage, search, ...(tag && { tag }) },
        signal,
      },
    );
    return response.data;
  }
  async function createNote(note: NewNote): Promise<Note> {
    const response: AxiosResponse<Note> = await api.post('/notes', note);
    return response.data;
  }
  async function deleteNote(id: Note['id']): Promise<Note> {
    const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
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
