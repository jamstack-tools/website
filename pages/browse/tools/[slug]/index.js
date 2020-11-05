import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import Wrapper from 'components/Wrapper';
import PostContent from 'components/PostContent';
import InterstitialTitle from 'components/InterstitialTitle';
import Head from 'next/head';
import Sidebar from 'pages/browse/Sidebar';
import { useRouter } from 'next/router';
import s from 'pages/browse/pageStyle.module.css';

export const getStaticPaths = gqlStaticPaths(
  gql`
    query {
      tools: allTools(first: 10) {
        slug
      }
    }
  `,
  'slug',
  ({ tools }) => tools.map((p) => p.slug),
);

export const getStaticProps = gqlStaticProps(
  gql`
    query ToolsQuery($slug: String!) {
      tool: tool(filter: { slug: { eq: $slug } }) {
        name
        url
        pricing
        category {
          name
          color {
            hex
          }
        }
        text(markdown: true)
      }
    }
  `,
);

export default function Tool({ tool, preview }) {
  const { isFallback } = useRouter();

  if (!tool) {
    return (
      <DocsLayout sidebar={<Sidebar />}>
        <div className={s.articleContainer}>
          <div className={s.article}>
            <div className={s.title}>Not found</div>
          </div>
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout sidebar={<Sidebar />}>
      <Head>
        <title>{tool.name}</title>
      </Head>
      <InterstitialTitle
        kicker={`Tool / ${tool.category && tool.category.name}`}
      >
        {tool.name}
      </InterstitialTitle>
      <Wrapper>
        <PostContent isFallback={isFallback} content={tool} />
      </Wrapper>
    </DocsLayout>
  );
}
