import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps, request } from 'lib/datocms';
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
          color {
            hex
          }
          seo: _seoMetaTags {
            attributes
            content
            tag
          }
        }
      }
    }
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

  return (
    <DocsLayout sidebar={<Sidebar title="Tools" entries={tools} />}>
      <Head>{category && renderMetaTags(category.seo)}</Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>{category && category.name} tools</div>

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
                    namespace={
                      (category && category.slug) || 'unknown-category'
                    }
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
