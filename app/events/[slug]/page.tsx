import { getEventBySlug, getAllEvents } from '@/lib/directus/queries/events';
import { DirectusImage } from '@/components/ui/DirectusImage';
import { RichText } from '@/components/ui/RichText';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getAllEvents().catch(() => []);
  if (!Array.isArray(events)) return [];
  return events.map((item) => ({
    slug: item.slug,
  }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = await getEventBySlug(resolvedParams.slug).catch(() => null);

  if (!event) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/events" className="text-blue-600 hover:text-blue-500 font-semibold mb-8 inline-block">&larr; Back to Events</Link>
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">{event.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 mt-4">
          {event.event_date && (
            <div className="flex items-center">
              <span className="mr-2">📅</span>
              {new Date(event.event_date).toLocaleString()}
            </div>
          )}
          {event.location && (
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              {event.location}
            </div>
          )}
        </div>
      </header>
      {event.image && (
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-12 shadow-sm">
          <DirectusImage uuid={event.image} alt={event.title} fill className="object-cover" priority />
        </div>
      )}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <RichText content={event.description} className="max-w-none text-lg leading-relaxed text-gray-800" />
      </div>
    </article>
  );
}
