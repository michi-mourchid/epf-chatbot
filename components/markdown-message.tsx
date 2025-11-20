import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownMessageProps {
  content: string
  className?: string
}

export function MarkdownMessage({ content, className = "" }: MarkdownMessageProps) {
  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-[#470A68] underline hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => <ul className="mb-2 ml-4 list-disc space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="mb-2 ml-4 list-decimal space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="text-sm md:text-base" {...props} />,
          code: ({ node, inline, ...props }) => {
            return inline ? (
              <code className="rounded bg-opacity-20 px-1.5 py-0.5 font-mono text-sm" {...props} />
            ) : (
              <pre className="block rounded bg-opacity-20 p-2 font-mono text-sm overflow-x-auto">
                <code {...props} />
              </pre>
            )
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-opacity-30 pl-3 italic" {...props} />
          ),
          hr: ({ node, ...props }) => <hr className="my-2 opacity-30" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
