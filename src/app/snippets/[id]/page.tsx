import { prisma } from '@/db';
import CodeBlock from '@/components/code-block/code-block';

type ShowSnippetPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ShowSnippetPage({ params }: ShowSnippetPageProps) {
  const { id } = await params;
  const snippet = await prisma.snippet.findUnique({ where: { id: Number(id) } });

  if (snippet) {
    const { title, code } = snippet;

    return (
      <div className='m-4 flex flex-col gap-4 rounded bg-zinc-100 p-4 dark:bg-zinc-900'>
        <h1 className='mb-2 text-2xl font-bold'>Snippet {id}</h1>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl'>{title}</h2>
          <CodeBlock lang='ts'>{code}</CodeBlock>
        </div>
      </div>
    );
  }
}
