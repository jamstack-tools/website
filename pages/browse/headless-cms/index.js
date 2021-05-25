import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import { renderMetaTags } from 'react-datocms';
import SmartMarkdown from 'components/SmartMarkdown';
import Sidebar from 'pages/browse/Sidebar';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';
import { rankLikeButtonsByNamespace } from 'lib/lyket';

const lyketNamespace = 'cms';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      page: cmsPage {
        seoKeywords
        schema
        h1
        h2
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
      cmss: allCmsHeadlesses(first: 100) {
        name
        slug
        description(markdown: true)
        cmsType
      }
    }
    ${seoMetaTagsFields}
  `,
  () => {},
  async (data, { params }) => {
    const buttons = await rankLikeButtonsByNamespace({
      namespace: lyketNamespace,
    });

    const sorted = buttons.data.map((button) =>
      data.cmss.find((t) => t.slug === button.id),
    );

    return { ...data, cmss: [...sorted], buttons };
  },
);

export default function Cms({ cmss, page }) {
  return (
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
      <Head>
        {page.seo && renderMetaTags(page.seo)}
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
          <h2 className={s.overTitle}>{page.h2}</h2>
          <h1 className={s.title}>{page.h1}</h1>
          <div className={s.cards}>
            {cmss.map((cms) => (
              <a
                href={`/browse/headless-cms/${cms.slug}`}
                key={cms.slug}
                className={s.card}
              >
                <div>
                  <h6 className={s.cardTitle}>{cms.name}</h6>
                  <div className={s.absoluteButton}>
                    <LikeButton
                      id={cms.slug}
                      namespace={lyketNamespace}
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
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
