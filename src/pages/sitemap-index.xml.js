import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('blog');
	const tagSet = new Set();
	const catSet = new Set();
	for (const p of posts) {
		if (p.data.draft) continue;
		for (const t of p.data.tags) tagSet.add(t);
		if (p.data.category) catSet.add(p.data.category);
	}

	const staticPages = ['', '/blog', '/archive', '/tags', '/now', '/about'];

	const urls = [
		...staticPages.map((path) => ({
			url: new URL(path, context.site).href,
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: path === '' ? '1.0' : '0.8',
		})),
		...posts
			.filter((post) => !post.data.draft)
			.map((post) => ({
				url: new URL(`/blog/${post.id}`, context.site).href,
				lastmod: (post.data.updatedDate || post.data.pubDate).toISOString(),
				changefreq: 'monthly',
				priority: '0.7',
			})),
		...[...tagSet].map((tag) => ({
			url: new URL(`/tags/${tag}`, context.site).href,
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: '0.5',
		})),
		...[...catSet].map((cat) => ({
			url: new URL(`/category/${cat}`, context.site).href,
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: '0.5',
		})),
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: { 'Content-Type': 'application/xml' },
	});
}
