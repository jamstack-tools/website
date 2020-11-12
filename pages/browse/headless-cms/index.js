import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import SmartMarkdown from 'components/SmartMarkdown';
import Sidebar from 'pages/browse/Sidebar';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      cms: allCmsHeadlesses(first: 100) {
        name
        slug
        description(markdown: true)
        cmsType
      }
    }
  `,
);

export default function Cms({ cms }) {
  return (
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
      <Head>
        <title>JAMStack tools - Choose a headless CMSs</title>
        <meta
          property="og:description"
          content="Need to choose a headless CMS? Browse our registry and find the perfect match!"
          key="description"
        />
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <h1 className={s.title}>Headless CMSs</h1>

          <div className={s.Cards}>
            {cms.map((tutorial) => (
              <a
                href={`/browse/headless-cms/${tutorial.slug}`}
                key={tutorial.slug}
                className={s.Card}
              >
                <h6 className={s.CardTitle}>{tutorial.name}</h6>
                <div className={s.tutorialDescription}>
                  <SmartMarkdown>
                    {truncate(tutorial.description, {
                      TruncateBy: 'words',
                      TruncateLength: 20,
                    })}
                  </SmartMarkdown>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
