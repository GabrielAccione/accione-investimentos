import { MessageCircleMore } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function WhatsappFloat() {
  return (
    <a
      href={SITE_CONFIG.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Falar com a Accione Investimentos pelo WhatsApp ${SITE_CONFIG.whatsappDisplay}`}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
        <MessageCircleMore size={20} />
      </span>
    </a>
  );
}
