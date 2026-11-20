'use client';

import { useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview({ children }: { children: ReactNode }) {
  const router = useRouter();
  const close = useCallback(() => router.back(), [router]);
  return (
    <Modal onClose={close} label="Note details">
      <button type="button" className={css.backBtn} onClick={close}>
        Close
      </button>
      {children}
    </Modal>
  );
}
