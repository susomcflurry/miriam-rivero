# Build the static Next.js export, then serve it with nginx.
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY next.config.mjs ./
COPY app ./app
COPY src ./src
COPY public ./public
COPY assets/credits.json ./assets/credits.json
RUN npx next build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
