import { motion } from "framer-motion";
import { ContentCard } from "@/components/ui/content-card";
import { ContentItem } from "@/lib/types";
import { containerVariants, itemVariants } from "@/lib/motion";

interface ContentRowProps {
  title: string;
  items: ContentItem[];
}

const ContentRow = ({ title, items }: ContentRowProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <motion.div 
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((item) => (
          <motion.div key={`${item.type}-${item.id}`} variants={itemVariants}>
            <ContentCard item={item} />
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
};

export { ContentRow };
