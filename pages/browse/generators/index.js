import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import SmartMarkdown from 'components/SmartMarkdown';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import Anchor from 'public/icons/regular/link.svg';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      generators: allGenerators(first: 100) {
        name
        slug
        description(markdown: true)
        language
      }
    }
  `,
);

export default function Tutorials({ generators }) {
  return (
    <DocsLayout>
      <Head>
        <title>Headless CMSs</title>
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>Headless CMSs</div>

          <div className={s.tutorials}>
            {generators.map((generator) => (
              <a
                href={`/browse/headless/${generator.slug}`}
                key={generator.slug}
                className={s.tutorial}
              >
                <h6 className={s.tutorialTitle}>
                  {generator.name} <Anchor />
                </h6>
                <div className={s.tutorialDescription}>
                  <p>{generator.language}</p>
                  <SmartMarkdown>{generator.description}</SmartMarkdown>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
