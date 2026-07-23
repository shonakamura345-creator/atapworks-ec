import { MetadataRoute } from 'next';
import { products } from './data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atapworks.co.jp';
  const now = new Date();

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/store/${product.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productPages,
  ];
}
