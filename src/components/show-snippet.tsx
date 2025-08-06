import CodeBlock from '@/components/code-block/code-block';

type ShowSnippetProps = {
  title: string;
  code: string;
};

export default async function ShowSnippet({ title, code }: ShowSnippetProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-xl'>{title}</h2>
      <CodeBlock lang='ts'>{code}</CodeBlock>
    </div>
  );
}
