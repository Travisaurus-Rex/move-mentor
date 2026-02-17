"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
