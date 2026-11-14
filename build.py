"""Monta o app a partir das partes em src/.

Fontes (edite estas):
  src/head.html   título e meta
  src/styles.css  visual (claro e escuro)
  src/body.html   topo, menu lateral, barra de baixo
  src/data.js     conteúdo: fases, cursos, cartões, LinkedIn, rota
  src/app.js      lógica e telas

Saídas (não edite à mão):
  index.html      app instalável (GitHub Pages)
  dist/app.html   página única para o claude.ai

Uso: python3 build.py && node tests/telas.js
"""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(ROOT, p), encoding='utf8').read()

head = rd('src/head.html').strip()
css = rd('src/styles.css')
body = rd('src/body.html').strip()
js = rd('src/data.js') + '\n' + rd('src/app.js')

app = head + '\n<style>\n' + css + '</style>\n\n' + body + '\n\n<script>\n' + js + '</script>\n'
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
open(os.path.join(ROOT, 'dist', 'app.html'), 'w', encoding='utf8').write(app)

head_add = ('<link rel="manifest" href="app.webmanifest">'
            '<link rel="icon" href="icons/icon-192.png"><link rel="apple-touch-icon" href="icons/apple-180.png">'
            '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">'
            '<meta name="apple-mobile-web-app-title" content="Carreira">')
sw = ('<script>if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){const sw=navigator.serviceWorker;let had=!!sw.controller;'
      'sw.register("sw.js",{scope:"./"}).then(r=>{document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")r.update().catch(()=>{});});}).catch(()=>{});'
      'sw.addEventListener("controllerchange",()=>{if(had){if(typeof swUpdated==="function")swUpdated();else location.reload();}had=true;});}</script>')
out = ('<!doctype html><html lang="pt-BR"><head>' + head + head_add + '<style>\n' + css + '</style></head><body>' + body +
       '<script>\n' + js + '</script>' + sw + '</body></html>')
open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf8').write(out)

v = re.search(r'const C="pcd-v(\d+)"', rd('sw.js'))
av = re.search(r'const APP_V = (\d+);', js)
print(f'index.html {len(out)} bytes · dist/app.html {len(app)} bytes · versão {av.group(1) if av else "?"} · cache v{v.group(1) if v else "?"}')
