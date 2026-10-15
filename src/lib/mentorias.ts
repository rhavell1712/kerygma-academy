export type Mentoria = {
  slug: string;
  title: string;
  category: string;
  description: string;
  long: string;
  topics: string[];
  encontros: string;
  duracao: string;
  formato: string;
  paraQuem: string;
  level: string;
  imageUrl?: string;
  accent: string;
  cover: { from: string; to: string };
};

export const mentorias: Mentoria[] = [
  {
    slug: "fundamentos-da-fe",
    title: "Fundamentos da Fé",
    category: "Teologia Sistemática",
    description:
      "Uma mentoria para organizar as bases da fé cristã: Deus, Escritura, salvação e vida nova — com clareza e sem pressa.",
    long: "Encontros ao vivo para construir, passo a passo, uma visão organizada da fé cristã. Você traz suas dúvidas e sai de cada encontro com um mapa claro do que crê e por quê.",
    topics: [
      "Quem é Deus: Pai, Filho e Espírito Santo",
      "A autoridade e a leitura da Escritura",
      "Salvação: graça, fé e arrependimento",
      "Igreja, batismo e ceia",
      "Vida cristã: oração e obediência no dia a dia",
    ],
    encontros: "8 encontros",
    duracao: "1h por encontro",
    formato: "Ao vivo, individual ou em grupo",
    paraQuem: "Novos convertidos e quem quer firmar as bases",
    level: "Iniciante",
    imageUrl: "/img/639d7879-9d21-413f-b262-c9bd767179cc.png",
    accent: "#b91c2b",
    cover: { from: "#17111c", to: "#5a0d16" },
  },
  {
    slug: "cristo-das-escrituras",
    title: "O Cristo das Escrituras",
    category: "Cristologia",
    description:
      "A pessoa e a obra de Jesus, do Éden ao Apocalipse: quem Ele é, o que Ele fez e por que isso muda tudo.",
    long: "Uma jornada guiada pelos textos sobre Cristo, com leitura atenta e aplicação honesta. Ideal para quem prega, ensina ou quer conhecer Jesus com profundidade.",
    topics: [
      "O Messias prometido no Antigo Testamento",
      "Encarnação: verdadeiro Deus e verdadeiro homem",
      "Morte e ressurreição: o coração do evangelho",
      "Os concílios e as heresias sobre Cristo",
      "Cristo hoje: adoração e missão",
    ],
    encontros: "6 encontros",
    duracao: "1h por encontro",
    formato: "Ao vivo, individual ou em grupo",
    paraQuem: "Quem ensina, prega ou quer aprofundar a fé",
    level: "Intermediário",
    imageUrl: "/img/Cristologia.jpg",
    accent: "#c8952c",
    cover: { from: "#1a130c", to: "#5c3a08" },
  },
  {
    slug: "interpretacao-biblica",
    title: "Interpretação Bíblica na Prática",
    category: "Hermenêutica",
    description:
      "Aprenda a ler, interpretar e aplicar a Bíblia com método: contexto, gênero literário e aplicação fiel.",
    long: "Mentoria prática com exercícios de leitura guiada. Você aprende um método simples e repetível para estudar qualquer texto bíblico com segurança.",
    topics: [
      "O método: observar, interpretar e aplicar",
      "Contexto histórico e literário",
      "Gêneros: narrativa, poesia, cartas e profecia",
      "Erros comuns de interpretação",
      "Do estudo à mensagem: montando seu esboço",
    ],
    encontros: "6 encontros",
    duracao: "1h30 por encontro",
    formato: "Ao vivo, com exercícios práticos",
    paraQuem: "Estudantes, líderes e pregadores iniciantes",
    level: "Intermediário",
    imageUrl: "/img/hermeneutica.avif",
    accent: "#2f6f6c",
    cover: { from: "#0d1616", to: "#14423f" },
  },
  {
    slug: "pregacao-expositiva",
    title: "Pregação Expositiva",
    category: "Homilética",
    description:
      "Da exegese ao púlpito: prepare mensagens fiéis ao texto, claras para o ouvinte e cheias de vida.",
    long: "Acompanhamento individual para desenvolver sua pregação: você prepara, apresenta e recebe feedback direto para evoluir a cada encontro.",
    topics: [
      "Do texto ao tema: encontrando a ideia central",
      "Estrutura do sermão expositivo",
      "Introdução, ilustrações e conclusão",
      "Voz, presença e comunicação",
      "Feedback prático das suas mensagens",
    ],
    encontros: "4 encontros",
    duracao: "1h30 por encontro",
    formato: "Ao vivo, individual",
    paraQuem: "Pregadores e líderes que querem evoluir",
    level: "Intermediário",
    accent: "#b9532c",
    cover: { from: "#170f0d", to: "#4a2412" },
  },
  {
    slug: "discipulado-e-vida-crista",
    title: "Discipulado e Vida Cristã",
    category: "Vida Cristã",
    description:
      "Crescimento espiritual intencional: oração, Palavra, caráter e relacionamentos na caminhada com Deus.",
    long: "Uma mentoria de acompanhamento próximo para ordenar a vida espiritual: hábitos, lutas e próximos passos com direção e encorajamento.",
    topics: [
      "Disciplinas espirituais: oração e Palavra",
      "Identidade e caráter em Cristo",
      "Lidando com lutas e tentações",
      "Relacionamentos e comunidade",
      "Plano pessoal de crescimento",
    ],
    encontros: "8 encontros",
    duracao: "1h por encontro",
    formato: "Ao vivo, individual",
    paraQuem: "Quem quer crescer com acompanhamento",
    level: "Todos os níveis",
    accent: "#3f7f5a",
    cover: { from: "#0f1617", to: "#14403a" },
  },
  {
    slug: "panorama-biblico",
    title: "Panorama Bíblico",
    category: "Estudos Bíblicos",
    description:
      "A história inteira da Bíblia em perspectiva: Antigo e Novo Testamento conectados numa só narrativa.",
    long: "Para quem se perde na leitura: uma visão de conjunto que conecta cada livro à grande história da redenção, com roteiro de leitura guiada.",
    topics: [
      "A narrativa da criação à queda",
      "Alianças e o povo de Israel",
      "Jesus: o centro da história",
      "A igreja e as cartas",
      "Apocalipse e a esperança final",
    ],
    encontros: "6 encontros",
    duracao: "1h por encontro",
    formato: "Ao vivo, individual ou em grupo",
    paraQuem: "Quem quer entender a Bíblia como um todo",
    level: "Iniciante",
    accent: "#2c5a8b",
    cover: { from: "#0d121a", to: "#14324f" },
  },
];
