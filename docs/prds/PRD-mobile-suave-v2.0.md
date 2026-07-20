# PRD/PATCH — Mobile suave e funcional · v2.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Causas de jank já mapeadas na leitura do código; o resto é gating por device + ajuste de breakpoints — implementação padrão, não é arquitetura.
Custo estimado:        médio

## Contexto
Landing SaaSKiller (Vite + React + framer-motion + Lenis), rodando local. A v1.0 (12/07/2026) já corrigiu overflow horizontal, o H1 borrado e o layout de HowItWorks/Stats/Extensão/SocialProof. O desktop está **aprovado e travado**. Agora o pedido é deixar o mobile **suave e tranquilo** (scroll fluido, sem travadas) e **funcional sem bugs**, sem tocar em nada do desktop (≥ 768px). Projeto tem git local (`main`), mas commit só com autorização.

## Objetivo
Scroll e animações fluidos em celular real, zero travamento perceptível, todas as interações funcionando (menu, CTAs, carrossel, FAQ, toggle de planos). Desktop **byte-a-byte idêntico**.

## 🔴 Achados da auditoria de código (Fase 0 — parcial, confirmar no browser na Fase 4)

**1. Lenis smooth-scroll roda no mobile (causa nº 1 do "não fica suave")**
`SmoothScroll.tsx` inicia `new Lenis({ lerp: 0.1 })` para todo mundo, só desligando com `prefers-reduced-motion`. No touch, o Lenis sequestra o scroll nativo e briga com o momentum do dedo → sensação de rubber-band/atraso. Correção: desligar Lenis em touch/mobile (`pointer: coarse` ou largura < 768px) e deixar o scroll nativo do celular, que já é suave.

**2. `Atmosphere` — 2 blobs `blur(120px)` fixos + noise SVG feTurbulence full-screen, animados**
Layer fixa com dois `filter: blur(120px)` em elementos de 55vw + `<feTurbulence numOctaves=4>` cobrindo a tela toda, com `animation` de drift de 60s. Blur pesado + filtro SVG em camada fixa = repaint caro a cada frame de scroll no celular → engasgo. Correção: no mobile, reduzir raio do blur, cortar a animação de drift e/ou remover o feTurbulence (manter só os blobs estáticos leves). Desktop intacto.

**3. `WhatsAppButton` fixo pode cobrir conteúdo/CTA no mobile**
`position: fixed; bottom:28px; right:28px; z-index:9999`. Em telas pequenas pode tampar o CTA final / links do rodapé. Verificar e, se preciso, encolher/reposicionar só no mobile.

**4. Verificações funcionais reais (só confirmáveis no browser a 390px)**
Menu hambúrguer abre/fecha e navega; CTAs e âncoras rolam certo; carrossel da Extensão arrasta com snap; FAQ (accordion) abre; toggle de planos do Pricing funciona; nenhum alvo de toque < 40px; nada com overflow horizontal (regressão da v1.0).

## ⚠️ Regras obrigatórias
- **NÃO alterar nada que afete o desktop (≥ 768px).** Toda mudança entra por gate de device (`pointer: coarse` / `isMobile` / `max-md:`) ou corrige bug que existia em ambos.
- Diagnóstico antes de correção: confirmar cada jank no browser antes de mexer.
- Mudança cirúrgica — não refatorar fora do escopo.
- Não tocar em: `.env`, arquivos auto-gerados, valores comerciais (79,90/99,90/119,90 · extensão 19/39/69/97/197) e copy.
- Manter convenção zero-hex-hardcoded (só tokens) nas partes que já seguem isso.
- Fase falhou = desfaz a fase e reporta; não avança.
- Commit/push só com autorização explícita do Mathias.

## O que fazer
**Fase 1 — Scroll suave nativo no mobile (maior ganho)**
Em `SmoothScroll.tsx`: não instanciar Lenis quando `matchMedia("(pointer: coarse)")` ou largura < 768px. Desktop continua com Lenis idêntico. Validar que o scroll do celular fica no momentum nativo.

**Fase 2 — Aliviar a Atmosphere no mobile**
Gate por device: no mobile, blur menor (ex.: 60px), sem `animation` de drift, e feTurbulence removido ou com opacidade ~0. Desktop mantém os `blur(120px)` + noise animados exatamente como hoje.

**Fase 3 — Toques finais de UX mobile**
- WhatsAppButton: garantir que não cobre CTA/rodapé no mobile (encolher/reposicionar se necessário).
- Conferir alvos de toque ≥ 40px e espaçamentos.
- Rechecar regressões de overflow das seções da v1.0.

**Fase 4 — Validação em browser real**
Percorrer o site a **390px** (mobile) e a **1920px** (desktop) com screenshots. No mobile: scroll fluido, sem engasgo, todas as interações OK. No desktop: comparar com o estado atual e provar que nada mudou. Rodar `npm run build` + `tsc --noEmit`.

## Critério de pronto
[x] Scroll no mobile fluido (Lenis off em touch/`<768px`) — `html.lenis` ausente no iframe 386px; presente no desktop
[x] Atmosphere leve no mobile — blur 60px, drift `none`, feTurbulence removido (comprovado por `getComputedStyle` no iframe); desktop segue blur(120px) + drift + noise
[x] Menu, CTAs, carrossel da Extensão (card inteiro + próximo espiando, botão "Ativar" inteiro), Pricing e HowItWorks empilhados OK a 386px
[x] Nenhum overflow horizontal — `documentElement.scrollWidth === clientWidth` (380 == 380); só o marquee da SocialProof é largo por design, clipado
[x] WhatsAppButton não cobriu conteúdo essencial no mobile — não precisou mexer
[x] **Desktop idêntico ao atual** — janela real 1065px: blur(120px), drift `atmosphere-drift-a`, feTurbulence presente, Lenis ativo
[x] `npm run build` (18,2s) e `tsc --noEmit` limpos; zero erro de console

## Resultado (20/07/2026)
Arquivos alterados: `components/SmoothScroll.tsx` (Lenis off em touch/mobile) e `components/Atmosphere.tsx` (camada leve no mobile via `isMobile`). Nenhum valor comercial, copy ou layout desktop tocado.
**Obs. fora do escopo:** o card "Essencial" do Pricing aparece como **R$ 7,29/mês** no mobile — divergente dos 79,90 do histórico. Não toquei (fora do escopo mobile); vale conferir se é intencional.
