# PRD/PATCH — Identidade Dourado + Roxo · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Retheming via tokens centralizados + varredura de hexes hardcoded — implementação padrão, sem arquitetura.
Custo estimado:        médio

## Contexto
A landing usa a direção "Tempestade Elétrica Premium" com roxo como cor única (`--electric: #8b7cf7`) via tokens em `src/styles/tokens.css`. A marca (logo raio, loading screen, footer) já é DOURADA (`#D4AF37`). Hoje há conflito: marca dourada num site 100% roxo. Auditoria encontrou 19× `#8b7cf7` e 16× `#D4AF37` hardcoded fora dos tokens (principalmente cenas 3D e LoadingScreen).

## Objetivo
Nova identidade oficial: **DOURADO (protagonista/energia) + ROXO (profundidade/suporte) + PRETO (fundos) + BRANCO (textos)**. O dourado assume os momentos de conversão e energia (CTAs, raio, preços, badges); o roxo vira cor de ambiente (atmosfera, bordas, glows secundários). Site inteiro coeso com a logo.

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/client.ts, types.ts, supabase/config.toml, .env
- NÃO alterar valores comerciais (planos 79,90/99,90/119,90 · tabela extensão)
- NÃO alterar copy, layout ou animações — só cor
- Contraste: texto branco `#f7f5ef` sobre preto; dourado nunca como cor de texto longo (só destaques)
- Regras de motion da direção estética continuam valendo

## Paleta nova (tokens)
```css
--bg-void: #0a0806;        /* preto quente (base) */
--bg-surface: #12100c;     /* cards */
--bg-elevated: #1a1712;    /* superfícies elevadas */
--gold: #E6B54A;           /* dourado principal — CTAs, raio, energia */
--gold-hot: #F5D076;       /* glow/hover dourado */
--gold-deep: #8a6a1f;      /* gradientes profundos */
--royal: #8b7cf7;          /* roxo — cor de suporte/atmosfera */
--royal-deep: #4c3fd4;     /* blobs, fog, sombras coloridas */
--text-primary: #faf8f2;   /* branco quente */
--text-muted: #a89f8f;     /* cinza-dourado para secundários */
--success: #34d399;
```
Estratégia de migração segura: manter os NOMES `--electric/--electric-hot/--electric-deep/--volt` como aliases apontando pros valores novos (`--electric: var(--gold)` etc., `--volt: var(--royal)` ou `--gold-hot` conforme o caso) — assim os 11 componentes que usam `var(--electric)` migram sem tocar em cada linha, e ajustamos pontualmente só onde o roxo deve permanecer.

## Divisão dourado × roxo (onde cada um vive)
- **Dourado:** CTAs primários, raio 3D (hero), preços/CountUp, badge "Mais Escolhido", card Vitalícia, nós da linha de energia, ícones ativos, cursor custom
- **Roxo:** blobs da Atmosphere, fog/partículas de fundo (mescladas com douradas ~70/30), bordas de cards em repouso, glow ambiente das seções, spotlight dos cards
- **Preto quente:** todos os fundos (void/surface/elevated)
- **Branco quente:** headings e corpo de texto

## O que fazer
Fase 0 — Auditoria: mapear todos os `var(--electric*)`, `var(--volt)` e hexes hardcoded (`#8b7cf7`, `#a78bfa`, `#4c3fd4`, `#D4AF37`, `#FFD700`, `#F4E5B0` etc.) por arquivo e reportar o plano de substituição.
Fase 1 — Tokens: reescrever `tokens.css` com a paleta nova + aliases de compatibilidade. Ajustar scrollbar, seleção de texto e `index.css`.
Fase 2 — Momentos dourados: Hero (raio 3D dourado + partículas mistas), CTAs, Pricing (borda conic dourado→roxo no Pro), Extensão (Vitalícia dourada), cursor.
Fase 3 — Ambiente roxo: Atmosphere (blobs roxos mantidos), bordas/spotlights dos cards, HowItWorks (linha de energia gradient dourado→roxo), FAQ, Footer.
Fase 4 — Varredura: eliminar hexes hardcoded restantes (trocar por tokens), conferir LoadingScreen/3D scenes, screenshot de cada seção no navegador e checagem de contraste.

## Critério de pronto
[ ] Zero hex de cor hardcoded fora de tokens.css (cenas 3D podem usar constantes derivadas comentadas)
[ ] Logo dourada e site na mesma família de cor — sem conflito roxo vs marca
[ ] Roxo presente como suporte (atmosfera/bordas), não protagonista
[ ] Valores comerciais intactos (conferidos após o patch)
[ ] Nada além de cor foi alterado
[ ] Testado: navegar o site inteiro no Chrome, seção por seção, com screenshots
