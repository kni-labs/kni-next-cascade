import type { Metadata } from 'next';
import { ActionLink } from '@/components/ActionLink';
import styles from './page.module.scss';

export const metadata: Metadata = { alternates: { canonical: '/' } };
const foundations = [
  {
    number: '01',
    title: 'A familiar foundation',
    text: 'Shared typography, fluid dimensions, and useful utilities. Start with kni-cascade, then make it yours.',
  },
  {
    number: '02',
    title: 'A modern canvas',
    text: 'App Router, TypeScript, and Server Components. Native Sass support, without another build system.',
  },
  {
    number: '03',
    title: 'Room to build',
    text: 'Your styles belong to your project. Choose a CMS, add motion, and shape the experience when you need it.',
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> A KNI starting point
          </p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Shared roots.
            <br />
            <span>Fresh possibilities.</span>
          </h1>
          <p className={styles.lead}>
            A lean Next.js foundation with kni-cascade. The essentials are
            connected. The rest is yours to create.
          </p>
          <div className={styles.actions}>
            <ActionLink href="/showcase">
              Explore the showcase <span aria-hidden="true">↗</span>
            </ActionLink>
            <ActionLink
              href="https://github.com/kni-labs/kni-next-cascade"
              variant="outline"
            >
              View source
            </ActionLink>
          </div>
        </div>
        <aside className={styles.card} aria-label="Included foundations">
          <div className={styles.cardTop}>
            <span>THE FOUNDATION</span>
            <span aria-hidden="true">↘</span>
          </div>
          <div className={styles.layers}>
            <span>Next.js</span>
            <span>kni-cascade</span>
            <span>Your next idea.</span>
          </div>
          <p>
            Seed once.
            <br />
            Build freely.
          </p>
          <div className={styles.cardBottom}>
            One shared language. Your own expression.
          </div>
        </aside>
      </section>
      <section className={styles.foundations} aria-label="What is included">
        {foundations.map((item) => (
          <article key={item.number}>
            <span className={styles.number}>{item.number}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className={styles.nextStep}>
        <div>
          <p className={styles.eyebrow}>Ready when you are</p>
          <h2>
            Less setup.
            <br />
            More making.
          </h2>
          <p>
            Set your project details, match the typography to your design, and
            start building.
          </p>
        </div>
        <pre aria-label="Development commands">
          <code>{`npm install
npm run dev`}</code>
        </pre>
      </section>
    </div>
  );
}
