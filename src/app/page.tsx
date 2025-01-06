'use client'

import { useEffect, useState } from "react";
import { fetchPosts } from "@/pages/api/posts";

import { postType } from "../sanity/schemaTypes/postType";
import { Image } from "next-sanity/image";
import Link from "next/link";
import Header from "./components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Hero from "./components/hero";

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

  <Header/>
  <Hero/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {posts.map((post) => (
    <Link href={`/blog/${post.slug}`} key={post._id}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
          <CardDescription className="text-gray-500">
            {post.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={350}
              height={200}
              className="rounded-md"
            />
          )}
        </CardContent>
        <CardFooter className="text-[#743c08] font-bold">
          Read More
        </CardFooter>
      </Card>
    </Link>
  ))}
</div>


</div>
  );
}
