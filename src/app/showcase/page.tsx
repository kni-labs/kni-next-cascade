import type { Metadata } from 'next';
import { ActionLink } from '@/components/ActionLink';
import styles from './showcase.module.scss';

export const metadata: Metadata = {
  title: 'Showcase',
  description:
    'Typography, fluid spacing, and component examples built on kni-cascade.',
  alternates: { canonical: '/showcase' },
};

export default function Showcase() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>A living starting point</p>
        <h1>See the foundation.</h1>
        <p>
          Real examples, using the SCSS seeded into your project. Resize the
          browser to explore fluid type and spacing.
        </p>
      </header>
      <section className={styles.section} aria-labelledby="type-title">
        <div>
          <span className={styles.eyebrow}>01 / Typography</span>
          <h2 id="type-title">A shared type scale</h2>
          <p>
            Edit the mobile and desktop values in your project’s{' '}
            <code>00-sass/_variables.scss</code>.
          </p>
        </div>
        <div className={styles.samples}>
          <div>
            <code>heading--xl</code>
            <h3 className="heading--xl">Ideas take shape.</h3>
          </div>
          <div>
            <code>heading--m</code>
            <h3 className="heading--m">A little structure goes a long way.</h3>
          </div>
          <div>
            <code>body--l</code>
            <p className="body--l">
              Good foundations leave room for the unexpected. Set your shared
              defaults, then follow the idea wherever it leads.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="actions-title">
        <div>
          <span className={styles.eyebrow}>02 / Components</span>
          <h2 id="actions-title">Make it your own</h2>
          <p>
            These project-level link styles demonstrate extension without
            depending on unreleased kni-cascade components.
          </p>
        </div>
        <div className={styles.actions}>
          <ActionLink href="/">Back to overview</ActionLink>
          <ActionLink
            href="https://github.com/kni-labs/kni-cascade"
            variant="outline"
          >
            Explore kni-cascade
          </ActionLink>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="spacing-title">
        <div>
          <span className={styles.eyebrow}>03 / Scaling</span>
          <h2 id="spacing-title">One fluid unit</h2>
          <p>
            The card uses <code>pxv</code> for its padding and radius. PostCSS
            turns those values into the shared responsive unit.
          </p>
        </div>
        <div className={styles.fluidCard}>
          <span>Room to breathe.</span>
          <p>Spacing follows the composition.</p>
          <pre>
            <code>{`.card {
  padding: 32pxv;
  border-radius: 12pxv;
}`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
