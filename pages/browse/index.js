import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import s from './pageStyle.module.css';
import { renderMetaTags } from 'react-datocms';
import Sidebar from 'pages/browse/Sidebar';
import { categories } from 'lib/categories';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: browsePage {
        title
        seoKeywords
        schema
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
      <Head>
        {renderMetaTags(page.seo)}
        <meta name="keywords" content={page.seoKeywords} />
        {page.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
          />
        )}
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <h2 className={s.title}>{page.title}</h2>
          <p className={s.subtitle}>
            Here you can search into our directories to find the perfect stack
            for your project
          </p>

          <h6 className={s.browseTitle}>The basics</h6>
          <div className={s.cards}>
            <Link href={'/browse/headless-cms'} as="/browse/headless-cms">
              <a className={s.card}>
                <div className={s.cardTitle}>Headless CMSs</div>
                <p>Choose an headless CMS.</p>
              </a>
            </Link>
            <Link
              href={'/browse/static-site-generators'}
              as="/browse/static-site-generators"
            >
              <a className={s.card}>
                <div className={s.cardTitle}>Static site generator</div>
                <p>Choose a generator</p>
              </a>
            </Link>
          </div>

          <h6 className={s.browseTitle}>Toolkit by category</h6>
          <div className={s.cards}>
            {categories.map((category) => (
              <Link href={category.slug} as={category.slug} key={category.slug}>
                <a className={s.card}>
                  <h5 className={s.cardTitle}>{category.name}</h5>
                  <p>{category.description}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
