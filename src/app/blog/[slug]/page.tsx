'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { postType } from "@/sanity/schemaTypes/postType";
import { client } from "../../../sanity/lib/client";

async function getData(slug: string): Promise<typeof postType[]> {
  const query = `
    *[_type == "post" && slug == '${slug}']{
      _id,
      slug,
      title,
      subtitle,
      "imageUrl": image.asset->url,
      description
    }`;

  const data: typeof postType[] = await client.fetch(query);
  return data;
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<typeof postType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData(params.slug);
      setArticle(result);
    }

    fetchData();
  }, [params.slug]);

  return (
    <div>
      {article.map((blog) => (
        <div
          className="flex mb-7 items-center px-1 sm:px-8 md:px-14 my-4 flex-col gap-3"
          key={blog._id}
        >
          <span className="text-primary text-lg tracking-wide font-normal ">
            Knowledge-Hub
          </span>
          <div>
            <div className="flex items-center justify-center mb-3">
              <h1 className="font-bold self-center tracking-wider mt-5 text-4xl">
                {blog.title}
              </h1>
            </div>

            {blog.subtitle && (
              <h2 className="text-xl font-medium text-gray-600 mt-2">
                {blog.subtitle}
              </h2>
            )}

            <div className="w-[63vw] flex justify-center items-center">
              <Image
                src={blog.imageUrl || "/placeholder.png"}
                alt={blog.title || "Blog Image"}
                width={100}
                height={100}
                className="w-[60vw] self-center mt-5 h-auto bg-cover rounded-md"
              />
            </div>

            <div className="flex items-center justify-center">
              <p className="w-[65vw] mt-5 text-wrap tracking-wide leading-9 ">
                {blog.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
