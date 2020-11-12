// import gql from 'graphql-tag';
// import { request } from './datocms';
// //
// const query = gql`
//   {
//     categories: allCategories(first: 50) {
//       name
//       slug
//     }
//   }
// `;
//
// export default async function categories() {
//   const {
//     data: { categories },
//   } = await request({ query });
//
//   return categories.map((category) => ({
//     name: category.name,
//     slug: `all/${category.slug}`,
//   }));
// }

const categories = [
  { name: 'CMS', slug: 'headless-cms' },
  { name: 'Generators', slug: 'generators' },
  { name: 'Form', slug: 'all/form' },
  { name: 'Chat', slug: 'all/chat' },
  { name: 'Feedback', slug: 'all/feedback' },
  { name: 'Commerce', slug: 'all/commerce' },
  { name: 'Media', slug: 'all/media' },
  { name: 'Authentication', slug: 'all/authentication' },
];

export default categories;
