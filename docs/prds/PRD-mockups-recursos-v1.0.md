# PRD/PATCH — Mockups em código nos cards de Recursos · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      UI pura em um componente React — sem banco, sem auth, sem arquitetura.
Custo estimado:        baixo

## Contexto
A seção "Tudo que você precisa. Num lugar só." (`src/components/Benefits.tsx`) tem 2 cards
grandes ("Criador de SaaS" e "Criador de Websites") que exibem `saas-creator.gif` e
`page-builder.gif` — capturas de ~320px/10KB esticadas para ~500px, ficando borradas.
O design system usa tokens CSS (`--bg-surface`, `--bg-elevated`, `--electric`, `--royal-rgb`,
`--text-primary`, `--text-muted`) e framer-motion com `usePerformance` (mobile/reduced-motion).

## Objetivo
Substituir os 2 GIFs borrados por mini-interfaces desenhadas em HTML/CSS (mockups),
nítidas em qualquer resolução, fiéis ao visual dark do produto e com micro-animação sutil.

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/client.ts, types.ts, supabase/config.toml, .env
- Não refatorar nada fora de `Benefits.tsx` (+ novo arquivo de mockups, se preciso)
- Manter os GIFs em `src/assets` (não deletar) — apenas parar de importá-los
- Respeitar `usePerformance`: sem animação em mobile/reduced-motion
- Usar somente tokens do design system (nada de cores hardcoded fora dos tokens)

## O que fazer
Fase 0 — Auditoria: confirmar tokens disponíveis no CSS global e o layout atual dos cards. ✅ (feita)
Fase 1 — Criar mockup "Criador de SaaS": mini-janela dark com sidebar, campo de ideia,
        linhas de "PRD gerado" aparecendo e botão de ação — tudo em divs/CSS + tokens.
Fase 2 — Criar mockup "Criador de Websites": mini-browser com barra de URL e blocos de
        landing page (hero, cards, CTA) se montando — mesmo estilo.
Fase 3 — Integrar nos cards grandes (substituir `<img>`), micro-animação com framer-motion
        (entrada por whileInView, once), desativada em mobile/reduced-motion.
Fase 4 — Validar no dev server: nitidez, responsividade (mobile → desktop), hover/tilt intactos.

## Critério de pronto
[ ] Os 2 cards grandes não usam mais os GIFs borrados
[ ] Mockups nítidos em qualquer largura, usando só tokens do design system
[ ] Tilt 3D + spotlight dos cards continuam funcionando
[ ] Sem animação em mobile/reduced-motion
[ ] Nada além de Benefits.tsx (+ arquivo novo de mockups) foi alterado
[ ] Testado: Mathias abre a landing, seção Recursos nítida no desktop e no mobile
