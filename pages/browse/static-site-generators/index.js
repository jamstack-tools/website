import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import { renderMetaTags } from 'react-datocms';
import Sidebar from 'pages/browse/Sidebar';
import SmartMarkdown from 'components/SmartMarkdown';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';
import { rankLikeButtonsByNamespace } from 'lib/lyket';

const lyketNamespace = 'generators';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      page: generatorsPage {
        h1
        h2
        seoKeywords
        schema
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
      generators: allGenerators(first: 100) {
        name
        slug
        description(markdown: true)
        language
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
      data.generators.find((t) => t.slug === button.id),
    );

    return { ...data, generators: sorted, buttons };
  },
);

export default function Generators({ generators, page }) {
  return (
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
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
          <h2 className={s.overTitle}>{page.h2}</h2>
          <h1 className={s.title}>{page.h1}</h1>
          <div className={s.cards}>
            {generators.map((generator) => (
              <a
                href={`/browse/static-site-generators/${generator.slug}`}
                key={generator.slug}
                className={s.card}
              >
                <h6 className={s.cardTitle}>{generator.name}</h6>
                <div className={s.absoluteButton}>
                  <LikeButton
                    id={generator.slug}
                    namespace={lyketNamespace}
                    component={LikeButton.templates.Twitter}
                  />
                </div>
                <Tags tags={[['Language', generator.language]]} />
                <div className={s.cardDescription}>
                  <SmartMarkdown>
                    {truncate(generator.description, {
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
