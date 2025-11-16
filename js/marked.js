// marked.js - Processamento de Markdown e Highlight de código
export function parseMarkdown(markdown) {
     marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false
     });

     return marked.parse(markdown);
}

export function highlightCode(container) {
     container.querySelectorAll("pre code").forEach(el => {
          hljs.highlightElement(el);
     });
}