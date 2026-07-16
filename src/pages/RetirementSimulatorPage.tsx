import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { useTheme } from "@/context/ThemeContext";
import { calculateRetirementProjection } from "@/lib/financial";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "@/lib/formatters";
import logoDark from "@/assets/logo.png";
import logoLight from "@/assets/logo-accione-dark.png";
const DEFAULT_VALUES = {
  currentAge: 35,
  retirementAge: 60,
  monthlyContribution: 1500,
  annualRate: 12,
};

const inputs = [
  { key: "currentAge", label: "Idade atual", min: 18, step: 1 },
  { key: "retirementAge", label: "Aposentadoria", min: 19, step: 1 },
  { key: "initialInvestment", label: "Inicial (R$)", min: 0, step: 100 },
  { key: "monthlyContribution", label: "Aporte mensal (R$)", min: 0, step: 100 },
  { key: "annualRate", label: "Rentab. anual (%)", min: 0, step: 0.1 },
] as const;

export default function RetirementSimulatorPage() {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? logoDark : logoLight;
  const [currentAge, setCurrentAge] = useState(String(DEFAULT_VALUES.currentAge));
  const [retirementAge, setRetirementAge] = useState(
    String(DEFAULT_VALUES.retirementAge),
  );
  const [monthlyContribution, setMonthlyContribution] = useState(
    String(DEFAULT_VALUES.monthlyContribution),
  );
  const [annualRate, setAnnualRate] = useState(String(DEFAULT_VALUES.annualRate));
  const [initialInvestment, setInitialInvestment] = useState("0");

  const values = {
    currentAge,
    retirementAge,
    initialInvestment,
    monthlyContribution,
    annualRate,
  };
  const setters = {
    currentAge: setCurrentAge,
    retirementAge: setRetirementAge,
    initialInvestment: setInitialInvestment,
    monthlyContribution: setMonthlyContribution,
    annualRate: setAnnualRate,
  };

  const parsedCurrentAge = Number(currentAge);
  const parsedRetirementAge = Number(retirementAge);
  const parsedMonthlyContribution = Number(monthlyContribution);
  const parsedAnnualRate = Number(annualRate);
  const parsedInitialInvestment = Number(initialInvestment);

  const validationError = (() => {
    if (parsedRetirementAge <= parsedCurrentAge)
      return "A idade de aposentadoria deve ser maior que a idade atual.";
    if (parsedMonthlyContribution < 100) return "O aporte mínimo é de R$ 100,00.";
    if (parsedAnnualRate < 1 || parsedAnnualRate > 50)
      return "Informe uma taxa entre 1% e 50% ao ano.";
    return null;
  })();

  const isValidScenario = parsedCurrentAge > 0 && !validationError;
  const isDark = theme === "dark";
  const chartGridStroke = isDark ? "rgba(255,255,255,0.08)" : "#E5E5E5";
  const chartAxisStroke = isDark ? "#69727D" : "#484949";

  const projection = isValidScenario
    ? calculateRetirementProjection(
        parsedCurrentAge,
        parsedRetirementAge,
        parsedMonthlyContribution,
        parsedAnnualRate,
        parsedInitialInvestment,
      )
    : null;

  return (
    <div className="pb-12 pt-32 sm:pt-36">
      <div className="section-container">
        {/* Cabeçalho compacto */}
        <div className="mb-6">
          <span className="section-tag">Simulador de aposentadoria</span>
          <h1 className="mt-3 text-2xl font-semibold leading-tight text-[var(--text-primary)] sm:text-3xl">
            Projete o patrimônio para uma{" "}
            <span className="text-gradient">renda passiva consistente.</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Aportes mensais e rentabilidade anual esperada para estimar a evolução
            patrimonial até a idade-alvo.
          </p>
        </div>

        {/* Card único */}
        <div className="surface-card p-5 sm:p-6">
          {/* Inputs em linha */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {inputs.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#041A2A] dark:text-white">
                  {field.label}
                </span>
                <input
                  type="number"
                  min={field.min}
                  step={field.step}
                  value={values[field.key]}
                  onChange={(event) => setters[field.key](event.target.value)}
                  className="input-base"
                />
              </label>
            ))}
          </div>

          {/* Gráfico (tamanho de card) + resultados lado a lado */}
          <div className="mt-6 grid gap-6 border-t border-[#484949]/15 pt-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0 relative overflow-hidden rounded-xl">
              {/* Logo Marca d'água no fundo do gráfico (centralizado na área do gráfico) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.09] dark:opacity-[0.06] z-0">
                <img
                  src={logoSrc}
                  alt="Accione Watermark"
                  className="w-[60%] max-w-md h-auto object-contain select-none"
                  style={
                    theme === "light" ? { mixBlendMode: "multiply" } : undefined
                  }
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="section-tag">Evolução patrimonial</span>
                  {projection ? (
                    <span className="text-xs text-[var(--text-muted)]">
                      Final: {formatCompactCurrency(projection.balance)}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 h-[220px]">
                  {isValidScenario && projection ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={projection.points}>
                        <defs>
                          <linearGradient
                            id="retirementBalance"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="5%" stopColor="#A26547" stopOpacity={0.45} />
                            <stop offset="95%" stopColor="#A26547" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke={chartGridStroke} vertical={false} />
                        <XAxis
                          dataKey="age"
                          stroke={chartAxisStroke}
                          tickLine={false}
                          axisLine={false}
                          fontSize={12}
                        />
                        <YAxis
                          stroke={chartAxisStroke}
                          tickLine={false}
                          axisLine={false}
                          width={48}
                          fontSize={12}
                          tickFormatter={(value: number) => formatCompactCurrency(value)}
                        />
                        <Tooltip
                          formatter={(value) => [
                            formatCurrency(Number(value ?? 0)),
                            "Patrimônio",
                          ]}
                          labelFormatter={(label) => `Idade ${label}`}
                          contentStyle={{
                            backgroundColor: isDark ? "#0C2030" : "#FFFFFF",
                            border: isDark
                              ? "1px solid rgba(255,255,255,0.1)"
                              : "1px solid #E5E5E5",
                            borderRadius: "12px",
                            color: isDark ? "#FFFFFF" : "#041A2A",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="#A26547"
                          fill="url(#retirementBalance)"
                          strokeWidth={2.5}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#484949]/25 px-4 text-center text-sm text-[var(--text-secondary)]">
                      {validationError ?? "Preencha os campos para ver a projeção."}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Patrimônio acumulado
                </p>
                <p className="mt-1 font-body text-2xl font-semibold tabular-nums text-[#A26547]">
                  {projection ? formatCurrency(projection.balance) : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Renda passiva estimada
                </p>
                <p className="mt-1 font-body text-2xl font-semibold tabular-nums text-[#A26547]">
                  {projection ? formatCurrency(projection.monthlyIncome) : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Horizonte
                </p>
                <p className="mt-1 font-body text-xl font-semibold tabular-nums text-[#041A2A] dark:text-white">
                  {projection ? `${projection.months / 12} anos` : "—"}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  Taxa: {formatPercent(parsedAnnualRate, "% a.a.")}
                </p>
              </div>
              <WhatsAppButton
                mensagem="Olá! Fiz uma simulação de aposentadoria no site e gostaria de conversar sobre investimentos."
                label="Falar pelo WhatsApp"
                size="sm"
                className="mt-auto"
              />
            </div>
          </div>

          {/* Aviso legal compacto */}
          <p className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">
            Estimativas com base nos dados informados. Não constituem garantia de
            rentabilidade nem recomendação de investimento. Rentabilidade passada não
            garante resultados futuros.
          </p>
        </div>
      </div>
    </div>
  );
}
