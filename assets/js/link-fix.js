// Script adicional para garantir que todos os links funcionem
document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar e corrigir os links do menu
    function fixMenuLinks() {
        // Selecionar todos os links do menu
        const menuLinks = document.querySelectorAll('.tech-link');
        
        menuLinks.forEach(link => {
            // Verificar se o link tem um atributo href
            if (!link.hasAttribute('href') && link.dataset.href) {
                link.setAttribute('href', link.dataset.href);
            }
            
            // Verificar se o estilo pointer-events está bloqueando o link
            if (window.getComputedStyle(link).pointerEvents === 'none') {
                link.style.pointerEvents = 'auto';
            }
            
            // Adicionar evento de clique como fallback
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href !== 'javascript:void(0)') {
                    window.location.href = href;
                }
            });
        });
    }
    
    // Executar a função agora e também após um pequeno delay para garantir
    fixMenuLinks();
    setTimeout(fixMenuLinks, 500);
    
    // Adicionar também aos eventos de redimensionamento
    window.addEventListener('resize', fixMenuLinks);
});
