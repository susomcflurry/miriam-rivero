# Miriam Rivero · Intérprete de conferencias y traductora

Web profesional de **Miriam Rivero**, intérprete de conferencias y traductora freelance (alemán, inglés y español), con base en Madrid.

**En producción:** [miriamrivero.com](https://miriamrivero.com/) · [/en/](https://miriamrivero.com/en/) · [/de/](https://miriamrivero.com/de/)

## Qué es

Una landing de una sola página, en tres idiomas equivalentes, pensada para que organizadores de eventos, agencias, empresas y particulares comprueben en segundos que cubre su par de idiomas y contacten con ella por email o LinkedIn. No hay formulario ni backend.

- **Español** en `/` (abre con Madrid), **inglés** en `/en/` y **alemán** en `/de/` (abren con Colonia).
- El cambio de idioma se hace en el sitio, con un fundido, sin recargar la página, y la URL se mantiene sincronizada con el historial.
- En Vercel, la raíz `/` redirige según el país del visitante (o la cookie `lang` si ya eligió idioma). Los buscadores nunca se redirigen, así que las tres versiones se indexan.

## Stack

- [Next.js 16](https://nextjs.org/) y React 19, exportado como HTML estático (`out/`), una página prerenderizada por idioma.
- Una sola hoja de estilos global (`app/styles.css`), sin frameworks de CSS.
- Despliegue en Vercel desde `main`; alternativa con Docker + nginx.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # exportación estática en out/
npm start        # sirve out/ en local
```

Con Docker:

```bash
docker compose up -d --build   # http://localhost:8080/
```

> La versión Docker/nginx siempre sirve `/` en español: las redirecciones por país solo existen en Vercel (`vercel.json`).

## Estructura

```
app/
  (es)/  (en)/en/  (de)/de/   un layout raíz por idioma (cada uno con su <html lang>)
  global-not-found.jsx        404 trilingüe
  sitemap.js, robots.js
  styles.css                  estilos globales
src/
  content.js                  todos los textos, un objeto por idioma
  site.js                     metadatos, hreflang, JSON-LD y créditos de fotos
  images.js                   tamaños y srcset de cada imagen
  components/                 Shell, Page y Site (el único componente cliente)
public/assets/img/            recortes .webp que usa la página
assets/                       originales y credits.json (fuente y licencia de cada foto)
scripts/resize-images.mjs     genera las variantes name-<ancho>.webp
vercel.json                   redirecciones por país, cabeceras de seguridad y caché
```

## Editar contenido

- **Textos:** todo está en `src/content.js`. Cualquier cambio debe hacerse en los tres idiomas; el alemán es su lengua materna y tiene que sonar nativo.
- **Texto visible nuevo:** añade el atributo `data-t` para que participe en el fundido al cambiar de idioma.
- **Imágenes:** coloca el recorte en `public/assets/img/` y ejecuta `node scripts/resize-images.mjs` (requiere `cwebp`). Si sustituyes una imagen, cámbiale el nombre: `/assets/*` se cachea 30 días.
- **Créditos:** registra la fuente y la licencia en `assets/credits.json`; alimenta la línea de créditos del pie.

## Documentación interna

- [`PRODUCT.md`](PRODUCT.md): datos del producto, público y lo que **no** se puede inventar (testimonios, logos, precios, certificaciones…).
- [`DESIGN.md`](DESIGN.md): sistema de diseño.
- [`CLAUDE.md`](CLAUDE.md): arquitectura y reglas de diseño en vigor.

## Créditos y licencias

Varias fotografías están bajo licencia CC BY-SA, así que sus recortes conservan la misma licencia. La fuente y el autor de cada una figuran en `assets/credits.json` y en el pie de la web.

## Contacto

- Email: [miriam.rivero98@gmail.com](mailto:miriam.rivero98@gmail.com)
- LinkedIn: [Miriam Rivero](https://www.linkedin.com/in/miriam-rivero-419265368/)
