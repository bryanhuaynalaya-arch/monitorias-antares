# Monitorías Antares

Iniciativa académica independiente para estudiantes del ITM, publicada con GitHub Pages. Las materias, búsqueda, filtros, reproducción de videos y enlaces a documentos funcionan desde archivos estáticos. No requiere instalar nada para actualizar el contenido.

## Publicar material

El archivo que debes editar es **`contenido.js`**. En GitHub, ábrelo y pulsa el lápiz **Edit this file**. Agrega cada recurso dentro de `recursos: [ ... ]` y pulsa **Commit changes**. Cada cambio en la rama `main` actualiza la página publicada.

Formato de un video (reemplaza el enlace por el real):

```js
{ materia: "Geometría Vectorial", tema: "Rectas", tipo: "video",
  titulo: "Ecuación de la recta", descripcion: "Explicación con ejemplos",
  url: "https://www.youtube.com/watch?v=ID_DEL_VIDEO" },
```

Formato de un PDF guardado en Google Drive:

```js
{ materia: "Cálculo Diferencial", tema: "Derivadas", tipo: "documento",
  titulo: "Guía de derivadas", descripcion: "Ejercicios resueltos",
  url: "https://drive.google.com/file/d/ID_DEL_ARCHIVO/view" },
```

Para un parcial de práctica usa `tipo: "parcial"`. Las materias disponibles son `Matemáticas Básicas`, `Geometría Vectorial`, `Cálculo Diferencial`, `Álgebra Lineal`, `Cálculo Integral` y `Física Mecánica`. Separa varios objetos con comas. No publiques en el repositorio archivos privados ni datos personales de estudiantes.

Primero sube el video a YouTube como público o no listado. Para un PDF, súbelo a Drive y configura el acceso como **Cualquier persona con el enlace → Lector**; de lo contrario, los estudiantes no podrán abrirlo. Luego copia el enlace en el campo `url`.

Los recursos actuales están enlazados desde la carpeta pública «Repositorio ITM» de Drive. El repositorio de GitHub guarda solo URLs, no copias de los PDF. Las fotografías están agrupadas en tarjetas que abren su carpeta por parcial. La página muestra doce recursos a la vez; el botón «Mostrar más recursos» permite seguir explorando.

Las imágenes de las seis materias están en `assets/`. Debajo de las tarjetas de materias hay un video musical de prueba incrustado en la página; está separado del catálogo académico. Cuando tengas una clase real, agrégala como recurso `tipo: "video"` en `contenido.js`.

## Horarios y solicitudes

Dentro de `contenido.js`, completa `horarios` con objetos como:

```js
{ materia: "Geometría Vectorial", dia: "Martes", hora: "4:00 p. m.", modalidad: "Presencial" },
```

En `formulario`, coloca el enlace HTTPS de un Google Form para solicitar la monitoría. El botón aparecerá solo cuando ese enlace esté configurado. El ejemplo de horario no se publica: sirve únicamente como guía.

## Límite de esta versión

GitHub Pages solo publica archivos estáticos. Editar `contenido.js` en GitHub funciona para administrar recursos, pero no es un panel privado dentro de la web. Para solicitudes almacenadas, cuentas o carga directa de archivos desde la página haría falta añadir otro servicio.
