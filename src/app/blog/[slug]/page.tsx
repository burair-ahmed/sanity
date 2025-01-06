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
          className="flex mb-7 items-center px-1 sm:px-8 md:px-14 my-4 flex-col gap-3"
          key={blog._id}
        >
          <div>
            <div className="flex items-center justify-center mb-3">
              <h1 className="font-bold mx-auto mt-5 text-4xl">
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
                width={500}
                height={500}
                className="self-center mt-5 h-auto bg-cover rounded-md"
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
