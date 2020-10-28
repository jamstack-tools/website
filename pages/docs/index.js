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
      page: docsPage {
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
      roots: allDocPages {
        title
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
          href={docHref(`/docs/${root.slug}`)}
          as={`/docs/${root.slug}`}
          key={root.slug}
        >
          <a className={s.groupName}>{root.title}</a>
        </Link>
      </div>
    ))}
  </>
);

export default function Docs({ roots, preview, page }) {
  return (
    <DocsLayout preview={preview} sidebar={<Sidebar roots={roots} />}>
      <Head>{renderMetaTags(page.seo)}</Head>
      <div className={s.container}>
        <h2 className={s.title}>Documentation</h2>
        <p className={s.subtitle}>
          Whether you’re a startup or a global enterprise, learn how to
          integrate with DatoCMS to manage your content in a centralized,
          structured hub.
        </p>

        <h6 className={s.introTitle}>Start with your use case</h6>
        <div className={s.useCaseCards}>
          <Link
            href={docHref('/docs/general-concepts')}
            as="/docs/general-concepts"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Getting started</div>
              <p>Learn all the basic concepts and features behind DatoCMS.</p>
            </a>
          </Link>
          <Link
            href={docHref('/docs/content-modelling')}
            as="/docs/content-modelling"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Model your schema</div>
              <p>
                Build your administrative area and define the structure of your
                content.
              </p>
            </a>
          </Link>
          <Link
            href={docHref('/docs/content-delivery-api')}
            as="/docs/content-delivery-api"
          >
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>GraphQL API</div>
              <p>Learn how to fetch your content into any frontend project.</p>
            </a>
          </Link>
        </div>

        <h6 className={s.introTitle}>Popular integrations</h6>
        <div className={s.useCaseCards}>
          <Link href={docHref('/docs/next-js')} as="/docs/next-js">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Next.js</div>
              <p>Learn how to integrate your Next.js website with DatoCMS</p>
            </a>
          </Link>
          <Link href={docHref('/docs/gatsby')} as="/docs/gatsby">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Gatsby</div>
              <p>Learn how to integrate your Gatsby website with DatoCMS</p>
            </a>
          </Link>
          <Link href={docHref('/docs/hugo')} as="/docs/hugo">
            <a className={s.useCaseCard}>
              <div className={s.useCaseCardTitle}>Hugo</div>
              <p>Learn how to integrate your Hugo website with DatoCMS</p>
            </a>
          </Link>
        </div>
      </div>
    </DocsLayout>
  );
}
