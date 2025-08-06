import { notFound } from 'next/navigation';
import { prisma } from '@/db';
import ShowSnippet from '@/components/show-snippet';

type ShowSnippetPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ShowSnippetPage({ params }: ShowSnippetPageProps) {
  const { id } = await params;

  if (!Number(id)) notFound();

  const snippet = await prisma.snippet.findUnique({ where: { id: Number(id) } });

  // Do not need to return notFound due to using the TypeScript 'never' type.
  if (!snippet) notFound();

  const { title, code } = snippet;

  return (
    <>
      <h1 className='mb-2 text-2xl font-bold'>Snippet {id}</h1>
      <ShowSnippet title={title} code={code} />
    </>
  );
}
