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

export const getStaticProps = gqlStaticProps(
  gql`
    {
      page: generatorsPage {
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
          <h1 className={s.title}>SSG -Static Site Generators</h1>

          <div className={s.cards}>
            {generators.map((generator) => (
              <a
                href={`/browse/generators/${generator.slug}`}
                key={generator.slug}
                className={s.card}
              >
                <h6 className={s.cardTitle}>{generator.name}</h6>
                <div className={s.absoluteButton}>
                  <LikeButton
                    id={generator.slug}
                    namespace="generators"
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
