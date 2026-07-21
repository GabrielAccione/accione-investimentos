import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";
import gabrielImg from "@/assets/gabriel-2.jpg";
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
              title="Investimentos para quem prefere contexto, estrutura e tese antes da promessa."
              description="A Accione nasceu para trazer a investidores oportunidades criadas a partir da leitura qualificada dos cenários econômicos, com ênfase em resultados acima da média, qualitativa e quantitativamente."
              align="left"
            />

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              <p>
                Atuamos em Santa Maria/RS e região, com foco em empreendimentos
                imobiliários e operações de investimentos financeiros desenhados
                para ampliar o repertório patrimonial, sem cair em soluções
                genéricas.
              </p>
              <p>
                A lógica da casa é simples: entender o cenário, criar teses de
                forma criteriosa e construir oportunidades objetivas para
                investidores alocarem seus recursos.
              </p>
            </div>

            <Link
              to="/sobre"
              className="btn-accent mt-8 inline-flex items-center gap-2"
            >
              Saiba mais
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
                className="h-32 w-32 rounded-full object-cover object-top sm:h-36 sm:w-36"
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
