import NoteData from '../NoteData';
import NoteDetailsClient from './NoteDetails.client';
import css from './NoteDetails.module.css';

export default async function NoteDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className={css.container}>
      <NoteData id={id}>
        <NoteDetailsClient id={id} />
      </NoteData>
    </main>
  );
}
