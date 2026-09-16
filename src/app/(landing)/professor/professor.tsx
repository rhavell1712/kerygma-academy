const stats = [
  { value: "12+", label: "anos ensinando" },
  { value: "18", label: "cursos publicados" },
  { value: "4,9", label: "avaliação dos alunos" },
];

export function Professor() {
  return (
    <section id="professor" className="border-b border-white/10 bg-panel">
      <div className="mx-auto grid max-w-310 items-start gap-10 px-5 py-24 sm:px-8 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="relative order-2 aspect-3/4 max-w-95 lg:order-none">
          <div className="absolute -left-6 -top-6 h-full w-full rounded-sm border border-white/10" />
          <div className="absolute inset-0 overflow-hidden rounded-sm bg-[linear-gradient(145deg,#191019,#3a0d14)]">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[7rem] font-extrabold leading-none text-white/12">
                RN
              </span>
            </div>
            <p className="absolute bottom-5 left-5 font-display text-sm font-bold text-white/80">
              Prof. Ricardo Nunes
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-none">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft">
            <span className="h-px w-8 bg-brand" />
            Quem ensina
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
            Aprenda com quem também continua estudando.
          </h2>

          <p className="mt-6 max-w-140 text-[15px] leading-relaxed text-ink-soft">
            Ricardo Nunes é professor e pesquisador de Novo Testamento,
            com mais de uma década dedicada à formação cristã. Seus cursos
            e materiais procuram aproximar o rigor da pesquisa com a vida
            concreta da fé — leitura atenta do texto, contexto histórico e
            aplicação honesta.
          </p>

          <blockquote className="mt-10 border-l-2 border-brand pl-6">
            <p className="max-w-130 font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-white">
              &ldquo;Ensinar não é entregar respostas. É ajudar alguém a
              fazer perguntas melhores.&rdquo;
            </p>
            <footer className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
              Prof. Ricardo Nunes
            </footer>
          </blockquote>

          <div className="mt-12 grid max-w-140 grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-7">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0">
                <strong className="font-display text-2xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </strong>
                <p className="mt-1 text-xs leading-tight text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}