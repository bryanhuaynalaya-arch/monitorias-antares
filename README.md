# Monitorías Antares

Sitio estático para GitHub Pages. Incluye la portada, materias, búsqueda y filtros. Los videos, documentos y horarios aún no están cargados.

## Publicar gratis en GitHub Pages

1. En GitHub, crea un repositorio **público** llamado `monitorias-antares`.
2. Sube a la raíz del repositorio estos cuatro archivos: `index.html`, `style.css`, `app.js` y `favicon.svg`. Puedes usar **Add file → Upload files** y confirmar con **Commit changes**.
3. Abre **Settings → Pages**. En **Build and deployment**, selecciona **Deploy from a branch**; elige la rama `main` y la carpeta `/(root)`. Guarda.
4. GitHub mostrará la dirección de la página, normalmente `https://TU_USUARIO.github.io/monitorias-antares/`. La publicación puede tardar unos minutos.

Los enlaces entre archivos son relativos y funcionan tanto al abrir `index.html` en el computador como en la ruta de GitHub Pages.

## Editar contenido

Las tres materias y sus temas están en el arreglo `materias` de `app.js`. No se han agregado videos o PDFs ficticios. Para la siguiente versión se pueden mostrar enlaces a YouTube y Google Drive dentro del catálogo. GitHub Pages publica archivos estáticos: un panel privado de carga y solicitudes persistentes requerirá un servicio adicional.
