import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(['ai', 'quant', 'other']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(['ai', 'quant', 'other']),
    tags: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
