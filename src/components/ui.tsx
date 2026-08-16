/* Renders body copy, turning {{TK: ...}} markers into loud placeholder chips. */
export function Copy({ text }: { text: string }) {
  const parts = text.split(/(\{\{TK:[^}]*\}\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const tk = part.match(/^\{\{TK:\s*([^}]*)\}\}$/);
        if (tk) {
          return (
            <span key={i} className="tk">
              TK · {tk[1]}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* Word-by-word staggered reveal via CSS animation — completes even when
   the tab is backgrounded/throttled (JS-driven animation does not). */
export function StaggerHeadline({ text, className }: { text: string; className?: string }) {
  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="enter block" style={{ ["--d" as string]: `${0.1 * i}s` }} aria-hidden>
          {word}
        </span>
      ))}
    </h1>
  );
}
