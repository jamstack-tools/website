import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import Wrapper from 'components/Wrapper';
import PostContent from 'components/PostContent';
import InterstitialTitle from 'components/InterstitialTitle';
import Head from 'next/head';
import Sidebar from 'pages/browse/Sidebar';
import { useRouter } from 'next/router';

export const getStaticPaths = gqlStaticPaths(
  gql`
    query {
      posts: allCmsHeadlesses(first: 10) {
        slug
      }
    }
  `,
  'slug',
  ({ posts }) => posts.map((p) => p.slug),
);

export const getStaticProps = gqlStaticProps(
  gql`
    query CmsQuery($slug: String!) {
      cms: cmsHeadless(filter: { slug: { eq: $slug } }) {
        name
        slug
        text
      }
    }
  `,
);

export default function Cms({ cms, preview }) {
  const { isFallback } = useRouter();

  return (
    <DocsLayout sidebar={<Sidebar />}>
      <Head>
        <title>{cms.name}</title>
      </Head>
      <InterstitialTitle kicker="Generator">{cms.name}</InterstitialTitle>
      <Wrapper>
        <PostContent isFallback={isFallback} content={cms} />
      </Wrapper>
    </DocsLayout>
  );
}
