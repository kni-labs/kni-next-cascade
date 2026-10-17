import Link from 'next/link';
import type { ComponentProps } from 'react';
import styles from './ActionLink.module.scss';

type Props = ComponentProps<typeof Link> & { variant?: 'filled' | 'outline' };

// Project-level example, not a copy of kni-cascade's unreleased button component.
export function ActionLink({
  variant = 'filled',
  className = '',
  ...props
}: Props) {
  return (
    <Link
      className={`${styles.action} ${variant === 'outline' ? styles.outline : ''} ${className}`}
      {...props}
    />
  );
}
