document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Scroll Reveal Animations
    function revealElement() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100; // when to appear
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    // Trigger on load and scroll
    window.addEventListener('scroll', revealElement);
    // Add small delay on load for hero animation
    setTimeout(revealElement, 100);

    // 4. Parallax effect for blobs
    window.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const moveX = (x * speed);
            const moveY = (y * speed);
            
            // Only apply transform keeping original positioning in mind 
            // Better accomplished with translate values
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});
