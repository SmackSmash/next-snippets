'use server';

import { prisma } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string, formData: FormData) {
  'use server';

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
