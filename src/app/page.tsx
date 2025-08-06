import { prisma } from '@/db';
import CodeBlock from '@/components/code-block/code-block';

export default async function HomePage() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className='m-4 flex flex-col gap-4 rounded bg-zinc-100 p-4 dark:bg-zinc-900'>
      <h1 className='mb-2 text-2xl font-bold'>Snippets</h1>
      <div className='flex flex-col gap-8'>
        {snippets.map(({ id, title, code }) => (
          <div key={id} className='flex flex-col gap-2'>
            <h2 className='text-xl'>{title}</h2>
            <CodeBlock lang='ts'>{code}</CodeBlock>
          </div>
        ))}
      </div>
    </div>
  );
}
