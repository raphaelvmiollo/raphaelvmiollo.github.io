document.addEventListener('DOMContentLoaded', function() {
    // Obter elementos do menu
    const menuTech = document.querySelector('.menu-tech');
    const navBrand = document.querySelector('.nav-brand');
    
    // Criar elementos para o mobile
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    // Criar header mobile
    const mobileHeaderContainer = document.createElement('div');
    mobileHeaderContainer.className = 'mobile-header-container';
    
    // Criar logo para o mobile
    const mobileLogo = document.createElement('a');
    mobileLogo.className = 'mobile-logo';
    mobileLogo.href = '#';
    
    // Clonar a imagem do logo
    if (navBrand && navBrand.querySelector('.logo-image')) {
        const logoClone = navBrand.querySelector('.logo-image').cloneNode(true);
        mobileLogo.appendChild(logoClone);
    }
    
    // Adicionar elementos ao header mobile
    mobileHeaderContainer.appendChild(mobileLogo);
    mobileHeaderContainer.appendChild(menuToggle);
    
    // Adicionar header mobile ao body
    document.body.insertBefore(mobileHeaderContainer, document.body.firstChild);
    
    // Função para verificar se está em viewport mobile
    function isMobile() {
        return window.innerWidth <= 991;
    }
    
    // Ajustar visibilidade do logo original
    function adjustLogoVisibility() {
        if (navBrand) {
            if (isMobile()) {
                navBrand.style.opacity = '0';
                navBrand.style.pointerEvents = 'none';
            } else {
                navBrand.style.opacity = '1';
                navBrand.style.pointerEvents = 'auto';
            }
        }
    }
    
    // Ajustar logo ao carregar e ao redimensionar
    adjustLogoVisibility();
    window.addEventListener('resize', adjustLogoVisibility);
    
    // Variável para armazenar a posição do scroll
    let scrollPosition = 0;
    
    // Toggle menu ao clicar no botão
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Botão do menu clicado'); // Debug
        
        const isActive = menuTech.classList.contains('active');
        
        if (!isActive) {
            // Abrir menu
            scrollPosition = window.pageYOffset;
            menuTech.classList.add('active');
            document.body.classList.add('menu-open');
            
            // Forçar exibição
            menuTech.style.display = 'flex';
            menuTech.style.visibility = 'visible';
            menuTech.style.zIndex = '99998';
            
            console.log('Menu aberto'); // Debug
        } else {
            // Fechar menu
            menuTech.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Restaurar scroll depois da animação
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 400);
            
            console.log('Menu fechado'); // Debug
        }
    });
    
    // Lidar com cliques nos links do menu
    const techLinks = document.querySelectorAll('.tech-link');
    techLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Link clicado:', this.getAttribute('href'));
            
            // Se estamos no mobile e o menu está aberto, fechá-lo
            if (isMobile() && menuTech.classList.contains('active')) {
                menuTech.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
            
            // Permitir a navegação padrão do link
        });
        
        // Adicionar efeito de hover apenas no desktop
        if (!isMobile()) {
            const hoverEffect = link.querySelector('.tech-hover-effect');
            if (hoverEffect) {
                link.addEventListener('mouseenter', function() {
                    hoverEffect.style.transform = 'scaleX(1)';
                });
                
                link.addEventListener('mouseleave', function() {
                    hoverEffect.style.transform = 'scaleX(0)';
                });
            }
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (menuTech.classList.contains('active')) {
            if (!menuTech.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                !mobileLogo.contains(e.target)) {
                
                menuTech.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                window.scrollTo(0, scrollPosition);
            }
        }
    });
    
    // Debug: verificar se os elementos foram criados
    console.log('Menu tech:', menuTech);
    console.log('Menu toggle:', menuToggle);
    console.log('Mobile header:', mobileHeaderContainer);
});