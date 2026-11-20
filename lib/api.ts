import axios from 'axios';
import { createNotesApi } from './api/notes';

const api = axios.create({ baseURL: '/api', timeout: 15000 });

export const { fetchNotes, createNote, deleteNote, fetchNoteById } =
  createNotesApi(api);
