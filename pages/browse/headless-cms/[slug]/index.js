import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import {
  gqlStaticPaths,
  gqlStaticProps,
  imageFields,
  seoMetaTagsFields,
} from 'lib/datocms';
import { Image, renderMetaTags } from 'react-datocms';
import FormattedDate from 'components/FormattedDate';
import gql from 'graphql-tag';
import InterstitialTitle from 'components/InterstitialTitle';
import PostContent from 'components/PostContent';
import Head from 'next/head';
import s from './style.module.css';
import { Line, Copy, Rect } from 'components/FakeContent';
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
    query ArticleQuery($slug: String!) {
      post: cmsHeadless(filter: { slug: { eq: $slug } }) {
        name
      }
    }
  `,
);

export default function Article({ post, preview }) {
  return (
    <Layout preview={preview}>
      <InterstitialTitle kicker="The DatoCMS Blog" style="two">
        {post.name}
      </InterstitialTitle>
      <Wrapper>
        <div> {post.name} </div>
      </Wrapper>
    </Layout>
  );
}
