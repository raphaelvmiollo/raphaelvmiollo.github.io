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
    
    // Criar botão "voltar ao topo"
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    backToTopButton.setAttribute('title', 'Voltar ao topo');
    
    // Adicionar botão ao body
    document.body.appendChild(backToTopButton);
    
    // Função para verificar se está em viewport mobile
    function isMobile() {
        return window.innerWidth <= 991;
    }
    
    // Função para controlar visibilidade do header mobile baseado no scroll
    function handleMobileHeaderVisibility() {
        if (!isMobile()) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = 300; // Altura aproximada do header principal
        
        if (scrollTop <= headerHeight) {
            mobileHeaderContainer.classList.add('show-on-top');
        } else {
            mobileHeaderContainer.classList.remove('show-on-top');
        }
    }
    
    // Função para controlar visibilidade do botão "voltar ao topo"
    function handleBackToTopVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const showButtonAt = 400; // Mostrar botão após 400px de scroll
        
        if (scrollTop > showButtonAt) {
            if (!backToTopButton.classList.contains('show')) {
                backToTopButton.classList.add('show');
                
                // Adicionar animação de pulso único apenas quando aparecer pela primeira vez
                setTimeout(() => {
                    if (backToTopButton.classList.contains('show')) {
                        backToTopButton.classList.add('pulse-once');
                        
                        // Remover a classe de pulso após a animação
                        setTimeout(() => {
                            backToTopButton.classList.remove('pulse-once');
                        }, 1000); // Duração da animação
                    }
                }, 200); // Pequeno delay para garantir que o botão já apareceu
            }
        } else {
            backToTopButton.classList.remove('show', 'pulse-once');
        }
    }
    
    // Função para scroll suave ao topo
    function scrollToTop() {
        const duration = 800; // Duração da animação em ms
        const start = window.pageYOffset;
        const startTime = performance.now();
        
        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (easeInOutCubic)
            const easeInOutCubic = progress => 
                progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Inicializar visibilidade do header mobile
    if (isMobile()) {
        mobileHeaderContainer.classList.add('show-on-top');
    }
    
    // Listener para scroll
    window.addEventListener('scroll', function() {
        handleMobileHeaderVisibility();
        handleBackToTopVisibility();
    });
    
    // Event listener para o botão "voltar ao topo"
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
        
        // Remover animação de pulso ao clicar
        backToTopButton.classList.remove('pulse-once');
    });
    
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
    handleMobileHeaderVisibility(); // Também verificar a posição inicial
    handleBackToTopVisibility(); // Verificar se deve mostrar o botão
    window.addEventListener('resize', function() {
        adjustLogoVisibility();
        handleMobileHeaderVisibility();
        handleBackToTopVisibility();
    });
    
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
            
            // Forçar exibição do header quando menu aberto
            mobileHeaderContainer.classList.add('show-on-top');
            
            // Forçar exibição
            menuTech.style.display = 'flex';
            menuTech.style.visibility = 'visible';
            menuTech.style.zIndex = '99998';
            
            console.log('Menu aberto'); // Debug
        } else {
            // Fechar menu
            menuTech.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Verificar se deve mostrar o header baseado na posição de scroll
            handleMobileHeaderVisibility();
            
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
                
                // Verificar se deve mostrar o header baseado na posição de scroll
                handleMobileHeaderVisibility();
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
                
                // Verificar se deve mostrar o header baseado na posição de scroll
                handleMobileHeaderVisibility();
                
                window.scrollTo(0, scrollPosition);
            }
        }
    });
    
    // Debug: verificar se os elementos foram criados
    console.log('Menu tech:', menuTech);
    console.log('Menu toggle:', menuToggle);
    console.log('Mobile header:', mobileHeaderContainer);
});