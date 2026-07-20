export interface News {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  image: string | null;
  published_date: string | null;
  status: 'published' | 'draft' | 'archived';
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image: string | null;
  status: 'published' | 'draft' | 'archived';
}

export interface TeamMember {
  id: string;
  name: string;
  position: string | null;
  bio: string | null;
  image: string | null;
  linkedin: string | null;
  status: 'published' | 'draft' | 'archived';
}

export interface DirectusSchema {
  news: News[];
  events: Event[];
  team_members: TeamMember[];
}
