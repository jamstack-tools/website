import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import SmartMarkdown from 'components/SmartMarkdown';
import Sidebar from 'pages/browse/Sidebar';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      cmss: allCmsHeadlesses(first: 100) {
        name
        slug
        description(markdown: true)
        cmsType
      }
    }
  `,
);

export default function Cms({ cmss }) {
  return (
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
      <Head>
        <title>JAMStack tools - Choose a headless CMSs</title>
        <meta
          property="og:description"
          content="Need to choose a headless CMS? Browse our registry and find the perfect match!"
          key="description"
        />
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <h1 className={s.title}>Headless CMSs</h1>

          <div className={s.cards}>
            {cmss.map((cms) => (
              <a
                href={`/browse/headless-cms/${cms.slug}`}
                key={cms.slug}
                className={s.card}
              >
                <h6 className={s.cardTitle}>{cms.name}</h6>
                <div className={s.absoluteButton}>
                  <LikeButton
                    id={cms.slug}
                    namespace="cms"
                    component={LikeButton.templates.Twitter}
                  />
                </div>
                <Tags />
                <div className={s.cardDescription}>
                  <SmartMarkdown>
                    {truncate(cms.description, {
                      TruncateBy: 'words',
                      TruncateLength: 20,
                    })}
                  </SmartMarkdown>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
