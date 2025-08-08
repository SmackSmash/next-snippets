'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string, formData: FormData) {
  const title = formData.get('title') as string;

  await prisma.snippet.update({
    where: { id },
    data: {
      title,
      code
    }
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  const snippet = await prisma.snippet.findUnique({
    where: {
      id
    }
  });

  if (!snippet) return;

  await prisma.snippet.delete({ where: { id } });

  redirect(`/`);
}
