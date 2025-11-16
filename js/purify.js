// purify.js - Sanitização de HTML
export function sanitizeHTML(html) {
     return DOMPurify.sanitize(html);
}