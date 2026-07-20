import { readItems } from '@directus/sdk';
import { directus } from '../client';
import { TeamMember } from '@/types/directus';


export async function getTeamMembers(): Promise<TeamMember[]> {
  const result = await directus.request(
    readItems('team_members', {
      filter: {
        status: { _eq: 'published' },
      },
      sort: ['name'],
    })
  );
  return result as TeamMember[];
}
