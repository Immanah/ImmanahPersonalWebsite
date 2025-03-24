import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profile types
export const profileTypes = ["recruiter", "developer", "curious"] as const;
export type ProfileType = typeof profileTypes[number];

// Base content schema
const contentBase = {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  imageUrl: text("image_url").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  timeline: text("timeline"),
  technologies: text("technologies"),
  role: text("role"),
  linkUrl: text("link_url"),
  linkText: text("link_text"),
  details: jsonb("details").$type<string[]>().notNull(),
  galleryImages: jsonb("gallery_images").$type<string[]>().notNull(),
};

// Content tables for different types
export const experiences = pgTable("experiences", {
  ...contentBase,
  company: text("company").notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
});

export const skills = pgTable("skills", {
  ...contentBase,
  category: text("category").notNull(),
  level: integer("level").notNull(),
});

export const projects = pgTable("projects", {
  ...contentBase,
  github: text("github"),
  demo: text("demo"),
  relevantFor: jsonb("relevant_for").$type<ProfileType[]>().notNull(),
});

export const education = pgTable("education", {
  ...contentBase,
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  year: text("year").notNull(),
});

// Profile information
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: profileTypes }).notNull().unique(),
  name: text("name").notNull(),
  badge: text("badge").notNull(),
  description: text("description").notNull(),
  headerProjects: text("header_projects").notNull(),
  avatarUrl: text("avatar_url").notNull(),
});

// Insert schema definitions
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertSkillSchema = createInsertSchema(skills);
export const insertProjectSchema = createInsertSchema(projects);
export const insertEducationSchema = createInsertSchema(education);
export const insertProfileSchema = createInsertSchema(profiles);

// Type definitions
export type Experience = typeof experiences.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Profile = typeof profiles.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

// Content item type (union of all content types)
export type ContentItem = Experience | Skill | Project | Education;
