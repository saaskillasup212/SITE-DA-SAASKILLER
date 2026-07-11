
## Criar Páginas Legais com Rotas

Vou criar páginas dedicadas para cada documento legal e atualizar os links no footer para apontar para as rotas corretas.

### Arquivos a Criar

| Página | Slug/Rota | Arquivo |
|--------|-----------|---------|
| Política de Privacidade | `/politica-de-privacidade` | `src/pages/PoliticaPrivacidade.tsx` |
| Termos de Uso | `/termos-de-uso` | `src/pages/TermosUso.tsx` |
| Política de Reembolso | `/politica-de-reembolso` | `src/pages/PoliticaReembolso.tsx` |

### Arquivos a Modificar

1. **src/App.tsx** - Adicionar as 3 novas rotas
2. **src/components/Footer.tsx** - Atualizar os links de `#` para as rotas corretas usando `Link` do React Router

### Estrutura das Páginas Legais

Cada página terá:
- Header simplificado com logo e botão para voltar
- Título da página
- Conteúdo do documento legal (texto placeholder que você pode editar depois)
- Footer padrão
- Design consistente com o tema do site (fundo escuro, texto claro)

### Alterações Técnicas

**Footer.tsx:**
```text
Antes:  <a href="#">Política de Privacidade</a>
Depois: <Link to="/politica-de-privacidade">Política de Privacidade</Link>
```

**App.tsx:**
```text
+ <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
+ <Route path="/termos-de-uso" element={<TermosUso />} />
+ <Route path="/politica-de-reembolso" element={<PoliticaReembolso />} />
```

### Conteúdo das Páginas

Os textos legais serão placeholders padrão que você pode substituir pelos textos oficiais da sua empresa. Cada página terá seções típicas:

- **Política de Privacidade**: Coleta de dados, uso, cookies, direitos do usuário
- **Termos de Uso**: Aceitação, uso do serviço, propriedade intelectual, limitações
- **Política de Reembolso**: Condições, prazos, processo de solicitação
