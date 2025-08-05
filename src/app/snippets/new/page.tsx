export default function SnippetCreatePage() {
  return (
    <form action='' className='m-4 flex flex-col gap-4 rounded bg-zinc-100 p-4 dark:bg-zinc-900'>
      <h3 className='text-2xl font-bold'>Create a Snippet</h3>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        id='title'
        className='rounded bg-zinc-200 p-2 text-zinc-900'
      />
      <label htmlFor='code'>Code</label>
      <textarea name='code' id='code' className='rounded bg-zinc-200 p-2 text-zinc-900'></textarea>
    </form>
  );
}
