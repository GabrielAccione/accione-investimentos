/**
 * Padrão oficial para imagens de capa/cover do site. Usa aspect-ratio em vez
 * de altura fixa em px — a caixa acompanha a largura disponível e mantém a
 * MESMA proporção (e o mesmo % de corte do object-cover) em qualquer tamanho
 * de tela. Corrige o bug de "h-[Npx]/h-60/h-52 fixo corta a imagem no
 * mobile": com altura fixa, a caixa vira quase-quadrada em telas estreitas e
 * o object-cover corta as laterais; com aspect-ratio isso não acontece.
 *
 * Reusar este componente para qualquer nova imagem de capa/thumbnail em vez
 * de recriar um wrapper com h-[Npx] — é exatamente esse padrão que causou o
 * problema original.
 */

// Tailwind só gera CSS para classes que aparecem como texto literal no
// código-fonte (o scanner não executa JS) — por isso o aspect não pode ser
// montado por interpolação direta (`aspect-[${aspect}]` nunca seria
// encontrado pelo scanner). Este mapa mantém as classes como literais
// estáticos completos, e a prop só escolhe qual delas usar.
const ASPECT_CLASSES: Record<string, string> = {
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-[1/1]",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
};

const DEFAULT_ASPECT = "16/9";

interface CoverImageProps {
  src: string;
  alt: string;
  /** Proporção largura/altura da caixa. Precisa ser uma chave de ASPECT_CLASSES. Default "16/9". */
  aspect?: keyof typeof ASPECT_CLASSES;
  /** Replica o antigo `coverZoom`: leve zoom ancorado no canto superior esquerdo (ex.: pra esconder marca d'água). */
  zoom?: boolean;
  /** Classes extras pro container externo (ex.: "surface-card", "rounded-2xl shadow-2xl"). */
  className?: string;
  /** object-position do <img>, quando o crop precisa ser ancorado num ponto específico (ex.: "center bottom"). */
  objectPosition?: string;
}

export default function CoverImage({
  src,
  alt,
  aspect = DEFAULT_ASPECT,
  zoom = false,
  className = "",
  objectPosition,
}: CoverImageProps) {
  const aspectClass = ASPECT_CLASSES[aspect] ?? ASPECT_CLASSES[DEFAULT_ASPECT];

  return (
    <div
      className={`relative w-full overflow-hidden ${aspectClass} ${className}`.trim()}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover${
          zoom ? " origin-top-left scale-[1.18]" : ""
        }`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
