import { 
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Category,
  type InsertCategory,
  type BlogPostImage,
  type InsertBlogPostImage,
  blogPosts,
  categories,
  blogPostImages,
  users
} from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, asc, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(published?: boolean): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  incrementViewCount(id: string): Promise<void>;
  
  // Category methods
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Blog post image methods
  getBlogPostImages(blogPostId: string): Promise<BlogPostImage[]>;
  createBlogPostImage(image: InsertBlogPostImage): Promise<BlogPostImage>;
  deleteBlogPostImage(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required");
    }
    const sql = postgres(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Blog post methods
  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return result[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result[0];
  }

  async getAllBlogPosts(published?: boolean): Promise<BlogPost[]> {
    if (published !== undefined) {
      return await this.db.select().from(blogPosts)
        .where(eq(blogPosts.published, published))
        .orderBy(desc(blogPosts.created_at));
    }
    return await this.db.select().from(blogPosts).orderBy(desc(blogPosts.created_at));
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await this.db.insert(blogPosts).values(blogPost).returning();
    return result[0];
  }

  async updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await this.db.update(blogPosts)
      .set({ ...blogPost, updated_at: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id)).returning({ id: blogPosts.id });
    return result.length > 0;
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.db.update(blogPosts)
      .set({ view_count: sql`${blogPosts.view_count} + 1` })
      .where(eq(blogPosts.id, id));
  }

  // Category methods
  async getCategory(id: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return result[0];
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return result[0];
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.db.select().from(categories).orderBy(asc(categories.name));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const result = await this.db.update(categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await this.db.delete(categories).where(eq(categories.id, id)).returning({ id: categories.id });
    return result.length > 0;
  }

  // Blog post image methods
  async getBlogPostImages(blogPostId: string): Promise<BlogPostImage[]> {
    return await this.db.select().from(blogPostImages)
      .where(eq(blogPostImages.blog_post_id, blogPostId))
      .orderBy(asc(blogPostImages.position));
  }

  async createBlogPostImage(image: InsertBlogPostImage): Promise<BlogPostImage> {
    const result = await this.db.insert(blogPostImages).values(image).returning();
    return result[0];
  }

  async deleteBlogPostImage(id: string): Promise<boolean> {
    const result = await this.db.delete(blogPostImages).where(eq(blogPostImages.id, id)).returning({ id: blogPostImages.id });
    return result.length > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogPosts: Map<string, BlogPost>;
  private categories: Map<string, Category>;
  private blogPostImages: Map<string, BlogPostImage>;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.categories = new Map();
    this.blogPostImages = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog post methods
  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getAllBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    if (published !== undefined) {
      return posts.filter(post => post.published === published);
    }
    return posts.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const post: BlogPost = {
      ...blogPost,
      id,
      created_at: now,
      updated_at: now,
      view_count: 0,
      featured_image: blogPost.featured_image ?? null,
      author_avatar: blogPost.author_avatar ?? null,
      published: blogPost.published ?? null,
      published_at: blogPost.published_at ?? null,
      tags: blogPost.tags ?? null
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = {
      ...existing,
      ...blogPost,
      updated_at: new Date()
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async incrementViewCount(id: string): Promise<void> {
    const post = this.blogPosts.get(id);
    if (post) {
      post.view_count = (post.view_count || 0) + 1;
      this.blogPosts.set(id, post);
    }
  }

  // Category methods
  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const cat: Category = {
      ...category,
      id,
      created_at: new Date(),
      description: category.description ?? null
    };
    this.categories.set(id, cat);
    return cat;
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const existing = this.categories.get(id);
    if (!existing) return undefined;
    
    const updated: Category = { ...existing, ...category };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Blog post image methods
  async getBlogPostImages(blogPostId: string): Promise<BlogPostImage[]> {
    return Array.from(this.blogPostImages.values())
      .filter(img => img.blog_post_id === blogPostId)
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  }

  async createBlogPostImage(image: InsertBlogPostImage): Promise<BlogPostImage> {
    const id = randomUUID();
    const img: BlogPostImage = {
      ...image,
      id,
      created_at: new Date(),
      alt_text: image.alt_text ?? null,
      caption: image.caption ?? null,
      position: image.position ?? null
    };
    this.blogPostImages.set(id, img);
    return img;
  }

  async deleteBlogPostImage(id: string): Promise<boolean> {
    return this.blogPostImages.delete(id);
  }
}

// Use DatabaseStorage for production, MemStorage for testing
export const storage = new DatabaseStorage();
