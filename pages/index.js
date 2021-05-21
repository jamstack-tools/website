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
import SmartMarkdown from 'components/SmartMarkdown';

import styles from './style.module.css';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: homePage {
        seoKeywords
        schema
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
      <div>
        <Head>
          {renderMetaTags(page.seo)}
          <meta name="keywords" content={page.seoKeywords} />
          {page.schema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
            />
          )}
        </Head>
        <Hero
          title={'JAMstack tools'}
          kicker={'The ultimate JAMstack showcase'}
          subtitle={
            <>
              Build fast and secure websites with thousands of tools at your
              disposal. This is why we ♥ the JAMstack.{' '}
            </>
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
          <InterstitialTitle subtitle="Whether you are the founder or just a fan, register it to JAMstack tools!">
            Can't find your favourite tool for <strong>JAMstack</strong>?
          </InterstitialTitle>

          <div className={styles.gridContainer}>
            <h5 className={styles.gridTitle}>Promote your JAMstack tool</h5>
            <div className={styles.grid}>
              <Result number="1" label={<>Who, me?</>}>
                Did you just launch on Product Hunt? Do you have a solid{' '}
                <strong>JAMstack startup</strong>? Or did you just discover a
                tool that made developing your{' '}
                <strong>static site easier</strong>?{' '}
                <strong>It's time to show it to the world!</strong>
              </Result>
              <Result number="2" label={<>You choose what to write!</>}>
                You just need to enter some basic information to register your{' '}
                <strong>JAMstack tool</strong>. Or go crazy with a long markdown
                description. It's up to you!
              </Result>
              <Result number="3" label={<>See it online!</>}>
                We usually take a few hours to check if everything is in order,
                but after that, you will be able to see your tool in all of its
                glory in our <strong>Browse section</strong>!
              </Result>
            </div>
          </div>
        </Space>

        <Space top={3}>
          <InterstitialTitle>
            Is JAMstack the right architecture for your next project?
          </InterstitialTitle>
          <div className={styles.center}>
            <Button fs="big" as="a" href="/what-is-jamstack">
              Read more about JAMstack!
            </Button>
          </div>
        </Space>
      </div>
    </Layout>
  );
}

export default Homepage;
