const materias = [
  {nombre:'Matemáticas Básicas', simbolo:'Σ', tono:'azul', temas:['Álgebra','Funciones','Ecuaciones','Trigonometría']},
  {nombre:'Geometría Vectorial', simbolo:'◇', tono:'verde', temas:['Vectores','Producto punto y vectorial','Rectas','Planos']},
  {nombre:'Cálculo Diferencial', simbolo:'d/dx', tono:'amarillo', temas:['Límites','Continuidad','Derivadas','Aplicaciones']}
];
const tipos = ['Todos','Videos','Documentos','Parciales'];
const $ = id => document.getElementById(id);
let materia = 'Todas', tipo = 'Todos';
$('materia-tarjetas').innerHTML = materias.map(m => `<button class="materia ${m.tono}" data-materia="${m.nombre}"><span class="simbolo">${m.simbolo}</span><strong>${m.nombre}</strong><span class="temas">${m.temas.slice(0,3).join(' · ')}</span><span class="accion">Ver temas ↗</span></button>`).join('');
$('materia-filtro').innerHTML = ['Todas',...materias.map(m => m.nombre)].map(n => `<option>${n}</option>`).join('');
function pintar() {
  $('tipos').innerHTML = tipos.map(t => `<button data-tipo="${t}" class="${tipo === t ? 'activo' : ''}">${t}</button>`).join('');
  const q = $('busqueda').value.toLocaleLowerCase('es');
  const visibles = materias.filter(m => (materia === 'Todas' || materia === m.nombre) && (!q || `${m.nombre} ${m.temas.join(' ')}`.toLocaleLowerCase('es').includes(q)));
  $('recursos').innerHTML = visibles.map(m => `<article class="recurso"><div class="recurso-materia"><span class="${m.tono}">${m.simbolo}</span>${m.nombre}</div><h3>Temas de estudio</h3><ul>${m.temas.map(t => `<li>${t}</li>`).join('')}</ul><p class="estado">${tipo === 'Todos' ? 'Material en preparación' : `Aún no hay ${tipo.toLowerCase()} publicados`}</p></article>`).join('');
  $('sin-resultados').hidden = visibles.length > 0;
}
$('materia-tarjetas').addEventListener('click', e => { const button = e.target.closest('[data-materia]'); if (!button) return; materia = button.dataset.materia; $('materia-filtro').value = materia; pintar(); $('materiales').scrollIntoView({behavior:'smooth'}); });
$('materia-filtro').addEventListener('change', e => {materia = e.target.value; pintar();});
$('busqueda').addEventListener('input', pintar);
$('tipos').addEventListener('click', e => {const button = e.target.closest('[data-tipo]'); if (!button) return; tipo = button.dataset.tipo; pintar();});
$('menu').addEventListener('click', () => {const open = $('nav').classList.toggle('abierto'); $('menu').setAttribute('aria-expanded', String(open));});
$('nav').addEventListener('click', () => {$('nav').classList.remove('abierto'); $('menu').setAttribute('aria-expanded','false');});
pintar();
