'use client';

import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { nord } from '@fsegurai/codemirror-theme-nord';

type EditSnippetFormProps = {
  snippet: {
    id: number;
    title: string;
    code: string;
  };
};

export default function EditSnippetForm({ snippet: { id, title, code } }: EditSnippetFormProps) {
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let view = new EditorView({
      doc: code,
      extensions: [basicSetup, javascript(), nord],
      parent: editor.current as HTMLDivElement
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <form className='flex flex-col gap-4'>
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
      {/* <textarea
        name='code'
        id='code'
        defaultValue={code}
        className='min-h-64 rounded bg-zinc-200 p-2 font-mono text-zinc-900 outline-0 focus-visible:outline-2 dark:bg-zinc-800 dark:text-zinc-50'
      ></textarea> */}
      <div ref={editor}></div>
      <button
        type='submit'
        onClick={() => alert('Oi!')}
        className='cursor-pointer rounded bg-zinc-800 p-4 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900'
      >
        Edit Snippet
      </button>
    </form>
  );
}
