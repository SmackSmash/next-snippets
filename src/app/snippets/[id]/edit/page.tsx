import EditSnippetForm from '@/components/edit-snippet-form';
import { prisma } from '@/db';
import { notFound } from 'next/navigation';

type EditSnippetPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSnippetPage({ params }: EditSnippetPageProps) {
  const { id } = await params;
  const snippet = await prisma.snippet.findUnique({ where: { id: Number(id) } });

  if (!snippet) notFound();

  return <EditSnippetForm snippet={snippet} />;
}
