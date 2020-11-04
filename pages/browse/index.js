import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import s from './style.module.css';
import { renderMetaTags } from 'react-datocms';

import docHref from 'utils/docHref';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: browsePage {
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
      roots: allTools {
        name
        slug
      }
    }
    ${seoMetaTagsFields}
  `,
);

const normalize = (slug) => (slug === 'index' ? '' : `/${slug}`);

const Sidebar = ({ roots }) => (
  <>
    {roots.map((root) => (
      <div className={s.group} key={root.slug}>
        <Link
          href={docHref(`/browse/${root.slug}`)}
          as={`/browse/${root.slug}`}
          key={root.slug}
        >
          <a className={s.groupName}>{root.name}</a>
        </Link>
      </div>
    ))}
  </>
);

export default function Docs({ roots, preview, page }) {
  return (
    <DocsLayout preview={preview} sidebar={<Sidebar roots={roots} />}>
      <Head>{page && renderMetaTags(page.seo)}</Head>
      <div className={s.container}>
        <h2 className={s.title}>Browse our toolkit!</h2>
        <p className={s.subtitle}>
          Here you can search into our directories to find the perfect stack for
          your project
        </p>

        <h6 className={s.introTitle}>The basics</h6>
        <div className={s.useCaseCards}>
          <Link
            href={docHref('/browse/headless-cms')}
            as="/browse/headless-cms"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Headless CMSs</div>
              <p>Choose an headless CMS.</p>
            </a>
          </Link>
          <Link href={docHref('/browse/generators')} as="/browse/generators">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Static site generator</div>
              <p>Choose a generator</p>
            </a>
          </Link>
        </div>

        <h6 className={s.introTitle}>Toolkit by category</h6>
        <div className={s.useCaseCards}>
          <Link
            href={docHref('/browse/tools/feedback')}
            as="/browse/tools/feedback"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Feedback tools</div>
              <p>
                Do you want to receive feedback? Choose one of theses amazing
                tools
              </p>
            </a>
          </Link>
          <Link href={docHref('/browse/tools/forms')} as="/browse/tools/forms">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Forms</div>
              <p>Here are the top notch form tools </p>
            </a>
          </Link>
          <Link
            href={docHref('/browse/tools/payment')}
            as="/browse/tools/payment"
          >
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
