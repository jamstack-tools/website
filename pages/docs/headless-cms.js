import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import SmartMarkdown from 'components/SmartMarkdown';
import gql from 'graphql-tag';
import { Sidebar } from 'pages/docs/[...chunks]';
import Head from 'next/head';
import s from 'pages/docs/pageStyle.module.css';
import Anchor from 'public/icons/regular/link.svg';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      tutorials: allCmsHeadlesses(first: 100) {
        name
        slug
        description(markdown: true)
        cmsType
      }
    }
  `,
);

export default function Tutorials({ tutorials }) {
  return (
    <DocsLayout sidebar={<Sidebar title="Headless CMSs" entries={[]} />}>
      <Head>
        <title>Headless CMSs</title>
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>Headless CMSs</div>

          <div className={s.tutorials}>
            {tutorials.map((tutorial) => (
              <a
                href={`/docs/headless/${tutorial.slug}`}
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
