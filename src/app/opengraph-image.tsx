import { ImageResponse } from 'next/og';
import { site } from '@/config/site';
export const alt = 'kni-next-cascade — shared roots, fresh possibilities.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#faf9f6',
        color: '#202a29',
        width: '100%',
        height: '100%',
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'sans-serif',
      }}
    >
      <span style={{ fontSize: 28 }}>{site.name}</span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 86,
          letterSpacing: -5,
          lineHeight: 1.05,
        }}
      >
        <span>Shared roots.</span>
        <span style={{ color: '#943d32' }}>Fresh possibilities.</span>
      </div>
      <span style={{ fontSize: 24 }}>Next.js + kni-cascade</span>
    </div>,
    size,
  );
}
