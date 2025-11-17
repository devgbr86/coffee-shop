// marked.js - Processamento de Markdown
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
     // Função mantida para compatibilidade, mas sem fazer nada
     // Remove se não precisar manter compatibilidade com código existente
     return;
}