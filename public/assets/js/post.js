// Reading Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const readingProgress = document.getElementById('readingProgress');
    if (readingProgress) {
        readingProgress.style.width = scrollPercent + '%';
    }
});

// TOC Mobile Toggle
function toggleToc() {
    const toc = document.getElementById('toc');
    const toggle = document.getElementById('tocToggle');
    if (toc && toggle) {
        toc.classList.toggle('toc-visible');
        toggle.classList.toggle('open');
    }
}

// TOC Active State
const tocLinks = document.querySelectorAll('.toc-list a');
const sections = document.querySelectorAll('.post-content h2[id], .post-content h3[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Share Functions
function shareTwitter(title) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title || document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function copyLink(event) {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = event.currentTarget;
        const original = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        window.applyCaseMode?.(document.documentElement.getAttribute('data-case') === 'lowercase' ? 'lowercase' : 'regular');
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    });
}
