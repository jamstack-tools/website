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
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';
import { renderMetaTags } from 'react-datocms';

export const getStaticPaths = gqlStaticPaths(
  gql`
    query {
      tools: allTools(first: 100) {
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
        slug
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
  const category = tool.category;

  return (
    <DocsLayout sidebar={<Sidebar />}>
      <Head>
        <title>
          The best {category.name} tools - {tool.name}
        </title>
        <meta name="description" content={tool.description} />
        <meta
          name="title"
          content={`The best ${category.name} tools - ${tool.name}`}
        />
      </Head>
      <InterstitialTitle kicker={`Tool / ${category && category.name}`}>
        {tool.name}
      </InterstitialTitle>
      <Tags tags={[['Type', category.name]]} url={tool.url}>
        <LikeButton
          id={tool.slug}
          namespace={category.slug}
          component={LikeButton.templates.Twitter}
        />
      </Tags>
      <Wrapper>
        <PostContent isFallback={isFallback} content={tool} />
      </Wrapper>
    </DocsLayout>
  );
}
