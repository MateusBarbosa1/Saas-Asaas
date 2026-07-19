// Dados mockados — sem backend por enquanto.
// Quando o Firebase entrar, isso vira leitura do Firestore (coleções
// clients / projects / briefing / updates, como conversado).

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

export const MOCK_PROJECT = {
  name: 'Site institucional — Emanoel Confecções',
  currentStage: 3,
  startedAt: '2026-06-02',
  estimatedDelivery: '2026-07-28',
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
};

export const PAGE_OPTIONS = [
  'Home', 'Sobre', 'Serviços', 'Portfólio/Catálogo', 'Blog',
  'Loja/E-commerce', 'Contato', 'Perguntas frequentes', 'Área do cliente',
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
