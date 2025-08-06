import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import './shiki.css';

type CodeBlockProps = {
  children: string;
  lang: BundledLanguage;
};

export default async function CodeBlock(props: CodeBlockProps) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: 'poimandres'
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
