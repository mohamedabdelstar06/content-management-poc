import { readItems } from '@directus/sdk';
import { directus } from '../client';
import { News } from '@/types/directus';


export async function getLatestNews(limit: number = 5): Promise<News[]> {
  const result = await directus.request(
    readItems('news', {
      filter: {
        status: { _eq: 'published' },
      },
      sort: ['-published_date'],
      limit,
    })
  );
  return result as News[];
}


export async function getNewsBySlug(slug: string): Promise<News | null> {
  const result = await directus.request(
    readItems('news', {
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' },
      },
      limit: 1,
    })
  );
  return result.length > 0 ? (result[0] as News) : null;
}
