'use client';

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const subscribe = () => () => {};
const getModalHost = () => document.body;
const getServerModalHost = () => null;

interface ModalProps {
  children: ReactNode;
  label?: string;
  onClose: () => void;
}
export default function Modal({
  children,
  onClose,
  label = 'Create a note',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalHost = useSyncExternalStore(
    subscribe,
    getModalHost,
    getServerModalHost,
  );
  useEffect(() => {
    if (!modalHost) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current
      ?.querySelector<HTMLElement>('input, button, select, textarea')
      ?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const elements = modalRef.current?.querySelectorAll<HTMLElement>(
        'input, textarea, select, button:not(:disabled), [tabindex="0"]',
      );
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [modalHost, onClose]);
  if (!modalHost) return null;
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={css.modal} ref={modalRef}>
        {children}
      </div>
    </div>,
    modalHost,
  );
}
