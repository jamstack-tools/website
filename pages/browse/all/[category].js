import gql from 'graphql-tag';
import {
  gqlStaticPaths,
  gqlStaticProps,
  request,
  seoMetaTagsFields,
} from 'lib/datocms';
import SmartMarkdown from 'components/SmartMarkdown';
import DocsLayout from 'components/DocsLayout';
import Sidebar from 'pages/browse/Sidebar';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';
import { renderMetaTags } from 'react-datocms';

export const getStaticPaths = gqlStaticPaths(
  gql`
    query CatQuery {
      categories: allCategories(first: 100) {
        slug
      }
    }
  `,
  'category',
  ({ categories }) => categories.map((p) => p.slug),
);

export const getStaticProps = gqlStaticProps(
  gql`
    query ToolByCategoryQuery($category: ItemId!) {
      tools: allTools(filter: { category: { eq: $category } }) {
        name
        slug
        description
        category {
          name
          slug
          h1
          subtitle
          color {
            hex
          }
          seoKeywords
          schema
          seo: _seoMetaTags {
            ...seoMetaTagsFields
          }
        }
      }
    }
    ${seoMetaTagsFields}
  `,

  async ({ category }) => {
    const { data } = await request({
      query: gql`
        {
          category(filter: { slug: { eq: ${category} } }) {
            id
          }
        }
      `,
    });

    // if category is non existant use random id
    return { category: (data.category && data.category.id) || '111' };
  },
);

export default function Cat({ tools }) {
  const category = tools[0] && tools[0].category;
  const categorySlug = (category && category.slug) || 'unknown-category';

  return (
    <DocsLayout sidebar={<Sidebar title="Tools" entries={tools} />}>
      <Head>
        {renderMetaTags(category.seo)}
        {category.seoKeywords && (
          <meta name="keywords" content={category.seoKeywords} />
        )}
        {category.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(category.schema),
            }}
          />
        )}
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          {category.subtitle && (
            <h2 className={s.overTitle}>{category.subtitle}</h2>
          )}
          <h1 className={s.title}>{category.h1 || category.name}</h1>

          <div className={s.cards}>
            {tools.map((tool) => (
              <a
                href={`/browse/tools/${tool.slug}`}
                key={tool.slug}
                className={s.card}
              >
                <Tags />
                <h6 className={s.cardTitle}>{tool.name}</h6>
                <div className={s.absoluteButton}>
                  <LikeButton
                    id={tool.slug}
                    namespace={categorySlug}
                    component={LikeButton.templates.Twitter}
                  />
                </div>
                <Tags />
                <div className={s.cardDescription}>
                  <SmartMarkdown>
                    {truncate(tool.description || '', {
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
