import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import Wrapper from 'components/Wrapper';
import PostContent from 'components/PostContent';
import InterstitialTitle from 'components/InterstitialTitle';
import Head from 'next/head';
import Sidebar from 'pages/browse/Sidebar';
import { useRouter } from 'next/router';
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';

export const getStaticPaths = gqlStaticPaths(
  gql`
    query {
      posts: allCmsHeadlesses(first: 100) {
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
        url
      }
    }
  `,
);

export default function Cms({ cms }) {
  const { isFallback } = useRouter();

  return (
    <DocsLayout sidebar={<Sidebar />}>
      <Head>
        <title>{cms.name}</title>
      </Head>
      <InterstitialTitle kicker="Generator">{cms.name}</InterstitialTitle>
      <Tags url={cms.url}>
        <LikeButton
          id={cms.slug}
          namespace="cms"
          component={LikeButton.templates.Twitter}
        />
      </Tags>
      <Wrapper>
        <PostContent isFallback={isFallback} content={cms} />
      </Wrapper>
    </DocsLayout>
  );
}
