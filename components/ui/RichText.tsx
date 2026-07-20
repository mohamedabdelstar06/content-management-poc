import DOMPurify from 'isomorphic-dompurify';

interface RichTextProps {
  content: string | null;
  className?: string;
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null;

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
