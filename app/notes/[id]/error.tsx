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
      <p role="alert">Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
