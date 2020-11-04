import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
// import { Image, renderMetaTags } from 'react-datocms';
// import FormattedDate from 'components/FormattedDate';
import InterstitialTitle from 'components/InterstitialTitle';
// import Head from 'next/head';
// import s from './style.module.css';
// import { Line, Copy, Rect } from 'components/FakeContent';
// import { useRouter } from 'next/router';

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
      }
    }
  `,
);

export default function Cms({ cms, preview }) {
  return (
    <Layout preview={preview}>
      <InterstitialTitle kicker="Tool" style="two">
        {cms.name}
      </InterstitialTitle>
      <Wrapper>
        <div> {cms.name} </div>
      </Wrapper>
    </Layout>
  );
}
