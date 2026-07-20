import { getLatestNews } from '@/lib/directus/queries/news';
import { getUpcomingEvents } from '@/lib/directus/queries/events';
import { getTeamMembers } from '@/lib/directus/queries/team';
import { DirectusImage } from '@/components/ui/DirectusImage';
import Link from 'next/link';

export const revalidate = 60; // ISR revalidation

export default async function Home() {
  const [news, events, team] = await Promise.all([
    getLatestNews(3).catch(() => []),
    getUpcomingEvents(3).catch(() => []),
    getTeamMembers().catch(() => [])
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Content Management POC
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          An enterprise-grade platform delivering dynamic corporate news, exclusive events, and team updates with uncompromised performance and security.
        </p>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Latest News</h2>
          <Link href="/news" className="text-blue-600 hover:text-blue-500 font-semibold">View all news &rarr;</Link>
        </div>
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(item => (
              <article key={item.id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <DirectusImage uuid={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-gray-500 mb-2">{item.published_date && new Date(item.published_date).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3"><Link href={`/news/${item.slug}`} className="hover:underline before:absolute before:inset-0">{item.title}</Link></h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-100 p-8 rounded-2xl text-center">No news articles found.</p>
        )}
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Upcoming Events</h2>
          <Link href="/events" className="text-blue-600 hover:text-blue-500 font-semibold">View all events &rarr;</Link>
        </div>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map(item => (
              <article key={item.id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative">
                <div className="relative h-48 w-full">
                  <DirectusImage uuid={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm font-semibold text-blue-600 mb-2">{item.event_date && new Date(item.event_date).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3"><Link href={`/events/${item.slug}`} className="hover:underline before:absolute before:inset-0">{item.title}</Link></h3>
                  {item.location && <p className="text-sm text-gray-500 mb-3 flex items-center">📍 {item.location}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-100 p-8 rounded-2xl text-center">No upcoming events found.</p>
        )}
      </section>

      {/* Team Members */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Our Team</h2>
        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div key={member.id} className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-sm">
                  <DirectusImage uuid={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{member.position}</p>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 text-sm font-medium">LinkedIn</a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-100 p-8 rounded-2xl text-center">No team members found.</p>
        )}
      </section>
    </div>
  );
}
