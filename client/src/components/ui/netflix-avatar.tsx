import { motion } from "framer-motion";
import { profileCardVariants } from "@/lib/motion";
import { ProfileType } from "@shared/schema";

interface NetflixAvatarProps {
  type: ProfileType;
  name: string;
  imageUrl: string;
  selected?: boolean;
  onClick: (type: ProfileType) => void;
}

const NetflixAvatar = ({ type, name, imageUrl, selected = false, onClick }: NetflixAvatarProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center cursor-pointer"
      variants={profileCardVariants}
      initial="initial"
      whileHover="hover"
      onClick={() => onClick(type)}
    >
      <div className="w-32 h-32 md:w-40 md:h-40 rounded bg-[#E50914] mb-4 overflow-hidden">
        <svg 
          className="w-full h-full text-white"
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {type === "recruiter" && (
            <g fill="currentColor">
              <circle cx="50" cy="35" r="25" />
              <path d="M85,85 C85,65 65,55 50,55 C35,55 15,65 15,85 L85,85 Z" />
              <rect x="45" y="25" width="10" height="5" />
              <rect x="35" y="35" width="30" height="5" />
            </g>
          )}
          {type === "developer" && (
            <g fill="currentColor">
              <rect x="25" y="25" width="50" height="30" rx="2" />
              <rect x="30" y="35" width="40" height="5" />
              <rect x="30" y="45" width="20" height="5" />
              <path d="M50,65 L60,80 L40,80 Z" />
              <rect x="35" y="80" width="30" height="5" />
            </g>
          )}
          {type === "curious" && (
            <g fill="currentColor">
              <circle cx="50" cy="35" r="20" />
              <path d="M50,60 L50,75" strokeWidth="5" stroke="currentColor" />
              <circle cx="50" cy="85" r="3" />
              <path d="M30,40 Q50,60 70,40" strokeWidth="5" stroke="currentColor" fill="none" />
            </g>
          )}
        </svg>
      </div>
      <span 
        className={`text-lg md:text-xl transition-colors ${
          selected ? 'text-white' : 'text-[#999999] hover:text-white'
        }`}
      >
        {name}
      </span>
    </motion.div>
  );
};

export { NetflixAvatar };
