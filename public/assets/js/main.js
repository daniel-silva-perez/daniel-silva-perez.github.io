// ── Scroll animations ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Nav scroll effect ──
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// ── Close mobile menu on link click ──
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
});

// ── Back to top ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Theme toggle ──
(function() {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
    document.getElementById('themeToggle')?.addEventListener('click', function() {
        const current = root.getAttribute('data-theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let next;
        if (!current) next = systemDark ? 'light' : 'dark';
        else if (current === 'dark') next = 'light';
        else next = 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
})();

// ── Case toggle ──
(function() {
    const root = document.documentElement;
    const caseToggle = document.getElementById('caseToggle');
    const originalText = new Map();
    const originalAttributes = new Map();
    function rememberText() {
        const textWalker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    const parent = node.parentElement;
                    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG'].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        const nodes = [];
        let node;
        while ((node = textWalker.nextNode())) nodes.push(node);
        nodes.forEach(textNode => {
            if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue);
        });

        document.querySelectorAll('input[placeholder], textarea[placeholder], input[value], button[aria-label], a[aria-label], [title]').forEach(el => {
            if (!originalAttributes.has(el)) {
                originalAttributes.set(el, {
                    placeholder: el.getAttribute('placeholder'),
                    value: el.getAttribute('value'),
                    ariaLabel: el.getAttribute('aria-label'),
                    title: el.getAttribute('title')
                });
            }
        });
    }

    function transformAttributes(el, originals, lowercase) {
        [
            ['placeholder', originals.placeholder],
            ['value', originals.value],
            ['aria-label', originals.ariaLabel],
            ['title', originals.title]
        ].forEach(([name, value]) => {
            if (value === null) return;
            el.setAttribute(name, lowercase ? value.toLowerCase() : value);
        });
    }

    window.applyCaseMode = function(mode) {
        rememberText();
        const lowercase = mode === 'lowercase';
        originalText.forEach((value, node) => {
            node.nodeValue = lowercase ? value.toLowerCase() : value;
        });
        originalAttributes.forEach((value, el) => transformAttributes(el, value, lowercase));
        root.toggleAttribute('data-case', lowercase);
        if (lowercase) root.setAttribute('data-case', 'lowercase');
        if (caseToggle) {
            caseToggle.setAttribute('aria-pressed', String(lowercase));
            caseToggle.textContent = lowercase ? 'aa' : 'Aa';
        }
    };

    const saved = localStorage.getItem('caseMode') === 'regular' ? 'regular' : 'lowercase';
    window.applyCaseMode(saved);

    caseToggle?.addEventListener('click', () => {
        const next = root.getAttribute('data-case') === 'lowercase' ? 'regular' : 'lowercase';
        localStorage.setItem('caseMode', next);
        window.applyCaseMode(next);
    });
})();
