# PRD/PATCH — Padrões visuais da referência (dot grid, nós, features, compat) · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Trabalho de UI médio-grande, sem banco/auth; padrões visuais bem definidos.
Custo estimado:        médio

## Contexto
Landing SaaSKiller (React + Vite + Tailwind + framer-motion, tema dourado+roxo).
Mathias trouxe 5 screenshots de referência (pasta REFERENCIA/) de uma landing dark
bem executada. 4 padrões aprovados para adaptação:
1. Dot grid de fundo (textura de pontos sutil em todas as seções)
2. Diagrama de nós conectados (entradas → app central → saídas, curvas luminosas)
3. Grid de features minimalista sem cards
4. Seção split "Compatível com as principais plataformas" + stat pills monospace

Estado atual dos componentes afetados:
- `Benefits.tsx`: grid quebrado — 2 cards grandes COM GIFs de produto + 4 compactos,
  tilt 3D + spotlight. Os GIFs são valiosos, não descartar.
- `HowItWorks.tsx`: 3 passos zigue-zague com linha de energia SVG no scroll. Bom,
  mas sem um "mapa mental" do produto.
- `Stats.tsx`: stat–logo–stat com contadores animados. Mantém.
- `index.css` / `tokens.css`: tokens --gold/--royal/--bg-* prontos.

## Objetivo
Absorver os 4 padrões da referência traduzidos pro nosso dourado+roxo, elevando a
percepção premium sem perder nada que já funciona (GIFs, contadores, energia).

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/*, supabase/, .env
- Não copiar copy/textos da referência (produto de nicho diferente) — só padrões visuais
- Não usar logos oficiais de terceiros sem asset próprio: tiles com wordmark
  tipográfico (Lovable, Bolt, Cursor, v0, Replit, Windsurf) até Mathias fornecer SVGs
- Respeitar usePerformance/shouldReduceMotion em toda animação nova
- Preços, links PerfectPay e ExtensionSection intactos

## O que fazer
Fase 1 — Dot grid global (baixo risco):
  Utilitário `.dot-grid` no index.css (radial-gradient de pontos ~1px, célula
  ~28px, opacidade ≤0.05, com mask radial pra esvanecer nas bordas).
  Aplicar como camada de fundo nas seções principais (Hero, HowItWorks,
  Compatibilidade). Conferir que não "vibra" em mobile.

Fase 2 — Benefits sem cards (híbrido):
  Manter os 2 cards grandes (GIFs) como estão. Converter os 4 compactos pro
  estilo referência: ícone pequeno em caixinha com borda + título bold pequeno +
  descrição muted, SEM card/fundo — layout em grid 4 colunas (2 no mobile),
  abaixo dos 2 grandes. Remover tilt/spotlight só dos compactos.

Fase 3 — Diagrama de nós no HowItWorks:
  Bloco visual novo acima dos 3 passos: nós de entrada à esquerda (💡 ideia,
  💬 prompt) → logo SaaSKiller central (quadrado arredondado dourado com glow) →
  nós de saída à direita (SaaS, Website, PRD). Curvas bezier SVG com gradiente
  dourado/roxo animado (dash flow). Desktop: horizontal; mobile: versão
  simplificada vertical ou oculto (decidir pelo espaço).

Fase 4 — Seção Compatibilidade (nova):
  Componente `Compatibility.tsx` inserido no Index entre HowItWorks e Stats.
  Split 50/50: esquerda com headline bicolor ("Compatível com as principais
  plataformas" — 'principais plataformas' em dourado) + 3 stat pills
  (número monospace + label muted, ex: "+3.427 SaaS criados", "15 perguntas →
  PRD completo", "5 min da ideia ao prompt"); direita com grid 3×2 de tiles
  (wordmarks: Lovable, Bolt, Cursor, v0, Replit, Windsurf) com hover glow.

Fase 5 — Verificação: tsc + build + revisão visual mobile/desktop.

## Critério de pronto
[x] Dot grid visível mas discreto nas seções-alvo
[x] Benefits: 2 grandes intactos, 4 compactos sem cards no novo estilo
[x] Diagrama de nós funcional no HowItWorks (com fallback reduce-motion)
[x] Seção Compatibilidade nova no fluxo da página
[x] Nada de copy da referência; sem logos falsos de terceiros
[x] tsc + build passam; preços/links/Extension intactos
[x] Testado: revisão visual desktop + mobile em 15/07/2026 — aprovado pelo Mathias ("PODE")

**STATUS: CONCLUÍDO em 15/07/2026 (v1.0, Fases 1-5).**
