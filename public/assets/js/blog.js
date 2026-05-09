// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input[type="email"]');
        const message = document.getElementById('newsletterMessage');
        const email = input.value.trim();

        if (!email || !email.includes('@')) {
            message.textContent = 'Please enter a valid email address.';
            message.className = 'newsletter-message error';
            return;
        }

        message.textContent = 'Thanks for subscribing! Check your inbox.';
        message.className = 'newsletter-message success';
        input.value = '';

        setTimeout(() => {
            message.textContent = '';
            message.className = 'newsletter-message';
        }, 5000);
    });
}
