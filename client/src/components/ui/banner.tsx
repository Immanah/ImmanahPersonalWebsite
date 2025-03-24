import { motion } from "framer-motion";
import { bannerTextVariants } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/lib/types";
import { Play, Plus } from "lucide-react";

interface BannerProps {
  profile: ProfileData;
}

const Banner = ({ profile }: BannerProps) => {
  return (
    <div className="relative w-full h-[75vh] mb-8">
      <div className="absolute inset-0 bg-[#141414] opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
      
      <motion.div 
        className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 lg:w-1/2"
        initial="hidden"
        animate="visible"
        variants={bannerTextVariants}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{profile.name}</h1>
        <div className="mb-6">
          <span className="py-1 px-3 bg-[#E50914] text-white text-sm rounded">
            {profile.badge}
          </span>
        </div>
        
        <p className="text-lg md:text-xl mb-8">
          {profile.description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button className="bg-white text-black hover:bg-white/80 transition-colors">
            <Play className="mr-2 h-4 w-4" />
            View Resume
          </Button>
          <Button variant="outline" className="bg-gray-600/70 text-white border-none hover:bg-gray-600/90">
            <Plus className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export { Banner };
