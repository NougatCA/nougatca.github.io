const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Tiny inline-Markdown renderer for text in profile.ts:
 *   **bold**, *italic*, [text](url), and `<br>` via a "\n" in the string.
 * Everything else is HTML-escaped.
 */
export function inline(text: string): string {
  const slots: string[] = [];
  const keep = (html: string) => `\u0000${slots.push(html) - 1}\u0000`;

  // Links first, so that "_" or "*" inside URLs are left alone.
  let out = escapeHtml(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, url: string) => {
    const external = /^https?:\/\//.test(url);
    return keep(`<a href="${url}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`);
  });

  out = out
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");

  // Bold/italic inside link labels.
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) =>
    slots[Number(i)].replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>"),
  );
}
