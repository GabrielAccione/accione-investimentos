import { useEffect } from "react";

/** Domínio de produção — usado em canonical e og:url. Trocar aqui se mudar. */
export const SITE_URL = "https://www.accioneinvestimentos.com.br";

const SITE_NAME = "Accione Investimentos";
const DEFAULT_IMAGE = `${SITE_URL}/og-accione.jpg`;

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function setRobots(noIndex: boolean) {
  upsertMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");
}

export interface SeoOptions {
  /** Título da página, sem o nome da empresa — ele é acrescentado automaticamente. */
  title: string;
  description: string;
  /** Caminho da rota, ex: "/investimentos/cpr-f". */
  path: string;
  /** URL absoluta da imagem de compartilhamento. Padrão: imagem institucional. */
  image?: string;
  /** Páginas que não devem aparecer em buscadores. */
  noIndex?: boolean;
}

/**
 * Ajusta título, descrição, canonical e tags de compartilhamento da página.
 *
 * Observação: robôs de WhatsApp/LinkedIn/Facebook não executam JavaScript, então
 * a pré-visualização de link continua vindo das tags estáticas do index.html.
 * Este hook serve para aba do navegador, favoritos e buscadores (o Google
 * executa JavaScript e lê o que é definido aqui).
 */
export function useSeo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const fullTitle = `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertCanonical(url);
    setRobots(noIndex);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [title, description, path, image, noIndex]);
}
