'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';

// formData automatically passed to server action when it is assigned
// to the form's 'action' attribute
export async function createSnippet(actionState: { message: string }, formData: FormData) {
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  if (typeof title !== 'string' || title.length < 3)
    return { message: 'Please enter a valid title' };

  if (typeof code !== 'string' || code.length < 10)
    return { message: 'Please enter a valid snippet' };

  await prisma.snippet.create({
    data: {
      title,
      code
    }
  });

  redirect('/');
}

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
