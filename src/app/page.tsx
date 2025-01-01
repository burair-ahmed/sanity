'use client'

import { useEffect, useState } from "react";
import { fetchPosts } from "@/pages/api/posts";

import { postType } from "../sanity/schemaTypes/postType";
import { Image } from "next-sanity/image";
import Link from "next/link";

export default function Home() {

  
const [posts, setPosts] = useState<typeof postType[]>([]);


useEffect(() => {
  async function blogpost() {
    const fetchedPosts = await fetchPosts();
    setPosts(fetchedPosts);
  }
  blogpost();
}, []);


  return (
<div>

    <h1>Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <h2>{post.title}</h2>
          <h3>{post.subtitle}</h3>
          {post.imageUrl && <Image src={post.imageUrl} alt={post.title} width={350} height={200} />}
          <button><Link href={`/blog/${post.slug}`}>Read More</Link></button>
        </li>
      ))}
    </ul>
</div>
  );
}
