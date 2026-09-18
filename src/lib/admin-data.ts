import { items, courseItems, pdfItems, bookItems, mentorItems } from "./data";

export type ContentStatus = "publicado" | "rascunho" | "arquivado";

export type AdminContent = {
  slug: string;
  title: string;
  type: string;
  category: string;
  price: number;
  modules: number;
  lessons: number;
  students: number;
  rating: number;
  status: ContentStatus;
  updatedAt: string;
};

const statusCycle: ContentStatus[] = [
  "publicado",
  "publicado",
  "publicado",
  "publicado",
  "rascunho",
  "publicado",
  "arquivado",
];

const months = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function mockDate(index: number, offset: number) {
  const day = ((index * 7 + offset) % 27) + 1;
  const month = months[(index * 3 + offset) % 12];
  return `${day} ${month} 2025`;
}

export const adminContents: AdminContent[] = items.map((item, index) => ({
  slug: item.slug,
  title: item.title,
  type: item.type,
  category: item.category,
  price: item.price,
  modules: item.modules ?? 0,
  lessons: item.lessons ?? 0,
  students: 40 + ((index * 53) % 620),
  rating: item.rating,
  status: statusCycle[index % statusCycle.length],
  updatedAt: mockDate(index, 2),
}));

export type AdminStudent = {
  id: string;
  name: string;
  email: string;
  initials: string;
  contents: number;
  progress: number;
  joinedAt: string;
  status: "ativo" | "inativo" | "trial";
};

const studentSeeds: [string, string, number, number, string, AdminStudent["status"]][] = [
  ["Ana Beatriz Souza", "ana.souza@email.com", 4, 72, "02 nov 2024", "ativo"],
  ["Bruno Carvalho", "bruno.carvalho@email.com", 2, 41, "14 dez 2024", "ativo"],
  ["Camila Ribeiro", "camila.ribeiro@email.com", 6, 96, "08 set 2024", "ativo"],
  ["Daniel Moreira", "daniel.moreira@email.com", 1, 12, "21 jan 2025", "trial"],
  ["Eduarda Lima", "eduarda.lima@email.com", 3, 58, "30 out 2024", "ativo"],
  ["Felipe Andrade", "felipe.andrade@email.com", 5, 83, "17 ago 2024", "ativo"],
  ["Gabriela Nunes", "gabriela.nunes@email.com", 2, 27, "05 fev 2025", "inativo"],
  ["Henrique Dias", "henrique.dias@email.com", 4, 64, "11 nov 2024", "ativo"],
  ["Isabela Martins", "isabela.martins@email.com", 7, 100, "23 jul 2024", "ativo"],
  ["João Pedro Alves", "joao.alves@email.com", 1, 9, "28 fev 2025", "trial"],
  ["Larissa Gomes", "larissa.gomes@email.com", 3, 52, "19 set 2024", "ativo"],
  ["Mateus Rocha", "mateus.rocha@email.com", 2, 33, "07 jan 2025", "inativo"],
];

export const adminStudents: AdminStudent[] = studentSeeds.map(
  ([name, email, contents, progress, joinedAt, status], index) => ({
    id: `ALU-${String(index + 1).padStart(3, "0")}`,
    name,
    email,
    initials: name
      .split(" ")
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join(""),
    contents,
    progress,
    joinedAt,
    status,
  }),
);

export type AdminMentorship = {
  id: string;
  plan: string;
  student: string;
  teacher: string;
  nextSession: string;
  schedule: string;
  status: "agendada" | "em andamento" | "concluída" | "pendente";
};

export const adminMentorships: AdminMentorship[] = mentorItems.flatMap(
  (mentor, index) => {
    const assignees = adminStudents.slice(index * 3, index * 3 + 3);
    return assignees.map((student, i) => ({
      id: `MEN-${String(index * 3 + i + 1).padStart(3, "0")}`,
      plan: mentor.title,
      student: student.name,
      teacher: mentor.teacher ?? "Equipe Kerygma",
      nextSession: mockDate(index + i, 5),
      schedule: i % 2 === 0 ? "Terças, 19h" : "Quintas, 20h",
      status: (["agendada", "em andamento", "concluída"] as const)[i % 3],
    }));
  },
);

export type AdminActivity = {
  id: string;
  title: string;
  detail: string;
  when: string;
  tone: "brand" | "green" | "sky" | "amber";
};

export const adminActivity: AdminActivity[] = [
  {
    id: "a1",
    title: "Nova venda de curso",
    detail: "Cristologia contemporânea · Ana Beatriz Souza",
    when: "há 12 min",
    tone: "green",
  },
  {
    id: "a2",
    title: "Novo aluno cadastrado",
    detail: "João Pedro Alves entrou na plataforma",
    when: "há 40 min",
    tone: "brand",
  },
  {
    id: "a3",
    title: "Mentoria agendada",
    detail: "Mentoria de pregação · Terças, 19h",
    when: "há 2 h",
    tone: "sky",
  },
  {
    id: "a4",
    title: "Curso em rascunho",
    detail: "Bibliologia aguardando revisão final",
    when: "há 5 h",
    tone: "amber",
  },
  {
    id: "a5",
    title: "Material publicado",
    detail: "Guia prático de exegese atualizado",
    when: "ontem",
    tone: "green",
  },
];

export const adminTopContents = [...adminContents]
  .sort((a, b) => b.students - a.students)
  .slice(0, 5);

export const adminStats = {
  students: 1248,
  studentsDelta: "+8,2%",
  contents: items.length,
  publishedCourses: courseItems.filter((item) => item.curriculum).length,
  soldThisMonth: 386,
  soldDelta: "+5,4%",
  revenue: 24890,
  revenueDelta: "+12,1%",
  completion: 68,
  pdfs: pdfItems.length,
  books: bookItems.length,
  mentorships: mentorItems.length,
  approvedCourses: courseItems.length,
};
