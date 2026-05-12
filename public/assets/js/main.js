// Re-run all setup on initial load AND after each Astro view transition swap.
function setup() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Scroll animations ──
    const fadeEls = document.querySelectorAll('.fade-up:not(.visible)');
    if (reduceMotion) {
        fadeEls.forEach(el => el.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        fadeEls.forEach(el => observer.observe(el));
    }

    // ── Mobile menu toggle ──
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks && !mobileToggle.dataset.bound) {
        mobileToggle.dataset.bound = '1';
        mobileToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', String(open));
        });
    }

    // ── Close mobile menu on link click ──
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.dataset.bound) return;
        a.dataset.bound = '1';
        a.addEventListener('click', () => document.querySelector('.nav-links')?.classList.remove('open'));
    });

    // ── Back to top ──
    const backToTop = document.getElementById('backToTop');
    if (backToTop && !backToTop.dataset.bound) {
        backToTop.dataset.bound = '1';
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    // ── Theme toggle ──
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && !themeToggle.dataset.bound) {
        themeToggle.dataset.bound = '1';
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            let next;
            if (!current) next = systemDark ? 'light' : 'dark';
            else if (current === 'dark') next = 'light';
            else next = 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ── Case toggle (re-apply current mode to freshly swapped content) ──
    if (typeof window.applyCaseMode === 'function') {
        const mode = root.getAttribute('data-case') === 'lowercase' ? 'lowercase' : 'regular';
        window.applyCaseMode(mode);
    }
}

// ── Nav scroll effect (global, attach once) ──
if (!window.__navScrollBound) {
    window.__navScrollBound = true;
    window.addEventListener('scroll', () => {
        document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 50);
        document.getElementById('backToTop')?.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
}

// ── Case toggle: define applyCaseMode once globally ──
(function() {
    if (window.__caseInit) return;
    window.__caseInit = true;
    const root = document.documentElement;
    const originalText = new WeakMap();
    const originalAttributes = new WeakMap();

    function rememberText() {
        const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        let node;
        while ((node = textWalker.nextNode())) {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        }
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
        [['placeholder', originals.placeholder], ['value', originals.value], ['aria-label', originals.ariaLabel], ['title', originals.title]].forEach(([name, value]) => {
            if (value === null) return;
            el.setAttribute(name, lowercase ? value.toLowerCase() : value);
        });
    }

    window.applyCaseMode = function(mode) {
        rememberText();
        const lowercase = mode === 'lowercase';
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        let node;
        while ((node = walker.nextNode())) {
            if (originalText.has(node)) {
                const value = originalText.get(node);
                node.nodeValue = lowercase ? value.toLowerCase() : value;
            }
        }
        document.querySelectorAll('input[placeholder], textarea[placeholder], input[value], button[aria-label], a[aria-label], [title]').forEach(el => {
            if (originalAttributes.has(el)) transformAttributes(el, originalAttributes.get(el), lowercase);
        });
        root.toggleAttribute('data-case', lowercase);
        if (lowercase) root.setAttribute('data-case', 'lowercase');
        const caseToggle = document.getElementById('caseToggle');
        if (caseToggle) {
            caseToggle.setAttribute('aria-pressed', String(lowercase));
            caseToggle.textContent = lowercase ? 'aa' : 'Aa';
        }
    };

    document.addEventListener('click', (e) => {
        const target = e.target.closest('#caseToggle');
        if (!target) return;
        const next = root.getAttribute('data-case') === 'lowercase' ? 'regular' : 'lowercase';
        localStorage.setItem('caseMode', next);
        window.applyCaseMode(next);
    });

    const saved = localStorage.getItem('caseMode') === 'regular' ? 'regular' : 'lowercase';
    document.addEventListener('DOMContentLoaded', () => window.applyCaseMode(saved), { once: true });
})();

document.addEventListener('astro:page-load', setup);
if (document.readyState !== 'loading') setup();
else document.addEventListener('DOMContentLoaded', setup);
