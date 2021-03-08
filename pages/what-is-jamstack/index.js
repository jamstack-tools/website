import Layout from 'components/Layout';
import InterstitialTitle from 'components/InterstitialTitle';
import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import gql from 'graphql-tag';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import Space from 'components/Space';
import SmartMarkdown from 'components/SmartMarkdown';

import styles from '../style.module.css';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: jamstackPage {
        h1
        h2
        seoKeywords
        schema
        text(markdown: true)
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
    }
    ${seoMetaTagsFields}
  `,
);

function JamstackPage({ preview, page }) {
  return (
    <Layout preview={preview}>
      <div className={styles.pageBg}>
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
        <InterstitialTitle kicker={page.h2}>{page.h1}</InterstitialTitle>
        <Space top={3}>
          <div className={styles.mdText}>
            <SmartMarkdown>{page.text || ''}</SmartMarkdown>
          </div>
        </Space>
      </div>
    </Layout>
  );
}

export default JamstackPage;
