FROM node:lts-slim AS builder

#RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.4

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html


