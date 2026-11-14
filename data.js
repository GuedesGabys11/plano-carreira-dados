/* ================= CONTEÚDO (só dela) =================
   Fases, cursos, cartões, LinkedIn, rota de níveis e textos fixos.
   A lógica fica em app.js. Nada de dados sensíveis aqui: este arquivo é público. */

const START = "2026-11-16", END = "2027-04-11", AFTER_END = "2027-06-30";
const LIGHT = ["2026-12-20", "2027-01-05"];               /* fim de ano: ritmo leve */
const PY_FROM = "2027-04-12";                              /* Python só depois do plano */
const SQL_BASIC = ["2026-11-16", "2026-11-29"];          /* SQL básico 20 min/dia no SQLBolt */
const SQL_DAILY_FROM = "2027-01-11";                       /* SQL todo dia útil */
const APPS_10_FROM = "2027-01-04";                         /* 10 candidaturas por semana */
const OFF = { "2026-12-25": "Natal", "2027-01-01": "Ano Novo", "2027-02-08": "Carnaval", "2027-02-09": "Carnaval", "2027-03-26": "Sexta-feira Santa" };

const LINKS = {
  udemy: q => "https://www.udemy.com/home/my-courses/search/?q=" + encodeURIComponent(q),
  khan: "https://pt.khanacademy.org/math/statistics-probability",
  sqlbolt: "https://sqlbolt.com/",
  hackerrank: "https://www.hackerrank.com/domains/sql",
  kpy: "https://www.kaggle.com/learn/python",
  kpd: "https://www.kaggle.com/learn/pandas",
  pl300: "https://learn.microsoft.com/pt-br/credentials/certifications/power-bi-data-analyst-associate/",
  pbidocs: "https://learn.microsoft.com/en-us/power-bi/",
  dh: "https://www.datahackers.com.br/",
  ciee: "https://portal.ciee.org.br/",
  nube: "https://www.nube.com.br/",
  superestagios: "https://www.superestagios.com.br/",
  cvm: "https://dados.cvm.gov.br/",
  bcb: "https://dadosabertos.bcb.gov.br/",
  ibge: "https://sidra.ibge.gov.br/"
};

/* ---------- Cursos e recursos ---------- */
const COURSES = [
  { id: "excel", n: "Excel – Curso COMPLETO (Bruno Prates)", onde: "Udemy", st: "manter", link: LINKS.udemy("Excel Curso Completo Bruno Prates"), how: "Siga do ponto onde parou. Foco em PROCX, SOMASES, tabela dinâmica e gráficos. Refaça cada exercício sem olhar." },
  { id: "pq", n: "Tratativas de Dados via Power Query (Pedro Franco)", onde: "Udemy", st: "concluido", link: LINKS.udemy("Power Query Pedro Franco"), how: "Concluído. Agora é praticar com bases bagunçadas." },
  { id: "sql", n: "Banco de Dados SQL do Zero ao Avançado (Andre Iacono)", onde: "Udemy", st: "manter", link: LINKS.udemy("SQL do Zero ao Avançado Andre Iacono"), how: "Prioridade nº 1. Digite todas as consultas, não copie." },
  { id: "pbi", n: "Formação Microsoft Power BI Profissional (André Rosa)", onde: "Udemy", st: "manter", link: LINKS.udemy("Formação Power BI André Rosa"), how: "Curso central de BI. Aplique cada módulo no Projeto 2." },
  { id: "dax", n: "Master DAX (Felipe Mafra)", onde: "Udemy", st: "manter", link: LINKS.udemy("Master DAX Felipe Mafra"), how: "Só o essencial: CALCULATE, contexto de filtro e inteligência de tempo." },
  { id: "cont", n: "Contabilidade Completa para Iniciantes (Akaju)", onde: "Udemy", st: "manter", link: LINKS.udemy("Contabilidade Completa para Iniciantes Akaju"), how: "Base para vagas contábeis e para o Projeto 2: partidas dobradas, balanço e DRE." },
  { id: "conc", n: "Conciliação Contábil Financeira com Excel (Lucas Dourado)", onde: "Udemy", st: "manter", link: LINKS.udemy("Conciliação Contábil Excel Lucas Dourado"), how: "Curto (1,5 h). Refaça a conciliação com dados próprios." },
  { id: "khan", n: "Estatística e Probabilidade", onde: "Khan Academy (grátis)", st: "gratis", link: LINKS.khan, how: "Só dados, medidas de centro e dispersão e distribuições. Não precisa de probabilidade agora." },
  { id: "story", n: "Storytelling com Dados (Cole Nussbaumer Knaflic)", onde: "Livro", st: "gratis", link: "", how: "Cerca de 1,5 capítulo por semana, aplicando no Projeto 2." },
  { id: "sqlbolt", n: "SQLBolt", onde: "Site (grátis)", st: "gratis", link: LINKS.sqlbolt, how: "20 min por dia nas semanas 1 e 2 (SQL de teste) e nas semanas de SQL." },
  { id: "hr", n: "HackerRank – SQL", onde: "Site (grátis)", st: "gratis", link: LINKS.hackerrank, how: "1 exercício por dia útil a partir de 11/01." },
  { id: "kpy", n: "Kaggle Learn – Python", onde: "Kaggle (grátis, em inglês)", st: "gratis", link: LINKS.kpy, how: "Depois das 21 semanas, a partir de 12/04. Roda no navegador." },
  { id: "kpd", n: "Kaggle Learn – Pandas", onde: "Kaggle (grátis, em inglês)", st: "gratis", link: LINKS.kpd, how: "Depois do curso de Python, no mesmo horário." },
  { id: "en", n: "Inglês técnico", onde: "Documentação e vídeos em inglês", st: "gratis", link: LINKS.pbidocs, how: "15 min: leia uma página da documentação do Power BI em inglês ou veja um vídeo curto da área. O Inglês Rápido (Paulo Andrade) fica de reserva." },
  { id: "pl300", n: "PL-300 (Microsoft Learn)", onde: "Microsoft (trilha grátis, prova paga)", st: "depois", link: LINKS.pl300, how: "Abr a jun/2027: trilha completa e 2 simulados." },
  { id: "dh", n: "Data Hackers", onde: "Comunidade", st: "gratis", link: LINKS.dh, how: "1 vez por semana: ler, tirar dúvidas e ver vagas." }
];
const REVIEW_PARTS = [
  { n: "Modelando Dados no Power BI (jul/2025)", how: "Revisar só: fato e dimensão, esquema estrela, 1:N, tabela calendário." },
  { n: "Preparando Dados / Power Query (jul/2025)", how: "Revisar só: tipos, duplicatas, mesclar e acrescentar, dinamizar." },
  { n: "Cursos de banco de dados (jul/2025)", how: "Revisar só: SELECT, WHERE, GROUP BY, HAVING, JOIN." },
  { n: "Excel Avançado (jul/2025)", how: "Revisar só: PROCX, SOMASES, SE aninhado, tabela dinâmica." }
];
const SKIP = [
  ["Introdução à Análise de Dados", "Você já está além."],
  ["Administrando Banco de Dados", "Conteúdo de DBA, fora do foco."],
  ["Excel + Dashboards + IA (Eduardo Yto)", "Repete o Bruno Prates."],
  ["Inglês Extremo", "Repete o outro de inglês."],
  ["Cursos repetidos das outras listas", "Fora do foco de júnior."]
];

/* ---------- Fases (21 semanas + depois) ---------- */
/* s = sessões dos dias úteis (45 min conteúdo + 45 min prática), sat = sábados (3 h) */
const PHASES = [
  { id: "f1", n: "Pronta para entrevista e teste técnico", w: "1–2", a: "2026-11-16", b: "2026-11-29", c: "pbi",
    goal: "Explicar o Projeto 1 sem travar e fazer SQL básico de teste. Currículo e LinkedIn prontos.",
    deliver: "Roteiro de 3 minutos do Projeto 1, currículo nas 2 versões e LinkedIn revisado.",
    s: [
      ["Fato x dimensão e modelo estrela", "Explique em voz alta com o modelo do Projeto 1: o que é fato, o que é dimensão e por que estrela."],
      ["Relacionamento 1:N e direção do filtro", "Desenhe o modelo do Projeto 1 no papel e explique cada relação e para onde o filtro vai."],
      ["Tabela calendário", "Por que ela existe, como foi criada no Projeto 1 e o que quebra sem ela."],
      ["Medida x coluna e DIVIDE", "Quando usar cada uma. Reescreva 3 medidas do Projeto 1 sem olhar, usando DIVIDE."],
      ["CALCULATE", "Explique o que muda no contexto de filtro. Escreva 2 exemplos com a base do Projeto 1."],
      ["Mês anterior e acumulado no ano", "DATEADD e TOTALYTD: escreva, teste e explique em 1 frase cada."],
      ["Ensaio: \"me explica como você fez esse projeto\"", "Responda em voz alta, grave e assista. Anote onde travou."],
      ["Power Query do Projeto 1: tipos e duplicatas", "Conte cada etapa de limpeza: tipos de dados, duplicatas, e o motivo de cada uma."],
      ["Power Query do Projeto 1: mesclar e acrescentar", "Explique a diferença com um exemplo do projeto. Relembre PROCX e SOMASES (10 min)."],
      ["Ensaio final do Projeto 1", "Modelagem, DAX e Power Query em 3 minutos, gravado. Compare com o primeiro ensaio."]
    ],
    sat: ["README do Projeto 1 + currículo (versão dados) + LinkedIn", "Roteiro de 3 min gravado + currículo (versão contábil)"] },
  { id: "f2", n: "Excel + Estatística", w: "3–4", a: "2026-11-30", b: "2026-12-13", c: "excel",
    goal: "Excel do dia a dia sem travar e estatística descritiva numa base real.",
    deliver: "Projeto 1 v2: estatística descritiva + página de resumo executivo. Começam as candidaturas.",
    s: [
      ["Excel: PROCX", "3 buscas diferentes, incluindo valor não encontrado."],
      ["Excel: SOMASES e CONT.SES", "Totais por estado e por modalidade na base do Projeto 1."],
      ["Excel: tabela dinâmica", "Monte 3 visões e um gráfico dinâmico."],
      ["Khan: média, mediana e moda", "Quando a média engana? Ache um exemplo na base."],
      ["Khan: desvio padrão e amplitude", "Calcule no Excel e explique em 1 frase."],
      ["Khan: quartis, percentis e boxplot", "Monte um boxplot no Excel."],
      ["Khan: histograma e distribuição", "Histograma da inadimplência por estado."],
      ["Outliers e correlação x causalidade", "Ache um outlier e explique o que faria com ele."],
      ["Excel: gráficos que contam a conclusão", "Título do gráfico = a conclusão."],
      ["Estatística aplicada no Projeto 1", "Tabela com média, mediana, desvio e quartis."]
    ],
    sat: ["Projeto 1 v2: estatística descritiva", "Projeto 1 v2: página de resumo executivo"] },
  { id: "f3", n: "Power Query na prática", w: "5", a: "2026-12-14", b: "2026-12-20", c: "pq",
    goal: "Limpar uma base bagunçada do zero e documentar os passos.",
    deliver: "Base limpa + documento com os passos.",
    s: [
      ["Tipos de dados e colunas", "Pegue uma base pública bagunçada (IBGE ou Banco Central)."],
      ["Duplicatas, nulos e erros", "Trate cada problema e anote o passo."],
      ["Mesclar consultas", "Junte duas tabelas como um JOIN."],
      ["Acrescentar consultas", "Empilhe arquivos de meses diferentes."],
      ["Dinamizar e despivotar", "Transforme meses em colunas para linhas."]
    ],
    sat: ["Documentar a limpeza da base (passo a passo)"] },
  { id: "f4", n: "Contabilidade", w: "6–7", a: "2026-12-21", b: "2027-01-03", c: "cont",
    goal: "Partidas dobradas, balanço e DRE com segurança.",
    deliver: "Resumo de 1 página de cada demonstração.",
    s: [
      ["Ativo, passivo e patrimônio líquido", "Monte um balanço de uma empresa fictícia."],
      ["Partidas dobradas", "10 lançamentos de débito e crédito."],
      ["Livro razão e balancete", "Do lançamento ao balancete."],
      ["Balanço patrimonial", "Leia o balanço de uma varejista da CVM."],
      ["DRE", "Da receita bruta ao lucro líquido."],
      ["Indicadores contábeis", "Margens, liquidez e endividamento."],
      ["Revisão de contabilidade", "Flashcards de contabilidade + 5 lançamentos."],
      ["Contabilidade e dados", "Como um plano de contas vira tabela dimensão."]
    ],
    sat: ["DRE e balanço de uma varejista real no Excel (dados da CVM)", "DRE e balanço: indicadores e comparação de 2 anos"] },
  { id: "f5", n: "Conciliação contábil", w: "8", a: "2027-01-04", b: "2027-01-10", c: "conc",
    goal: "Conciliar contas no Excel e refazer com dados próprios.",
    deliver: "Planilha de conciliação feita por você.",
    s: [
      ["Conciliação bancária", "Extrato x razão: ache as diferenças."],
      ["Conciliação de contas a pagar e receber", "PROCX e SOMASES na conciliação."],
      ["Pendências e ajustes", "Classifique cada diferença."],
      ["Refazer com dados próprios", "Crie uma base e concilie do zero."],
      ["Automatizar com Power Query", "Atualizar a conciliação com um clique."]
    ],
    sat: ["Concluir DRE e balanço da varejista + conciliação documentada"] },
  { id: "f6", n: "SQL", w: "9–11", a: "2027-01-11", b: "2027-01-31", c: "sql",
    goal: "JOIN, GROUP BY e CASE WHEN sem consultar material.",
    deliver: "Teste de saída: 10 questões em até 1 hora, sem consulta.",
    s: [
      ["SELECT, filtros e ORDER BY", "+ 5 exercícios no SQLBolt."],
      ["Operadores e LIKE", "+ 5 exercícios no SQLBolt."],
      ["Funções de agregação", "+ 5 exercícios no SQLBolt."],
      ["GROUP BY e HAVING", "+ 5 exercícios no SQLBolt."],
      ["INNER JOIN", "+ 5 exercícios no SQLBolt."],
      ["LEFT e RIGHT JOIN", "+ 5 exercícios no SQLBolt."],
      ["CASE WHEN", "Classifique clientes por faixa de atraso."],
      ["Subconsultas", "Uma consulta dentro da outra."],
      ["Datas em SQL", "Agrupar por mês e ano."],
      ["Criar e alterar tabelas", "CREATE, INSERT, UPDATE com cuidado."],
      ["SQL com dados financeiros", "Receita por mês, margem por loja."],
      ["Revisão: JOIN + GROUP BY", "Sem olhar o material."],
      ["Revisão: CASE WHEN", "Sem olhar o material."],
      ["Simulado de SQL", "10 questões cronometradas."],
      ["Teste de saída de SQL", "10 questões em até 1 hora, sem consulta."]
    ],
    sat: ["Projeto 2: SQL na base da CVM", "Projeto 2: perguntas de negócio e consultas", "Projeto 2: modelo de dados"] },
  { id: "f7", n: "Power BI + Métricas", w: "12–15", a: "2027-02-01", b: "2027-02-28", c: "pbi",
    goal: "Projeto 2 em andamento, com KPIs e títulos que dizem a conclusão.",
    deliver: "Projeto 2 com modelo pronto e primeiras páginas.",
    s: [
      ["Power BI: importar e tratar", "Formação Power BI, módulo de importação."],
      ["Modelagem no Power BI", "Modelo estrela do Projeto 2."],
      ["Relacionamentos e cardinalidade", "Revise o modelo do Projeto 2."],
      ["Medidas básicas", "Receita, lucro e margens do Projeto 2."],
      ["Visuais certos para cada pergunta", "Barra, linha, tabela: quando usar."],
      ["Storytelling com Dados: cap. 1–2", "Contexto e o visual certo."],
      ["Storytelling com Dados: cap. 3–4", "Tire a poluição visual dos gráficos."],
      ["Métricas: margem bruta e líquida", "Calcule no Projeto 2."],
      ["Métricas: liquidez e endividamento", "Calcule no Projeto 2."],
      ["Métricas: YoY, MoM e YTD", "Compare períodos no Projeto 2."],
      ["Ticket médio, meta x realizado e churn", "Faça a pergunta de negócio de cada uma."],
      ["Filtros, segmentações e interações", "Página interativa no Projeto 2."],
      ["Layout e títulos com conclusão", "Revise todas as páginas do Projeto 2."],
      ["Publicar e compartilhar", "Publique e teste no celular."],
      ["Revisão de Power BI", "Flashcards + uma página do zero."],
      ["Mini-entrevista de Power BI", "Explique o Projeto 2 em 3 minutos."],
      ["Métricas de crédito (Projeto 1)", "Inadimplência e variação da carteira."],
      ["Revisão de métricas", "Flashcards de métricas."]
    ],
    sat: ["Projeto 2: modelo e medidas", "Projeto 2: página executiva", "Projeto 2: páginas de detalhe", "Projeto 2: revisão e storytelling"] },
  { id: "f8", n: "DAX + Relatórios", w: "16–18", a: "2027-03-01", b: "2027-03-21", c: "dax",
    goal: "Projeto 2 publicado, com resumo executivo.",
    deliver: "Projeto 2 publicado no GitHub e no LinkedIn.",
    s: [
      ["CALCULATE de verdade", "Master DAX: contexto de filtro."],
      ["Contexto de linha x contexto de filtro", "Explique com um exemplo contábil."],
      ["Iteradores: SUMX e AVERAGEX", "Quando a coluna não basta."],
      ["Inteligência de tempo", "SAMEPERIODLASTYEAR, DATEADD, TOTALYTD."],
      ["ALL e REMOVEFILTERS", "Participação no total."],
      ["Variáveis em DAX", "Medidas mais legíveis com VAR."],
      ["Storytelling com Dados: cap. 5–6", "Foco e design."],
      ["Storytelling com Dados: cap. 7–8", "Contar a história."],
      ["Resumo executivo do Projeto 2", "3 insights e 1 recomendação."],
      ["README do Projeto 2", "Problema, fonte, limpeza, modelo, prints, insights."],
      ["Revisão de DAX", "Flashcards + 3 medidas do zero."],
      ["Revisão final do Projeto 2", "Peça para alguém testar."],
      ["Publicar o Projeto 2", "GitHub + post de marco."],
      ["DAX em entrevista", "Responda em voz alta 5 perguntas de DAX."],
      ["Folga ativa", "Revise o que ficou para trás."]
    ],
    sat: ["Projeto 2: medidas de tempo", "Projeto 2: resumo executivo", "Projeto 2: publicação"] },
  { id: "f9", n: "Portfólio + Entrevista", w: "19–21", a: "2027-03-22", b: "2027-04-11", c: "sql",
    goal: "Projetos 1 e 2 no currículo e no LinkedIn, entrevista treinada.",
    deliver: "Currículo final nas duas versões e 5 histórias STAR prontas.",
    s: [
      ["Currículo: atualizar com o Projeto 2", "Versão dados."],
      ["Currículo: versão contábil", "Destaque conciliação e DRE."],
      ["LinkedIn: projetos em destaque", "Projeto 2 nos Destaques."],
      ["Histórias STAR (1 e 2)", "Escreva no app, aba Entrevista."],
      ["Histórias STAR (3 a 5)", "Escreva no app, aba Entrevista."],
      ["Simulado técnico de SQL", "10 questões cronometradas."],
      ["Simulado técnico de Power BI", "Monte uma página em 45 min."],
      ["Perguntas comportamentais", "Treine em voz alta com o cronômetro."],
      ["Pitch pessoal de 1 minuto", "Grave e assista."],
      ["Revisão de contabilidade para entrevista", "DRE, balanço e conciliação."],
      ["Revisão de DAX para entrevista", "CALCULATE, contexto e tempo."],
      ["Simulado completo de entrevista", "45 min, do pitch ao técnico."],
      ["Ajustes finais do portfólio", "Links, prints e READMEs."],
      ["Plano dos próximos 3 meses", "Python, PL-300 e Projeto 3."],
      ["Celebrar e revisar as 21 semanas", "O que funcionou e o que muda."]
    ],
    sat: ["Portfólio: READMEs e links", "Simulado de teste técnico completo", "Revisão geral e plano seguinte"] },
  { id: "f10", n: "Python + PL-300", w: "22+", a: "2027-04-12", b: AFTER_END, c: "pl300",
    goal: "PL-300 até junho e Python aplicado a dados.",
    deliver: "Certificação PL-300 e coleta automática de dados do Projeto 2.",
    s: [
      ["PL-300: preparar os dados", "Trilha do Microsoft Learn."],
      ["PL-300: modelar os dados", "Trilha do Microsoft Learn."],
      ["PL-300: visualizar e analisar", "Trilha do Microsoft Learn."],
      ["PL-300: implantar e manter", "Trilha do Microsoft Learn."],
      ["Python: pandas na prática", "Leia, limpe e agregue uma base real."],
      ["Python: automatizar a coleta da CVM", "Baixe os dados do Projeto 2 com um script."],
      ["Simulado PL-300", "Cronometrado."],
      ["SQL: CTE e funções de janela", "1 desafio por semana."]
    ],
    sat: ["Projeto 3 (FP&A): orçado x realizado", "Projeto 3: DRE gerencial", "Simulado PL-300 completo"] }
];

/* ---------- Marcos (contagem regressiva) ---------- */
const MILESTONES = [
  { d: "2026-11-29", t: "Roteiro de 3 min do Projeto 1" },
  { d: "2026-12-13", t: "Projeto 1 v2 publicado" },
  { d: "2027-01-04", t: "Candidaturas: 10 por semana" },
  { d: "2027-01-31", t: "Teste de saída de SQL" },
  { d: "2027-02-28", t: "Meta: emprego até fevereiro" },
  { d: "2027-03-21", t: "Projeto 2 publicado" },
  { d: "2027-04-11", t: "Fim das 21 semanas" },
  { d: "2027-06-30", t: "PL-300" }
];

/* ---------- Tarefas únicas ---------- */
const ONE_OFF = [
  { d: "2026-11-16", t: "Escrever e agendar o post de quarta", m: 20, k: "li", go: "li", desc: "Primeiro post do plano: sua trajetória. O rascunho está em Carreira › LinkedIn › Posts." },
  { d: "2026-11-17", t: "Cadastro no CIEE, Nube e Super Estágios + alertas", m: 30, k: "vagas", desc: "Crie alertas: \"estágio dados\", \"estágio BI\", \"estágio controladoria\" no LinkedIn e no Gupy.", link: LINKS.ciee },
  { d: "2026-11-18", t: "Entrar na Data Hackers", m: 15, k: "unico", desc: "Entre no Slack e apresente-se no canal de boas-vindas.", link: LINKS.dh },
  { d: "2026-11-18", t: "Perguntar ao RH como funciona a saída do contrato de aprendiz", m: 10, k: "unico", desc: "Só para saber antes de aceitar uma vaga." },
  { d: "2026-11-19", t: "Revisar o perfil do LinkedIn (checklist)", m: 30, k: "li", desc: "Abra Carreira › LinkedIn › Perfil e confira cada item." }
];

/* ---------- Rota de níveis e matriz ---------- */
const LEVELS = [
  { id: "l1", n: "Estágio ou Júnior", when: "fev/2027", roles: "Estagiária ou Assistente de Controladoria, FP&A, Contábil ou BI", req: "SQL básico, Excel do dia a dia, Power BI com modelo estrela e DAX simples, explicar o próprio projeto em 3 minutos.", sign: "Contratada, com 2 projetos publicados." },
  { id: "l2", n: "Júnior", when: "fev/2027 a 2028", roles: "Analista de BI, Controladoria ou FP&A Júnior", req: "Relatórios com pouca ajuda, Power Query, DAX de tempo, DRE e balanço, conciliação, Python básico, PL-300.", sign: "Cuida sozinha de um relatório que a área usa todo mês." },
  { id: "l3", n: "Pleno", when: "fim de 2028 (2029 se começar como estagiária)", roles: "Analista de BI Financeiro ou FP&A Pleno", req: "Modelo de dados de uma área inteira, SQL avançado, automação de fechamento e orçado x realizado, Python, explicar números para gestores.", sign: "Um processo manual que ela automatizou." },
  { id: "l4", n: "Sênior", when: "2030", roles: "Analista de BI Financeiro ou Controladoria Sênior", req: "Arquitetura de dados financeiros, qualidade e governança, forecast e cenários, orientar júnior sem ser gestora.", sign: "Referência técnica da área em dados financeiros." },
  { id: "l5", n: "Especialista", when: "2032", roles: "Especialista em BI Financeiro ou Analytics Engineer de Finanças", req: "Domínio profundo de dados contábeis, padrões de modelagem para a empresa, decisões de arquitetura, conteúdo público.", sign: "Chamada para os problemas de dados financeiros mais difíceis." }
];
const PLENO_CONDITIONS = ["PL-300 até meados de 2027", "Python e SQL avançado até o fim de 2027", "Um relatório ou processo só seu e uma automação", "Pedir promoção ou trocar de empresa após 18 a 24 meses"];
/* hoje = estimativa inicial; ela corrige no app. alvo por nível l1..l5 */
const SKILLS = [
  { id: "sql", n: "SQL", now: 2, t: [3, 3, 4, 5, 5] },
  { id: "excel", n: "Excel", now: 3, t: [3, 3, 4, 4, 4] },
  { id: "pq", n: "Power Query", now: 3, t: [3, 3, 4, 4, 5] },
  { id: "model", n: "Power BI: modelagem", now: 2, t: [3, 3, 4, 5, 5] },
  { id: "dax", n: "DAX", now: 2, t: [2, 3, 4, 5, 5] },
  { id: "stat", n: "Estatística descritiva", now: 1, t: [2, 2, 3, 4, 4] },
  { id: "py", n: "Python (pandas)", now: 1, t: [1, 2, 3, 4, 4] },
  { id: "cont", n: "Contabilidade", now: 2, t: [3, 3, 4, 4, 5] },
  { id: "fpa", n: "Controladoria e FP&A", now: 1, t: [2, 2, 3, 4, 5] },
  { id: "metr", n: "Métricas de negócio", now: 2, t: [3, 3, 4, 5, 5] },
  { id: "story", n: "Relatórios e storytelling", now: 3, t: [3, 3, 4, 5, 5] },
  { id: "com", n: "Comunicação com o negócio", now: 4, t: [3, 3, 4, 5, 5] },
  { id: "en", n: "Inglês técnico", now: 3, t: [3, 3, 3, 4, 4] },
  { id: "git", n: "Git e GitHub", now: 2, t: [2, 2, 3, 3, 4] },
  { id: "ae", n: "Engenharia de análise (ETL, nuvem)", now: 1, t: [1, 1, 2, 4, 5] }
];

/* ---------- Portfólio ---------- */
const PROJECTS = [
  { id: "p1", n: "Projeto 1 · Inadimplência no Brasil", src: "Banco Central", status: "Publicado · melhorar (v2)",
    done: "README completo, estatística descritiva, página de resumo executivo e roteiro de 3 minutos gravado.",
    steps: ["Roteiro de 3 minutos escrito", "Roteiro gravado e revisado", "README revisado", "Estatística descritiva adicionada", "Página de resumo executivo", "Post de 3 insights no LinkedIn"] },
  { id: "p2", n: "Projeto 2 · \"Camaleão\": varejistas", src: "CVM", status: "Em andamento",
    done: "Margens, liquidez, endividamento e comparação entre empresas; títulos com conclusão; resumo executivo; README; publicado.",
    steps: ["Pergunta de negócio definida", "Dados da CVM baixados e limpos", "Consultas SQL", "Modelo estrela", "Medidas (margens, liquidez, endividamento)", "Página executiva", "Páginas de detalhe", "Resumo executivo (3 insights + 1 recomendação)", "README", "Publicado + post de marco"] },
  { id: "p3", n: "Projeto 3 · FP&A: orçado x realizado", src: "Base criada por você", status: "Depois da semana 21",
    done: "Orçado x realizado e DRE gerencial com SQL, Python e Power BI, com README.",
    steps: ["Base de orçamento e realizado", "Script Python de carga", "Modelo e medidas", "DRE gerencial", "Análise de variação", "README e publicação"] }
];
const README_TPL = "# [Nome do projeto]\n\n## Problema de negócio\n[Qual pergunta este projeto responde?]\n\n## Fonte dos dados\n[Onde os dados foram obtidos, período]\n\n## Etapas de limpeza\n- [passo 1]\n- [passo 2]\n\n## Modelo de dados\n[Fato, dimensões e relacionamentos — print do modelo]\n\n## Prints\n[Imagens das páginas]\n\n## 3 insights\n1. \n2. \n3. \n\n## Recomendação\n[1 recomendação prática]\n\n## Próximos passos\n- \n\n## Ferramentas\nSQL · Power Query · Power BI · DAX · Excel";
const PITCH_TPL = "0:00–0:30 · O problema: [pergunta de negócio e por que importa]\n0:30–1:00 · Os dados: [fonte, período, o que precisei limpar]\n1:00–1:45 · Como fiz: [modelo estrela, medidas principais]\n1:45–2:30 · O que descobri: [3 insights com números]\n2:30–3:00 · O que faria a seguir: [recomendação e próximo passo]";

/* ---------- Flashcards ---------- */
const DECKS = { sql: "SQL", dax: "DAX", excel: "Excel", pq: "Power Query", metr: "Métricas", cont: "Contabilidade", stat: "Estatística", py: "Python", err: "Meus erros" };
const CARDS = [
  ["sql", "Para que serve o WHERE?", "Filtrar linhas antes de agrupar."],
  ["sql", "WHERE x HAVING", "WHERE filtra linhas antes do GROUP BY; HAVING filtra grupos depois da agregação."],
  ["sql", "Ordem de execução de uma consulta", "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."],
  ["sql", "INNER JOIN", "Traz só as linhas que têm correspondência nas duas tabelas."],
  ["sql", "LEFT JOIN", "Traz todas as linhas da tabela da esquerda e as correspondências da direita (ou NULL)."],
  ["sql", "Como achar clientes sem pedido?", "LEFT JOIN pedidos e WHERE pedidos.id IS NULL."],
  ["sql", "COUNT(*) x COUNT(coluna)", "COUNT(*) conta todas as linhas; COUNT(coluna) ignora os NULL."],
  ["sql", "Sintaxe do CASE WHEN", "CASE WHEN condição THEN valor WHEN ... ELSE valor END"],
  ["sql", "DISTINCT", "Remove linhas repetidas do resultado."],
  ["sql", "Por que não usar = NULL?", "NULL não é igual a nada; use IS NULL ou IS NOT NULL."],
  ["sql", "O que é uma subconsulta?", "Uma consulta dentro de outra, no WHERE, no FROM ou no SELECT."],
  ["sql", "O que é uma CTE?", "WITH nome AS (consulta): uma consulta nomeada que deixa o SQL mais legível."],
  ["dax", "Medida x coluna calculada", "Medida calcula no contexto do visual (na hora); coluna calcula linha a linha e ocupa memória."],
  ["dax", "O que faz o CALCULATE?", "Calcula uma expressão mudando o contexto de filtro."],
  ["dax", "Por que usar DIVIDE em vez de /?", "DIVIDE trata divisão por zero e devolve vazio (ou um valor alternativo)."],
  ["dax", "COUNTROWS", "Conta as linhas de uma tabela (ou de uma tabela filtrada)."],
  ["dax", "Contexto de filtro", "Os filtros que chegam à medida: visual, segmentações, página e CALCULATE."],
  ["dax", "Contexto de linha", "A linha atual em colunas calculadas e iteradores como SUMX."],
  ["dax", "Mês anterior em DAX", "CALCULATE([Medida], DATEADD(Calendario[Data], -1, MONTH))"],
  ["dax", "Acumulado no ano", "TOTALYTD([Medida], Calendario[Data])"],
  ["dax", "Mesmo período do ano anterior", "CALCULATE([Medida], SAMEPERIODLASTYEAR(Calendario[Data]))"],
  ["dax", "Para que serve ALL / REMOVEFILTERS?", "Remover filtros, por exemplo para calcular % do total."],
  ["dax", "Por que ter uma tabela calendário?", "Inteligência de tempo precisa de uma tabela de datas contínua e marcada como tabela de datas."],
  ["excel", "PROCX: sintaxe", "PROCX(valor; matriz_procura; matriz_retorno; [se_não_encontrado]; [modo_corresp]; [modo_pesquisa])"],
  ["excel", "PROCX x PROCV", "PROCX busca para qualquer lado, tem valor se não encontrar e não quebra ao inserir colunas."],
  ["excel", "SOMASES", "Soma com várias condições: SOMASES(intervalo_soma; critério_int1; critério1; ...)"],
  ["excel", "Para que serve a tabela dinâmica?", "Resumir e cruzar dados rápido, sem fórmulas."],
  ["excel", "SEERRO", "Devolve um valor alternativo quando a fórmula dá erro."],
  ["excel", "Referência absoluta", "$A$1 trava linha e coluna ao copiar a fórmula."],
  ["pq", "Mesclar x acrescentar", "Mesclar junta colunas (como JOIN); acrescentar empilha linhas (como UNION)."],
  ["pq", "Despivotar colunas", "Transforma colunas (ex.: meses) em linhas, deixando a tabela no formato longo."],
  ["pq", "Por que definir os tipos de dados?", "Evita erros em cálculos, filtros e relacionamentos."],
  ["pq", "Onde ficam os passos aplicados?", "No painel Configurações de consulta; cada passo é uma linha em M."],
  ["metr", "Margem bruta", "Lucro bruto ÷ receita líquida."],
  ["metr", "Margem líquida", "Lucro líquido ÷ receita líquida."],
  ["metr", "Liquidez corrente", "Ativo circulante ÷ passivo circulante."],
  ["metr", "Endividamento", "Passivo total ÷ ativo total."],
  ["metr", "Crescimento YoY", "(Valor do ano − ano anterior) ÷ ano anterior."],
  ["metr", "Ticket médio", "Receita ÷ número de vendas."],
  ["metr", "Taxa de inadimplência", "Carteira em atraso há mais de 90 dias ÷ carteira total."],
  ["metr", "Churn", "Clientes perdidos no período ÷ clientes no início do período."],
  ["metr", "Meta x realizado", "Realizado ÷ meta."],
  ["metr", "YTD", "Acumulado do ano até a data."],
  ["cont", "Partidas dobradas", "Todo lançamento tem débito e crédito de mesmo valor."],
  ["cont", "Equação fundamental", "Ativo = Passivo + Patrimônio Líquido."],
  ["cont", "O que mostra a DRE?", "O resultado do período: receitas menos custos e despesas."],
  ["cont", "O que mostra o balanço?", "A posição em uma data: bens e direitos, obrigações e patrimônio líquido."],
  ["cont", "Ativo circulante", "Bens e direitos que viram dinheiro em até 12 meses."],
  ["cont", "Regime de competência", "Receita e despesa entram no período em que acontecem, não quando são pagas."],
  ["cont", "Conciliação contábil", "Comparar o saldo contábil com outra fonte (banco, auxiliar) e explicar as diferenças."],
  ["cont", "Débito no ativo", "Aumenta o ativo. Crédito no ativo diminui."],
  ["cont", "O que é FP&A?", "Planejamento e análise financeira: orçamento, forecast e análise de variação."],
  ["stat", "Média x mediana", "A mediana não é puxada por valores extremos; a média é."],
  ["stat", "Desvio padrão", "Quanto os valores se afastam, em média, da média."],
  ["stat", "Quartis", "Dividem os dados ordenados em 4 partes iguais (Q1, Q2 = mediana, Q3)."],
  ["stat", "Outlier", "Valor muito distante dos outros; investigue antes de remover."],
  ["stat", "Correlação x causalidade", "Andar junto não quer dizer que um causa o outro."],
  ["py", "Ler um CSV com pandas", "pd.read_csv('arquivo.csv')"],
  ["py", "Primeiras linhas de um DataFrame", "df.head()"],
  ["py", "Agrupar e somar", "df.groupby('coluna')['valor'].sum()"],
  ["py", "Filtrar linhas", "df[df['valor'] > 100]"]
];

/* ---------- Simulados ---------- */
/* teste técnico: [pergunta, [opções], índice certo, deck] */
const QUIZ = [
  ["Qual cláusula filtra grupos depois do GROUP BY?", ["WHERE", "HAVING", "ORDER BY", "LIMIT"], 1, "sql"],
  ["Qual JOIN traz todos os clientes, mesmo sem pedido?", ["INNER JOIN", "LEFT JOIN (clientes à esquerda)", "CROSS JOIN", "RIGHT JOIN (clientes à esquerda)"], 1, "sql"],
  ["COUNT(coluna) ignora...", ["zeros", "textos", "NULL", "duplicados"], 2, "sql"],
  ["Qual a ordem lógica certa?", ["SELECT → FROM → WHERE", "FROM → WHERE → GROUP BY → SELECT", "WHERE → FROM → SELECT", "GROUP BY → WHERE → SELECT"], 1, "sql"],
  ["Para testar valor vazio em SQL usa-se:", ["= NULL", "IS NULL", "== NULL", "EMPTY()"], 1, "sql"],
  ["O que o CALCULATE muda?", ["O tipo de dado", "O contexto de filtro", "A cardinalidade", "O formato"], 1, "dax"],
  ["Melhor forma de dividir em DAX:", ["/", "DIVIDE", "QUOTIENT", "MOD"], 1, "dax"],
  ["Acumulado no ano em DAX:", ["TOTALYTD", "SUMX", "DATEADD", "COUNTROWS"], 0, "dax"],
  ["Medida x coluna calculada: a medida...", ["ocupa memória por linha", "calcula no contexto do visual", "não aceita filtros", "só funciona em tabelas"], 1, "dax"],
  ["Relacionamento mais comum entre dimensão e fato:", ["1:1", "1:N", "N:N", "nenhum"], 1, "dax"],
  ["PROCX devolve um valor quando não encontra se você usar...", ["o 4º argumento", "SEERRO obrigatório", "CORRESP", "não é possível"], 0, "excel"],
  ["Somar com várias condições:", ["SOMA", "SOMASE", "SOMASES", "SOMARPRODUTO"], 2, "excel"],
  ["Empilhar duas tabelas no Power Query:", ["Mesclar", "Acrescentar", "Dinamizar", "Agrupar"], 1, "pq"],
  ["Transformar colunas de meses em linhas:", ["Dinamizar", "Despivotar", "Transpor", "Mesclar"], 1, "pq"],
  ["Margem líquida =", ["Lucro bruto ÷ receita", "Lucro líquido ÷ receita líquida", "Receita ÷ custo", "Ativo ÷ passivo"], 1, "metr"],
  ["Liquidez corrente =", ["Ativo circulante ÷ passivo circulante", "Passivo ÷ ativo", "Caixa ÷ receita", "Lucro ÷ PL"], 0, "metr"],
  ["Ativo é igual a:", ["Passivo − PL", "Passivo + PL", "Receita − despesa", "PL − passivo"], 1, "cont"],
  ["A DRE mostra:", ["a posição em uma data", "o resultado de um período", "o fluxo de caixa", "o plano de contas"], 1, "cont"],
  ["Medida que não é puxada por valores extremos:", ["Média", "Mediana", "Desvio padrão", "Amplitude"], 1, "stat"],
  ["Regime de competência registra a receita quando...", ["é recebida", "acontece a venda", "o mês fecha", "o cliente paga"], 1, "cont"]
];
const INTERVIEW = [
  "Fale sobre você em 1 minuto.",
  "Por que dados e por que agora?",
  "Explique o seu Projeto 1 em 3 minutos.",
  "Qual foi o maior problema nos dados do seu projeto e como resolveu?",
  "Como a sua experiência de social media ajuda em dados?",
  "Como a contabilidade ajuda você a analisar dados?",
  "Explique a diferença entre medida e coluna calculada.",
  "Quando você usaria LEFT JOIN?",
  "Como você montaria um relatório de orçado x realizado?",
  "Conte uma vez em que você errou e o que aprendeu.",
  "Conte uma vez em que você explicou algo técnico para alguém leigo.",
  "Como você organiza seus estudos?",
  "Onde você quer estar em 3 anos?",
  "Por que esta empresa?",
  "Que perguntas você tem para nós?"
];
const STAR_TPL = { s: "Situação: onde e quando?", t: "Tarefa: o que você precisava fazer?", a: "Ação: o que VOCÊ fez, passo a passo?", r: "Resultado: o que mudou, com números?" };

/* ---------- LinkedIn ---------- */
const LI = {
  headline: "Analista de Dados e BI · SQL · Power BI · Excel · Contabilidade e Controladoria",
  invite: "Olá, [nome]! Estou entrando em dados com base em contabilidade e vi seu trabalho em [BI/controladoria]. Vou gostar de acompanhar seus posts.",
  profile: [
    "Título com dados + contabilidade",
    "Sobre contando a trajetória: social media → contabilidade → dados",
    "Open to Work só para recrutadores, com os cargos-alvo",
    "Competências: SQL, Power BI, DAX, Power Query, Excel, Contabilidade, Controladoria",
    "Projeto 1 nos Destaques (GitHub e post)",
    "Capa feita por você",
    "URL personalizada"
  ],
  /* ação de 10 min por dia da semana (0 = domingo) */
  daily: {
    1: ["Vagas + comentários", "Olhe os alertas de vaga e comente 2 posts da área."],
    2: ["Convites + comentários", "Envie 5 convites com mensagem curta e comente 2 posts."],
    3: ["Responder o post", "Seu post saiu às 8h30. Responda quem comentou."],
    4: ["Convites + comentários", "Envie 5 convites e comente 2 posts."],
    5: ["Vagas + comentários", "Olhe os alertas de vaga e comente 3 posts."],
    0: ["Escrever o post de quarta", "Escreva e agende o post para quarta às 8h30."]
  },
  dailyLight: {
    1: ["Comentários", "Comente 2 posts. Fim de ano: sem convites."],
    3: ["Responder o post", "Responda quem comentou no seu post."],
    5: ["Comentários", "Comente 2 posts."],
    0: ["Escrever o post curto", "Post curto para quarta."]
  },
  themes: ["O que aprendi", "Dica prática", "Bastidores do projeto", "Contabilidade + dados", "Carrossel", "Marco"],
  cal: [
    ["2026-11-18", "Bastidores", "i1"], ["2026-11-25", "Bastidores do projeto", "i2"], ["2026-12-02", "Dica prática", "i3"],
    ["2026-12-09", "Marco", "i4"], ["2026-12-16", "Carrossel", "i5"], ["2026-12-23", "Contabilidade + dados", "i6"],
    ["2026-12-30", "O que aprendi", "i7"], ["2027-01-06", "Contabilidade + dados", "i8"], ["2027-01-13", "O que aprendi", "Primeira semana de SQL e SQLBolt"],
    ["2027-01-20", "Dica prática", "GROUP BY x HAVING"], ["2027-01-27", "Carrossel", "i9"], ["2027-02-03", "O que aprendi", "Modelo estrela em linguagem simples"],
    ["2027-02-10", "Bastidores do projeto", "i11"], ["2027-02-17", "Dica prática", "Título de gráfico que diz a conclusão"], ["2027-02-24", "Carrossel", "i10"],
    ["2027-03-03", "Dica prática", "i12"], ["2027-03-10", "Contabilidade + dados", "Medida x coluna com exemplo contábil"], ["2027-03-17", "Marco", "Projeto 2 publicado"],
    ["2027-03-24", "Bastidores do projeto", "O que o Projeto 2 mostrou"], ["2027-03-31", "Carrossel", "Como explico um projeto em 3 minutos"], ["2027-04-07", "O que aprendi", "21 semanas de estudo: o balanço"]
  ],
  ideas: [
    ["i1", "Minha trajetória: de social media para dados, passando pela contabilidade", "Bastidores", "Texto"],
    ["i2", "Projeto 1: 3 coisas que os dados de inadimplência do Banco Central mostram", "Bastidores do projeto", "Texto + 1 print"],
    ["i3", "PROCX em 3 exemplos (e por que troquei o PROCV)", "Dica prática", "Texto + imagem"],
    ["i4", "Concluí ADS: o que a faculdade me deu para trabalhar com dados", "Marco", "Texto + foto"],
    ["i5", "Power Query: 5 passos que limpam qualquer base bagunçada", "Dica prática", "Carrossel"],
    ["i6", "Partidas dobradas explicadas como um dashboard", "Contabilidade + dados", "Texto + imagem"],
    ["i7", "Retrospectiva de 2026 e o que vem em 2027", "O que aprendi", "Texto"],
    ["i8", "Conciliação contábil no Excel: o passo a passo", "Contabilidade + dados", "Texto + imagem"],
    ["i9", "JOIN explicado com duas listas do dia a dia", "Dica prática", "Carrossel"],
    ["i10", "As métricas que todo analista financeiro usa: margem, liquidez e endividamento", "Contabilidade + dados", "Carrossel"],
    ["i11", "Bastidores do Projeto 2: por que escolhi dados da CVM", "Bastidores do projeto", "Texto + print"],
    ["i12", "CALCULATE em linguagem simples", "Dica prática", "Texto + imagem"]
  ],
  posts: {
    i1: "Passei 4 anos criando posts para marcas. Hoje eu crio relatórios.\n\nComo social media, aprendi que todo conteúdo precisa responder uma pergunta: o que a pessoa vai entender em 3 segundos?\n\nNa contabilidade, descobri que por trás de cada número existe uma regra, um lançamento e uma história.\n\nEm dados, juntei as duas coisas: transformar número em decisão, de um jeito que qualquer pessoa entenda.\n\nO que já fiz até aqui:\n• Graduação em Análise e Desenvolvimento de Sistemas\n• Ciências Contábeis em andamento\n• Projeto de análise de inadimplência no Brasil com dados do Banco Central (Power BI, SQL e Excel)\n\nO que vem agora: SQL, DAX e um segundo projeto com dados de empresas da CVM.\n\nEstou buscando estágio ou vaga júnior em BI, dados, controladoria ou FP&A. Se você trabalha nessas áreas, vou adorar trocar ideia.\n\n#dados #powerbi #contabilidade #controladoria",
    i2: "Quanto o brasileiro está devendo, e quem está mais atrasado?\n\nFoi essa a pergunta do meu primeiro projeto de dados. Usei dados públicos do Banco Central sobre inadimplência e montei um painel no Power BI.\n\n3 coisas que os dados mostraram:\n1. [a taxa geral e quanto ela variou no período]\n2. [o estado ou a região que mais chamou atenção]\n3. [a diferença entre pessoa física e jurídica, ou entre modalidades]\n\nO que aprendi fazendo:\n• Limpar a base no Power Query levou mais tempo que o painel, e isso é normal.\n• Um modelo estrela com tabela calendário deixa o DAX muito mais simples.\n• O título do gráfico deve dizer a conclusão, não o nome da métrica.\n\nO projeto completo está no meu GitHub: [link]\n\nSe você trabalha com crédito, o que olharia primeiro nesses dados?\n\n#powerbi #dados #credito #analisededados",
    i3: "Se você ainda usa PROCV, este post é para você.\n\nO PROCX faz tudo o que o PROCV faz, com menos erro. 3 exemplos que eu uso:\n\n1. Buscar à esquerda\n=PROCX(A2; Produtos[Código]; Produtos[Nome])\nO PROCV só olha para a direita. O PROCX olha para qualquer lado.\n\n2. Mensagem quando não encontra\n=PROCX(A2; Produtos[Código]; Produtos[Preço]; \"Não encontrado\")\nAdeus, #N/D no relatório.\n\n3. Buscar o último lançamento\n=PROCX(A2; Lançamentos[Conta]; Lançamentos[Valor]; ; 0; -1)\nO -1 faz a busca de baixo para cima. Ótimo para pegar o saldo mais recente de uma conta.\n\nBônus: se alguém inserir uma coluna no meio da tabela, o PROCX continua certo. O PROCV quebra.\n\nQual função de Excel você mais usa no trabalho?\n\n#excel #dados #contabilidade #dicasdeexcel",
    i4: "Fechei um ciclo: concluí a graduação em Análise e Desenvolvimento de Sistemas.\n\nEntrei pensando em programar. Saio sabendo que o que mais gosto é usar tecnologia para explicar números.\n\n3 coisas da faculdade que uso em dados:\n• Banco de dados: foi onde o SQL deixou de ser um bicho de sete cabeças.\n• Lógica de programação: ajuda a montar uma medida DAX passo a passo.\n• Projetos em equipe: aprender a explicar o que fiz para quem não é da área.\n\nE o ciclo continua: sigo em Ciências Contábeis, porque quero unir dados e finanças. Controladoria, FP&A e BI financeiro são onde quero estar.\n\nObrigada a quem caminhou comigo até aqui. Agora é estágio ou júnior em dados, e estou pronta.\n\n#ads #tecnologia #dados #carreira"
  }
};

/* ---------- Medalhas ---------- */
const MEDALS = [
  ["first", "Primeiro passo", "Concluiu a primeira tarefa"],
  ["s7", "7 dias seguidos", "Sequência de 7 dias"],
  ["s30", "30 dias seguidos", "Sequência de 30 dias"],
  ["c100", "100 revisões", "Revisou 100 flashcards"],
  ["a10", "10 candidaturas", "Registrou 10 candidaturas"],
  ["a50", "50 candidaturas", "Registrou 50 candidaturas"],
  ["p4", "4 posts", "Publicou 4 posts no LinkedIn"],
  ["h20", "20 horas", "20 horas de estudo cronometradas"],
  ["proj1", "Projeto 1 v2", "Todas as etapas do Projeto 1"],
  ["proj2", "Projeto 2 publicado", "Todas as etapas do Projeto 2"],
  ["star5", "5 histórias STAR", "Escreveu 5 histórias STAR"],
  ["hired", "Contratada!", "Registrou a contratação"]
];

/* ---------- Notas de versão ---------- */
const NEWS = {
  1: "Primeira versão: Hoje, Agenda, Estudar, Carreira e o menu com Portfólio, Progresso e Configurações."
};
