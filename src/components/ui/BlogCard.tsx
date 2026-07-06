import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { animate } from "animejs";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";

export default function BlogCard({
  item,
  index,
}: {
  item: BlogPost;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleEnter() {
    animate(cardRef.current!, {
      translateY: -8,
      scale: 1.015,
      duration: 260,
      ease: "outQuad",
    });
  }

  function handleLeave() {
    animate(cardRef.current!, {
      translateY: 0,
      scale: 1,
      duration: 300,
      ease: "outQuad",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="rounded-xl border border-[#484949]/20 hover:border-[#A26547]/40 bg-white dark:bg-[#0C2030] overflow-hidden h-full flex flex-col transition-colors duration-300 hover:shadow-[0_8px_40px_rgba(162,101,71,0.10)]"
      >
        {/* Cover image */}
        <div className="relative overflow-hidden">
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-52 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-[var(--accent)] text-white text-xs font-medium px-3 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-xl font-bold text-[#041A2A] dark:text-white mb-2">
            {item.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-sm mb-3">
            <Clock size={14} className="shrink-0 text-[var(--accent)]" />
            <span>
              {new Date(item.date).toLocaleDateString("pt-BR")} · {item.readTime}
            </span>
          </div>

          <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-5">
            {item.excerpt}
          </p>

          <Link
            to={`/blog/${item.slug}`}
            className="btn-accent text-sm py-2.5 px-5 flex items-center justify-center gap-2 group"
          >
            Ler artigo
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
