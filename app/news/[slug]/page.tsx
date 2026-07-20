import { getNewsBySlug, getLatestNews } from '@/lib/directus/queries/news';
import { DirectusImage } from '@/components/ui/DirectusImage';
import { RichText } from '@/components/ui/RichText';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const news = await getLatestNews(100).catch(() => []);
  if (!Array.isArray(news)) return [];
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getNewsBySlug(resolvedParams.slug).catch(() => null);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/news" className="text-blue-600 hover:text-blue-500 font-semibold mb-8 inline-block">&larr; Back to News</Link>
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">{article.title}</h1>
        {article.published_date && (
          <p className="text-gray-500">Published on {new Date(article.published_date).toLocaleDateString()}</p>
        )}
      </header>
      {article.image && (
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-12 shadow-sm">
          <DirectusImage uuid={article.image} alt={article.title} fill className="object-cover" priority />
        </div>
      )}
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <RichText content={article.content} className="max-w-none text-lg leading-relaxed text-gray-800" />
      </div>
    </article>
  );
}
