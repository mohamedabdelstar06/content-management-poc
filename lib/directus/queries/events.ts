import { readItems } from '@directus/sdk';
import { directus } from '../client';
import { Event } from '@/types/directus';


export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  const result = await directus.request(
    readItems('events', {
      filter: {
        status: { _eq: 'published' },
        event_date: { _gte: '$NOW' } as any,
      },
      sort: ['event_date'],
      limit,
    })
  );
  return Array.isArray(result) ? result as Event[] : [];
}

export async function getAllEvents(): Promise<Event[]> {
  const result = await directus.request(
    readItems('events', {
      filter: {
        status: { _eq: 'published' },
      },
      sort: ['-event_date'],
    })
  );
  return Array.isArray(result) ? result as Event[] : [];
}


export async function getEventBySlug(slug: string): Promise<Event | null> {
  const result = await directus.request(
    readItems('events', {
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' },
      },
      limit: 1,
    })
  );
  return result.length > 0 ? (result[0] as Event) : null;
}
