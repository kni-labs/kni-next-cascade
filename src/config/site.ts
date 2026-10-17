const url = new URL(process.env.SITE_URL || 'http://localhost:3000');

export const site = {
  name: 'kni-next-cascade',
  description:
    'A shared foundation. A fresh starting point. Next.js powered by kni-cascade.',
  url,
  indexable:
    process.env.SITE_INDEXABLE === 'true' &&
    !['localhost', '127.0.0.1'].includes(url.hostname),
  navigation: [
    { href: '/', label: 'Overview' },
    { href: '/showcase', label: 'Showcase' },
  ],
};
