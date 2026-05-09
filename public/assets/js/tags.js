// Tag data - injected by Astro build via define:vars
const postsByTag = window.__POSTS_BY_TAG__ || {};

let activeTag = null;

window.filterByTag = function(element) {
    const tag = element.dataset.tag;
    const postsSection = document.getElementById('taggedPosts');
    const postsList = document.getElementById('taggedPostsList');
    const activeTagName = document.getElementById('activeTagName');

    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));

    if (activeTag === tag) {
        activeTag = null;
        postsSection.classList.remove('visible');
        return;
    }

    activeTag = tag;
    element.classList.add('active');

    const posts = postsByTag[tag] || [];
    activeTagName.textContent = tag;
    postsList.innerHTML = posts.map(post => `
        <article class="tagged-post-card" onclick="location.href='/blog/${post.slug}'">
            <div class="tagged-post-image">
                ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            </div>
            <div class="tagged-post-content">
                <span class="tagged-post-category">${post.category}</span>
                <h3 class="tagged-post-title">${post.title}</h3>
                <div class="tagged-post-meta">${post.date} · ${post.readTime}</div>
            </div>
        </article>
    `).join('');

    postsSection.classList.add('visible');
    window.applyCaseMode?.(document.documentElement.getAttribute('data-case') === 'lowercase' ? 'lowercase' : 'regular');
    postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Tag click handlers
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        window.filterByTag(this);
    });
});

// Search filter
const tagSearch = document.getElementById('tagSearch');
if (tagSearch) {
    tagSearch.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.tag').forEach(tag => {
            const tagName = tag.dataset.tag.toLowerCase();
            tag.style.display = tagName.includes(query) ? 'inline-flex' : 'none';
        });
    });
}
