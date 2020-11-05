import gql from 'graphql-tag';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import Wrapper from 'components/Wrapper';
import PostContent from 'components/PostContent';
import InterstitialTitle from 'components/InterstitialTitle';
import Head from 'next/head';
import Sidebar from 'pages/browse/Sidebar';
import { useRouter } from 'next/router';

// import { Image, renderMetaTags } from 'react-datocms';
// import FormattedDate from 'components/FormattedDate';
// import s from './style.module.css';
// import { Line, Copy, Rect } from 'components/FakeContent';

export const getStaticPaths = gqlStaticPaths(
  gql`
    query {
      posts: allGenerators(first: 10) {
        slug
      }
    }
  `,
  'slug',
  ({ posts }) => posts.map((p) => p.slug),
);

export const getStaticProps = gqlStaticProps(
  gql`
    query GeneratorQuery($slug: String!) {
      generator: generator(filter: { slug: { eq: $slug } }) {
        name
        slug
        text
      }
    }
  `,
);

export default function Generator({ generator, preview }) {
  const { isFallback } = useRouter();

  return (
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
      <Head>
        <title>{generator.name}</title>
      </Head>
      <InterstitialTitle kicker="Generator">{generator.name}</InterstitialTitle>
      <Wrapper>
        <PostContent isFallback={isFallback} content={generator} />
      </Wrapper>
    </DocsLayout>
  );
}
