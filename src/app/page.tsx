import { prisma } from '@/db';
import CodeBlock from '@/components/code-block/code-block';
import ShowSnippet from '@/components/show-snippet';
import Link from 'next/link';

export default async function HomePage() {
  const snippets = await prisma.snippet.findMany();

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='mb-2 text-2xl font-bold'>Snippets</h1>
        <Link
          href='/snippets/new'
          className='cursor-pointer rounded bg-zinc-800 px-4 py-2 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900'
        >
          New Snippet
        </Link>
      </div>
      <div className='flex flex-col gap-8'>
        {snippets.map(({ id, title, code }) => (
          <ShowSnippet key={id} id={id} title={title} code={code} />
        ))}
      </div>
    </>
  );
}
