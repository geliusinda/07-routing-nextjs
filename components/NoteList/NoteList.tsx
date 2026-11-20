'use client';

import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';
interface NoteListProps {
  notes: Note[];
  onDelete: (id: Note['id']) => void;
  deletingId?: string;
}
export default function NoteList({
  notes,
  onDelete,
  deletingId,
}: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              disabled={Boolean(deletingId)}
              onClick={() => onDelete(note.id)}
            >
              {deletingId === note.id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
