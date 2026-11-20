export const noteTags = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;
export type NoteTag = (typeof noteTags)[number];
export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
export interface Note extends NewNote {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
  signal?: AbortSignal;
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
