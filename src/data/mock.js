// Dados mockados — sem backend por enquanto.
// Quando o Firebase entrar, isso vira leitura do Firestore (coleções
// clients / sites / briefing / updates, como conversado).

export const MOCK_USER = {
  name: 'Marcos Soares',
  company: 'Emanoel Confecções',
  email: 'contato@emanoelconfeccoes.com.br',
};

export const METHOD_STAGES = [
  { id: 1, label: 'Estudo de mercado', desc: 'Mapeamento de público, concorrência e posicionamento.' },
  { id: 2, label: 'Design UX/UI', desc: 'Layout exclusivo pensado para o seu público.' },
  { id: 3, label: 'Desenvolvimento', desc: 'Construção do site na stack definida.' },
  { id: 4, label: 'Desempenho', desc: 'Ajustes de velocidade e estabilidade.' },
  { id: 5, label: 'SEO', desc: 'Estrutura técnica para ranquear organicamente.' },
  { id: 6, label: 'Otimização contínua', desc: 'Acompanhamento e evolução pós-entrega.' },
];

export const PAGE_OPTIONS = [
  'Home', 'Sobre', 'Serviços', 'Portfólio/Catálogo', 'Blog',
  'Loja/E-commerce', 'Contato', 'Perguntas frequentes', 'Área do cliente',
];

// Seções de uma landing page (projeto de página única) — usadas em vez de
// PAGE_OPTIONS quando o cliente escolhe "Landing page" no formulário de
// criação de site.
export const LANDING_SECTIONS = [
  'Hero de abertura', 'Sobre / proposta de valor', 'Diferenciais',
  'Depoimentos / prova social', 'Planos e preços', 'Perguntas frequentes',
  'Formulário de contato / CTA final',
];

export const FEATURE_OPTIONS = [
  'Formulário de contato', 'Botão de WhatsApp', 'Blog', 'Loja online',
  'Agendamento online', 'Login para clientes', 'Chat ao vivo', 'Newsletter',
];

export const COLOR_PRESETS = [
  { name: 'Ouro & Tinta', colors: ['#0F1219', '#C6992F', '#EFEAE0'] },
  { name: 'Verde Petróleo', colors: ['#12211F', '#2E5B55', '#F5F1E8'] },
  { name: 'Terracota', colors: ['#241A16', '#C0603F', '#F3E9DD'] },
  { name: 'Azul Marinho', colors: ['#0D1526', '#3D6FB4', '#EDF1F7'] },
];

// Cada site do cliente. Um cliente pode ter mais de um.
export const MOCK_SITES = [
  {
    id: 'emanoel-confeccoes',
    name: 'Site institucional — Emanoel Confecções',
    url: 'emanoelconfeccoes.com.br',
    status: 'em-desenvolvimento', // em-desenvolvimento | no-ar | pausado
    currentStage: 3,
    startedAt: '2026-06-02',
    estimatedDelivery: '2026-07-28',
    pages: [
      { name: 'Header', done: true },
      { name: 'Hero', done: true },
      { name: 'Sobre', done: false },
      { name: 'Serviços', done: false },
      { name: 'Contato', done: false },
    ],
    plan: {
      name: 'Plano Essencial',
      price: 'R$ 189/mês',
      cycle: 'Cobrança mensal, dia 5',
      nextPayment: '05 ago',
      includes: ['Hospedagem', 'Domínio', 'Manutenção mensal', 'Suporte por WhatsApp'],
    },
    updates: [
      { date: '15 jul', text: 'Primeira versão das telas internas enviada para revisão.' },
      { date: '08 jul', text: 'Estrutura de páginas aprovada pelo cliente.' },
      { date: '30 jun', text: 'Layout da home aprovado na primeira versão.' },
      { date: '18 jun', text: 'Briefing recebido e estudo de mercado iniciado.' },
    ],
    files: [
      { name: 'logo-emanoel.png', size: '480 KB' },
      { name: 'catalogo-produtos.pdf', size: '2.1 MB' },
    ],
  },
  {
    id: 'emanoel-lavanderia',
    name: 'Landing page — Lavanderia Emanoel',
    url: 'lavanderiaemanoel.com.br',
    status: 'no-ar',
    currentStage: 6,
    startedAt: '2026-02-10',
    estimatedDelivery: '2026-03-20',
    pages: [
      { name: 'Header', done: true },
      { name: 'Hero', done: true },
      { name: 'Serviços', done: true },
      { name: 'Contato', done: true },
    ],
    plan: {
      name: 'Plano Básico',
      price: 'R$ 99/mês',
      cycle: 'Cobrança mensal, dia 10',
      nextPayment: '10 ago',
      includes: ['Hospedagem', 'Domínio', 'Suporte por e-mail'],
    },
    updates: [
      { date: '20 mar', text: 'Site publicado no domínio final.' },
      { date: '12 mar', text: 'Ajustes finais de SEO local.' },
    ],
    files: [
      { name: 'logo-lavanderia.png', size: '210 KB' },
    ],
  },
];
