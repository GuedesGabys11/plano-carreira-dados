/* Abre todas as telas no celular e no computador, em várias datas, e falha em qualquer erro.
   Uso: python3 build.py && node tests/telas.js */
const { chromium } = require("playwright");
const path = require("path");
const URL = "file://" + path.join(__dirname, "..", "index.html");
const DATES = ["2026-11-14T10:00:00", "2026-11-18T14:30:00", "2026-12-25T10:00:00", "2027-01-15T15:00:00", "2027-03-06T09:30:00", "2027-05-10T10:00:00"];
const SIZES = [{ n: "celular", w: 390, h: 844 }, { n: "computador", w: 1366, h: 900 }];
const VIEWS = ["hoje", "agenda", "estudar", "carreira", "port", "prog", "rota", "config"];

(async () => {
  const b = await chromium.launch();
  const fails = [];
  for (const sz of SIZES) for (const dt of DATES) {
    const ctx = await b.newContext({ viewport: { width: sz.w, height: sz.h } });
    const pg = await ctx.newPage(); pg.setDefaultTimeout(2500);
    await pg.route(/^https?:/, r => r.abort());
    await pg.clock.install({ time: new Date(dt) });
    const errs = [];
    pg.on("pageerror", e => errs.push(e.message));
    pg.on("console", m => { if (m.type() === "error" && !/ERR_FAILED|net::/.test(m.text())) errs.push(m.text()); });
    await pg.goto(URL);
    const tag = sz.n + " " + dt.slice(0, 10);
    const over = async where => { const o = await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); if (o > 1) fails.push(tag + " " + where + ": rolagem lateral de " + o + "px"); };
    const act = async (sel, where) => { const els = await pg.$$(sel); for (const e of els.slice(0, 3)) { if (await e.isVisible()) { await e.click().catch(() => { }); await pg.waitForTimeout(30); } } await over(where); };
    for (const v of VIEWS) {
      await pg.evaluate(v => go(v), v); await pg.waitForTimeout(40); await over(v);
      for (const d of await pg.$$("#view details")) await d.evaluate(x => x.open = true);
      await over(v + " aberto");
      const segs = await pg.$$eval("#view [data-seg]", bs => bs.map(b => [b.dataset.seg, b.dataset.s]));
      for (const [n, s] of segs) {
        await pg.click('#view [data-seg="' + n + '"][data-s="' + s + '"]').catch(() => { });
        await pg.waitForTimeout(30); await over(v + "/" + s);
        for (const d of await pg.$$("#view details")) await d.evaluate(x => x.open = true);
        await over(v + "/" + s + " aberto");
      }
    }
    /* ações principais */
    await pg.evaluate(() => go("hoje"));
    await act("#view [data-open]", "detalhe da tarefa"); await pg.keyboard.press("Escape");
    await pg.evaluate(() => { const c = document.querySelector("#view [data-chk]"); if (c) c.click(); });
    await pg.evaluate(() => { const c = document.querySelector("#view [data-tm]"); if (c) c.click(); });
    await over("cronômetro");
    await pg.evaluate(() => focusOpen()); await over("foco"); await pg.keyboard.press("Escape");
    await pg.evaluate(() => go("estudar", "rev")); await pg.click('#view [data-rv=""]').catch(() => { });
    await pg.click("#flash").catch(() => { }); await pg.click('[data-g="0"]').catch(() => { }); await pg.click("#flash").catch(() => { }); await pg.click('[data-g="2"]').catch(() => { }); await over("flashcards");
    await pg.evaluate(() => go("estudar", "sim")); await pg.click("#quizGo").catch(() => { }); await pg.click('[data-op="0"]').catch(() => { }); await pg.click("#simNext").catch(() => { }); await over("quiz");
    await pg.evaluate(() => go("carreira", "vagas")); await pg.click("#quickApp").catch(() => { }); await pg.fill("#apE", "Empresa X").catch(() => { }); await pg.fill("#apV", "Estágio BI").catch(() => { }); await pg.click("#apOk").catch(() => { }); await over("vaga");
    await pg.evaluate(() => go("carreira", "li")); await pg.click('[data-seg="lis"][data-s="posts"]').catch(() => { }); await act("#view [data-draft]", "rascunho"); await pg.keyboard.press("Escape");
    await pg.evaluate(() => go("agenda")); await pg.click('[data-seg="ag"][data-s="mes"]').catch(() => { }); await act("#view [data-day]", "mês"); await pg.click("#agNext").catch(() => { }); await over("mês seguinte");
    await pg.evaluate(() => go("port")); await pg.click("#kbNew").catch(() => { }); await pg.fill("#mft", "Cartão").catch(() => { }); await pg.click("#mfOk").catch(() => { }); await act("#view [data-kbm]", "kanban");
    await pg.evaluate(() => go("rota")); await act("#view [data-sk]", "competências");
    await pg.click("#menuBtn"); await pg.waitForTimeout(250); await over("menu"); await pg.click('#drawerList [data-go="prog"]'); await over("menu > progresso");
    const nav = await pg.$$eval("#nav button", bs => bs.length);
    if (nav !== 4) fails.push(tag + ": barra de baixo com " + nav + " itens");
    errs.forEach(e => fails.push(tag + ": " + e)); console.log("ok " + tag);
    await ctx.close();
  }
  await b.close();
  if (fails.length) { console.error("FALHOU (" + fails.length + "):\n" + [...new Set(fails)].join("\n")); process.exit(1); }
  console.log("OK: " + VIEWS.length + " telas × " + DATES.length + " datas × " + SIZES.length + " tamanhos, sem erros.");
})();
