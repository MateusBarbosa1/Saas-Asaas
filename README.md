# WA Web Design — Área do Cliente (front-end)

Front-end do dashboard onde os clientes da WA Web Design fazem login,
acompanham o progresso do site (linha do tempo do Método WA) e preenchem
o briefing do projeto.

**Estado atual: só front-end, sem backend.** Login, progresso e briefing
usam dados mockados em `src/data/mock.js` e estado local em memória —
nada é salvo entre sessões ainda. Quando o Firebase (ou outro backend)
entrar, é só trocar esses pontos por chamadas reais.

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
    Login.jsx        tela de login
    Dashboard.jsx     visão geral + progresso das 6 etapas do Método WA
    Briefing.jsx      wizard de briefing (negócio, paleta, páginas, funcionalidades...)
    Placeholder.jsx   telas "Arquivos" e "Configurações" (ainda não construídas)
  components/
    DashboardLayout.jsx  sidebar + topo, usado nas páginas internas
    ProgressTracker.jsx  linha do tempo das 6 etapas
  data/
    mock.js           todos os dados de exemplo — trocar por dados reais depois
```

## Próximos passos sugeridos

- Trocar o login mockado por Firebase Auth (ou outro provedor)
- Trocar `mock.js` por leitura/escrita no Firestore (coleções `clients`,
  `projects`, `briefing`, `updates`)
- Conectar o envio do briefing a um endpoint real
- Ligar a tela "Arquivos" a upload real (ex: Firebase Storage)
