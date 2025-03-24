import {
  type Experience,
  type Skill,
  type Project,
  type Education,
  type Profile,
  type InsertExperience,
  type InsertSkill,
  type InsertProject,
  type InsertEducation,
  type InsertProfile,
  ProfileType,
  profileTypes,
} from "@shared/schema";

export interface IStorage {
  // Content retrievals
  getExperiences(): Promise<Experience[]>;
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getEducation(): Promise<Education[]>;
  
  // Individual item retrievals
  getExperience(id: number): Promise<Experience | undefined>;
  getSkill(id: number): Promise<Skill | undefined>;
  getProject(id: number): Promise<Project | undefined>;
  getEducationItem(id: number): Promise<Education | undefined>;
  
  // Profile operations
  getProfiles(): Promise<Profile[]>;
  getProfile(type: ProfileType): Promise<Profile | undefined>;
  
  // Item insertions (for initializing data)
  createExperience(item: InsertExperience): Promise<Experience>;
  createSkill(item: InsertSkill): Promise<Skill>;
  createProject(item: InsertProject): Promise<Project>;
  createEducation(item: InsertEducation): Promise<Education>;
  createProfile(profile: InsertProfile): Promise<Profile>;
}

export class MemStorage implements IStorage {
  private experiences: Map<number, Experience>;
  private skills: Map<number, Skill>;
  private projects: Map<number, Project>;
  private education: Map<number, Education>;
  private profiles: Map<string, Profile>;
  
  private expId: number = 1;
  private skillId: number = 1;
  private projectId: number = 1;
  private educationId: number = 1;
  private profileId: number = 1;

  constructor() {
    this.experiences = new Map();
    this.skills = new Map();
    this.projects = new Map();
    this.education = new Map();
    this.profiles = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getEducation(): Promise<Education[]> {
    return Array.from(this.education.values());
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    return this.experiences.get(id);
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getEducationItem(id: number): Promise<Education | undefined> {
    return this.education.get(id);
  }

  async getProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfile(type: ProfileType): Promise<Profile | undefined> {
    return this.profiles.get(type);
  }

  async createExperience(item: InsertExperience): Promise<Experience> {
    const id = this.expId++;
    const experience: Experience = { ...item, id };
    this.experiences.set(id, experience);
    return experience;
  }

  async createSkill(item: InsertSkill): Promise<Skill> {
    const id = this.skillId++;
    const skill: Skill = { ...item, id };
    this.skills.set(id, skill);
    return skill;
  }

  async createProject(item: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { ...item, id };
    this.projects.set(id, project);
    return project;
  }

  async createEducation(item: InsertEducation): Promise<Education> {
    const id = this.educationId++;
    const educationItem: Education = { ...item, id };
    this.education.set(id, educationItem);
    return educationItem;
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const id = this.profileId++;
    const newProfile: Profile = { ...profile, id };
    this.profiles.set(profile.type, newProfile);
    return newProfile;
  }

  private async initializeData() {
    // Initialize profiles
    await this.createProfile({
      type: "recruiter",
      name: "Immanah Makitla",
      badge: "Final-Year Computer Science Student | AI & Software Development Enthusiast | Leadership in Tech & Academia",
      description: "I am a dedicated final-year Computer Science student with a comprehensive skill set in software development, AI, and network security. Over the course of my academic journey, I have worked on multiple real-world projects that have equipped me with the practical skills necessary for a career in technology. My experience ranges from software development in multiple languages to implementing AI-driven systems, as well as managing technical teams and organizing events as Secretary of the International Student Society.",
      headerProjects: "Projects & Portfolio",
      avatarUrl: "/assets/profile-recruiter.svg",
    });

    await this.createProfile({
      type: "developer",
      name: "Immanah Makitla",
      badge: "C++ | Java | Python | C# | AI & ML",
      description: "Fellow developer! I'm a final-year Computer Science student focused on building robust applications using C++, Java, Python, and C#. I'm passionate about AI & machine learning, algorithm design, network security, and applying these skills to real-world problems. As I prepare to enter the professional world, I continue to develop my expertise through hands-on experience and collaborative team projects.",
      headerProjects: "Technical Projects",
      avatarUrl: "/assets/profile-developer.svg",
    });

    await this.createProfile({
      type: "curious",
      name: "Immanah Makitla",
      badge: "Leadership in Tech & Academia | Problem Solver",
      description: "Hi there! I'm a creative problem solver who loves building digital experiences. As a leader in both technical and academic contexts, I combine my technical expertise with soft skills like communication and teamwork to create meaningful solutions. I am passionate about leveraging technology to solve complex problems and bring value to the world.",
      headerProjects: "Creative Projects",
      avatarUrl: "/assets/profile-curious.svg",
    });

    // Initialize work experiences
    await this.createExperience({
      title: "Secretary",
      subtitle: "International Student Society • 2025-Present",
      imageUrl: "/assets/experience-1.svg",
      type: "experience",
      description: "As Secretary of the International Student Society, I am responsible for managing communication between club members, the administration, and external stakeholders. I have led initiatives to organize engaging events that connect international students and create a sense of community. Additionally, I handle all official communications, documentations, and ensure seamless coordination for all club activities.",
      tags: ["Leadership", "Communication", "Event Planning", "Documentation"],
      timeline: "January 2025 - Present",
      technologies: "Office Suite, Project Management Tools, Communication Platforms",
      role: "Secretary",
      linkUrl: "",
      linkText: "",
      details: [
        "Draft official club documents and coordinate meetings with stakeholders",
        "Oversee logistics for both virtual and in-person events",
        "Maintain detailed records of club activities and communications",
        "Collaborate with team members to implement club initiatives and events",
        "Developed organizational systems to improve club efficiency"
      ],
      galleryImages: ["/assets/tech-company-1.svg", "/assets/tech-company-2.svg"],
      company: "International Student Society, Eduvos",
      location: "South Africa",
      duration: "Present",
    });

    await this.createExperience({
      title: "Supplemental Instruction (SI) Leader",
      subtitle: "Eduvos • 2024",
      imageUrl: "/assets/experience-2.svg",
      type: "experience",
      description: "In my role as an SI Leader for Calculus 1A, I led weekly review sessions, assisting students in understanding complex mathematical concepts. I created engaging study materials and fostered an environment that encouraged peer learning. My leadership skills grew through this experience as I was responsible for facilitating productive group discussions, offering personalized support, and ensuring that every student grasped the key concepts.",
      tags: ["Teaching", "Mentoring", "Mathematics", "Public Speaking"],
      timeline: "January 2024 - December 2024",
      technologies: "Educational Software, Calculus, Mathematics",
      role: "SI Leader",
      linkUrl: "",
      linkText: "",
      details: [
        "Explained difficult calculus topics in ways that were accessible and engaging",
        "Created an environment where students felt comfortable asking questions",
        "Developed comprehensive study materials and practice exercises",
        "Used innovative teaching methods to improve student understanding",
        "Tracked student progress and provided targeted assistance for struggling students"
      ],
      galleryImages: ["/assets/agency-1.svg", "/assets/agency-2.svg"],
      company: "Eduvos",
      location: "South Africa",
      duration: "1 year",
    });

    // Initialize skills
    await this.createSkill({
      title: "Software Development",
      subtitle: "C++, Java, Python, C#",
      imageUrl: "/assets/skill-frontend.svg",
      type: "skill",
      description: "Expertise in object-oriented design, particularly in Java, C++, and Python, with a strong focus on reusability and maintainability. Strong foundational understanding of algorithms, data structures, and their practical application.",
      tags: ["C++", "Java", "Python", "C#", "Object-Oriented Programming", "Data Structures", "Algorithms"],
      timeline: "",
      technologies: "C++, Java, Python, C#, Object-Oriented Programming, UML, Design Patterns",
      role: "",
      linkUrl: "",
      linkText: "",
      details: [
        "Proficient in multiple programming languages: Java, Python, C++, and C#",
        "Strong foundation in object-oriented design principles across multiple languages",
        "Experience with software design & architecture using UML, design patterns, and agile methodologies",
        "Experience with web development in both front-end (HTML, CSS, JavaScript, React) and back-end (Flask, Python)",
        "Strong data structures & algorithms implementation skills for solving complex problems"
      ],
      galleryImages: ["/assets/frontend-1.svg", "/assets/frontend-2.svg"],
      category: "Development",
      level: 4,
    });

    await this.createSkill({
      title: "AI & Machine Learning",
      subtitle: "OpenAI, TensorFlow, Supervised & Unsupervised Learning",
      imageUrl: "/assets/skill-backend.svg",
      type: "skill",
      description: "Extensive experience with machine learning models, including supervised and unsupervised learning, using OpenAI and TensorFlow. Expertise in implementing OpenAI GPT-3 for conversational AI features, providing empathetic user interaction.",
      tags: ["AI", "Machine Learning", "OpenAI", "TensorFlow", "NLP", "Data Analysis", "GPT-3"],
      timeline: "",
      technologies: "Python, TensorFlow, OpenAI GPT-3, Machine Learning Algorithms, Data Processing",
      role: "",
      linkUrl: "",
      linkText: "",
      details: [
        "Experience implementing conversational AI using OpenAI GPT-3 for empathetic user interactions",
        "Development of practical AI models for real-world applications and problem-solving",
        "Proficiency in data preprocessing, feature engineering, and model evaluation",
        "Implementation of both supervised and unsupervised learning approaches",
        "Integration of AI capabilities into web applications for enhanced user experiences"
      ],
      galleryImages: ["/assets/backend-1.svg", "/assets/backend-2.svg"],
      category: "Artificial Intelligence",
      level: 3,
    });

    await this.createSkill({
      title: "Network Security",
      subtitle: "Protocols, Cryptography, Firewalls",
      imageUrl: "/assets/skill-cloud.svg",
      type: "skill",
      description: "Advanced knowledge of network security, protocols, and practical experience with routers, switches, and firewalls. Understanding of security vulnerabilities and protection strategies for building secure systems.",
      tags: ["Network Security", "Cryptography", "Firewalls", "Intrusion Detection", "Security Protocols"],
      timeline: "",
      technologies: "Security Protocols, Cryptography, Firewalls, Intrusion Detection Systems, Networking Hardware",
      role: "",
      linkUrl: "",
      linkText: "",
      details: [
        "Understanding of network security protocols and implementation of best practices",
        "Knowledge of cryptography principles and their applications in secure communications",
        "Hands-on experience with network hardware including routers, switches, and firewalls",
        "Ability to identify security vulnerabilities and implement appropriate protection measures",
        "Experience in configuring and managing secure network environments"
      ],
      galleryImages: ["/assets/cloud-1.svg", "/assets/cloud-2.svg"],
      category: "Cybersecurity",
      level: 3,
    });
    
    await this.createSkill({
      title: "Database Management",
      subtitle: "MongoDB, Oracle, Neo4j",
      imageUrl: "/assets/skill-data.svg",
      type: "skill",
      description: "Hands-on experience with MongoDB, Oracle, and Neo4j through coursework, including practical implementation and management of complex data models.",
      tags: ["MongoDB", "Oracle", "Neo4j", "SQL", "NoSQL", "Database Design"],
      timeline: "",
      technologies: "MongoDB, Oracle, Neo4j, SQL, Database Design Tools",
      role: "",
      linkUrl: "",
      linkText: "",
      details: [
        "Experience with both relational (Oracle) and non-relational (MongoDB, Neo4j) database systems",
        "Implementation of database designs to support application requirements",
        "Knowledge of query optimization and performance tuning techniques",
        "Understanding of data modeling principles and schema design",
        "Application of database concepts in real-world projects"
      ],
      galleryImages: ["/assets/data-1.svg", "/assets/data-2.svg"],
      category: "Database",
      level: 3,
    });
    
    await this.createSkill({
      title: "Leadership & Communication",
      subtitle: "Team Management, Public Speaking, Documentation",
      imageUrl: "/assets/skill-leadership.svg",
      type: "skill",
      description: "Demonstrated leadership in managing teams, leading academic review sessions, and contributing to student clubs. Effective communicator, both in written and verbal forms, with experience in mentoring, teaching, and public speaking.",
      tags: ["Leadership", "Communication", "Teamwork", "Event Management", "Problem-Solving"],
      timeline: "",
      technologies: "Project Management Tools, Communication Platforms, Documentation Systems",
      role: "",
      linkUrl: "",
      linkText: "",
      details: [
        "Leadership experience through roles in student organizations and academic settings",
        "Strong communication skills developed through teaching, presentations, and documentation",
        "Project management abilities including organizing events and coordinating team efforts",
        "Problem-solving and critical thinking skills for approaching challenges methodically",
        "Adaptability and quick learning in new environments and with new technologies"
      ],
      galleryImages: ["/assets/leadership-1.svg", "/assets/leadership-2.svg"],
      category: "Soft Skills",
      level: 4,
    });

    // Initialize projects
    await this.createProject({
      title: "Library Management System",
      subtitle: "Java (Spring Boot), MySQL, React.js",
      imageUrl: "/assets/project-ecommerce.svg",
      type: "project",
      description: "A fully functional library management system designed to handle user requests, search for books, and issue books to users. Java (Spring Boot) was used for back-end logic, while React.js powered the front-end for a smooth and dynamic user experience.",
      tags: ["Java", "Spring Boot", "MySQL", "React.js", "JWT", "Google Books API"],
      timeline: "In Progress",
      technologies: "Java (Spring Boot), MySQL, React.js, Google Books API, JWT",
      role: "Developer",
      linkUrl: "",
      linkText: "Coming Soon",
      details: [
        "Implementing CRUD operations for efficient library resource management with Spring Boot",
        "Integrating with Google Books API for comprehensive book information and metadata",
        "Adding JWT authentication for secure user access and role-based permissions",
        "Optimizing performance using Java multithreading techniques for concurrent operations",
        "Designing a responsive UI with React.js for optimal user experience across devices"
      ],
      galleryImages: ["/assets/ecommerce-1.svg", "/assets/ecommerce-2.svg"],
      github: "",
      demo: "",
      relevantFor: ["recruiter", "developer"],
    });

    await this.createProject({
      title: "Bubble - Mental Health Support App",
      subtitle: "React.js, Flask, OpenAI GPT-3, SQLite",
      imageUrl: "/assets/project-fitness.svg",
      type: "project",
      description: "Bubble is a web-based platform designed to offer emotional support through AI-driven conversations. The front-end is built with React.js and styled with CSS/HTML, while the back-end uses Flask and Python to handle user interactions and AI processing. SQLite stores user data, conversation history, and preferences.",
      tags: ["React.js", "Flask", "Python", "OpenAI GPT-3", "SQLite", "CSS", "HTML"],
      timeline: "In Progress",
      technologies: "React.js, Flask, Python, OpenAI GPT-3, SQLite, CSS/HTML",
      role: "Full Stack Developer",
      linkUrl: "",
      linkText: "Coming Soon",
      details: [
        "Creating AI-driven emotional support conversations using OpenAI GPT-3 for empathetic interactions",
        "Implementing journaling system for users to track their emotional well-being over time",
        "Building personalized wellness reminders based on user activity patterns and preferences",
        "Designing responsive UI/UX for seamless experience across desktop and mobile devices",
        "Planning deployment on Heroku with future scaling and feature enhancements"
      ],
      galleryImages: ["/assets/fitness-1.svg", "/assets/fitness-2.svg"],
      github: "",
      demo: "",
      relevantFor: ["recruiter", "curious"],
    });

    await this.createProject({
      title: "Shazam-Integrated Playlist Generator",
      subtitle: "Coming Soon",
      imageUrl: "/assets/project-ai.svg",
      type: "project",
      description: "This project generates playlists on Spotify and other platforms based on songs identified by Shazam, helping users build seamless music playlists. The system automates the addition of tracks to playlists without user intervention.",
      tags: ["Music API", "Automation", "Cross-Platform", "UI/UX"],
      timeline: "Coming Soon",
      technologies: "Shazam API, Spotify API, iTunes API, YouTube API",
      role: "Developer",
      linkUrl: "",
      linkText: "Coming Soon",
      details: [
        "Streamlining music discovery by eliminating manual song insertion into playlists",
        "Creating seamless integration with Shazam's audio recognition technology",
        "Building cross-platform compatibility with Spotify, iTunes, and YouTube Music",
        "Developing a user-friendly interface for playlist management and customization",
        "Implementing secure authentication with multiple music service providers"
      ],
      galleryImages: ["/assets/ai-1.svg", "/assets/ai-2.svg"],
      github: "",
      demo: "",
      relevantFor: ["developer", "curious"],
    });
    
    await this.createProject({
      title: "Basketball Blog Website",
      subtitle: "React.js, CSS, Content Management System",
      imageUrl: "/assets/project-blog.svg",
      type: "project",
      description: "A blog platform for basketball fans, featuring game breakdowns, player stats, and sports journalism content. Built with React.js for a dynamic and responsive layout.",
      tags: ["React.js", "CSS", "Content Management", "Sports Analytics"],
      timeline: "In Progress",
      technologies: "React.js, CSS, Content Management System, Analytics APIs",
      role: "Frontend Developer",
      linkUrl: "",
      linkText: "Coming Soon",
      details: [
        "Creating a responsive design for optimal viewing across devices",
        "Implementing interactive features for user engagement with content",
        "Integrating sports statistics APIs for real-time game and player data",
        "Designing an intuitive navigation system for content discovery",
        "Building customizable user profiles for personalized content preferences"
      ],
      galleryImages: ["/assets/blog-1.svg", "/assets/blog-2.svg"],
      github: "",
      demo: "",
      relevantFor: ["recruiter", "curious"],
    });
    
    await this.createProject({
      title: "Invoice System for Hardware Business",
      subtitle: "JavaScript, Python, MySQL",
      imageUrl: "/assets/project-invoice.svg",
      type: "project",
      description: "A system that generates invoices for a small hardware store, allowing users to select products, view price comparisons, and automatically generate invoices.",
      tags: ["JavaScript", "Python", "MySQL", "Business Application", "Automation"],
      timeline: "In Progress",
      technologies: "JavaScript, Python, MySQL, PDF Generation",
      role: "Developer",
      linkUrl: "",
      linkText: "Coming Soon",
      details: [
        "Developing a database of products with pricing and inventory information",
        "Creating a user-friendly interface for product selection and invoice generation",
        "Implementing automated price comparison features for business intelligence",
        "Building PDF generation capabilities for professional invoice documents",
        "Designing reporting features for sales analysis and inventory management"
      ],
      galleryImages: ["/assets/invoice-1.svg", "/assets/invoice-2.svg"],
      github: "",
      demo: "",
      relevantFor: ["recruiter", "developer"],
    });
    
    await this.createProject({
      title: "Automated Data Entry and Invoice Generator",
      subtitle: "Python, OpenCV, MySQL",
      imageUrl: "/assets/project-automation.svg",
      type: "project",
      description: "A tool that scans and reads data from different sources and automatically fills the relevant data into an invoice template.",
      tags: ["Python", "OpenCV", "MySQL", "OCR", "Automation"],
      timeline: "Coming Soon",
      technologies: "Python, OpenCV, MySQL, OCR Technology",
      role: "Developer",
      linkUrl: "",
      linkText: "Coming Soon",
      details: [
        "Planning OCR capabilities to extract text data from scanned documents",
        "Designing a processing pipeline for validating and structuring extracted data",
        "Developing template matching for accurate data placement in invoices",
        "Building a data verification system to ensure accuracy of automated entries",
        "Creating a user interface for reviewing and editing generated invoices"
      ],
      galleryImages: ["/assets/automation-1.svg", "/assets/automation-2.svg"],
      github: "",
      demo: "",
      relevantFor: ["recruiter", "developer"],
    });

    // Initialize education
    await this.createEducation({
      title: "Bachelor of Science in Computer Science",
      subtitle: "Eduvos • Expected 2025",
      imageUrl: "/assets/education-university.svg",
      type: "education",
      description: "Final-year Computer Science student with comprehensive coursework in programming languages, database systems, artificial intelligence, network security, and software design methodologies. Gained experience with a wide range of technologies and practical applications throughout the program.",
      tags: ["Computer Science", "Software Development", "AI", "Network Security", "Database Systems", "Data Structures", "IoT"],
      timeline: "Expected Graduation: 2025",
      technologies: "C++, C#, Java, Python, JavaScript, React, HTML, CSS, MongoDB, Oracle, Neo4j, SQLite, Firebase, Git/GitHub, Microsoft Visual Studio, Eclipse/IntelliJ IDEA, PyCharm, Arduino IDE, Raspberry Pi, Cisco Packet Tracer, Wireshark, OpenAI (GPT-3), Apache Tomcat, Maven, Bootstrap/Tailwind CSS",
      role: "Student",
      linkUrl: "",
      linkText: "",
      details: [
        "Computer Skills: Gained proficiency in Microsoft Suite (Word, Excel, PowerPoint) for productivity tasks",
        "Human-Computer Interaction: Study of the design and evaluation of user interfaces, focusing on usability and accessibility",
        "Network Security: Advanced concepts in securing network infrastructures including encryption, firewalls, and intrusion detection",
        "Artificial Intelligence Techniques: Introduction to AI concepts, machine learning algorithms, and practical implementations",
        "Database Systems: Learning relational and non-relational databases including SQL, MongoDB, Oracle, and Neo4j",
        "Data Structures and Algorithms: Advanced understanding of algorithms, data structures, and optimization techniques",
        "Digital Electronics: Hands-on experience with Arduino and Raspberry Pi to develop IoT systems like smart home models",
        "Software Design: Principles of software architecture, design patterns, and the software development lifecycle"
      ],
      galleryImages: ["/assets/university-1.svg", "/assets/university-2.svg"],
      institution: "Eduvos",
      degree: "Bachelor of Science in Computer Science",
      year: "2025",
    });

    await this.createEducation({
      title: "Google Data Analytics Certification",
      subtitle: "Google • In Progress",
      imageUrl: "/assets/education-data.svg",
      type: "education",
      description: "Currently pursuing the Google Data Analytics Professional Certification to gain hands-on experience with data cleaning, analysis, and visualization techniques. This certification provides comprehensive training in using data to solve real-world business problems with industry-standard tools.",
      tags: ["Data Analytics", "SQL", "Visualization", "Python", "Tableau", "R", "Big Data", "Business Intelligence"],
      timeline: "In Progress",
      technologies: "SQL, Python, R, Tableau, Power BI, Google BigQuery, Google Sheets, Excel, Data Studio, PostgreSQL, Data Visualization Tools",
      role: "Student",
      linkUrl: "",
      linkText: "",
      details: [
        "Learning advanced data wrangling techniques for cleaning, transforming, and preparing data for analysis",
        "Developing skills in data visualization tools including Tableau, Power BI, and Google Data Studio",
        "Gaining expertise in SQL and database management for efficient data querying and manipulation",
        "Studying statistical analysis methods including regression, classification, and time series analysis",
        "Applying data analytics principles to real-world business scenarios and decision-making processes",
        "Learning best practices for data ethics, privacy, governance, and security implementation",
        "Working with structured and unstructured data sources to derive meaningful insights",
        "Developing skills in communicating data findings to both technical and non-technical audiences"
      ],
      galleryImages: ["/assets/data-cert-1.svg", "/assets/data-cert-2.svg"],
      institution: "Google",
      degree: "Data Analytics Professional Certification",
      year: "In Progress",
    });

    await this.createEducation({
      title: "Leadership Training",
      subtitle: "International Student Society • 2023",
      imageUrl: "/assets/education-aws.svg",
      type: "education",
      description: "Comprehensive leadership training as part of the International Student Society secretary role, focusing on communication, event management, team coordination, and cross-cultural collaboration in an international academic environment.",
      tags: ["Leadership", "Communication", "Event Management", "Team Coordination", "Cultural Intelligence", "Project Management"],
      timeline: "2023",
      technologies: "Leadership Frameworks, Microsoft Suite, Communication Tools, Event Planning Software, Google Workspace, Project Management Tools",
      role: "Secretary",
      linkUrl: "",
      linkText: "",
      details: [
        "Developed strategies for effective communication with diverse stakeholders from multiple cultural backgrounds",
        "Mastered techniques for organizing and coordinating large-scale international student events and cultural exchanges",
        "Acquired skills in conflict resolution, negotiation, and cross-cultural team management",
        "Gained experience in comprehensive documentation, record-keeping, and meeting facilitation",
        "Participated in workshops on cultural sensitivity, inclusive leadership, and diversity management",
        "Learned project management methodologies to coordinate complex, multi-stakeholder initiatives",
        "Developed public speaking and presentation skills for addressing diverse international audiences"
      ],
      galleryImages: ["/assets/aws-1.svg", "/assets/aws-2.svg"],
      institution: "International Student Society, Eduvos",
      degree: "Leadership Training",
      year: "2023",
    });

    await this.createEducation({
      title: "Supplemental Instruction Training",
      subtitle: "Eduvos • 2022",
      imageUrl: "/assets/education-scrum.svg",
      type: "education",
      description: "Specialized training in advanced educational techniques and peer mentoring as preparation for the Supplemental Instruction Leader role in Mathematics, with focus on innovative teaching methodologies, student engagement strategies, and personalized learning approaches.",
      tags: ["Teaching", "Mentoring", "Mathematics", "Education", "Learning Design", "Student Engagement", "Peer Education"],
      timeline: "2022",
      technologies: "Educational Technology Tools, Mathematics Teaching Platforms, Interactive Learning Systems, Microsoft Office Suite, Learning Management Systems, Data Analytics for Student Progress",
      role: "SI Leader",
      linkUrl: "",
      linkText: "",
      details: [
        "Trained in effective teaching methodologies for complex mathematical concepts including discrete mathematics and calculus",
        "Mastered strategies for engaging students with diverse learning backgrounds and encouraging active participation",
        "Developed skills in creating accessible, inclusive study materials for different learning styles and needs",
        "Gained expertise in identifying learning obstacles and implementing targeted intervention strategies",
        "Acquired techniques for tracking student progress using data-driven approaches and providing personalized assistance",
        "Learned conflict resolution techniques for managing challenging classroom dynamics and student interactions",
        "Developed skills in formative assessment design to evaluate student understanding and adjust teaching methods",
        "Trained in virtual teaching environments and digital tools to support both in-person and remote learning"
      ],
      galleryImages: ["/assets/scrum-1.svg", "/assets/scrum-2.svg"],
      institution: "Eduvos",
      degree: "Supplemental Instruction Training",
      year: "2022",
    });
  }
}

export const storage = new MemStorage();
