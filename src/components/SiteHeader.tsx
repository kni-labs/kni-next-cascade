import Link from 'next/link';
import { site } from '@/config/site';
import styles from './SiteHeader.module.scss';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label={`${site.name} home`}>
        <span className={styles.mark} aria-hidden="true">
          k.
        </span>
        {site.name}
      </Link>
      <nav className={styles.desktopNav} aria-label="Main navigation">
        {site.navigation.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <details className={styles.mobileNav}>
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {site.navigation.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
