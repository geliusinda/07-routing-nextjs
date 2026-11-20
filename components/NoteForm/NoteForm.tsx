'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { noteTags, type NewNote } from '@/types/note';
import css from './NoteForm.module.css';
interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}
const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'At least 3 characters')
    .max(50, 'At most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'At most 500 characters'),
  tag: Yup.string().oneOf(noteTags).required('Tag is required'),
});
const initialValues: NewNote = { title: '', content: '', tag: 'Todo' };
export default function NoteForm({ onCancel, onSuccess }: NoteFormProps) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: NewNote) => {
        try {
          await mutation.mutateAsync({ ...values, title: values.title.trim() });
        } catch {
          return;
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {noteTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>
          {mutation.isError && (
            <p className={css.error} role="alert">
              Could not create the note. Please try again.
            </p>
          )}
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating…' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
