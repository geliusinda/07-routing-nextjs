import NoteData from '../../NoteData';
import NoteDetailsClient from '../../NoteDetails.client';
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
