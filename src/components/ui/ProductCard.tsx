import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { animate } from "animejs";
import { CheckCircle2 } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import type { Product } from "@/types";

export default function ProductCard({
  item,
  index,
}: {
  item: Product;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

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
            src={item.image}
            alt={item.title}
            className="w-full h-60 object-cover"
            style={{ objectPosition: item.imagePosition || "center" }}
          />
          <div className="absolute top-3 left-3">
            <span className="bg-[var(--accent)] text-white text-xs font-medium px-3 py-1 rounded-full">
              {item.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-xl font-bold text-[#041A2A] dark:text-white mb-2">
            {item.title}
          </h3>

          {item.subtitle ? (
            <div className="flex items-start gap-1.5 text-[var(--text-muted)] text-sm mb-3">
              <Icon size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              <span>{item.subtitle}</span>
            </div>
          ) : null}

          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
            {item.description}
          </p>

          <ul className="grid gap-2.5 mb-5">
            {item.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {item.stats ? (
            <div className="mb-6 flex flex-wrap gap-2">
              {item.stats.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-full border border-[#484949]/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] dark:border-white/10"
                >
                  {stat.label}: {stat.value}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <WhatsAppButton
              mensagem={`Olá! Tenho interesse em saber mais sobre ${item.title}.`}
              label="Saber mais pelo WhatsApp"
              size="sm"
            />
            <Link
              to={`/investimentos/${item.slug}`}
              className="btn-ghost text-sm px-5 py-2"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
