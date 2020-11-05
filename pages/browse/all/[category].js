import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps, request } from 'lib/datocms';
import SmartMarkdown from 'components/SmartMarkdown';
import DocsLayout from 'components/DocsLayout';
import Sidebar from 'pages/browse/Sidebar';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import Anchor from 'public/icons/regular/link.svg';

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
  return (
    <DocsLayout sidebar={<Sidebar title="Tools" entries={tools} />}>
      <Head>
        <title>{tools[0] && tools[0].category.name} JAMstack tools</title>
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>
            {tools[0] && tools[0].category.name} tools
          </div>

          <div className={s.tutorials}>
            {tools.map((tool) => (
              <a
                href={`/browse/tools/${tool.slug}`}
                key={tool.slug}
                className={s.tutorial}
              >
                <h6 className={s.tutorialTitle}>
                  {tool.name} <Anchor />
                </h6>
                <div className={s.tutorialDescription}>
                  <SmartMarkdown>{tool.description || ''}</SmartMarkdown>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}