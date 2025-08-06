import { prisma } from '@/db';
import CodeBlock from '@/components/code-block/code-block';
import ShowSnippet from '@/components/show-snippet';

export default async function HomePage() {
  const snippets = await prisma.snippet.findMany();

  return (
    <>
      <h1 className='mb-2 text-2xl font-bold'>Snippets</h1>
      <div className='flex flex-col gap-8'>
        {snippets.map(({ id, title, code }) => (
          <ShowSnippet key={id} id={id} title={title} code={code} />
        ))}
      </div>
    </>
  );
}
