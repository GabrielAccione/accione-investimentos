import { useEffect, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { useEconomicIndicators } from "@/context/EconomicIndicatorsContext";
import { calculateIrr, calculateNpv, calculatePayback } from "@/lib/financial";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";

function ComparisonBar({
  label,
  value,
  maxValue,
  accent = false,
}: {
  label: string;
  value: number | null;
  maxValue: number;
  accent?: boolean;
}) {
  const safeValue = value ?? 0;
  const width = maxValue === 0 ? 0 : Math.max((safeValue / maxValue) * 100, 3);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-secondary)]">
        <span>{label}</span>
        <span className={accent ? "text-[#A26547]" : ""}>
          {value === null ? "N/D" : formatPercent(value, "% a.a.")}
        </span>
      </div>
      <div className="h-3 rounded-full bg-[#E5E5E5] dark:bg-white/5">
        <div
          className={`h-3 rounded-full ${accent ? "bg-[var(--accent)]" : "bg-[#9E9E9E] dark:bg-white/25"}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function IrrSimulatorPage() {
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [horizon, setHorizon] = useState("5");
  const [cashFlows, setCashFlows] = useState<string[]>([
    "25000",
    "28000",
    "32000",
    "35000",
    "42000",
  ]);
  const { indicators } = useEconomicIndicators();

  const parsedHorizon = Math.max(Number(horizon) || 1, 1);

  useEffect(() => {
    setCashFlows((current) => {
      if (current.length === parsedHorizon) return current;
      if (current.length < parsedHorizon) {
        return [
          ...current,
          ...Array.from({ length: parsedHorizon - current.length }, () => "0"),
        ];
      }
      return current.slice(0, parsedHorizon);
    });
  }, [parsedHorizon]);

  const parsedInitialInvestment = Number(initialInvestment);
  const parsedCashFlows = cashFlows.map((value) => Number(value) || 0);
  const entries = parsedCashFlows.map((amount, index) => ({
    year: index + 1,
    amount,
  }));

  const validationError = (() => {
    if (parsedInitialInvestment < 1000)
      return "O investimento inicial mínimo é de R$ 1.000,00.";
    if (!parsedCashFlows.some((f) => f > 0))
      return "Informe pelo menos um retorno positivo nos fluxos de caixa.";
    return null;
  })();

  const irr = !validationError
    ? calculateIrr([-parsedInitialInvestment, ...parsedCashFlows])
    : null;
  const cdiIndicator = indicators.find((indicator) => indicator.id === "cdi");
  const selicIndicator = indicators.find(
    (indicator) => indicator.id === "selic",
  );
  const referenceRate = cdiIndicator?.value ?? 12;
  const npv = !validationError
    ? calculateNpv(referenceRate, parsedInitialInvestment, entries)
    : null;
  const payback = !validationError
    ? calculatePayback(parsedInitialInvestment, entries)
    : null;
  const comparisonMax = Math.max(
    irr ?? 0,
    cdiIndicator?.value ?? 0,
    selicIndicator?.value ?? 0,
    1,
  );

  return (
    <>
      <PageHero
        eyebrow="Simulador de TIR"
        title={
          <>
            Estime retorno, valor presente e tempo de
            <span className="text-gradient"> recuperação do capital.</span>
          </>
        }
        description="Monte uma sequência anual de fluxos de caixa para comparar a TIR da operação com referências como CDI e Selic atuais."
      />

      <section className="py-20 sm:py-24">
        <div className="section-container grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="surface-card p-6 sm:p-8">
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-[#484949] dark:text-amber-200">
              <strong>Aviso importante:</strong> Os resultados apresentados são
              estimativas baseadas nos dados informados e em projeções
              matemáticas. Não constituem garantia de rentabilidade nem
              recomendação de investimento. Rentabilidade passada não garante
              resultados futuros.
            </div>
            <span className="mt-6 block section-tag">Entradas</span>
            <div className="mt-4 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Investimento inicial (R$)
                </span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={initialInvestment}
                  onChange={(event) => setInitialInvestment(event.target.value)}
                  className="input-base"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#041A2A] dark:text-white">
                  Prazo (anos)
                </span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={horizon}
                  onChange={(event) => setHorizon(event.target.value)}
                  className="input-base"
                />
              </label>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#041A2A] dark:text-white">
                    Fluxos anuais
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHorizon(String(parsedHorizon + 1))}
                      className="rounded-full border border-[#041A2A] px-3 py-1 text-xs text-[#041A2A] transition-colors hover:border-[#A26547] hover:text-[#A26547] dark:border-white/10 dark:text-[var(--text-secondary)] dark:hover:border-white/20 dark:hover:text-white"
                    >
                      Adicionar ano
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHorizon(String(Math.max(parsedHorizon - 1, 1)))
                      }
                      className="rounded-full border border-[#041A2A] px-3 py-1 text-xs text-[#041A2A] transition-colors hover:border-[#A26547] hover:text-[#A26547] dark:border-white/10 dark:text-[var(--text-secondary)] dark:hover:border-white/20 dark:hover:text-white"
                    >
                      Remover ano
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {cashFlows.map((value, index) => (
                    <label key={`cash-flow-${index}`} className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Ano {index + 1}
                      </span>
                      <input
                        type="number"
                        step={1000}
                        value={value}
                        onChange={(event) => {
                          const nextCashFlows = [...cashFlows];
                          nextCashFlows[index] = event.target.value;
                          setCashFlows(nextCashFlows);
                        }}
                        className="input-base"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {validationError && (
              <div className="surface-card p-6 text-sm text-[var(--text-secondary)]">
                {validationError}
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-3 [&>*]:min-w-0">
              <article className="surface-card p-6">
                <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  TIR
                </p>
                <h2 className="mt-4 font-body text-[1.2rem] sm:text-[1.5rem] xl:text-[1.8rem] font-semibold tracking-normal tabular-nums text-[#A26547] break-words leading-tight">
                  {irr === null ? "N/D" : formatPercent(irr, "% a.a.")}
                </h2>
              </article>

              <article className="surface-card p-6">
                <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  VPL
                </p>
                <h2 className="mt-4 font-body text-[1.2rem] sm:text-[1.5rem] xl:text-[1.8rem] font-semibold tracking-normal tabular-nums text-[#A26547] break-words leading-tight">
                  {npv === null ? "N/D" : formatCurrency(npv)}
                </h2>
                <p className="mt-3 text-[0.8rem] text-[var(--text-muted)]">
                  Descontado pelo CDI atual.
                </p>
              </article>

              <article className="surface-card p-6">
                <p className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Payback
                </p>
                <h2 className="mt-4 font-body text-[1.2rem] sm:text-[1.5rem] xl:text-[1.8rem] font-semibold tracking-normal tabular-nums text-[#A26547] break-words leading-tight">
                  {payback === null
                    ? "Não recupera"
                    : `${formatNumber(payback)} anos`}
                </h2>
              </article>
            </div>

            <div className="surface-card p-6 sm:p-8">
              <span className="section-tag">Comparativo visual</span>
              <h2 className="mt-4 text-4xl font-semibold text-[#041A2A] dark:text-white">
                TIR da operação versus benchmarks atuais
              </h2>
              <div className="mt-8 space-y-5">
                <ComparisonBar
                  label="TIR da operação"
                  value={irr}
                  maxValue={comparisonMax}
                  accent
                />
                <ComparisonBar
                  label="CDI atual"
                  value={cdiIndicator?.value ?? null}
                  maxValue={comparisonMax}
                />
                <ComparisonBar
                  label="Selic atual"
                  value={selicIndicator?.value ?? null}
                  maxValue={comparisonMax}
                />
              </div>
            </div>

            <div className="surface-card p-6 sm:p-8">
              <span className="section-tag">Leitura</span>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                A TIR mostra a taxa interna de retorno implícita nos fluxos
                informados. O VPL usa o CDI atual como taxa de desconto para
                comparar se a operação agrega valor acima do benchmark. O
                payback indica em quanto tempo o capital investido é recuperado
                sem desconto.
              </p>
              <WhatsAppButton
                mensagem="Olá! Fiz uma simulação de TIR no site e gostaria de conversar sobre investimentos."
                label="Falar pelo WhatsApp"
                className="mt-6"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
