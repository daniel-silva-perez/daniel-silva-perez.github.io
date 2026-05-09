// Tag data
const postsByTag = {
    'Life': [
        { title: 'The Art of Slow Living', category: 'Life', date: 'Dec 15, 2024', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80' },
        { title: 'The Morning Cup as a Small Discipline', category: 'Life', date: 'Nov 28, 2024', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
        { title: 'A Week of Refusing the Feed', category: 'Life', date: 'Oct 20, 2024', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80' }
    ],
    'Notes': [
        { title: 'Small Things I Keep Returning To', category: 'Notes', date: 'May 2, 2026', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80' },
        { title: 'Three Thoughts From This Week', category: 'Notes', date: 'Apr 12, 2026', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80' },
        { title: 'A Few Notes on Restlessness', category: 'Notes', date: 'Mar 28, 2026', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80' }
    ],
    'Philosophy': [
        { title: 'On Letting a Year Remain Uneven', category: 'Philosophy', date: 'Apr 28, 2026', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80' },
        { title: 'The Art of Slow Living', category: 'Philosophy', date: 'Dec 15, 2024', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80' },
        { title: 'Against the Worship of Output', category: 'Philosophy', date: 'Oct 25, 2024', image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80' }
    ],
    'Books': [
        { title: 'Books That Quieted Something in Me', category: 'Books', date: 'Apr 22, 2026', image: 'https://images.unsplash.com/photo-1542831371-29b0a2429b89?w=600&q=80' },
        { title: 'A Novel I Still Think About', category: 'Books', date: 'Mar 18, 2026', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80' },
        { title: 'What I Marked Up This Month', category: 'Books', date: 'Feb 12, 2026', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80' }
    ],
    'Art': [
        { title: 'A Painting I Could Not Stop Looking At', category: 'Art', date: 'Nov 15, 2024', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80' },
        { title: 'Why Certain Rooms Make Me Think Better', category: 'Art', date: 'Sep 22, 2024', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80' },
        { title: 'Notes on Color, Silence, and Form', category: 'Art', date: 'Sep 5, 2024', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' }
    ],
    'Tech': [
        { title: 'What I Am Learning from Building with AI', category: 'Tech', date: 'Dec 5, 2024', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80' },
        { title: 'Systems That Reward Patience', category: 'Tech', date: 'Dec 10, 2024', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80' },
        { title: 'Reclaiming Focus in the Digital Age', category: 'Tech', date: 'Apr 14, 2026', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' }
    ]
};

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
        <article class="tagged-post-card" onclick="location.href='post.html'">
            <div class="tagged-post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="tagged-post-content">
                <span class="tagged-post-category">${post.category}</span>
                <h3 class="tagged-post-title">${post.title}</h3>
                <div class="tagged-post-meta">${post.date}</div>
            </div>
        </article>
    `).join('');

    postsSection.classList.add('visible');
    window.applyCaseMode?.(document.documentElement.getAttribute('data-case') === 'lowercase' ? 'lowercase' : 'regular');
    postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
