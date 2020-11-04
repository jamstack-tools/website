import { request, seoMetaTagsFields, imageFields } from 'lib/datocms';
import { renderMetaTags } from 'react-datocms';
import { gqlStaticPaths } from 'lib/datocms';
import DocsLayout from 'components/DocsLayout';
import gql from 'graphql-tag';
import PostContent from 'components/PostContent';
import Link from 'next/link';
import ActiveLink from 'components/ActiveLink';
import LeftIcon from 'public/icons/regular/chevron-double-left.svg';
import htmlToDOM from 'html-dom-parser';
import { domToReact } from 'html-react-parser';
import slugify from 'utils/slugify';
import getInnerText from 'utils/getInnerText';
import s from 'pages/browse/pageStyle.module.css';
import Head from 'next/head';
import docHref from 'utils/docHref';
import emojify from 'utils/emojify';
import { useRouter } from 'next/router';
import { Line } from 'components/FakeContent';
import cn from 'classnames';

var domParserOptions = { decodeEntities: true, lowerCaseAttributeNames: false };

export const getStaticPaths = gqlStaticPaths(
  gql`
    {
      roots: allTools(first: 100) {
        slug
        name
      }
    }
  `,
  'chunks',
  ({ roots }) => {
    const results = roots;

    return results;
  },
);

export const getStaticProps = async function ({
  params: { chunks: rawChunks },
  preview,
}) {
  const chunks = rawChunks.map((chunk) => chunk.split(/\//g)).flat();
  const slug = chunks.length >= 2 ? chunks[chunks.length - 2] : chunks[0];

  const {
    data: { tool },
  } = await request({
    query: gql`
      query($slug: String!) {
        tool(filter: { slug: { eq: $slug } }) {
          name
          slug
        }
      }
    `,
    variables: { groupSlug },
    preview,
  });

  return {
    props: {
      tool,
      preview: preview ? true : false,
    },
  };
};

const SidebarEntry = ({ url, level, label, children }) => {
  if (!url && level === 0) {
    return (
      <>
        <div className={s.subgroupName}>{label}</div>
        {children && children.length > 0 && (
          <div className={cn(s.pageChildren, s[`pageChildrenLevel${level}`])}>
            {children.map((entry) => (
              <SidebarEntry key={entry.url} level={level + 1} {...entry} />
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      {url ? (
        <ActiveLink href={docHref(url)} as={url} activeClassName={s.activePage}>
          <a className={cn(s.page, s[`page-level${level}`])}>{label}</a>
        </ActiveLink>
      ) : (
        <span className={cn(s.page, s[`page-level${level}`])}>{label}</span>
      )}
      {children && children.length > 0 && (
        <div className={cn(s.pageChildren, s[`pageChildrenLevel${level}`])}>
          {children.map((entry) => (
            <SidebarEntry key={entry.url} level={level + 1} {...entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ title, entries }) => {
  return (
    <>
      <Link href="/browse">
        <a className={s.backHome}>
          <LeftIcon /> Home
        </a>
      </Link>

      <div className={s.groupName}>{title}</div>

      {entries.map((entry) => (
        <SidebarEntry key={entry.label} level={0} {...entry} />
      ))}

      <div style={{ height: '80px' }} />
    </>
  );
};

export function Toc({ content, extraEntries: extra }) {
  const contentEntries =
    content &&
    content
      .filter((b) => b._modelApiKey === 'text')
      .map((b) => {
        const dom = htmlToDOM(b.text, domParserOptions);

        return dom
          .filter((el) => el.type === 'tag' && el.name.match(/^h[1-6]$/))
          .map((heading) =>
            domToReact([heading], {
              replace: ({ children }) => {
                const innerText = getInnerText(children);
                return (
                  <a
                    href={`#${slugify(innerText)}`}
                    className={s.tocEntry}
                    key={innerText}
                  >
                    {domToReact(children, {
                      replace: ({ type, data }) => {
                        if (type === 'text') {
                          return <>{emojify(data)}</>;
                        }
                      },
                    })}
                  </a>
                );
              },
            }),
          );
      })
      .flat();

  const extraEntries =
    extra &&
    extra.map(({ anchor, label }) => (
      <a href={`#${anchor}`} className={s.tocEntry} key={anchor}>
        {label}
      </a>
    ));

  return (contentEntries && contentEntries.length > 0) ||
    (extraEntries && extraEntries.length > 0) ? (
    <div className={s.sidebar} data-datocms-noindex>
      <div className={s.toc}>
        <div className={s.tocInner}>
          <div className={s.tocTitle}>In this page</div>
          <div className={s.entries}>
            {contentEntries}
            {extraEntries}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default function DocPage({ tool, titleOverride, page }) {
  const { isFallback } = useRouter();

  return (
    <DocsLayout
      sidebar={
        tool && (
          <Sidebar
            title={tool.name}
            entries={
              tool && tool.pages.length > 1
                ? tool.pages.map((page) => {
                    return {
                      url: `/browse/${tool.slug}${
                        (page.slugOverride || page.page.slug) === 'index'
                          ? ''
                          : `/${page.slugOverride || page.page.slug}`
                      }`,
                      label: page.titleOverride || page.page.title,
                    };
                  })
                : page &&
                  page.content &&
                  page.content
                    .filter((b) => b._modelApiKey === 'text')
                    .map((b) => {
                      const dom = htmlToDOM(b.text, domParserOptions);

                      return dom
                        .filter(
                          (el) =>
                            el.type === 'tag' && el.name.match(/^h[1-6]$/),
                        )
                        .map((heading) => {
                          const innerText = getInnerText([heading]);

                          return {
                            url: `#${slugify(innerText)}`,
                            label: domToReact([heading], {
                              replace: ({ children }) => {
                                return (
                                  <span key={innerText}>
                                    {domToReact(children, {
                                      replace: ({ type, data }) => {
                                        if (type === 'text') {
                                          return <>{emojify(data)}</>;
                                        }
                                      },
                                    })}
                                  </span>
                                );
                              },
                            }),
                          };
                        });
                    })
                    .flat()
            }
          />
        )
      }
    >
      <Head>{!isFallback && renderMetaTags(page._seoMetaTags)}</Head>
      <div className={s.articleContainer}>
        <div className={s.article}>
          <div className={s.title}>
            {isFallback ? <Line /> : titleOverride || (page && page.title)}
          </div>
          <PostContent
            isFallback={isFallback}
            content={page && page.content}
            style={s}
          />
        </div>
      </div>
    </DocsLayout>
  );
}
