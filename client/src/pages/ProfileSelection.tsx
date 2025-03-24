import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { NetflixAvatar } from "@/components/ui/netflix-avatar";
import { pageTransitionVariants } from "@/lib/motion";
import { ProfileType } from "@shared/schema";
import { useProfile } from "@/components/providers/profile-provider";
import { ProfileData } from "@/lib/types";

export default function ProfileSelection() {
  const [_, navigate] = useLocation();
  const { setSelectedProfile, setProfileData } = useProfile();
  
  const { data: profiles, isLoading, error } = useQuery<ProfileData[]>({
    queryKey: ['/api/profiles'],
  });

  const handleProfileSelect = (profileType: ProfileType) => {
    setSelectedProfile(profileType);
    
    if (profiles) {
      const selectedProfileData = profiles.find(p => p.type === profileType) || null;
      setProfileData(selectedProfileData);
    }
    
    navigate(`/profile/${profileType}`);
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-[#141414] text-white"
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Who's viewing?</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-[#E50914]">
          <p>Error loading profiles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {profiles?.map((profile) => (
            <NetflixAvatar
              key={profile.id}
              type={profile.type as ProfileType}
              name={profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
              imageUrl={profile.avatarUrl}
              onClick={handleProfileSelect}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
