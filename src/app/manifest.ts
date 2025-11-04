import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Sensational League',
		short_name: 'SL',
		description: 'Fast. Rebellious. Female. - Women\'s 7v7 football league combining athletic excellence with social impact',
		start_url: '/',
		display: 'standalone',
		background_color: '#232324',
		theme_color: '#D4FF00',
		icons: [
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icon-192-maskable.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-512-maskable.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
