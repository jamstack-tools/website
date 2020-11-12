import generateSitemap from './sitemap';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

export default async function writeFeedsAndSitemap() {
  const [sitemap] = await Promise.all([generateSitemap()]);

  await writeFileAsync('./public/sitemap.xml', sitemap, 'utf8');
}

writeFeedsAndSitemap();
