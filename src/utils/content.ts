import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getFeaturedPosts(limit = 6) {
  const posts = await getPosts();
  return posts.filter(p => p.data.featured).slice(0, limit);
}

export async function getPostsByCategory(category: 'ai' | 'quant' | 'other') {
  const posts = await getPosts();
  return posts.filter(p => p.data.category === category);
}

export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getFeaturedProjects(limit = 4) {
  const projects = await getProjects();
  return projects.filter(p => p.data.featured).slice(0, limit);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
