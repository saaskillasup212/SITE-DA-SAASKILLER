# PRD/PATCH — Depoimentos-exemplo rotulados + avatares · v1.0

⚙️ EXECUÇÃO
Ferramenta:            Claude Code (esta sessão)
Modelo recomendado:    Sonnet
Motivo (1 linha):      Copywriting + ajuste de um componente existente — implementação padrão, sem arquitetura.
Custo estimado:        baixo

## Contexto
`SocialProof.tsx` já tem o marquee de 2 linhas contra-rotativas funcionando, com 6 cards placeholder (`[Nome real]` / `[ Depoimento real aqui ]`) e um ⚡ no lugar do avatar. O comentário no topo do arquivo proíbe publicar depoimento inventado como se fosse real. Decisão do Mathias (12/07/2026): preencher com **exemplos ilustrativos rotulados** — visual completo sem risco legal — e trocar pelos reais quando existirem.

## Objetivo
Seção de prova social visualmente completa: 6 depoimentos-exemplo bem escritos (tom founder solo brasileiro, resultados plausíveis e modestos), cada card com selo discreto "Exemplo ilustrativo" e avatar estilizado de iniciais (dourado/roxo alternado), sem foto de pessoa real.

## ⚠️ Regras obrigatórias
- Não tocar em: src/integrations/supabase/client.ts, types.ts, supabase/config.toml, .env
- NÃO apresentar os exemplos como clientes reais: selo "Exemplo ilustrativo" visível em todo card (discreto, não gritante)
- Nenhuma foto de pessoa real / serviço externo de avatar — avatar de iniciais gerado em CSS (zero dependência)
- Cores só via tokens (--gold*, --royal*) — manter convenção zero-hardcode
- Manter o comentário-aviso no topo do arquivo (atualizado pro novo estado)
- Não mexer em layout/animação do marquee; só conteúdo dos cards
- Valores comerciais e demais seções intocados

## O que fazer
Fase 0 — Auditoria: feita (estrutura mapeada acima).
Fase 1 — Conteúdo: escrever 6 depoimentos-exemplo (2 linhas × 3) com nome fictício + contexto de produto (ex: "MVP de agendamento pra petshops"), tom natural, sem promessas absurdas.
Fase 2 — Card: avatar de iniciais (círculo com gradiente dourado ou roxo alternado + iniciais), selo "Exemplo ilustrativo" no canto do card, atualizar comentário do arquivo.
Fase 3 — Validação: conferir no Chrome (marquee rodando, selo legível, contraste ok) com screenshot.

## Critério de pronto
[x] 6 depoimentos escritos, naturais, sem métricas mirabolantes
[x] Todo card exibe o selo "Exemplo ilustrativo"
[x] Avatares de iniciais com tokens da paleta, sem imagem externa
[x] Marquee continua fluido, sem erro de console
[x] Nada além de SocialProof.tsx alterado
[x] Testado: seção conferida no Chrome em 12/07/2026 com screenshot — sem erros de console
