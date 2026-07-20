import { getLatestNews } from '@/lib/directus/queries/news';
import { DirectusImage } from '@/components/ui/DirectusImage';
import Link from 'next/link';

export const revalidate = 60;

export default async function NewsPage() {
  const news = await getLatestNews(100).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">Latest News</h1>
      
      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(item => (
            <article key={item.id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative">
              <div className="relative h-48 w-full">
                <DirectusImage uuid={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 mb-2">{item.published_date && new Date(item.published_date).toLocaleDateString()}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-3"><Link href={`/news/${item.slug}`} className="hover:underline before:absolute before:inset-0">{item.title}</Link></h2>
                <p className="text-gray-600 line-clamp-3">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 bg-gray-100 p-8 rounded-2xl text-center">No news articles found.</p>
      )}
    </div>
  );
}
