'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();
  const close = useCallback(() => router.back(), [router]);
  const {
    data: note,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    refetchOnMount: false,
    queryFn: ({ signal }) => fetchNoteById(id, signal),
  });

  return (
    <Modal onClose={close} label="Note details">
      <button type="button" className={css.backBtn} onClick={close}>
        Close
      </button>
      {isPending && <p role="status">Loading, please wait...</p>}
      {isError && <p role="alert">Could not fetch note details.</p>}
      {note && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString('en-US', {
              timeZone: 'UTC',
            })}{' '}
            UTC
          </p>
        </div>
      )}
    </Modal>
  );
}
