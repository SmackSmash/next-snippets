'use client';

import { type Snippet } from '@/generated/prisma';
import { useEffect, useRef, useState } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';

type EditSnippetFormProps = {
  snippet: Snippet;
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function EditSnippetForm({
  snippet: { id, title, code },
  onSubmit
}: EditSnippetFormProps) {
  const [editorCode, setEditorCode] = useState(code);

  const editor = useRef<HTMLDivElement>(null);

  const onUpdate = EditorView.updateListener.of(v => {
    setEditorCode(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [basicSetup, keymap.of([indentWithTab]), tokyoNightStorm, javascript(), onUpdate]
    });

    const view = new EditorView({
      state,
      parent: editor.current as HTMLDivElement
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <form action={onSubmit} className='flex flex-col gap-4'>
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
      <textarea
        name='code'
        id='code'
        readOnly
        hidden
        value={editorCode}
        className='min-h-64 rounded bg-zinc-200 p-2 font-mono text-zinc-900 outline-0 focus-visible:outline-2 dark:bg-zinc-800 dark:text-zinc-50'
      ></textarea>
      <div ref={editor}></div>
      <button
        type='submit'
        className='cursor-pointer rounded bg-zinc-800 p-4 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900'
      >
        Edit Snippet
      </button>
    </form>
  );
}
