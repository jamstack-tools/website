import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import s from './style.module.css';
import { renderMetaTags } from 'react-datocms';
import Sidebar from 'pages/browse/Sidebar';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: browsePage {
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
    }
    ${seoMetaTagsFields}
  `,
);

export default function Docs({ preview, page }) {
  return (
    <DocsLayout preview={preview} sidebar={<Sidebar />}>
      <Head>{page && renderMetaTags(page.seo)}</Head>
      <div className={s.container}>
        <h2 className={s.title}>Browse our toolkit!</h2>
        <p className={s.subtitle}>
          Here you can search into our directories to find the perfect stack for
          your project
        </p>

        <h6 className={s.introTitle}>The basics</h6>
        <div className={s.useCaseCards}>
          <Link href={'/browse/headless-cms'} as="/browse/headless-cms">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Headless CMSs</div>
              <p>Choose an headless CMS.</p>
            </a>
          </Link>
          <Link href={'/browse/generators'} as="/browse/generators">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Static site generator</div>
              <p>Choose a generator</p>
            </a>
          </Link>
        </div>

        <h6 className={s.introTitle}>Toolkit by category</h6>
        <div className={s.useCaseCards}>
          <Link href={'/browse/all/feedback'} as="/browse/all/feedback">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Feedback tools</div>
              <p>
                Do you want to receive feedback? Choose one of theses amazing
                tools
              </p>
            </a>
          </Link>
          <Link href={'/browse/all/forms'} as="/browse/all/forms">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Forms</div>
              <p>Here are the top notch form tools </p>
            </a>
          </Link>
          <Link href={'/browse/all/payment'} as="/browse/all/payment">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Payment</div>
              <p>For any e-commerce out there!</p>
            </a>
          </Link>
        </div>
      </div>
    </DocsLayout>
  );
}
