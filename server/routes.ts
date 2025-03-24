import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ProfileType, profileTypes } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all profiles
  app.get("/api/profiles", async (_req: Request, res: Response) => {
    try {
      const profiles = await storage.getProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profiles" });
    }
  });

  // Get profile by type
  app.get("/api/profiles/:type", async (req: Request, res: Response) => {
    try {
      const typeSchema = z.enum(profileTypes);
      const type = typeSchema.parse(req.params.type) as ProfileType;
      const profile = await storage.getProfile(type);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile type" });
    }
  });

  // Get all experiences
  app.get("/api/experiences", async (_req: Request, res: Response) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  // Get experience by ID
  app.get("/api/experiences/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const experience = await storage.getExperience(id);
      
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      
      res.json(experience);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  // Get all skills
  app.get("/api/skills", async (_req: Request, res: Response) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Get skill by ID
  app.get("/api/skills/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const skill = await storage.getSkill(id);
      
      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }
      
      res.json(skill);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skill" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get projects for specific profile type
  app.get("/api/projects/profile/:type", async (req: Request, res: Response) => {
    try {
      const typeSchema = z.enum(profileTypes);
      const type = typeSchema.parse(req.params.type) as ProfileType;
      
      const allProjects = await storage.getProjects();
      const filteredProjects = allProjects.filter(project => 
        'relevantFor' in project && project.relevantFor.includes(type)
      );
      
      res.json(filteredProjects);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile type" });
    }
  });

  // Get project by ID
  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Get all education items
  app.get("/api/education", async (_req: Request, res: Response) => {
    try {
      const education = await storage.getEducation();
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education items" });
    }
  });
  
  // Also support the plural form for consistency with other endpoints
  app.get("/api/educations", async (_req: Request, res: Response) => {
    try {
      const education = await storage.getEducation();
      res.json(education);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education items" });
    }
  });

  // Get education item by ID
  app.get("/api/education/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const educationItem = await storage.getEducationItem(id);
      
      if (!educationItem) {
        return res.status(404).json({ message: "Education item not found" });
      }
      
      res.json(educationItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education item" });
    }
  });
  
  // Also support the plural form for consistency with other endpoints
  app.get("/api/educations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const educationItem = await storage.getEducationItem(id);
      
      if (!educationItem) {
        return res.status(404).json({ message: "Education item not found" });
      }
      
      res.json(educationItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch education item" });
    }
  });

  // Get all content for a profile
  app.get("/api/content/:profileType", async (req: Request, res: Response) => {
    try {
      const typeSchema = z.enum(profileTypes);
      const profileType = typeSchema.parse(req.params.profileType) as ProfileType;
      
      const [experiences, skills, projects, education, profile] = await Promise.all([
        storage.getExperiences(),
        storage.getSkills(),
        storage.getProjects(),
        storage.getEducation(),
        storage.getProfile(profileType),
      ]);
      
      // Filter projects based on profile type
      const filteredProjects = projects.filter(project => 
        'relevantFor' in project && project.relevantFor.includes(profileType)
      );

      res.json({
        profile,
        experiences,
        skills,
        projects: filteredProjects,
        education,
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid profile type or error fetching content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
