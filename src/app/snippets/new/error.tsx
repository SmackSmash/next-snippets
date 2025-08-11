'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

// Essentially works as a catch block for all unhandled errors
// in route.
export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
