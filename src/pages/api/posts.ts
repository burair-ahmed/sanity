import { client } from '../../sanity/lib/client';
import { postType } from '../../sanity/schemaTypes/postType';

export async function fetchPosts(): Promise<typeof postType[]> {
  const query = `*[_type == "post"]{
    _id,
    slug,
    title,
    subtitle,
    "imageUrl": image.asset->url,
    description
  }`;

  try {
    const posts:typeof postType[] = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}
