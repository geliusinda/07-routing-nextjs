import SidebarNotes from '../default';

export default async function SidebarPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <SidebarNotes selected={slug[0]} />;
}
