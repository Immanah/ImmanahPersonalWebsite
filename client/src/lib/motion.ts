// Animation variants for Framer Motion
import { Variants } from "framer-motion";

// Profile avatar animation
export const profileCardVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } },
};

// Profile selection page fade in
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

// Content card hover animation
export const contentCardVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

// Header animation for scrolling behavior
export const headerVariants: Variants = {
  top: { backgroundColor: "rgba(0, 0, 0, 0)" },
  scrolled: { backgroundColor: "rgba(20, 20, 20, 0.95)" },
};

// Staggered children animation for content rows
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Item animation for staggered children
export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

// Banner text animation
export const bannerTextVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
  },
};
