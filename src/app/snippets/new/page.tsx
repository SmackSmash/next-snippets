'use client';

import { type FormEvent, startTransition, useActionState } from 'react';
import { createSnippet } from '@/actions';

export default function CreateSnippetPage() {
  // useActionState can allow us to communicate back from the server
  // function to the component in a way that does not require js
  // Basically it's PHP, but don't tell anyone I said that
  const [state, action, pending] = useActionState(createSnippet, {
    message: ''
  });

  // React 19 automatically clears forms on submit so we need
  // to use the more verbose old react method for sumbitting
  // data to the server action
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form
      // NB. Not using form action as is recommended by NextJS
      // Instead using traditional react method for handling
      // using onSubmit event
      onSubmit={e => handleSubmit(e)}
      className='flex flex-col gap-4'
    >
      <h3 className='text-2xl font-bold'>Create a Snippet</h3>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        id='title'
        className='rounded bg-zinc-200 p-2 text-zinc-900 outline-0 focus-visible:outline-2 dark:bg-zinc-800 dark:text-zinc-50'
      />
      <label htmlFor='code'>Code</label>
      <textarea
        name='code'
        id='code'
        className='min-h-64 rounded bg-zinc-200 p-2 font-mono text-zinc-900 outline-0 focus-visible:outline-2 dark:bg-zinc-800 dark:text-zinc-50'
      ></textarea>
      {pending
        ? 'Loading...'
        : state.message && <div className='text-red-500'>{state.message}</div>}
      <button
        type='submit'
        className='cursor-pointer rounded bg-zinc-800 p-4 text-zinc-50 dark:bg-zinc-200 dark:text-zinc-900'
      >
        Add Snippet
      </button>
    </form>
  );
}
