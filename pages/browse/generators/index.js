import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import Sidebar from 'pages/browse/Sidebar';
import SmartMarkdown from 'components/SmartMarkdown';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';

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
    <DocsLayout sidebar={<Sidebar entries={[]} />}>
      <Head>
        <title>JAMStack tools - Choose a static site generator</title>
        <meta
          property="og:description"
          content="Need to choose a static site generator? Browse our registry and find the perfect match!"
          key="description"
        />
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>Static Site Generators</div>

          <div className={s.Cards}>
            {generators.map((generator) => (
              <a
                href={`/browse/generators/${generator.slug}`}
                key={generator.slug}
                className={s.Card}
              >
                <h6 className={s.CardTitle}>{generator.name}</h6>
                <div className={s.tutorialDescription}>
                  <p>{generator.language}</p>
                  <SmartMarkdown>
                    {truncate(generator.description, {
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
