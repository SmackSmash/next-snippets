type EditSnippetPageProps = {
  params: Promise<{ id: number }>;
};

export default async function EditSnippetPage({ params }: EditSnippetPageProps) {
  const { id } = await params;

  return <div>Edit page for snippet {id}!</div>;
}
