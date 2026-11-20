'use client';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <p role="alert">Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
