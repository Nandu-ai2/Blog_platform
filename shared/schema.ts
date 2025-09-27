import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featured_image: text("featured_image"),
  author_name: text("author_name").notNull(),
  author_avatar: text("author_avatar"),
  published: boolean("published").default(false),
  published_at: timestamp("published_at"),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at").default(sql`now()`),
  view_count: integer("view_count").default(0),
  tags: text("tags").array(),
});

// Categories table
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  created_at: timestamp("created_at").default(sql`now()`),
});

// Blog post images table (for multiple images per post)
export const blogPostImages = pgTable("blog_post_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blog_post_id: varchar("blog_post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
  image_url: text("image_url").notNull(),
  alt_text: text("alt_text"),
  caption: text("caption"),
  position: integer("position").default(0),
  created_at: timestamp("created_at").default(sql`now()`),
});

// Zod schemas
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  created_at: true,
  updated_at: true,
  view_count: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  created_at: true,
});

export const insertBlogPostImageSchema = createInsertSchema(blogPostImages).omit({
  id: true,
  created_at: true,
});

// Types
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type BlogPostImage = typeof blogPostImages.$inferSelect;
export type InsertBlogPostImage = z.infer<typeof insertBlogPostImageSchema>;

// Legacy user types (keeping for compatibility)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;