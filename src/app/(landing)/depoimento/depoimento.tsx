export function Depoimento() {
  return (
    <section id="depoimentos" className="border-b border-white/10 bg-panel">
      <div className="mx-auto max-w-215 px-5 py-24 text-center sm:px-8">
        <div className="mx-auto mb-10 h-10 w-px bg-brand" />
        <blockquote className="font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-white sm:text-[2rem]">
          &ldquo;Eu não queria apenas mais conteúdo. Eu queria finalmente{" "}
          <span className="text-brand-hover">entender</span> o que estava
          estudando.&rdquo;
        </blockquote>
        <div className="mt-8">
          <p className="font-display text-sm font-bold text-white">
            Camila Ribeiro
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
            Aluna Kerygma Academy
          </p>
        </div>
        <div className="mx-auto mt-10 h-10 w-px bg-brand" />
      </div>
    </section>
  );
}