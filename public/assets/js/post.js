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
