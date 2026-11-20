import axios from 'axios';
import { createNotesApi } from './notes';

export const noteHub = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  timeout: 15000,
  headers: { Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}` },
});

export const { fetchNotes, fetchNoteById } = createNotesApi(noteHub);
