document.addEventListener('DOMContentLoaded', function() {
    // Add scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add subtle typing effect to subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';

    let i = 0;
    const typeWriter = setInterval(() => {
        subtitle.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(typeWriter);
        }
    }, 100);
});