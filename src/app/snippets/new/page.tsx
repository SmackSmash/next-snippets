export default function SnippetCreatePage() {
  return (
    <form action='' className='m-4 flex flex-col gap-4 rounded bg-zinc-100 p-4 dark:bg-zinc-900'>
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
    </form>
  );
}
