import Link from 'next/link';
import { site } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/">{site.name}</Link>
      <p>Built on shared foundations. Made for your next idea.</p>
      <a href="https://github.com/kni-labs/kni-cascade">kni-cascade ↗</a>
    </footer>
  );
}
