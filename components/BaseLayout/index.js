import Head from 'next/head';
import s from './style.module.css';
import { useRouter } from 'next/router';
import NProgress from 'components/NProgress';

export default function Layout({ preview, children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/Raleway-SemiBold.ttf" />
        <link rel="preload" href="/fonts/Raleway-Bold.ttf" />
        <link rel="preload" href="/fonts/Raleway-Medium.ttf" />
        <link rel="preload" href="/fonts/Vollkorn-SemiBold.ttf" />
        <link rel="preload" href="/fonts/Vollkorn-Regular.ttf" />
        {[16, 32, 96, 192].map((size) => (
          <link
            rel="icon"
            sizes="16x16"
            href={`https://www.datocms-assets.com/36744/1605179339-logo.png?w=${size}&amp;h=${size}`}
            type="image/png"
            key={size}
          />
        ))}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CLEE5S149Y"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CLEE5S149Y');`,
          }}
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
