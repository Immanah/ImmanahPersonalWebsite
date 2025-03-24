import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { contentCardVariants } from "@/lib/motion";
import { ContentItem } from "@/lib/types";

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard = ({ item }: ContentCardProps) => {
  const [_, navigate] = useLocation();
  
  const handleClick = () => {
    navigate(`/details/${item.type}/${item.id}`);
  };

  return (
    <motion.div
      className="flex-shrink-0 w-64 md:w-72 cursor-pointer bg-[#222222] rounded overflow-hidden"
      variants={contentCardVariants}
      initial="initial"
      whileHover="hover"
      onClick={handleClick}
    >
      <div className="h-36 bg-[#999999] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <svg 
          className="w-full h-full text-white"
          viewBox="0 0 100 60" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {item.type === "experience" && (
            <g fill="currentColor">
              <rect x="20" y="15" width="60" height="30" rx="2" />
              <rect x="25" y="25" width="50" height="3" />
              <rect x="25" y="32" width="30" height="3" />
              <rect x="25" y="39" width="40" height="3" />
            </g>
          )}
          {item.type === "skill" && (
            <g fill="currentColor">
              <path d="M50,10 L60,30 L40,30 Z" />
              <circle cx="50" cy="40" r="15" />
              <rect x="30" y="45" width="40" height="3" />
            </g>
          )}
          {item.type === "project" && (
            <g fill="currentColor">
              <rect x="15" y="15" width="30" height="30" rx="2" />
              <rect x="55" y="15" width="30" height="14" rx="2" />
              <rect x="55" y="31" width="30" height="14" rx="2" />
              <rect x="20" y="20" width="20" height="3" />
              <rect x="20" y="27" width="15" height="3" />
            </g>
          )}
          {item.type === "education" && (
            <g fill="currentColor">
              <path d="M50,10 L75,25 L50,40 L25,25 Z" />
              <rect x="45" y="40" width="10" height="15" />
              <rect x="35" y="55" width="30" height="5" />
            </g>
          )}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-sm text-[#999999]">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

export { ContentCard };
