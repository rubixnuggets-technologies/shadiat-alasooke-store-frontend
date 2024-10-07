import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function MarkdownRenderer({ content }: { content: string }) {
  if (!content) {
    return null;
  }

  return (
    <div>
      <Markdown
        children={content}
        components={{
          p: ({ node, ...props }) => {
            return <p className="text-sm" {...props} />;
          },
          strong: ({ node, ...props }) => {
            console.log("strong", props);

            return (
              <div className="mt-10 mb-3" >
                <strong className="font-bold text-base"  {...props} />
              </div>
            );
          },
        }}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      />
    </div>
  );
}
