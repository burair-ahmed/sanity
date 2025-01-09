'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { postType } from "@/sanity/schemaTypes/postType";
import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";


async function getData(slug: string): Promise<typeof postType[]> {
  const query = `
  *[_type == "post" && slug == '${slug}']{
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


  const data: typeof postType[] = await client.fetch(query);
  return data;
}

type postType = {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  description: string;
  gallery: { url: string }[];
};




export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState< typeof postType[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [currentComment, setCurrentComment] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const result = await getData(params.slug);
      setArticle(result);
    }

    fetchData();
  }, [params.slug]);

  const handleCommentSubmit = () => {
    if (currentComment.trim()) {
      setComments([currentComment, ...comments]);
      setCurrentComment("");
    }
  }

  return (
    <div>
{article.map((blog) => (
  <div
    className="flex flex-col gap-6 px-4 sm:px-8 md:px-14 my-8"
    key={blog._id}
  >
    <div className="text-center">

      <h1 className="font-bold text-4xl text-gray-800">{blog.title}</h1>

      {blog.subtitle && (
        <h2 className="text-lg text-gray-600 font-medium mt-2">{blog.subtitle}</h2>
      )}
    </div>

    <div className="w-full flex justify-center">
      <Image
        src={blog.imageUrl || "/placeholder.png"}
        alt={blog.title || "Blog Image"}
        width={800}
        height={400}
        className="rounded-lg shadow-lg object-cover"
      />
    </div>

    <div className="prose max-w-none mx-auto text-gray-700 text-justify leading-8">
    <PortableText value={blog.description} />
    </div>

    {blog.gallery && blog.gallery.length > 0 && (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {blog.gallery.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-200 w-400 h-300 mx-auto"
            >
             <Image
  src={image.url}
  alt={`Gallery image ${index + 1}`}
  width={400}
  height={300}
  className="w-[400px] h-[300px] object-cover rounded-lg"
/>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
))}


      <div className="w-[65vw] mt-10 mx-auto p-5 border rounded-md">
        <h3 className="text-lg font-bold mb-3">Comments</h3>
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-md p-2"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Post
          </button>
        </div>
        <div className="space-y-3">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-3 border rounded-md bg-gray-100">
                {comment}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}
