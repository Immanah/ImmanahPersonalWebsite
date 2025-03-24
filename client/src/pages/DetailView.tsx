import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NetflixHeader } from "@/components/ui/netflix-header";
import { pageTransitionVariants } from "@/lib/motion";
import { ContentItem } from "@/lib/types";

export default function DetailView() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [_, navigate] = useLocation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: item, isLoading, error } = useQuery<ContentItem>({
    queryKey: [`/api/${type}s/${id}`],
  });

  const handleBack = () => {
    const referrer = isClient ? document.referrer : '';
    if (referrer && referrer.includes('/profile/')) {
      // Use referrer information to extract profile type
      const profileMatch = referrer.match(/\/profile\/([^\/\?#]+)/);
      if (profileMatch && profileMatch[1]) {
        navigate(`/profile/${profileMatch[1]}`);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
        <div className="w-16 h-16 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
        <div className="text-center">
          <h2 className="text-2xl text-[#E50914] mb-4">Error Loading Content</h2>
          <p>Could not load the requested content</p>
          <button 
            className="mt-6 px-4 py-2 bg-[#E50914] text-white rounded"
            onClick={handleBack}
          >
            Back
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
      
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 border-none"
          onClick={handleBack}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="min-h-screen">
        <div className="relative w-full h-[50vh]">
          <div className="absolute inset-0 bg-[#141414]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, index) => (
                <span key={index} className="py-1 px-2 bg-[#E50914] text-white text-sm rounded">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xl text-[#999999]">{item.subtitle}</p>
          </div>
        </div>
        
        <div className="px-6 md:px-12 py-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg mb-6">
                {item.description}
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {item.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {item.galleryImages.map((image, index) => (
                  <div key={index} className="rounded bg-[#222222] h-32 flex items-center justify-center">
                    <svg 
                      className="w-3/4 h-3/4 text-white opacity-30"
                      viewBox="0 0 100 100" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="10" y="10" width="80" height="80" rx="4" fill="currentColor" />
                      <path d="M35,35 L65,65 M65,35 L35,65" stroke="black" strokeWidth="5" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#222222] p-6 rounded h-fit">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              
              {item.timeline && (
                <div className="mb-6">
                  <h4 className="text-[#999999] mb-1">Timeline</h4>
                  <p>{item.timeline}</p>
                </div>
              )}
              
              {item.technologies && (
                <div className="mb-6">
                  <h4 className="text-[#999999] mb-1">Technologies</h4>
                  <p>{item.technologies}</p>
                </div>
              )}
              
              {item.role && (
                <div className="mb-6">
                  <h4 className="text-[#999999] mb-1">Role</h4>
                  <p>{item.role}</p>
                </div>
              )}
              
              {item.linkUrl && (
                <div className="mb-6">
                  <a 
                    href={item.linkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#E50914] text-white py-2 px-4 rounded inline-block hover:bg-opacity-80 transition"
                  >
                    {item.linkText || "View More"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
