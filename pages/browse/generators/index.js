import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import Sidebar from 'pages/browse/Sidebar';
import SmartMarkdown from 'components/SmartMarkdown';
import gql from 'graphql-tag';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import truncate from 'truncatise';
import Tags from 'components/Tags';
import { LikeButton } from '@lyket/react';

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

export default function Generators({ generators }) {
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

          <div className={s.cards}>
            {generators.map((generator) => (
              <a
                href={`/browse/generators/${generator.slug}`}
                key={generator.slug}
                className={s.card}
              >
                <h6 className={s.cardTitle}>{generator.name}</h6>
                <div className={s.absoluteButton}>
                  <LikeButton
                    id={generator.slug}
                    namespace="generators"
                    component={LikeButton.templates.Twitter}
                  />
                </div>
                <Tags tags={[['Language', generator.language]]} />
                <div className={s.cardDescription}>
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
