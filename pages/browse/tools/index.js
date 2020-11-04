import { gqlStaticProps } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import SmartMarkdown from 'components/SmartMarkdown';
import gql from 'graphql-tag';
import Sidebar from 'pages/browse/Sidebar';
import Head from 'next/head';
import s from 'pages/browse/pageStyle.module.css';
import Anchor from 'public/icons/regular/link.svg';

export const getStaticProps = gqlStaticProps(
  gql`
    {
      tools: allTools(first: 100) {
        name
        slug
        description(markdown: true)
      }
    }
  `,
);

export default function Tools({ tools }) {
  return (
    <DocsLayout sidebar={<Sidebar title="Tools" entries={tools} />}>
      <Head>
        <title>Tools</title>
      </Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>Tools</div>

          <div className={s.tutorials}>
            {tools.map((tool) => (
              <a
                href={`/browse/tools/${tool.slug}`}
                key={tool.slug}
                className={s.tutorial}
              >
                <h6 className={s.tutorialTitle}>
                  {tool.name} <Anchor />
                </h6>
                <div className={s.tutorialDescription}>
                  <SmartMarkdown>{tool.description}</SmartMarkdown>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
