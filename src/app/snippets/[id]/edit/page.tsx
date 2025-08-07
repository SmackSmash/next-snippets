import EditSnippetForm from '@/components/snippet-edit-form';
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

  return <EditSnippetForm snippet={snippet} onSubmit={editSnippet} />;
}
