'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(formData: FormData, id: number) {
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
