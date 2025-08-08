'use client';

import { type Snippet } from '@/generated/prisma';
import { useEffect, useRef, useState } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNightStorm } from '@fsegurai/codemirror-theme-tokyo-night-storm';
import { editSnippet } from '@/actions';

type EditSnippetFormProps = {
  snippet: Snippet;
};

export default function EditSnippetForm({ snippet: { id, title, code } }: EditSnippetFormProps) {
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

  // Bind to assign 'id' as first arguiment of edit snippet function
  // Allows us to use server action as form action with no react faffing
  // Here, the formData is only supplying the title, id is pulled from
  // params and editorCode is pulled from state
  const editSnippetAction = editSnippet.bind(null, id, editorCode);

  return (
    <form action={editSnippetAction} className='flex flex-col gap-4'>
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
