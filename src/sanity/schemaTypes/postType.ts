import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            title: "Post Slug",
           type: "string", 
        }),
        defineField({
            name: "title",
            title: "Post Title",
           type: "string", 
        }),
        defineField({
            name: "subtitle",
            title: "Post Subtitle",
           type: "string", 
        }),
        defineField({
            name: "image",
            title: "Post image",
           type: "image", 
        }),
        defineField({
            name: "description",
            title: "Content",
            type: "array",
            of: [
              { type: "block" }, // Allow block-level elements like paragraphs, headings, bold, etc.
            ],
          }),      
            defineField(
                {
                    name: 'gallery',
                    type: 'array',
                    of: [
                      { type: 'image' }
                    ],
                    options: {
                      layout: 'grid'
                    }
                  }
            )
    ]
})