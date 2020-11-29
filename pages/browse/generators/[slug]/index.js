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
      generators: allGenerators(first: 100) {
        slug
      }
    }
  `,
  'slug',
  ({ generators }) => generators.map((p) => p.slug),
);

export const getStaticProps = gqlStaticProps(
  gql`
    query GeneratorQuery($slug: String!) {
      generator: generator(filter: { slug: { eq: $slug } }) {
        name
        slug
        url
        text
      }
    }
  `,
);

export default function Generator({ generator }) {
  const { isFallback } = useRouter();

  return (
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
      <title>The best static site generators - {generator.name}</title>
      <meta name="description" content={generator.description} />
      <meta
        name="title"
        content={`The best static site generators - ${generator.name}`}
      />
      <InterstitialTitle kicker="Generator" style="lamellae">
        {generator.name}
      </InterstitialTitle>
      <Wrapper>
        <Tags tags={[[('Language', generator.language)]]} url={generator.url}>
          <LikeButton
            id={generator.slug}
            namespace="generators"
            component={LikeButton.templates.Twitter}
          />
        </Tags>
        <PostContent isFallback={isFallback} content={generator} />
      </Wrapper>
    </DocsLayout>
  );
}
