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

import Arduino from 'public/images/logos/arduino.svg';
import CityOfSidney from 'public/images/logos/cityofsidney.svg';
import DeutscheTelekom from 'public/images/logos/deutsche-telekom.svg';
import LinkedIn from 'public/images/logos/linkedin.svg';

import Oberlo from 'public/images/logos/new/oberlo.svg';
import Nhs from 'public/images/logos/new/nhs.svg';
import LittleCaesars from 'public/images/logos/new/little-caesars.svg';
import Mit from 'public/images/logos/new/mit.svg';
import Afsp from 'public/images/logos/new/afsp.svg';
import Harrys from 'public/images/logos/new/harrys.svg';

import styles from './style.module.css';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: homePage {
        seo: _seoMetaTags {
          ...seoMetaTagsFields
        }
      }
      successStories: allSuccessStories(
        first: 4
        orderBy: _firstPublishedAt_DESC
      ) {
        accentColor {
          hex
        }
        duotoneColor1 {
          hex
        }
        duotoneColor2 {
          hex
        }
        title(markdown: true)
        slug
        logo {
          url
        }
      }
    }

    ${seoMetaTagsFields}
  `,
);

function Homepage({ successStories, preview, page }) {
  return (
    <Layout preview={preview}>
      <Head>{page && renderMetaTags(page.seo)}</Head>
      <Hero
        title={<>The marketplace for all JAMstack tools</>}
        subtitle={<>JAMstack is the new place to be and blabla</>}
      >
        <Checks checks={["It's free!"]}>
          <Button fs="big" as="a" href="#">
            Register your tool!
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

      <Flag
        style="bad"
        title={
          <>
            Is content spread across{' '}
            <FlagHighlight style="bad">endless different CMSs</FlagHighlight>?
          </>
        }
        image="random-things"
      >
        <p>
          How can you deliver a cohesive brand and message strategy if your
          company functions in silos and information is manually copy-pasted
          across tens of different platforms?
        </p>
        <Bullets
          style="bad"
          icon={WarningIcon}
          bullets={[
            'Out-of-sync content',
            'Redundant expenses',
            'Internal inefficiencies',
          ]}
        />
      </Flag>

      <Flag
        style="bad"
        title={
          <>
            Are you slowed down&nbsp;by{' '}
            <FlagHighlight style="bad">legacy&nbsp;technology?</FlagHighlight>
          </>
        }
        image="stale-flower"
      >
        <p>
          Your customers demand blazing-fast digital products, web standards are
          evolving at the speed of light, yet you rely on 15-years-old solutions
          like Wordpress that force you to deliver heavy, low-quality user
          experiences.
        </p>
        <Bullets
          style="bad"
          icon={WarningIcon}
          bullets={[
            'Slow development times',
            'Rigid structures and models',
            'Poor performance in websites and apps',
          ]}
        />
      </Flag>

      <Flag
        style="bad"
        title={
          <>
            Is your infrastructure{' '}
            <FlagHighlight style="bad">
              ready&nbsp;for&nbsp;scale?
            </FlagHighlight>
          </>
        }
        image="waves"
      >
        <p>
          New channels, new markets, complex use cases, fast iterations. You can
          no longer afford to think locally. You need to have a reliable
          solution that is capable of following your growth, globally, and lets
          you adapt along the journey.
        </p>
        <Bullets
          style="bad"
          icon={WarningIcon}
          bullets={[
            'Complex data migrations',
            'Slow access times',
            'Missing integrations to new technology',
          ]}
        />
      </Flag>

      <TitleStripWithContent title={<>How much is this already costing you?</>}>
        <div className={styles.grid}>
          <Result
            number="89%"
            label={
              <>
                of <Highlight style="bad">customer loss</Highlight>
              </>
            }
          >
            According to <strong>Gartner</strong> 89 percent of companies plan
            to compete primarily on the basis of CX this year.
          </Result>
          <Result
            number="86%"
            label={
              <>
                of buyers <Highlight style="warning">pay more</Highlight>
              </>
            }
          >
            <strong>Harris</strong> found 86% of consumers stop
            interacting&#8203;/&#8203;buying from businesses if they have a bad
            experience.
          </Result>
          <Result
            number="25%"
            label={
              <>
                <Highlight style="good">in profitability</Highlight>
              </>
            }
          >
            <strong>Oracle</strong> reported that multichannel integration has
            the ability to increase profitability by 25 percent.
          </Result>
        </div>
      </TitleStripWithContent>

      <Space top={4} bottom={2}>
        <InterstitialTitle style="two">
          Here's how an Headless&nbsp;CMS can&nbsp;help&nbsp;your company
        </InterstitialTitle>
      </Space>

      <Space top={2}>
        <Wrapper>
          <OmnichannelIllustration />
        </Wrapper>
      </Space>

      <Flag
        style="good"
        image="box-things"
        title={
          <>
            Manage all your content{' '}
            <FlagHighlight>in&nbsp;one&nbsp;place</FlagHighlight>
          </>
        }
      >
        <p>
          Headless CMS means keeping everyone on the same page, storing
          everything in a single centralized hub, making an edit and publish it
          instantly, everywhere.
        </p>
        <Bullets
          style="good"
          icon={SuccessIcon}
          bullets={[
            'Access every bit of copy, anytime',
            'Your content becomes future-proof',
            'Deliver real omnichannel experiences',
          ]}
        />
      </Flag>

      <Flag
        style="good"
        title={
          <>
            From idea to market <FlagHighlight>in&nbsp;hours</FlagHighlight>,
            not months
          </>
        }
        image="people"
      >
        <p>
          Test and iterate painlessly, no matter what’s the digital product
          you’re working on, without reaching out to your IT for complex
          migrations.
        </p>
        <Bullets
          style="good"
          icon={SuccessIcon}
          bullets={[
            'Flexible content model',
            'Fast iterations, instant prototyping',
            'Repeatable architecture for all your projects',
          ]}
        />
      </Flag>

      <Flag
        style="good"
        title={
          <>
            A <FlagHighlight>global delivery network</FlagHighlight> at your
            service
          </>
        }
        image="muscles"
      >
        <p>
          With a network that spans 200 cities in more than 90 countries, you
          can be sure your content is always accessible, performant, secure, and
          close to every customer.
        </p>
        <Bullets
          style="good"
          icon={SuccessIcon}
          bullets={[
            'Reduced architectural complexities',
            'Scalability is built-in',
            'Integrations ready with any digital product',
          ]}
        />
      </Flag>

      {successStories.length > 0 && <UseCaseExcerpts cases={successStories} />}
    </Layout>
  );
}

export default Homepage;
