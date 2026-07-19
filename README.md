# WA Web Design — Área do Cliente (front-end)

Front-end do dashboard onde os clientes da WA Web Design fazem login,
acompanham o progresso do site (linha do tempo do Método WA) e preenchem
o briefing do projeto.

**Estado atual: só front-end, sem backend.** Login, sites e briefing
usam dados mockados em `src/data/mock.js` e estado local em memória —
nada é salvo entre sessões ainda. Quando o Firebase (ou outro backend)
entrar, é só trocar esses pontos por chamadas reais.

Um cliente pode ter **mais de um site** na conta (`MOCK_SITES`). Cada
site tem seu próprio progresso, checklist de páginas, briefing, plano
contratado e arquivos.

## Rodando localmente

```
npm install
npm run dev
```

Abre em `http://localhost:5173`. Qualquer e-mail/senha preenchidos na
tela de login "entram" no dashboard (não há validação real ainda).

## Build de produção

```
npm run build
```

Gera a pasta `dist/` pronta para hospedar em qualquer servidor estático.

## Estrutura

```
src/
  pages/
    Login.jsx         tela de login
    Signup.jsx         /criar-conta — cria a conta E já manda o primeiro
                       pedido de site, usando o NewSiteWizard (mode="signup")
    Home.jsx          /home — resumo de todos os sites do cliente
    MeusSites.jsx      /sites — lista de todos os sites (grid de cards)
    AddSite.jsx        /sites/novo — cliente já logado pede um site novo,
                       usando o NewSiteWizard (mode="add-site")
    SiteDetail.jsx     /sites/:siteId — URL, progresso, checklist de páginas,
                       fase do Método WA, atualizações e arquivos de UM site
    Briefing.jsx       /sites/:siteId/briefing — edita o briefing daquele site
    MeuPlano.jsx       /plano — plano contratado + cobrança de cada site
    Placeholder.jsx    tela "Minha conta" (ainda não construída)
  components/
    DashboardLayout.jsx  sidebar (Home, Meus sites, Meu plano, Minha conta) + topo
    ProgressTracker.jsx  linha do tempo das 6 etapas do Método WA
    NewSiteWizard.jsx    formulário robusto (tipo de projeto, negócio, visual,
                         estrutura, funcionalidades, conteúdo) reaproveitado
                         pelo Signup e pelo AddSite — só muda o `mode`.
                         Landing page x Site completo ramifica a etapa
                         "Estrutura": landing pergunta seções de uma página só,
                         site completo pergunta páginas.
  context/
    SitesContext.jsx  guarda a lista de sites em memória (`useState`) pra
                      Signup/AddSite conseguirem adicionar um site novo e ele
                      aparecer na hora em Home/Meus sites/Meu plano
  data/
    mock.js           MOCK_SITES (estado inicial) e o restante dos dados de
                       exemplo — trocar por dados reais depois
```

## Próximos passos sugeridos

- Trocar o login/cadastro mockados por Firebase Auth (ou outro provedor) —
  hoje `Signup` só guarda os dados da conta em memória, não cria usuário de verdade
- Trocar `SitesContext` por leitura/escrita no Firestore (coleções `clients`,
  `sites`, `briefing`, `updates`), com `sites` referenciando o cliente dono
- Conectar o envio do briefing/wizard a um endpoint real, associado ao `siteId`
- Ligar "Arquivos enviados" (dentro de cada site) a upload real (ex: Firebase Storage)
- Construir a tela "Minha conta" (hoje é só placeholder)
