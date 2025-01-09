'use client'

import { useEffect, useState } from "react";
// import { fetchPosts } from "@/pages/api/posts";
import type { postType } from "../sanity/schemaTypes/postType";
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
import { PortableTextBlock } from "@portabletext/types";
import { client } from "../sanity/lib/client";


type postType = {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  description: PortableTextBlock[];
  gallery: { url: string }[];
};

async function getData(): Promise<postType[]> {
  const query = `
  *[_type == "post"]{
    _id,
    slug,
    title,
    subtitle,
    "imageUrl": coalesce(image.asset->url, ""),
    description,
    gallery[] {
      "url": coalesce(asset->url, "")
    }
  }`;
    const data: postType[] = await client.fetch(query);
    return data;
  }

export default function Home({ params }: { params: { slug: string } }) {
    const [article, setArticle] = useState<postType[]>([]);

 useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setArticle(result);
    }
    fetchData();
  }, [params.slug]);


  return (
    <div>
      <Header />
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 px-8">
        {article.map((post) => (
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
