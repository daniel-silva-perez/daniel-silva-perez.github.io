const categoryBtns = document.querySelectorAll('.category-btn');
const postRows = document.querySelectorAll('.post-row');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        postRows.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.style.display = 'grid';
            } else {
                post.style.display = 'none';
            }
        });
    });
});
