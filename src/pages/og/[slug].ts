import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const collectionEntries = await getCollection('blog');

const pages = Object.fromEntries(
	collectionEntries
		.filter((post) => !post.data.draft)
		.map(({ id, data }) => [id, data])
);

export const { getStaticPaths, GET } = await OGImageRoute({
	param: 'slug',
	pages,
	getImageOptions: (_path, page) => ({
		title: page.title,
		description: page.description,
		bgGradient: [[247, 243, 235], [236, 228, 211]],
		border: { color: [186, 152, 104], width: 8, side: 'inline-start' },
		padding: 60,
		font: {
			title: { size: 72, families: ['Lora', 'Georgia', 'Times New Roman'] },
			description: { size: 32, families: ['Inter', 'system-ui', 'sans-serif'] },
		},
	}),
});
