import gql from 'graphql-tag';
import { gqlStaticProps, seoMetaTagsFields } from 'lib/datocms';
import { renderMetaTags } from 'react-datocms';
import Layout from 'components/Layout';
import Wrapper from 'components/Wrapper';
import s from './style.module.css';
import RegisterForm from 'components/RegisterForm';
import Highlight from 'components/Highlight';
import Head from 'next/head';

export const getStaticProps = gqlStaticProps(
  gql`
    query {
      page: registerPage {
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

export default function Register({ page }) {
  return (
    <Layout noCta>
      <Head>
        {renderMetaTags(page.seo)}
        <meta name="keywords" content={page.seoKeywords} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
        />
      </Head>
      <div className={s.root}>
        <Wrapper>
          <div className={s.intro}>
            <div className={s.introKicker}>Get in touch</div>
            <div className={s.introTitle}>
              <Highlight>Register your JAMstack tool!</Highlight>
            </div>
            <div className={s.introBody}>
              <p>
                Whether you just launched on Product Hunt or you have a
                multi-million company let's let the world know who you are. Join
                the jam!
              </p>
              <p>
                Fill out the form below and we will create a page for your tool.
              </p>
            </div>
          </div>
          <div className={s.picker}>
            <RegisterForm />
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
}
