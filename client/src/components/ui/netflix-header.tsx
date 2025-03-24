import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, useAnimation } from "framer-motion";
import { headerVariants } from "@/lib/motion";
import { useProfile } from "@/components/providers/profile-provider";

const NetflixHeader = () => {
  const [location] = useLocation();
  const { selectedProfile, profileData } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        controls.start(isScrolled ? "scrolled" : "top");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, controls]);

  const isHome = location.startsWith("/profile/");
  const isDetail = location.startsWith("/details/");

  if (!isHome && !isDetail) return null;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4"
      variants={headerVariants}
      initial="top"
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <Link href={selectedProfile ? `/profile/${selectedProfile}` : "/"}>
          <a className="text-[#E50914] text-3xl font-bold">PORTFOLIO</a>
        </Link>
        <nav className="hidden md:flex ml-8 space-x-6">
          <Link href={selectedProfile ? `/profile/${selectedProfile}` : "/"}>
            <a className={`transition ${location.includes('/profile/') && !location.includes('/details/') ? 'text-white' : 'text-[#999999] hover:text-white'}`}>
              Home
            </a>
          </Link>
          <a href="#experience" className="text-[#999999] hover:text-white transition">
            Experience
          </a>
          <a href="#projects" className="text-[#999999] hover:text-white transition">
            Projects
          </a>
          <a href="#skills" className="text-[#999999] hover:text-white transition">
            Skills
          </a>
          <a href="#contact" className="text-[#999999] hover:text-white transition">
            Contact
          </a>
        </nav>
      </div>
      
      {selectedProfile && (
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded overflow-hidden mr-2 bg-[#E50914]">
              <svg 
                className="w-full h-full text-white"
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {selectedProfile === "recruiter" && (
                  <g fill="currentColor">
                    <circle cx="50" cy="35" r="25" />
                    <path d="M85,85 C85,65 65,55 50,55 C35,55 15,65 15,85 L85,85 Z" />
                  </g>
                )}
                {selectedProfile === "developer" && (
                  <g fill="currentColor">
                    <rect x="25" y="25" width="50" height="30" rx="2" />
                    <rect x="30" y="35" width="40" height="5" />
                    <rect x="30" y="45" width="20" height="5" />
                    <path d="M50,65 L60,80 L40,80 Z" />
                  </g>
                )}
                {selectedProfile === "curious" && (
                  <g fill="currentColor">
                    <circle cx="50" cy="35" r="20" />
                    <path d="M50,60 L50,75" strokeWidth="5" stroke="currentColor" />
                    <circle cx="50" cy="85" r="3" />
                  </g>
                )}
              </svg>
            </div>
            <span className="hidden md:inline text-white text-sm capitalize">
              {selectedProfile}
            </span>
          </div>
        </Link>
      )}
    </motion.header>
  );
};

export { NetflixHeader };
