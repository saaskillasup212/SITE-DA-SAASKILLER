# PRD/PATCH — Seletor de idioma PT/EN/ES · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Implementação padrão (i18n de landing) + volume de tradução; sem banco/auth.
Custo estimado:        médio

## Contexto
Landing SaaSKiller (Vite + React SPA, sem lib de i18n). Todo o copy está
hardcoded em PT-BR dentro de ~14 componentes de seção (Hero, Benefits,
HowItWorks, Compatibility, Stats, Pricing, ExtensionSection, SocialProof,
FAQ, FinalCTA, Header, Footer, LoadingScreen) + 3 páginas legais.
A referência (REFERENCIA/Captura...133600.png) mostra o padrão aprovado:
dropdown no header com bandeira + código (PT-BR ✓ / EN-EUA / ES-ES).

## Objetivo
Seletor de idioma no Header (desktop e menu mobile) que troca todo o copy
da landing em runtime entre PT-BR (default), EN e ES, persistindo a escolha.

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/*, supabase/, .env
- Valores comerciais intocáveis e SEMPRE em R$: planos 79,90/99,90/119,90 ·
  extensão 19/39/69/97/197 (não converter moeda)
- Páginas legais (Política Privacidade/Reembolso/Termos) FICAM em PT-BR na v1
  (tradução jurídica fora do escopo)
- Zero mudança visual nas seções além do novo dropdown
- Respeitar tokens dourado/roxo no dropdown; sem hex hardcoded

## O que fazer
Fase 0 — Auditoria: mapear todas as strings visíveis por componente e
  reportar contagem antes de extrair.
Fase 1 — Infra: instalar i18next + react-i18next; dicionários
  src/i18n/pt.json|en.json|es.json (chaves por seção); provider no App;
  default pt-BR, persistência em localStorage, fallback pt.
Fase 2 — Extração PT: substituir strings hardcoded por chaves t() seção por
  seção (commit lógico por grupo), sem alterar layout.
Fase 3 — Tradução EN e ES: tom direto de copywriting (não literal),
  preços/links intactos.
Fase 4 — UI do seletor: dropdown no Header (bandeira SVG inline ou emoji +
  código do idioma, check no ativo, estilo referência adaptado aos tokens);
  incluir no menu mobile.
Fase 5 — Verificação: tsc + build + passada visual nos 3 idiomas
  (desktop + mobile iframe).

## Critério de pronto
[ ] Dropdown PT-BR/EN/ES no Header desktop e mobile, estilo da referência
[ ] 100% do copy da landing troca de idioma sem reload
[ ] Escolha persiste (localStorage) e default é PT-BR
[ ] Preços em R$ e links PerfectPay idênticos nos 3 idiomas
[ ] tsc + build passam; zero regressão visual
[ ] Testado: Mathias troca os 3 idiomas e rola a página inteira
