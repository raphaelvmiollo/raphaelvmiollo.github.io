document.addEventListener('DOMContentLoaded', function() {
    // Criar elementos para o mobile
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    
    // Obter elementos do menu
    const menuTech = document.querySelector('.menu-tech');
    const container = document.querySelector('.container');
    const navBrand = document.querySelector('.nav-brand');
    
    // Criar header mobile
    const mobileHeaderContainer = document.createElement('div');
    mobileHeaderContainer.className = 'mobile-header-container';
    
    // Criar logo para o mobile
    const mobileLogo = document.createElement('a');
    mobileLogo.className = 'mobile-logo';
    mobileLogo.href = '#';
    
    // Clonar a imagem do logo
    const logoClone = navBrand.querySelector('.logo-image').cloneNode(true);
    mobileLogo.appendChild(logoClone);
    
    // Adicionar elementos ao header mobile
    mobileHeaderContainer.appendChild(mobileLogo);
    mobileHeaderContainer.appendChild(menuToggle);
    
    // Adicionar header mobile ao body
    document.body.insertBefore(mobileHeaderContainer, document.body.firstChild);
    
    // Função para verificar se está em viewport mobile ou tablet
    function isMobile() {
        return window.innerWidth <= 991; // Abrange mobile e tablet
    }
    
    // Ajustar visibilidade do logo original baseado no tamanho da tela
    function adjustLogoVisibility() {
        if (isMobile()) {
            navBrand.style.opacity = '0';
        } else {
            navBrand.style.opacity = '1';
        }
    }
    
    // Ajustar logo ao carregar e ao redimensionar
    adjustLogoVisibility();
    window.addEventListener('resize', adjustLogoVisibility);
    
    // Variável para armazenar a posição do scroll
    let scrollPosition = 0;
    
    // Toggle menu ao clicar no botão
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir comportamento padrão
        e.stopPropagation(); // Impedir propagação do evento
        
        menuTech.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Impedir rolagem quando menu está aberto, mas salvar a posição atual
        if (menuTech.classList.contains('active')) {
            // Salvar a posição atual do scroll
            scrollPosition = window.pageYOffset;
            document.body.style.overflow = 'hidden';
        } else {
            // Restaurar a rolagem
            document.body.style.overflow = '';
            window.scrollTo(0, scrollPosition);
        }
    });
    
    // Lidar com cliques nos links do menu
    const techLinks = document.querySelectorAll('.tech-link');
    techLinks.forEach(link => {
        // Remover listeners existentes para evitar duplicação
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Adicionar novos event listeners
        newLink.addEventListener('click', function(e) {
            // Se estamos no mobile e o menu está aberto, fechá-lo
            if (isMobile() && menuTech.classList.contains('active')) {
                menuTech.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                // Não usamos scrollTo aqui para permitir a navegação padrão do link
            }
            
            // Deixar o link fazer sua navegação naturalmente
            return true;
        });
        
        // Adicionar efeito de hover
        const hoverEffect = newLink.querySelector('.tech-hover-effect');
        if (hoverEffect) {
            newLink.addEventListener('mouseenter', function() {
                hoverEffect.style.transform = 'scaleX(1)';
            });
            
            newLink.addEventListener('mouseleave', function() {
                hoverEffect.style.transform = 'scaleX(0)';
            });
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (menuTech.classList.contains('active') && 
            !menuTech.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            !mobileLogo.contains(e.target)) {
            
            menuTech.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            window.scrollTo(0, scrollPosition);
        }
    });
    
    // Garantir que os links do menu sempre funcionem
    document.querySelectorAll('.nav-links .nav-item a').forEach(function(link) {
        link.style.pointerEvents = 'auto';
    });
});