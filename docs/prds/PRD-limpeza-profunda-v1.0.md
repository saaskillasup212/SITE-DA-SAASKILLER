# PRD/PATCH — Limpeza profunda (código + diretório) · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Haiku (ou delegar)
Motivo (1 linha):      Tarefa mecânica de remoção verificada; sem lógica nova.
Custo estimado:        baixo

## Contexto
Auditoria de 15/07/2026 encontrou:
- Órfãos JÁ CONFIRMADOS sem import (backup no scratchpad da sessão de 12/07):
  src/components/ThreeBackground.tsx, src/components/StepCard.tsx,
  src/components/ui/integration-marquee.tsx, src/components/ui/pricing.tsx
- Candidatos a órfão (grep sem hits diretos — confirmar cadeia):
  ui/animated-glow-card.tsx, ui/container-scroll-animation.tsx,
  ui/typewriter-text.tsx, ui/animated-underline-text.tsx,
  ui/magnetize-button.tsx
- EM USO (não tocar): ui/floating-bubbles.tsx (Stats.tsx)
- Diretório: vite.config.ts.timestamp-1783869738912-*.mjs (temp órfão do
  Vite), bun.lockb (sobra do Lovable; projeto usa npm/package-lock.json),
  dist/ (build antigo, regenerável, já no .gitignore),
  node_modules/.vite (cache do dev server), pasta .lovable
- Git existe (1 commit) com working tree sujo — a limpeza NÃO commita nada

## Objetivo
Remover código morto e lixo de diretório com verificação de uso antes de
cada remoção, deixando build e visual idênticos.

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/*, supabase/, .env, .git,
  node_modules (exceto subpasta de cache .vite), REFERENCIA/ (material do
  Mathias), docs/
- Verificar import/uso (incluindo re-export e uso indireto) ANTES de deletar
  cada arquivo; na dúvida, manter e reportar
- Deletar também hooks/deps npm que ficarem órfãos APÓS as remoções —
  confirmar com grep antes (ex.: conferir use-ios-check, use-media-query)
- Sem refactor, sem rename, sem mexer em código vivo
- Rollback por fase (arquivos deletados vão pro scratchpad antes)

## O que fazer
Fase 0 — Verificação: grep de cada candidato (import direto, lazy, string);
  relatório do que será removido e por quê.
Fase 1 — Código morto: deletar os 4 confirmados + candidatos que passarem
  na verificação; rodar tsc + build após cada lote.
Fase 2 — Deps órfãs: checar package.json por dependências que só os
  deletados usavam; remover com npm uninstall (relatório antes).
Fase 3 — Diretório: deletar vite.config.ts.timestamp-*.mjs, bun.lockb,
  dist/, node_modules/.vite; decidir .lovable com o Mathias.
Fase 4 — Verificação final: tsc + build + smoke visual da landing inteira.

## Critério de pronto
[ ] Zero import quebrado; tsc + build passam
[ ] Landing visualmente idêntica (antes/depois)
[ ] Órfãos, lockfile duplicado, temp do Vite e caches removidos
[ ] Backup dos deletados no scratchpad + lista no relatório final
[ ] Nada fora do escopo tocado (git, .env, supabase, REFERENCIA intactos)
