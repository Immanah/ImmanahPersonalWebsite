import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { NetflixHeader } from "@/components/ui/netflix-header";
import { Banner } from "@/components/ui/banner";
import { ContentRow } from "@/components/ui/content-row";
import { pageTransitionVariants } from "@/lib/motion";
import { ProfileType } from "@shared/schema";
import { useProfile } from "@/components/providers/profile-provider";
import { ContentData } from "@/lib/types";

export default function Home() {
  const { profileType } = useParams<{ profileType: ProfileType }>();
  const [_, setLocation] = useLocation();
  const { setSelectedProfile, setProfileData } = useProfile();
  
  const { data: content, isLoading, error } = useQuery<ContentData>({
    queryKey: [`/api/content/${profileType}`],
  });

  useEffect(() => {
    if (!profileType) {
      setLocation("/");
      return;
    }

    // Update context when profile changes
    setSelectedProfile(profileType);
    if (content?.profile) {
      setProfileData(content.profile);
    }
  }, [profileType, content?.profile, setSelectedProfile, setProfileData, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
        <div className="w-16 h-16 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
        <div className="text-center">
          <h2 className="text-2xl text-[#E50914] mb-4">Error Loading Content</h2>
          <p>Could not load profile content</p>
          <button 
            className="mt-6 px-4 py-2 bg-[#E50914] text-white rounded"
            onClick={() => setLocation("/")}
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-[#141414] text-white min-h-screen"
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <NetflixHeader />
      
      <Banner profile={content.profile} />

      <div className="px-4 md:px-8 pb-16">
        <div id="experience">
          <ContentRow title="Work Experience" items={content.experiences} />
        </div>
        
        <div id="skills">
          <ContentRow title="Skills" items={content.skills} />
        </div>
        
        <div id="projects">
          <ContentRow title={content.profile.headerProjects} items={content.projects} />
        </div>
        
        <div id="education">
          <ContentRow title="Education & Certifications" items={content.education} />
        </div>
      </div>
    </motion.div>
  );
}
