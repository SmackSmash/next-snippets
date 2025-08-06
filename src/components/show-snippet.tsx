import Link from 'next/link';
import CodeBlock from '@/components/code-block/code-block';

type ShowSnippetProps = {
  id?: number;
  title: string;
  code: string;
};

export default function ShowSnippet({ id, title, code }: ShowSnippetProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>{title}</h2>
        {id && <Link href={`/snippets/${id}`}>View Snippet →</Link>}
      </div>
      <CodeBlock lang='ts'>{code}</CodeBlock>
    </div>
  );
}
