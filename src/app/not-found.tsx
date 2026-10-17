import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ maxWidth: '70ch', margin: '80px auto', padding: '24px' }}>
      <p>404</p>
      <h1 className="heading--xl">A little off the path.</h1>
      <p className="body--l">
        We couldn’t find that page. Let’s get you back to the beginning.
      </p>
      <Link href="/">Back to overview</Link>
    </section>
  );
}
