// Main JavaScript file for NightmareDesk

// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add spooky cursor effect
    const body = document.querySelector('body');
    let cursorTrail;
    
    body.addEventListener('mousemove', function(e) {
        if (!cursorTrail) {
            cursorTrail = document.createElement('div');
            cursorTrail.className = 'cursor-trail';
            document.body.appendChild(cursorTrail);
            
            setTimeout(() => {
                document.body.removeChild(cursorTrail);
                cursorTrail = null;
            }, 500);
        }
        
        cursorTrail.style.left = e.pageX + 'px';
        cursorTrail.style.top = e.pageY + 'px';
    });
    
    // Random flicker effect for horror theme
    setInterval(() => {
        const shouldFlicker = Math.random() > 0.99; // 1% chance of flicker
        
        if (shouldFlicker) {
            body.classList.add('flicker');
            setTimeout(() => {
                body.classList.remove('flicker');
            }, 100);
        }
    }, 1000);
});
