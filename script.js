const content = document.getElementById("content");
const linksContainer = document.getElementById("pageLinks");

marked.setOptions({
     breaks: true,
     gfm: true,
     headerIds: true,
     mangle: false
});

function removeEmojis(text) {
     return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g, "");
}

function createNavLinksFromHTML() {
     linksContainer.innerHTML = '';
     const h1Elements = content.querySelectorAll("h1");

     h1Elements.forEach((h1, i) => {
          const a = document.createElement("a");
          a.textContent = h1.textContent;
          a.className = "page-link";
          a.onclick = e => {
               e.preventDefault();

               const navHeight = 80;
               const targetPosition = h1.getBoundingClientRect().top + window.pageYOffset - navHeight;
               window.scrollTo({ top: targetPosition, behavior: "smooth" });
          };
          linksContainer.appendChild(a);
     });
}

async function loadMarkdown() {
     try {
          const res = await fetch("home.md");
          if (!res.ok) throw new Error('Arquivo home.md não encontrado');

          let md = await res.text();
          md = removeEmojis(md);

          let html = marked.parse(md);
          html = DOMPurify.sanitize(html);

          content.innerHTML = html;

          content.querySelectorAll("pre code").forEach(el => {
               hljs.highlightElement(el);
          });

          createNavLinksFromHTML();

          window.scrollTo({ top: 0, behavior: "smooth" });
     } catch (err) {
          content.innerHTML = "<h1>Erro ao carregar</h1><p>" + err.message + "</p>";
     }
}

loadMarkdown();