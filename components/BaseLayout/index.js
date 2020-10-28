import Head from 'next/head';
import s from './style.module.css';
import { useRouter } from 'next/router';
import NProgress from 'components/NProgress';

export default function Layout({ preview, children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/colfax-web-700.woff2" />
        <link rel="preload" href="/fonts/colfax-web-bold.woff2" />
        <link rel="preload" href="/fonts/tiempos-text-web-regular.woff2" />
        <link rel="preload" href="/fonts/tiempos-headline-web-semibold.woff2" />
        <link rel="preload" href="/fonts/colfax-web-regular.woff2" />
        <meta
          name="google-site-verification"
          content="wfOsq57h3qCQUTbHcX-4qEEY07vgi4KgH9rdT1ywwwc"
        />
        {[16, 32, 96, 192].map((size) => (
          <link
            rel="icon"
            sizes="16x16"
            href={`https://www.datocms-assets.com/205/1525789775-dato.png?w=${size}&amp;h=${size}`}
            type="image/png"
            key={size}
          />
        ))}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="DatoCMS Blog"
          href="/blog.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="DatoCMS Product Changelog"
          href="/product-changelog.xml"
        />
      </Head>
      <NProgress />
      {preview && (
        <a
          href={`/api/preview/stop?page=${router.asPath}`}
          className={s.preview}
        >
          Exit preview mode
        </a>
      )}
      <div className={s.root}>{children}</div>

      <div
        className={s.overlay}
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          transition: 'all 0.25s ease-in-out',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2000,
        }}
      />
    </>
  );
}
