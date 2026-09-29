import { esc, section } from '../lib/html.js';

export function ai(ctx) {
  const a = ctx.t.ai;
  const body = `
  <ul class="source-list">${a.sources.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
  <p class="lead">${esc(a.body)}</p>
  <figure class="pipeline" aria-labelledby="ai-pipe-cap">
    <figcaption id="ai-pipe-cap" class="fig-label">${esc(a.pipelineLabel)}</figcaption>
    <ol class="pipeline-list">${a.pipeline.map((p, i) => `
      <li class="pipeline-step" style="--i:${i}"><span class="pipeline-n">${String(i + 1).padStart(2, '0')}</span><span class="pipeline-t">${esc(p.t)}</span><span class="pipeline-d">${esc(p.d)}</span></li>`).join('')}
    </ol>
  </figure>
  <div class="rag" id="rag">
    <h3 class="sub-title">${esc(a.ragTitle)}</h3>
    <div class="rag-simple">
      <p class="finder-label">${esc(a.simpleLabel)}</p>
      <p class="lead">${esc(a.simple)}</p>
    </div>
    <details class="disclosure">
      <summary>${esc(a.techLabel)}</summary>
      <div class="disclosure-body">
        <ol class="flow flow--mono">${a.tech.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
        <p class="note">${esc(a.techNote)}</p>
      </div>
    </details>
  </div>`;
  return section({ id: 'ai', title: a.title, intro: a.intro, body });
}
