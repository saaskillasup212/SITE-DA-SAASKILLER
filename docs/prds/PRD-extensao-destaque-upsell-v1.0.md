# PRD/PATCH — Extensão como produto próprio (destaque upsell) · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Refinamento visual de uma seção existente, sem banco/auth.
Custo estimado:        baixo

## Contexto
A landing (React + Vite + Tailwind, tema "Tempestade Elétrica" dourado+roxo) tem a
seção `ExtensionSection.tsx` logo após o Pricing. Hoje ela usa o mesmo padrão visual
das outras seções (mesmo header, mesma atmosfera), então ela se lê como "mais uma
seção da mesma oferta" — quando na verdade é um PRODUTO SEPARADO (extensão de
créditos infinitos do Lovable), vendido como upsell com checkout próprio na
PerfectPay (links já integrados no patch anterior).

## Objetivo
Fazer a seção da extensão parecer visualmente OUTRO produto — uma "loja dentro da
loja" — para o visitante entender que é uma compra adicional, sem confundir com os
planos da assinatura.

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/*, supabase/, .env
- Não alterar a TABELA COMERCIAL (preços) nem os links PerfectPay
- Não alterar a lógica do toggle de segmento nem o roteamento dos hrefs
- Não refatorar outras seções; mudanças só em ExtensionSection.tsx (+ CSS global se
  precisar de 1-2 utilitários novos)
- Manter performance mobile (usePerformance / shouldReduceMotion já existentes)

## O que fazer
Fase 0 — Auditoria: reler ExtensionSection.tsx e index.css (tokens --electric,
  --royal, --bg-*) para reaproveitar o vocabulário visual existente.
Fase 1 — Moldura de produto: envolver a seção num "painel" destacado — fundo
  próprio mais escuro/elevado, borda dourada sutil, cantos grandes — separando-a
  do fluxo da página (efeito vitrine/caixa de produto).
Fase 2 — Identidade de upsell: badge/etiqueta no topo tipo "PRODUTO ADICIONAL"
  ou "⚡ TURBINE SEU LOVABLE", ícone/logo próprio da extensão, e microcopy deixando
  claro que funciona com ou sem assinatura.
Fase 3 — Hierarquia interna: reforçar a Vitalícia como herói da vitrine e dar ao
  header da seção um tratamento diferente do header padrão das outras seções.
Fase 4 — Verificação: typecheck + build, conferir contraste e mobile (scroll-snap
  dos cards continua funcionando).

## Critério de pronto
[ ] A seção se distingue visualmente das demais à primeira rolada
[ ] Badge/rotulagem comunica "produto à parte / upsell"
[ ] Preços, links PerfectPay e toggle intactos
[ ] tsc + build passam; nada fora do escopo alterado
[ ] Testado: Mathias rola a página e a seção "salta" como outra oferta
