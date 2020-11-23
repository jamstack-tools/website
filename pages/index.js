import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Button from 'components/Button';
import Checks from 'components/Checks';
import PersonasPicker from 'components/PersonasPicker';
import InterstitialTitle from 'components/InterstitialTitle';
import Result from 'components/Result';
import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import gql from 'graphql-tag';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import Space from 'components/Space';

import styles from './style.module.css';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: homePage {
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
    }
    ${seoMetaTagsFields}
  `,
);

function Homepage({ preview, page }) {
  return (
    <Layout preview={preview}>
      <Head>{renderMetaTags(page.seo)}</Head>
      <Hero
        title={<>The ultimate JAMstack tools marketplace</>}
        subtitle={
          <>Build fast and secure modern websites. This is why we ♥ to JAM. </>
        }
      >
        <Checks checks={["It's free!"]}>
          <Button fs="big" as="a" href="/register">
            Register your tool!
          </Button>
        </Checks>
        <p>or</p>
        <Checks checks={["It's also free!"]}>
          <Button fs="big" as="a" href="/browse">
            Browse
          </Button>
        </Checks>
      </Hero>

      <Space top={3}>
        <PersonasPicker />
      </Space>

      <Space top={3}>
        <InterstitialTitle subtitle="Whether you are the founder or just a fan, register it!">
          Can't find your favourite tool?
        </InterstitialTitle>
        <div className={styles.grid}>
          <Result number="1" label={<>Who, me?</>}>
            Did you just launch on Product Hunt? Do you have a solid JAM
            startup? Or did you just discover a tool that made developing your
            static site easier?{' '}
            <strong>It's time to show it to the world!</strong>
          </Result>
          <Result number="2" label={<>You choose what to write!</>}>
            You just need a few basic information to register a new{' '}
            <strong>JAMstack tool</strong>. Or go crazy with a long markdown
            description. It's up to you!
          </Result>
          <Result number="3" label={<>See it online!</>}>
            We usually take a few hours to check if everything is in order,
            after that you will be able to see your tool in all its glory in our{' '}
            <strong>Browse section</strong>.
          </Result>
        </div>
      </Space>
    </Layout>
  );
}

export default Homepage;
