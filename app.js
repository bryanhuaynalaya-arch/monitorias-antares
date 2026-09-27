const materias = [
  {nombre:'Matemáticas Básicas', tono:'blue', imagen:'matematicas', numero:'01', temas:['Álgebra','Funciones','Ecuaciones','Trigonometría']},
  {nombre:'Geometría Vectorial', tono:'teal', imagen:'geometria', numero:'02', temas:['Vectores','Rectas','Planos']},
  {nombre:'Cálculo Diferencial', tono:'gold', imagen:'calculo', numero:'03', temas:['Límites','Derivadas','Aplicaciones']},
  {nombre:'Álgebra Lineal', tono:'blue', imagen:'matematicas', numero:'04', temas:['Matrices','Sistemas','Espacios vectoriales']},
  {nombre:'Cálculo Integral', tono:'gold', imagen:'calculo', numero:'05', temas:['Integrales','Técnicas','Aplicaciones']},
  {nombre:'Física Mecánica', tono:'teal', imagen:'geometria', numero:'06', temas:['Movimiento','Fuerzas','Energía']}
];
const tipos = [['Todos','todos'],['Videos','video'],['Documentos','documento'],['Parciales','parcial']];
const datos = window.CONTENIDO || {recursos:[],horarios:[],formulario:''};
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const https = value => {try {const u = new URL(value); return u.protocol === 'https:' ? u.href : null;} catch {return null;}};
const youtubeId = value => {try {const u = new URL(value); if (['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname)) {const id = u.pathname === '/watch' ? u.searchParams.get('v') : u.pathname.match(/^\/(?:shorts|live|embed)\/([\w-]{11})/)?.[1]; return /^[\w-]{11}$/.test(id||'') ? id : null;} if (u.hostname === 'youtu.be') {const id=u.pathname.slice(1); return /^[\w-]{11}$/.test(id) ? id:null;}} catch {} return null;};
let materia = 'Todas', tipo = 'todos', visibles = 12;
$('materia-tarjetas').innerHTML = materias.map(m => `<button class="subject-card ${m.tono}" data-materia="${esc(m.nombre)}"><span class="subject-image"><img src="assets/${m.imagen}.webp" alt="" loading="lazy"></span><span class="subject-content"><span class="subject-top"><span class="subject-number">MATERIA ${m.numero}</span><span class="subject-arrow" aria-hidden="true">↗</span></span><strong>${m.nombre}</strong><span class="subject-topics">${m.temas.slice(0,3).join(' · ')}</span><span class="subject-bottom">Explorar recursos <span aria-hidden="true">→</span></span></span></button>`).join('');
$('materia-filtro').innerHTML = ['Todas',...materias.map(m=>m.nombre)].map(n=>`<option>${esc(n)}</option>`).join('');
function pintar(){
  $('tipos').innerHTML = tipos.map(([label,value])=>`<button data-tipo="${value}" class="${tipo===value?'active':''}" aria-pressed="${tipo===value}">${label}</button>`).join('');
  const q = $('busqueda').value.trim().toLocaleLowerCase('es');
  const items = (Array.isArray(datos.recursos) ? datos.recursos : []).filter(r =>
    (materia === 'Todas' || r.materia === materia) && (tipo === 'todos' || r.tipo === tipo) &&
    (!q || `${r.materia} ${r.tema} ${r.titulo} ${r.descripcion||''}`.toLocaleLowerCase('es').includes(q)) &&
    (r.tipo === 'video' ? youtubeId(r.url) : https(r.url))
  );
  $('recursos').innerHTML = items.slice(0,visibles).map(r => {const video = r.tipo === 'video'; const m = materias.find(x=>x.nombre===r.materia); const carpeta = r.url.includes('/folders/'); const label = r.tipo === 'parcial' ? 'Parcial de práctica' : video ? 'Video tutorial' : carpeta ? 'Carpeta de imágenes' : 'Documento'; return `<article class="resource-card"><div class="resource-cover ${m?.tono||'blue'}"><span class="resource-kind">${video?'▶':r.tipo==='parcial'?'✎':carpeta?'▦':'▤'}</span><span>${esc(r.materia)}</span></div><div class="resource-body"><span class="resource-meta">${esc(label)} · ${esc(r.tema)}</span><h3>${esc(r.titulo)}</h3><p>${esc(r.descripcion||'Material de estudio')}</p>${video?`<button class="resource-action" data-video="${youtubeId(r.url)}" data-title="${esc(r.titulo)}">Ver video <span aria-hidden="true">↗</span></button>`:`<a class="resource-action" href="${esc(https(r.url))}" target="_blank" rel="noopener noreferrer">Abrir ${carpeta?'carpeta':'material'} <span aria-hidden="true">↗</span></a>`}</div></article>`;}).join('');
  $('contador-recursos').textContent = items.length ? `Mostrando ${Math.min(visibles,items.length)} de ${items.length} recursos` : '';
  $('mostrar-mas').hidden = items.length <= visibles;
  $('sin-resultados').hidden = items.length > 0;
  $('empty-title').textContent = q ? 'No encontramos resultados' : 'Todavía no hay material aquí';
  $('empty-copy').textContent = q ? 'Prueba con otra palabra o cambia los filtros.' : 'Próximamente publicaremos los primeros recursos. Estos son los temas de cada curso:';
  const sugeridas = materias.filter(m => materia === 'Todas' || m.nombre === materia);
  $('topic-suggestions').innerHTML = q ? '' : sugeridas.map(m => `<div class="topic-group"><strong>${esc(m.nombre)}</strong><div>${m.temas.map(t => `<span>${esc(t)}</span>`).join('')}</div></div>`).join('');
}
$('materia-tarjetas').addEventListener('click', e => {const b=e.target.closest('[data-materia]'); if(!b)return; materia=b.dataset.materia; visibles=12; $('materia-filtro').value=materia; pintar(); $('materiales').scrollIntoView({behavior:'smooth'});});
$('materia-filtro').addEventListener('change',e=>{materia=e.target.value;visibles=12;pintar();});
$('busqueda').addEventListener('input',()=>{visibles=12;pintar();});
$('tipos').addEventListener('click',e=>{const b=e.target.closest('[data-tipo]');if(!b)return;tipo=b.dataset.tipo;visibles=12;pintar();});
$('mostrar-mas').addEventListener('click',()=>{visibles+=12;pintar();});
$('recursos').addEventListener('click',e=>{const b=e.target.closest('[data-video]');if(!b)return; const id=b.dataset.video; if(!/^[\w-]{11}$/.test(id))return; $('video-title').textContent=b.dataset.title; $('video-frame').innerHTML=`<iframe title="Video tutorial" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`; $('video-dialog').showModal();});
$('video-close').addEventListener('click',()=>$('video-dialog').close());
$('video-dialog').addEventListener('click',e=>{if(e.target===$('video-dialog'))$('video-dialog').close();});
$('video-dialog').addEventListener('close',()=>$('video-frame').replaceChildren());
$('menu').addEventListener('click',()=>{const open=$('nav').classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open));});
$('nav').addEventListener('click',()=>{$('nav').classList.remove('open');$('menu').setAttribute('aria-expanded','false');});
if(Array.isArray(datos.horarios) && datos.horarios.length){$('horarios').innerHTML=datos.horarios.map(h=>`<div class="schedule-item"><strong>${esc(h.materia)}</strong><span>${esc(h.dia)} · ${esc(h.hora)} · ${esc(h.modalidad)}</span></div>`).join('');}else{$('horarios').innerHTML='<p class="schedule-empty">Horarios por anunciar</p>';}
if(https(datos.formulario)){const a=$('contacto');a.href=https(datos.formulario);a.target='_blank';a.rel='noopener noreferrer';a.hidden=false;}
pintar();
