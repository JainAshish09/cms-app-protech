import { remark } from 'remark';
import html from 'remark-html';

/**
 * Converts Markdown to HTML
 * @param markdown The Markdown string to convert
 * @returns A promise that resolves to the HTML string
 */
export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}
