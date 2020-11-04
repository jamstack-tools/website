import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import { gqlStaticPaths, gqlStaticProps } from 'lib/datocms';
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
      tool: allTools(filter: { slug: { eq: $slug } }) {
        name
      }
    }
  `,
);

export default function Tool({ tool, preview }) {
  console.log('hfhguwgfweuyfgifgei');
  return (
    <Layout preview={preview}>
      <InterstitialTitle kicker="The DatoCMS Blog" style="two">
        {tool.name}
      </InterstitialTitle>
      <Wrapper>
        <div> {tool.name} </div>
      </Wrapper>
    </Layout>
  );
}
