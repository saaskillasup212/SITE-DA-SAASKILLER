# PRD/PATCH — Mobile responsivo + limpeza de código · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Causa raiz já diagnosticada; o resto é ajuste de breakpoints + remoção de código morto — implementação padrão.
Custo estimado:        médio

## Contexto
Landing rodando em `localhost:8080`. Auditoria feita em viewport real de 390px (iframe same-origin, 12/07/2026), seção por seção. O desktop está aprovado e **não pode mudar**. Não há git no projeto — sem rollback automático, então código removido vai para backup no scratchpad antes de deletar.

## Objetivo
Mobile (< 768px) profissional e legível, com o **desktop byte-a-byte idêntico ao de hoje**. Em seguida, remover código morto e imports não usados sem alterar nenhum comportamento.

## 🔴 Achados da auditoria (Fase 0 — concluída)

**BUG CRÍTICO — H1 do Hero fica permanentemente borrado no mobile**
Comprovado via `getComputedStyle`: as palavras do H1 ficam travadas em `filter: blur(8px)` + `translateY(24px)` para sempre. Causa raiz: `usePerformance()` inicia `isMobile = false` e só vira `true` dentro do `useEffect` (após o mount). No primeiro render o Hero usa a variante COM blur, framer-motion aplica o estado inicial `hidden`, e no meio da animação o objeto `word` é trocado pela versão "reduced motion" (só `opacity`). Framer para de controlar `filter`/`transform` e os estilos inline congelam nos valores de `hidden`. Resultado: título ilegível em todo celular. No desktop `isMobile` continua `false`, então nada muda.

**Outros achados**
1. `HowItWorks` — o zigue-zague desktop não colapsa: no mobile o passo 02 fica com texto alinhado à direita e o número gigante ao lado, layout confuso.
2. `ExtensionSection` — carrossel horizontal corta o 2º card no meio do botão "Ativar", sem affordance de arraste; scrollbar aparecendo.
3. `Stats` — `min-w-[240px]` + padding estoura ~14px da viewport de 384px.
4. `Hero` — o raio SVG do `MobileBackdrop` passa por trás do H1, disputando leitura.
5. `SocialProof` — cards de 320px numa tela de 384px ficam sem respiro lateral.

**Código morto encontrado (limpeza)**
- `src/components/ThreeBackground.tsx` (189 linhas, importa three.js) — órfão, ninguém importa
- `src/components/StepCard.tsx` (42 linhas) — órfão
- `src/components/ui/integration-marquee.tsx` — órfão
- `src/components/ui/pricing.tsx` — órfão (o componente real é `components/Pricing.tsx`); é também a fonte dos warnings de `Label`/`Switch`/`isDesktop`/`handleToggle` não usados e do erro de tipos do `canvas-confetti`

## ⚠️ Regras obrigatórias
- **NÃO alterar nada que afete o desktop (≥ 768px).** Toda mudança de layout entra por breakpoint mobile-first (`max-md:` / classes base sobrescritas em `md:`) ou corrige comportamento que já era bug em ambos.
- Não tocar em: `src/integrations/supabase/client.ts`, `types.ts`, `supabase/config.toml`, `.env`
- NÃO alterar valores comerciais (79,90/99,90/119,90 · extensão 19/39/69/97/197) nem copy
- Manter a convenção zero-hex-hardcoded (só tokens)
- Sem git: fazer backup dos arquivos órfãos no scratchpad antes de deletar
- Fase falhou = desfaz a fase e reporta; não avança

## O que fazer
**Fase 1 — Bug crítico do H1 (corrige mobile, não toca no desktop)**
Tornar `usePerformance` síncrono no primeiro render: `useState(() => window.innerWidth < 768)` e `matchMedia` no inicializador. No desktop o valor inicial continua `false` (comportamento idêntico); no mobile o Hero já nasce com a variante certa e o H1 nunca borra.

**Fase 2 — Layout mobile por breakpoint**
- `HowItWorks`: empilhar no mobile (número acima, texto alinhado à esquerda, largura total); zigue-zague intacto a partir de `md:`
- `ExtensionSection`: cards do carrossel com largura proporcional (mostrar ~1,3 card, revelando que arrasta), scrollbar escondida, snap mantido
- `Stats`: `min-w` só a partir de `md:`
- `Hero`: reposicionar/atenuar o raio do `MobileBackdrop` para sair de trás do texto (só no fallback mobile — o `HeroScene` 3D do desktop não é tocado)
- `SocialProof`: card com largura fluida no mobile

**Fase 3 — Limpeza**
Backup no scratchpad → deletar os 4 órfãos → remover imports não usados → conferir que `npm run build` passa e que o site continua idêntico.

**Fase 4 — Validação**
Percorrer o site em 390px (mobile) E em 1920px (desktop) com screenshots, comparando o desktop com os prints de hoje para provar que não mudou nada.

## Critério de pronto
[x] H1 do Hero nítido no mobile — comprovado por `getComputedStyle`: as 9 palavras com `filter: none` / `transform: none` (antes: `blur(8px)` travado)
[x] Nenhuma seção com overflow horizontal em 390px (`scrollWidth === clientWidth`)
[x] HowItWorks empilhado, Extensão com card inteiro + próximo espiando, Stats em largura total, SocialProof fluido
[x] **Desktop idêntico ao atual** — Hero, HowItWorks, Stats, Pricing, Extensão e SocialProof conferidos em 1920px contra os prints de antes
[x] `npm run build` passando (34,8s) e `tsc --noEmit` limpo
[x] Zero erro de console em mobile e desktop
[ ] **PENDENTE:** deleção dos 4 órfãos bloqueada pelo sistema de permissões (arquivos pré-existentes + projeto sem git). Backup já feito no scratchpad; aguardando o Mathias autorizar nomeando os arquivos.

## Resultado (12/07/2026)
Arquivos alterados: `hooks/use-performance.tsx` (causa raiz), `components/Hero.tsx`, `components/HowItWorks.tsx`, `components/Stats.tsx`, `components/ExtensionSection.tsx`, `components/SocialProof.tsx`, `index.css` (utilitário `.no-scrollbar`).
Nenhum valor comercial, copy ou layout desktop foi tocado.
