import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import gql from 'graphql-tag';
import InterstitialTitle from 'components/InterstitialTitle';
import PostContent from 'components/PostContent';
import { useRouter } from 'next/router';

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
        text(markdown: true)
      }
    }
  `,
);

export default function Tool({ tool, preview }) {
  const { isFallback } = useRouter();

  return (
    <Layout preview={preview}>
      <InterstitialTitle kicker="Tool" style="two">
        {tool.name}
      </InterstitialTitle>
      <Wrapper>
        <PostContent isFallback={isFallback} content={tool} />
      </Wrapper>
    </Layout>
  );
}
