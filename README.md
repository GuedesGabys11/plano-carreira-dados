# Plano de carreira em dados

App pessoal de estudos e carreira em dados e BI: tarefas do dia, agenda, cursos, flashcards com revisão espaçada, simulados, portfólio, LinkedIn, candidaturas e progresso.

**Abrir:** https://guedesgabys11.github.io/plano-carreira-dados/

No celular, abra o link e use "Adicionar à tela inicial" para instalar. Funciona sem internet.

## Como está organizado

| Arquivo | O que tem |
|---|---|
| `src/data.js` | Conteúdo: fases, cursos, cartões, LinkedIn, rota de níveis |
| `src/app.js` | Lógica e telas |
| `src/styles.css` | Visual (claro e escuro) |
| `src/head.html`, `src/body.html` | Estrutura da página |
| `build.py` | Gera `index.html` (GitHub Pages) e `dist/app.html` |
| `tests/telas.js` | Abre todas as telas no celular e no computador e falha em qualquer erro |
| `supabase/sync.sql` | Tabela e funções da sincronização |

## Atualizar

```
python3 build.py
node tests/telas.js
```

Só publique se o teste passar. A cada versão, suba `APP_V` em `src/app.js`, o cache em `sw.js` e escreva a nota em `NEWS` (`src/data.js`).

## Privacidade

Nada de dados pessoais neste repositório. O progresso fica no aparelho e, se a sincronização estiver ligada, num Supabase próprio, acessado só por um código pessoal.
