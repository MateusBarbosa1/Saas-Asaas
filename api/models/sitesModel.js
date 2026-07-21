const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function formatDate(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]}`;
}

function serializeSite(site) {
  return {
    id: site.id,
    name: site.name,
    url: site.url || "a definir após publicação",
    status: site.status,
    type: site.type,
    currentStage: site.currentStage,
    pages: site.pages.map((p) => ({ name: p.name, done: p.done })),
    updates: [...site.updates]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((u) => ({ date: formatDate(u.date), text: u.text })),
    files: site.files.map((f) => ({ name: f.name, size: f.size })),
    plan: site.plan
      ? {
          name: site.plan.name,
          price: site.plan.price,
          cycle: site.plan.cycle,
          nextPayment: site.plan.nextPayment || "—",
          includes: site.plan.includes,
        }
      : {
          name: "A definir",
          price: "A combinar",
          cycle: "A definir com a equipe",
          nextPayment: "—",
          includes: [],
        },
  };
}

const includeAll = { pages: true, updates: true, files: true, plan: true };

async function listSitesByUser(userId) {
  const sites = await prisma.sites.findMany({
    where: { userId },
    include: includeAll,
    orderBy: { createdAt: "asc" },
  });
  return sites.map(serializeSite);
}

async function getSiteById(userId, siteId) {
  const site = await prisma.sites.findFirst({
    where: { id: siteId, userId },
    include: includeAll,
  });
  return site ? serializeSite(site) : null;
}

async function createSite(userId, input) {
  const site = await prisma.sites.create({
    data: {
      userId,
      name: input.name,
      type: input.type,
      pages: { create: input.pages.map((name) => ({ name })) },
      updates: {
        create: [{ text: "Briefing recebido, aguardando início do estudo de mercado." }],
      },
    },
    include: includeAll,
  });
  return serializeSite(site);
}

module.exports = { listSitesByUser, getSiteById, createSite };
