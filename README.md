# Static Site/Template

> https://devgbr86.github.io/profile/

Um site de perfil pessoal minimalista com temática de cafeteria, projetado para exibir conteúdo em formato markdown de maneira elegante e responsiva.

## Sobre o Projeto

Este projeto apresenta uma interface web estática que carrega e renderiza conteúdo escrito em markdown, transformando-o em páginas HTML estilizadas. A proposta é oferecer uma experiência de leitura agradável com uma paleta de cores inspirada em tons de cafeteria, criando um ambiente acolhedor e profissional.

O design prioriza a legibilidade e a simplicidade, com uma navegação fluida entre seções do conteúdo através de links gerados automaticamente a partir dos títulos principais do documento.

## Estrutura do Projeto

```
static-template/
├── index.html        # Página principal com estrutura e estilos
├── home.md           # Arquivo markdown com o conteúdo a ser exibido
├── assets/
│   └── img.png       # Todas as imagens do site
└── js/
    ├── main.js       # Coordenador principal da aplicação
    ├── marked.js     # Processador de markdown
    └── purify.js     # Sanitizador de conteúdo HTML
```

## Características

### Design e Estética

O visual do site foi cuidadosamente elaborado para transmitir a atmosfera de uma cafeteria aconchegante. A paleta de cores utiliza tons terrosos como marrom café, bege claro e creme, criando um contraste suave e agradável aos olhos. A tipografia escolhida é monoespaçada, mantendo um caráter técnico mas sem perder a elegância.

### Funcionalidades Principais

O site carrega automaticamente um arquivo markdown e o converte em HTML formatado. Durante esse processo, o conteúdo passa por uma sanitização para garantir segurança. Os títulos principais do documento são extraídos e transformados em links de navegação no topo da página, permitindo acesso rápido às diferentes seções.

A navegação é otimizada com rolagem suave e ajuste automático de posicionamento para compensar a barra de navegação fixa. O sistema também remove automaticamente emojis do conteúdo para manter a consistência visual.

### Responsividade

O layout foi desenvolvido com abordagem mobile-first, adaptando-se perfeitamente a diferentes tamanhos de tela. Desde dispositivos móveis pequenos até monitores grandes, o conteúdo se reorganiza de forma inteligente, ajustando tamanhos de fonte, espaçamentos e proporções para garantir uma experiência de leitura confortável em qualquer dispositivo.

## Bibliotecas Utilizadas

O projeto utiliza bibliotecas externas via CDN para funcionalidades específicas:

- Marked.js para conversão de markdown em HTML
- DOMPurify para sanitização e segurança do conteúdo
- Tailwind CSS para utilitários de estilo adicionais
- Open Props para propriedades CSS padronizadas

## Como Funciona

Quando a página é carregada, o sistema busca o arquivo de conteúdo em markdown, processa-o removendo emojis e convertendo a sintaxe markdown em HTML. Após a conversão, o conteúdo é sanitizado para prevenir injeção de scripts maliciosos e então inserido na página.

Simultaneamente, o sistema analisa a estrutura do conteúdo processado, identifica todos os títulos principais e gera automaticamente botões de navegação correspondentes. Esses botões permitem que o visitante navegue rapidamente entre as seções do documento com rolagem suave.

## Uso

Para utilizar este projeto, basta colocar seu conteúdo no arquivo home.md usando sintaxe markdown padrão. O sistema irá automaticamente processar e exibir o conteúdo com a estilização apropriada. Os títulos de nível 1 serão usados para criar a navegação superior.

O projeto é totalmente estático e pode ser hospedado em qualquer servidor web ou serviço de hospedagem de páginas estáticas como GitHub Pages, Netlify ou Vercel.

## Personalização

O tema visual pode ser facilmente ajustado modificando as variáveis CSS no arquivo principal. A paleta de cores está centralizada em variáveis customizadas, permitindo mudanças rápidas na aparência geral do site sem necessidade de editar múltiplos locais no código.

## Compatibilidade

O projeto funciona em todos os navegadores modernos que suportam ES6 modules e fetch API. A responsividade é garantida através de media queries que cobrem desde telas muito pequenas até monitores de alta resolução.

---

