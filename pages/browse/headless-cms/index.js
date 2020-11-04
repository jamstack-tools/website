import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import SmartMarkdown from 'components/SmartMarkdown';
import Sidebar from 'pages/browse/Sidebar';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import Anchor from 'public/icons/regular/link.svg';

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
        <title>Headless CMSs</title>
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>Headless CMSs</div>

          <div className={s.tutorials}>
            {cms.map((tutorial) => (
              <a
                href={`/browse/headless-cms/${tutorial.slug}`}
                key={tutorial.slug}
                className={s.tutorial}
              >
                <h6 className={s.tutorialTitle}>
                  {tutorial.name} <Anchor />
                </h6>
                <div className={s.tutorialDescription}>
                  <SmartMarkdown>{tutorial.description}</SmartMarkdown>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
