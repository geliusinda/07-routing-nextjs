import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/server';
import type { ReactNode } from 'react';
import { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';
export default async function NoteData({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  if (!/^[\w-]+$/.test(id)) notFound();
  const client = new QueryClient();
  const queryKey = ['note', id];
  await client.prefetchQuery({ queryKey, queryFn: () => fetchNoteById(id) });
  const error = client.getQueryState(queryKey)?.error;
  if (isAxiosError(error) && error.response?.status === 404) notFound();
  if (error) throw new Error('Could not fetch note details.');
  return (
    <HydrationBoundary state={dehydrate(client)}>{children}</HydrationBoundary>
  );
}
