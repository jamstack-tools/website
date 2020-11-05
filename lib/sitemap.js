import { SitemapStream, streamToPromise } from 'sitemap';
import gql from 'graphql-tag';
import { request } from './datocms';

const staticRoutes = [
  '/',
  '/contact',
  '/register',
  '/browse',
  '/browse/headless-cms',
  '/browse/generators',
  '/legal/cookie-policy',
  '/legal/gdpr',
  '/legal/privacy-policy',
  '/legal/security',
  '/legal/terms',
];

export default async function generateSitemap() {
  let routes = [...staticRoutes];

  // /browse/all/[slug]
  const {
    data: { categories },
  } = await request({
    query: gql`
      {
        categories: allCategories(first: 100) {
          slug
        }
      }
    `,
  });
  routes = [
    ...routes,
    ...categories.map((category) => `/browse/all/${category.slug}`),
  ];

  // /browse/tools/[slug]
  const {
    data: { tools },
  } = await request({
    query: gql`
      {
        tools: allTools {
          slug
        }
      }
    `,
  });

  routes = [...routes, ...tools.map((tool) => `/browse/tools/${tool.slug}`)];

  // /browse/headless-cms/[slug]
  const {
    data: { cms },
  } = await request({
    query: gql`
      {
        cms: allCmsHeadlesses {
          slug
        }
      }
    `,
  });
  routes = [...routes, ...cms.map((c) => `/browse/headless-cms/${c.slug}`)];

  // /browse/headless-cms/[slug]
  const {
    data: { generators },
  } = await request({
    query: gql`
      {
        generators: allGenerators {
          slug
        }
      }
    `,
  });
  routes = [
    ...routes,
    ...generators.map((generator) => `/browse/generators/${generator.slug}`),
  ];

  const sitemap = new SitemapStream({
    hostname: 'https://jamstacktools.netlify.app',
  });
  routes.forEach((route) => sitemap.write(route));
  sitemap.end();

  const sm = await streamToPromise(sitemap);
  return sm.toString();
}
