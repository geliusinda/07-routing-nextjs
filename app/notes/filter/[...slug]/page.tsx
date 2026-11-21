import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/server';
import { notFound } from 'next/navigation';
import { noteTags } from '@/types/note';
import NotesClient from './Notes.client';
export const dynamic = 'force-dynamic';
export default async function Notes({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const [filter, ...rest] = (await params).slug;
  const tag = noteTags.find((tag) => tag === filter);
  if (rest.length || (filter !== 'all' && !tag)) notFound();
  const client = new QueryClient();
  const queryKey = ['notes', 1, '', tag ?? null];
  await client.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes({ page: 1, tag }),
  });
  const error = client.getQueryState(queryKey)?.error;
  if (error) throw new Error('Could not fetch the list of notes.');
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotesClient key={filter} tag={tag} />
    </HydrationBoundary>
  );
}
