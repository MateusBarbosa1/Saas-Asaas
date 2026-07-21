// Dados de exemplo/opções de formulário. MOCK_USER e MOCK_SITES saíram daqui
// — usuário e sites agora vêm da API (ver src/lib/api.js e src/context/SitesContext.jsx).

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
