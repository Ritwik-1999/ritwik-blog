import { notes } from "./notes"
import { reflections } from "./reflections"

export const posts = [
  ...notes.map(post => ({ ...post, category: "Engineering", path: `/notes/${post.slug}` })),
  ...reflections.map(post => ({ ...post, description: post.text, category: "Reflections", path: `/reflections/${post.slug}` })),
].filter(post => post.status !== "draft").map(post => ({
  ...post,
  readTime: `${Math.max(1, Math.ceil(post.content.map(block => block.text || block.items?.join(" ") || "").join(" ").split(/\s+/).length / 200))} min read`,
})).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
