import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Highlight from 'components/Highlight';
import Button from 'components/Button';
import Checks from 'components/Checks';
import UseCaseExcerpts from 'components/UseCaseExcerpts';
import OmnichannelIllustration from 'components/OmnichannelIllustration';
import Wrapper from 'components/Wrapper';
import PersonasPicker from 'components/PersonasPicker';
import InterstitialTitle from 'components/InterstitialTitle';
import TitleStripWithContent from 'components/TitleStripWithContent';
import Result from 'components/Result';
import Flag, { Highlight as FlagHighlight } from 'components/Flag';
import Bullets from 'components/Bullets';
import LogosBar from 'components/LogosBar';
import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import gql from 'graphql-tag';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import Space from 'components/Space';

import WarningIcon from 'public/icons/regular/times.svg';
import SuccessIcon from 'public/icons/regular/check.svg';

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
      <Head>{page && renderMetaTags(page.seo)}</Head>
      <Hero
        title={<>The ultimate JAMstack tools marketplace</>}
        subtitle={
          <>Build fast and secure modern websites. That is why we ♥ to JAM. </>
        }
      >
        <Checks checks={["It's free!"]}>
          <Button fs="big" as="a" href="/register">
            Register your tool!
          </Button>
        </Checks>
        or
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
        <InterstitialTitle subtitle="Browse our repository and choose your favourite stack">
          How much time are you losing because you don't know{' '}
          <Highlight>which tool you can use</Highlight>?
        </InterstitialTitle>
      </Space>

      <TitleStripWithContent title={<>Cannot find your favourite tool?</>}>
        <div className={styles.grid}>
          <Result
            number="1."
            label={
              <>
                Who, <Highlight style="bad">me?</Highlight>
              </>
            }
          >
            Did you just launch on Product Hunt? Do you have a solid JAM
            startup? Did you use a tool that made developing your static site so
            much easier? <strong>It's time to register!</strong>
          </Result>
          <Result
            number="2."
            label={
              <>
                I got <Highlight style="warning">what you need</Highlight>
              </>
            }
          >
            You need a just a few basic information to register a new{' '}
            <strong>JAMstack tool</strong>. Or go crazy with a long markdown
            description. It's up to you!
          </Result>
          <Result
            number="3."
            label={
              <>
                You make me <Highlight style="good">so proud</Highlight>
              </>
            }
          >
            We usually take a few hours to check, after that you will be able to
            see your tool in all its glory in our{' '}
            <strong>Browse section</strong>.
          </Result>
        </div>
      </TitleStripWithContent>
    </Layout>
  );
}

export default Homepage;
