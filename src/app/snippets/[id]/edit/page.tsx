import { prisma } from '@/db';
import { notFound, redirect } from 'next/navigation';

type EditSnippetPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSnippetPage({ params }: EditSnippetPageProps) {
  const { id } = await params;
  const snippet = await prisma.snippet.findUnique({ where: { id: Number(id) } });

  async function editSnippet(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    await prisma.snippet.update({
      where: { id: Number(id) },
      data: {
        title,
        code
      }
    });

    redirect(`/snippets/${id}`);
  }

  if (!snippet) notFound();

  const { title, code } = snippet;

  return (
    <>
      <form action={editSnippet} className='flex flex-col gap-4'>
        <h3 className='text-2xl font-bold'>Edit Snippet #{id}</h3>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          defaultValue={title}
          className='rounded bg-zinc-200 p-2 text-zinc-900 outline-0 focus-visible:outline-2 dark:bg-zinc-800 dark:text-zinc-50'
        />
        <label htmlFor='code'>Code</label>
        <textarea
          name='code'
          id='code'
          defaultValue={code}
          className='min-h-64 rounded bg-zinc-200 p-2 font-mono text-zinc-900 outline-0 focus-visible:outline-2 dark:bg-zinc-800 dark:text-zinc-50'
        ></textarea>
        <button
          type='submit'
          className='cursor-pointer rounded bg-zinc-800 p-4 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900'
        >
          Edit Snippet
        </button>
      </form>
    </>
  );
}
