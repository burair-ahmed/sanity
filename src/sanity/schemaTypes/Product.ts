import { defineField, defineType } from "sanity";

export const Product = defineType({
    name: "product",
    title: "Product",
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
            type: "text",
            }),
    ]
})