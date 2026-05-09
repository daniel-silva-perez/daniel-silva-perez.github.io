import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: 'Danny Silva | Personal Notebook',
		description: "Danny Silva's public notebook for thoughts on philosophy, art, technology, attention, what he is building, and what he is reading.",
		site: context.site,
		items: posts
			.filter((post) => !post.data.draft)
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/blog/${post.slug}/`,
				categories: post.data.tags,
			})),
		customData: `<language>en-us</language>`,
	});
}
