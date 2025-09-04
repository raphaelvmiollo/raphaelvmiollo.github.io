document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navTech = document.querySelector('.nav-tech');
    const menuLinks = document.querySelectorAll('.tech-link');

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        navTech.classList.toggle('active');
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navTech.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navTech.contains(e.target) && !menuToggle.contains(e.target)) {
            navTech.classList.remove('active');
        }
    });
});