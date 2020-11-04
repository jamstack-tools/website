import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import PostContent from 'components/PostContent';
import InterstitialTitle from 'components/InterstitialTitle';
import { useRouter } from 'next/router';
// import Head from 'next/head';
// import s from './style.module.css';
// import { Line, Copy, Rect } from 'components/FakeContent';

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
    query ArticleQuery($slug: String!) {
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
    <Layout preview={preview}>
      <InterstitialTitle kicker="Headless CMS" style="two">
        {cms.name}
      </InterstitialTitle>
      <Wrapper>
        <PostContent isFallback={isFallback} content={cms} />
      </Wrapper>
    </Layout>
  );
}
