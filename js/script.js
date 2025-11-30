// ============================================================
// ARQUIVO: js/script.js
// DESCRIÇÃO: Script principal - Loader + Inicialização
// STACK: Alpine.js + AOS.js
// ============================================================

// ========================================
// PARTE 1: LOADER DE SECTIONS
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log('☕ Iniciando carregamento da @coffeeshop...');
  
  const sections = document.querySelectorAll('[data-section]');
  
  if (sections.length === 0) {
    console.warn('⚠️ Nenhuma section encontrada com [data-section]');
    return;
  }
  
  // Carrega todas as sections em paralelo
  const promises = Array.from(sections).map(async (element) => {
    const sectionName = element.getAttribute('data-section');
    
    if (!sectionName) {
      console.error('✗ Elemento sem atributo data-section válido');
      return { success: false, name: 'unknown' };
    }
    
    try {
      const response = await fetch(`sections/${sectionName}.html`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      
      const html = await response.text();
      
      if (!html || html.trim().length === 0) {
        throw new Error('Conteúdo vazio retornado');
      }
      
      element.innerHTML = html;
      
      console.log(`✓ Section carregada: ${sectionName}`);
      return { success: true, name: sectionName };
      
    } catch (error) {
      console.error(`✗ Erro ao carregar "${sectionName}":`, error.message);
      
      element.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #8b4513; border: 2px solid #d2691e; border-radius: 8px; background: #fff8dc;">
          <p style="margin: 0; font-weight: 600;">⚠️ Erro ao carregar seção: ${sectionName}</p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #666;">${error.message}</p>
        </div>
      `;
      
      return { success: false, name: sectionName, error: error.message };
    }
  });
  
  // Aguarda todas carregarem
  const results = await Promise.all(promises);
  
  // Estatísticas de carregamento
  const sucessos = results.filter(r => r.success).length;
  const falhas = results.filter(r => !r.success).length;
  const total = results.length;
  
  console.log(`✓ Carregamento concluído: ${sucessos}/${total} sections carregadas`);
  
  if (falhas > 0) {
    console.warn(`⚠️ ${falhas} section(s) falharam:`, 
      results.filter(r => !r.success).map(r => r.name)
    );
  }
  
  // Dispara evento customizado para inicialização
  window.dispatchEvent(new CustomEvent('sectionsLoaded', {
    detail: {
      total,
      sucessos,
      falhas,
      results
    }
  }));
  
  console.log('☕ Loader finalizado, evento "sectionsLoaded" disparado');
});

// ========================================
// PARTE 2: INICIALIZAÇÃO PRINCIPAL
// ========================================

window.addEventListener('sectionsLoaded', () => {
  console.log('🚀 Inicializando @coffeeshop...');
  initializeCoffeeShop();
});

function initializeCoffeeShop() {
  console.log('✓ Sections carregadas, inicializando componentes...');
  
  setTimeout(() => {
    // 1. Inicializar animações AOS
    initAOS();
    
    // 2. Gerar navegação automática
    generateNavigation();
    
    // 3. Smooth scroll para âncoras
    setupSmoothScroll();
    
    // 4. Inicializar funcionalidades específicas da cafeteria
    initCoffeeFeatures();
    
    console.log('✓ @coffeeshop totalmente inicializada');
  }, 100);
}

// ========================================
// PARTE 3: INICIALIZAR AOS
// ========================================

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: 'mobile'
    });
    console.log('✓ Animações AOS inicializadas');
  } else {
    console.warn('⚠️ AOS não está disponível');
  }
}

// ========================================
// PARTE 4: GERAR NAVEGAÇÃO AUTOMÁTICA
// ========================================

function generateNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const pageLinks = document.getElementById('pageLinks');
  
  console.log('🔍 Buscando sections com ID...', sections.length);
  
  if (!pageLinks) {
    console.error('✗ Elemento #pageLinks não encontrado!');
    return;
  }
  
  if (sections.length === 0) {
    console.warn('⚠️ Nenhuma section com ID encontrada');
    return;
  }
  
  pageLinks.innerHTML = '';
  
  sections.forEach(section => {
    const heading = section.querySelector('h1, h2');
    
    if (heading) {
      const text = heading.textContent.trim();
      const id = section.id;
      
      console.log(`✓ Criando link para: ${text} (#${id})`);
      
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = text;
      link.className = 'page-link';
      
      pageLinks.appendChild(link);
    }
  });
  
  console.log(`✓ ${pageLinks.children.length} links de navegação gerados`);
}

// ========================================
// PARTE 5: SMOOTH SCROLL
// ========================================

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === null) return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        console.log(`✓ Scroll suave para: ${href}`);
        
        if (window.Alpine) {
          window.dispatchEvent(new CustomEvent('close-mobile-menu'));
        }
      } else {
        console.warn(`⚠️ Target não encontrado: ${href}`);
      }
    });
  });
  
  console.log('✓ Smooth scroll configurado');
}

// ========================================
// PARTE 6: FUNCIONALIDADES DA CAFETERIA
// ========================================

function initCoffeeFeatures() {
  // Adicionar classe ao body indicando que o site está pronto
  document.body.classList.add('coffee-ready');
  
  // Log de horário de funcionamento (exemplo)
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 7 && hour < 19) {
    console.log('☕ Estamos ABERTOS! Horário: 07:00 - 19:00');
  } else {
    console.log('🌙 Estamos FECHADOS. Abrimos às 07:00!');
  }
}

// ========================================
// PARTE 7: UTILIDADES GLOBAIS
// ========================================

// Refresh AOS
window.refreshAOS = function() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
    console.log('✓ AOS atualizado');
  }
};

// Refresh Navigation
window.refreshNavigation = function() {
  generateNavigation();
  setupSmoothScroll();
  console.log('✓ Navegação atualizada');
};

// Recarregar section específica
window.reloadSection = async function(sectionName) {
  console.log(`🔄 Recarregando section: ${sectionName}`);
  
  const element = document.querySelector(`[data-section="${sectionName}"]`);
  
  if (!element) {
    console.error(`✗ Section "${sectionName}" não encontrada`);
    return false;
  }
  
  try {
    const response = await fetch(`sections/${sectionName}.html?t=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    element.innerHTML = html;
    
    console.log(`✓ Section "${sectionName}" recarregada com sucesso`);
    
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    
    return true;
    
  } catch (error) {
    console.error(`✗ Erro ao recarregar "${sectionName}":`, error);
    return false;
  }
};

// Log de performance
window.addEventListener('load', () => {
  const loadTime = (performance.now() / 1000).toFixed(2);
  console.log(`⚡ @coffeeshop carregada em ${loadTime}s`);
});

// ============================================================
// FIM DO ARQUIVO: js/script.js
// ============================================================