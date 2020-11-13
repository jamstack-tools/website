export const categories = [
  { name: 'Feedback', slug: 'all/feedback', description: 'Get some love' },
  { name: 'Form', slug: 'all/form', description: 'Add a form to any website' },
  {
    name: 'Chat',
    slug: 'all/chat',
    description: 'Engage audience with a chat tool',
  },
  {
    name: 'Commerce',
    slug: 'all/commerce',
    description: 'Make payments and manage carts',
  },
  {
    name: 'Media',
    slug: 'all/media',
    description: 'Manage your images, files or videos',
  },
  {
    name: 'Authentication',
    slug: 'all/authentication',
    description: 'Authenticate your users',
  },
];

const all = [
  { name: 'CMS', slug: 'headless-cms' },
  { name: 'Generators', slug: 'generators' },
  ...categories,
];

export default all;
