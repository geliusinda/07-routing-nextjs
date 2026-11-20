import NoteData from '@/app/notes/NoteData';
import NoteDetailsClient from '@/app/notes/NoteDetails.client';
import NotePreview from './NotePreview.client';

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <NotePreview>
      <NoteData id={id}>
        <NoteDetailsClient id={id} />
      </NoteData>
    </NotePreview>
  );
}
