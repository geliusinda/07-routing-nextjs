import Link from 'next/link';
import { noteTags } from '@/types/note';
import css from './SidebarNotes.module.css';

export default async function SidebarNotes({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const selected = slug?.[0];
  return (
    <nav aria-label="Filter notes">
      <ul className={css.menuList}>
        {['all', ...noteTags].map((filter) => (
          <li className={css.menuItem} key={filter}>
            <Link
              className={css.menuLink}
              href={`/notes/filter/${filter}`}
              aria-current={selected === filter ? 'page' : undefined}
            >
              {filter === 'all' ? 'All notes' : filter}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
