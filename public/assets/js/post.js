// Text-to-Speech (Web Speech API)
function initTTS() {
    if (!('speechSynthesis' in window)) return;
    const btn = document.getElementById('ttsToggle');
    const stopBtn = document.getElementById('ttsStop');
    const content = document.querySelector('.post-content');
    if (!btn || !content || btn.dataset.ttsBound === '1') return;
    btn.dataset.ttsBound = '1';

    const synth = window.speechSynthesis;
    const label = btn.querySelector('.tts-label');

    function gatherText() {
        const excluded = '.author-bio, .reply-link, .related-posts, .post-pager';
        return Array.from(content.children)
            .filter((el) => !el.matches(excluded) && !el.classList.contains('post-featured-image'))
            .map((el) => (el.textContent || '').trim())
            .filter(Boolean)
            .join(' ');
    }

    function pickVoice() {
        const voices = synth.getVoices();
        return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('en')) || voices[0] || null;
    }

    function setState(state) {
        btn.dataset.state = state;
        btn.setAttribute('aria-pressed', state === 'playing' ? 'true' : 'false');
        if (label) label.textContent = state === 'playing' ? 'Pause' : state === 'paused' ? 'Resume' : 'Listen';
        if (stopBtn) stopBtn.hidden = state === 'idle';
    }

    function speak() {
        synth.cancel();
        const text = gatherText();
        const sentences = text.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [text];
        const voice = pickVoice();
        sentences.forEach((s, i) => {
            const u = new SpeechSynthesisUtterance(s.trim());
            if (voice) u.voice = voice;
            u.rate = 1;
            u.pitch = 1;
            if (i === sentences.length - 1) {
                u.onend = () => { if (btn.dataset.state !== 'paused') setState('idle'); };
            }
            synth.speak(u);
        });
        setState('playing');
    }

    function toggle() {
        const state = btn.dataset.state;
        if (state === 'playing') { synth.pause(); setState('paused'); }
        else if (state === 'paused') { synth.resume(); setState('playing'); }
        else { speak(); }
    }

    function stop() { synth.cancel(); setState('idle'); }

    btn.addEventListener('click', toggle);
    if (stopBtn) stopBtn.addEventListener('click', stop);
    document.addEventListener('astro:before-swap', stop, { once: true });
    window.addEventListener('beforeunload', stop);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && btn.dataset.state === 'playing') { synth.pause(); setState('paused'); }
    });

    if (synth.getVoices().length === 0 && 'onvoiceschanged' in synth) {
        synth.addEventListener('voiceschanged', () => {}, { once: true });
    }
}
initTTS();
document.addEventListener('astro:page-load', initTTS);

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
