import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";
import gabrielImg from "@/assets/gabriel.jpg";
import zaconImg from "@/assets/marcazacon.png";

export default function About() {
  return (
    <section id="sobre" className="py-20 sm:py-24">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_420px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <SectionHeading
              eyebrow="Sobre a Accione"
              title="Uma assessoria para quem prefere contexto, estrutura e tese antes da promessa."
              description="A Accione nasceu para aproximar investidores de oportunidades alternativas com leitura mais qualificada e acompanhamento próximo."
              align="left"
            />

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              <p>
                Atuamos em Santa Maria/RS com foco em investimentos
                alternativos, crédito estruturado e empreendimentos imobiliários
                desenhados para ampliar repertório patrimonial sem cair em
                soluções genéricas.
              </p>
              <p>
                A lógica da casa é simples: entender o investidor, filtrar teses
                de forma criteriosa e construir conversas objetivas sobre risco,
                prazo, lastro e expectativa de retorno.
              </p>
            </div>

            <Link
              to="/sobre"
              className="btn-accent mt-8 inline-flex items-center gap-2"
            >
              Conhecer a história completa
            </Link>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="space-y-5"
          >
            <div className="surface-card p-6">
              <img
                src={gabrielImg}
                alt={SITE_CONFIG.founder.name}
                className="h-24 w-24 rounded-full object-cover"
              />
              <h3 className="mt-5 text-3xl font-semibold text-[#041A2A] dark:text-white">
                {SITE_CONFIG.founder.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--accent)]">
                {SITE_CONFIG.founder.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {SITE_CONFIG.founder.bio}
              </p>
              <a
                href={SITE_CONFIG.socialLinks.linkedin}
                className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[#A26547]"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>

            <div className="surface-card p-6">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]"></span>
              <div className="mt-4 inline-flex rounded-lg bg-white p-3">
                <img
                  src={zaconImg}
                  alt={SITE_CONFIG.partner.name}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {SITE_CONFIG.partner.description}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
