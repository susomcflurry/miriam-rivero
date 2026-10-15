# Serves the static site with nginx. Build the HTML first: node src/build.mjs
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css main.js i18n.json favicon.svg robots.txt sitemap.xml og-image.jpg /usr/share/nginx/html/
COPY en/ /usr/share/nginx/html/en/
COPY de/ /usr/share/nginx/html/de/
COPY assets/img/ /usr/share/nginx/html/assets/img/

EXPOSE 80
