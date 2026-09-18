import type { Module } from "./types";

type LessonSeed = [title: string, duration: string, description: string];

const mod = (title: string, lessons: LessonSeed[]): Module => ({
  title,
  lessons: lessons.map(([lessonTitle, duration, description]) => ({
    title: lessonTitle,
    duration,
    description,
  })),
});

/**
 * Estrutura demonstrativa de módulos e aulas para todos os cursos.
 * Dados de protótipo, organizados por slug do conteúdo.
 */
export const courseCurricula: Record<string, Module[]> = {
  "teologia-sistematica": [
    mod("O que é teologia?", [
      [
        "Teologia como saber ordenado",
        "42 min",
        "Por que estudar teologia em ordem e o que distingue o saber teológico de outras formas de conhecimento.",
      ],
      [
        "As fontes da teologia",
        "38 min",
        "Escritura, tradição, razão e experiência: como cada fonte contribui para o pensamento cristão.",
      ],
      [
        "Teologia e vida cristã",
        "35 min",
        "A relação entre doutrina e prática, entre conhecer a Deus e viver diante dele.",
      ],
    ]),
    mod("Prolegômenos e revelação", [
      [
        "Revelação geral e especial",
        "41 min",
        "Como Deus se dá a conhecer na criação e, de modo particular, na história da redenção.",
      ],
      [
        "Autoridade da Escritura",
        "47 min",
        "O fundamento da autoridade bíblica e suas implicações para a fé e a conduta.",
      ],
      [
        "Fé e razão",
        "36 min",
        "O diálogo entre confiança e investigação intelectual na busca pela verdade.",
      ],
    ]),
    mod("A doutrina de Deus", [
      [
        "Atributos de Deus",
        "44 min",
        "Os atributos comunicáveis e incomunicáveis e o que eles revelam sobre quem Deus é.",
      ],
      [
        "A Trindade",
        "49 min",
        "A unidade de Deus em três pessoas e a formulação histórica desse mistério.",
      ],
      [
        "Criação e providência",
        "40 min",
        "Deus como origem e sustentador de tudo, e o sentido da criação para a fé.",
      ],
    ]),
    mod("Cristo e a salvação", [
      [
        "A encarnação",
        "45 min",
        "O Verbo que se fez carne: a união das naturezas e sua importância para a salvação.",
      ],
      [
        "A obra expiatória",
        "43 min",
        "As imagens bíblicas da cruz e o alcance da obra de Cristo.",
      ],
      [
        "Aplicação da redenção",
        "39 min",
        "Como a obra de Cristo alcança o pecador e transforma a vida.",
      ],
    ]),
  ],

  cristologia: [
    mod("O Cristo das Escrituras", [
      [
        "Promessa e cumprimento",
        "38 min",
        "Do protoevangelho ao cumprimento messiânico: a expectativa que atravessa o Antigo Testamento.",
      ],
      [
        "Títulos messiânicos",
        "41 min",
        "Messias, Filho de Davi, Servo: o que cada título revela sobre a identidade de Jesus.",
      ],
      [
        "O Filho do Homem",
        "36 min",
        "A expressão preferida de Jesus e seu pano de fundo em Daniel.",
      ],
    ]),
    mod("Concílios e definições", [
      [
        "Niceia e a consubstancialidade",
        "46 min",
        "O debate ariano e a afirmação de que o Filho é da mesma essência do Pai.",
      ],
      [
        "Calcedônia e as duas naturezas",
        "48 min",
        "Como a igreja antiga formulou a unidade da pessoa e a distinção das naturezas.",
      ],
      [
        "Cristologia e heresias",
        "37 min",
        "Os erros cristológicos clássicos e por que eles ainda importam.",
      ],
    ]),
    mod("Cristologia contemporânea", [
      [
        "Leituras modernas de Cristo",
        "44 min",
        "Da cristologia liberal aos debates atuais sobre a identidade de Jesus.",
      ],
      [
        "Cristo e a cultura",
        "39 min",
        "Como anunciar o Cristo bíblico num mundo que reescreve a pergunta por ele.",
      ],
      [
        "Cristo e a igreja",
        "35 min",
        "A centralidade de Cristo para a vida, a missão e a esperança da comunidade.",
      ],
    ]),
  ],

  "hermeneutica-biblica": [
    mod("Fundamentos da interpretação", [
      [
        "O que é hermenêutica",
        "34 min",
        "O estudo dos princípios que orientam a leitura e a interpretação das Escrituras.",
      ],
      [
        "História da interpretação",
        "40 min",
        "Como a igreja leu a Bíblia ao longo dos séculos e o que aprender com essa história.",
      ],
      [
        "Pressupostos do leitor",
        "32 min",
        "Como nossas convicções e contexto influenciam a leitura do texto.",
      ],
    ]),
    mod("Método exegético", [
      [
        "Contexto histórico e literário",
        "43 min",
        "Situar o texto em seu tempo, seu autor e sua comunidade original.",
      ],
      [
        "Gêneros literários",
        "41 min",
        "Narrativa, poesia, epístola e apocalíptica: ler cada gênero segundo suas regras.",
      ],
      [
        "Estrutura e argumento",
        "38 min",
        "Identificar a organização do texto para compreender sua mensagem.",
      ],
    ]),
    mod("Da exegese à aplicação", [
      [
        "A ponte hermenêutica",
        "36 min",
        "Como transpor a distância entre o texto antigo e o leitor contemporâneo.",
      ],
      [
        "Princípios permanentes",
        "34 min",
        "Distinguir o que é cultural e o que permanece normativo para a fé.",
      ],
      [
        "Aplicação pastoral",
        "39 min",
        "Transformar a interpretação em ensino fiel e edificante.",
      ],
    ]),
  ],

  pneumatologia: [
    mod("O Espírito na Escritura", [
      [
        "O Espírito no Antigo Testamento",
        "37 min",
        "Criação, profecia e capacitação: a atuação do Espírito antes de Pentecostes.",
      ],
      [
        "Promessas proféticas",
        "35 min",
        "Ezequiel e Joel e a promessa de um derramar do Espírito sobre toda a carne.",
      ],
      [
        "Pentecostes e o Espírito",
        "42 min",
        "O evento que marca a nova etapa da missão e da vida da igreja.",
      ],
    ]),
    mod("O Espírito na história", [
      [
        "A patrística e o Espírito",
        "38 min",
        "Os primeiros séculos e a formulação da doutrina do Espírito Santo.",
      ],
      [
        "Reforma e avivamentos",
        "40 min",
        "Como a redescoberta do Espírito marcou a reforma e os despertares.",
      ],
      [
        "Debates contemporâneos",
        "36 min",
        "Os dons, as experiências e o discernimento na igreja de hoje.",
      ],
    ]),
    mod("O Espírito e a vida cristã", [
      [
        "Dons e frutos",
        "41 min",
        "As capacitações para o serviço e o caráter que o Espírito produz.",
      ],
      [
        "Santificação",
        "39 min",
        "A obra do Espírito na transformação progressiva do crente.",
      ],
      [
        "Espírito e comunidade",
        "34 min",
        "O Espírito como vínculo da comunhão e força da missão.",
      ],
    ]),
  ],

  escatologia: [
    mod("Introdução e métodos", [
      [
        "O que é escatologia",
        "33 min",
        "O estudo das últimas coisas e por que ele importa para a fé presente.",
      ],
      [
        "Escolas de interpretação",
        "44 min",
        "As principais correntes e seus textos-chave, sem sensacionalismo.",
      ],
      [
        "Panorama bíblico",
        "40 min",
        "Como a esperança escatológica atravessa o Antigo e o Novo Testamento.",
      ],
    ]),
    mod("O reino de Deus", [
      [
        "Já e ainda não",
        "38 min",
        "A tensão entre o reino já inaugurado e o reino que ainda se espera.",
      ],
      [
        "Sinais dos tempos",
        "36 min",
        "O que as Escrituras ensinam sobre os acontecimentos que precedem a consumação.",
      ],
      [
        "Israel e igreja",
        "42 min",
        "O lugar do povo de Deus na leitura do plano redentor.",
      ],
    ]),
    mod("A consumação", [
      [
        "A volta de Cristo",
        "45 min",
        "A promessa central da esperança cristã e suas implicações práticas.",
      ],
      [
        "Ressurreição e juízo",
        "43 min",
        "O corpo ressuscitado e a justiça final de Deus.",
      ],
      [
        "Nova criação",
        "37 min",
        "O fim como recomeço: a esperança de um céu novo e uma terra nova.",
      ],
    ]),
  ],

  apologetica: [
    mod("Por que defender a fé", [
      [
        "Apologética e evangelho",
        "34 min",
        "A defesa da fé como parte da missão, e não como confronto.",
      ],
      [
        "Mansidão e rigor",
        "36 min",
        "Argumentar com honestidade intelectual e respeito pela pessoa.",
      ],
      [
        "Modelos de defesa",
        "39 min",
        "As principais abordagens apologéticas e quando usar cada uma.",
      ],
    ]),
    mod("Questões frequentes", [
      [
        "O problema do sofrimento",
        "45 min",
        "Como responder às objeções mais honestas sobre dor e existência de Deus.",
      ],
      [
        "Ciência e fé",
        "41 min",
        "Diálogo possível entre as duas esferas, sem reduzir uma à outra.",
      ],
      [
        "Fiabilidade da Escritura",
        "43 min",
        "Evidências históricas e textuais para confiar no texto bíblico.",
      ],
    ]),
    mod("Diálogo com o mundo", [
      [
        "Fé em tempos pós-cristãos",
        "40 min",
        "Comunicar a fé numa cultura que perdeu referenciais comuns.",
      ],
      [
        "A dúvida honesta",
        "35 min",
        "Acolher a dúvida como parte possível do caminho de fé.",
      ],
      [
        "Apologética na prática",
        "38 min",
        "Como conduzir conversas reais no cotidiano com clareza e caridade.",
      ],
    ]),
  ],

  bibliologia: [
    mod("Revelação e inspiração", [
      [
        "A revelação de Deus",
        "36 min",
        "Como Deus se comunica e por que a Escritura é central nessa comunicação.",
      ],
      [
        "Inspiração das Escrituras",
        "40 min",
        "O que significa dizer que o texto é inspirado por Deus.",
      ],
      [
        "Autoridade e suficiência",
        "37 min",
        "A Escritura como regra de fé e prática da igreja.",
      ],
    ]),
    mod("Formação do cânon", [
      [
        "O cânon do Antigo Testamento",
        "42 min",
        "O processo histórico pelo qual os livros hebraicos foram reunidos.",
      ],
      [
        "O cânon do Novo Testamento",
        "44 min",
        "Critérios e testemunhos que levaram à formação do cânon cristão.",
      ],
      [
        "Textos apócrifos e deuterocanônicos",
        "35 min",
        "O que são, o que contêm e por que não integram o cânon protestante.",
      ],
    ]),
    mod("Transmissão do texto", [
      [
        "Manuscritos e cópias",
        "43 min",
        "Como o texto foi copiado e preservado ao longo dos séculos.",
      ],
      [
        "Crítica textual",
        "45 min",
        "O trabalho de reconstruir o texto original a partir das cópias.",
      ],
      [
        "Traduções e versões",
        "38 min",
        "Os princípios por trás das traduções e como avaliá-las.",
      ],
    ]),
  ],

  soteriologia: [
    mod("Graça e eleição", [
      [
        "A necessidade da salvação",
        "34 min",
        "A condição humana e por que a salvação é, antes de tudo, obra de Deus.",
      ],
      [
        "Graça soberana",
        "40 min",
        "A iniciativa divina na salvação e suas implicações.",
      ],
      [
        "Eleição e chamado",
        "42 min",
        "Os debates históricos sobre a escolha de Deus e a resposta humana.",
      ],
    ]),
    mod("Aplicação da salvação", [
      [
        "Conversão e fé",
        "39 min",
        "O arrepender-se e o crer como resposta ao chamado de Deus.",
      ],
      [
        "Justificação",
        "43 min",
        "Como o pecador é declarado justo diante de Deus.",
      ],
      [
        "Adoção e união com Cristo",
        "37 min",
        "A nova identidade do crente como filho e membro do corpo de Cristo.",
      ],
    ]),
    mod("Perseverança e glória", [
      [
        "Santificação",
        "41 min",
        "O crescimento na graça como fruto da salvação.",
      ],
      [
        "Perseverança",
        "38 min",
        "A segurança da fé e a fidelidade de Deus até o fim.",
      ],
      [
        "Glorificação",
        "36 min",
        "A consumação da salvação e a esperança da transformação final.",
      ],
    ]),
  ],

  eclesiologia: [
    mod("A natureza da igreja", [
      [
        "O que é a igreja",
        "34 min",
        "Definição bíblica da comunidade convocada por Deus.",
      ],
      [
        "Imagens bíblicas da igreja",
        "38 min",
        "Corpo, noiva, templo e rebanho: metáforas que revelam a vocação da igreja.",
      ],
      [
        "Marcas da igreja",
        "36 min",
        "Palavra, sacramentos e disciplina como sinais de autenticidade.",
      ],
    ]),
    mod("Ordem e governo", [
      [
        "Ministérios e ofícios",
        "40 min",
        "Pastores, presbíteros e diáconos na organização da igreja.",
      ],
      [
        "As ordenanças",
        "39 min",
        "Batismo e ceia como sinais visíveis da graça.",
      ],
      [
        "Disciplina e cuidado",
        "35 min",
        "A correção fraterna como ato de amor e proteção.",
      ],
    ]),
    mod("Missão e vida", [
      [
        "Missão integral",
        "42 min",
        "O anúncio do evangelho e o serviço ao próximo como vocação da igreja.",
      ],
      [
        "Comunhão e comunhão de bens",
        "37 min",
        "A vida em comum como testemunho do reino.",
      ],
      [
        "Igreja e cultura",
        "40 min",
        "Como a igreja se relaciona com a sociedade sem se conformar a ela.",
      ],
    ]),
  ],

  "teologia-pastoral": [
    mod("Vocação e caráter", [
      [
        "O chamado pastoral",
        "36 min",
        "O que é o ministério pastoral e como discernir a vocação.",
      ],
      [
        "Caráter do pastor",
        "41 min",
        "As qualificações morais e espirituais do cuidado do rebanho.",
      ],
      [
        "Vida devocional",
        "34 min",
        "A comunhão com Deus como fonte do ministério.",
      ],
    ]),
    mod("O cuidado da alma", [
      [
        "Aconselhamento básico",
        "44 min",
        "Princípios para ouvir, orientar e encaminhar com sabedoria.",
      ],
      [
        "Visita e presença",
        "37 min",
        "A proximidade pastoral nos momentos de alegria e de dor.",
      ],
      [
        "Crises e luto",
        "42 min",
        "Acompanhar pessoas em sofrimento, perda e transições difíceis.",
      ],
    ]),
    mod("Discipulado e liderança", [
      [
        "Formação de discípulos",
        "40 min",
        "Fazer discípulos como tarefa central e cotidiana da igreja.",
      ],
      [
        "Liderança serva",
        "38 min",
        "O poder posto a serviço do outro, segundo o modelo de Cristo.",
      ],
      [
        "Saúde do ministério",
        "36 min",
        "Prevenir o esgotamento e cultivar um ministério sustentável.",
      ],
    ]),
  ],

  "estudos-biblicos-at": [
    mod("Introdução ao Antigo Testamento", [
      [
        "Panorama e geografia",
        "45 min",
        "As grandes divisões do AT e o cenário geográfico onde a história se desenrola.",
      ],
      [
        "Formação e transmissão",
        "42 min",
        "Como os livros foram escritos, reunidos e preservados.",
      ],
      [
        "O mundo do Antigo Testamento",
        "44 min",
        "Nações, culturas e religiões que formam o pano de fundo dos relatos.",
      ],
    ]),
    mod("História e profetas", [
      [
        "Êxodo e aliança",
        "47 min",
        "A libertação do Egito e a aliança no Sinai como eixo da fé de Israel.",
      ],
      [
        "Reis e profetas",
        "49 min",
        "A monarquia, suas crises e a voz profética que confronta o poder.",
      ],
      [
        "Exílio e retorno",
        "43 min",
        "A catástrofe do exílio, a esperança profética e a reconstrução.",
      ],
    ]),
    mod("Poesia e sabedoria", [
      [
        "Salmos: oração e louvor",
        "41 min",
        "Gêneros, formas e o uso dos Salmos na vida de fé.",
      ],
      [
        "Provérbios e a literatura sapiencial",
        "39 min",
        "A sabedoria prática do Antigo Testamento para a vida diária.",
      ],
      [
        "Jó e a teodiceia",
        "46 min",
        "Sofrimento, justiça e a complexidade da fé em meio à dor.",
      ],
    ]),
  ],
};
