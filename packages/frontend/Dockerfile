FROM node:16.13.0 as build

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app

RUN rm -rf *

COPY ["package.json", "yarn.lock", ".npmrc", "./"]

RUN yarn

COPY . .

RUN DISABLE_ESLINT_PLUGIN=true yarn build

FROM nginx:latest

RUN mkdir /etc/nginx/templates

RUN echo " \
    upstream backend { \
      \${BACKEND_UPSTREAM}\
    } \
    server { \
        listen       80; \
        listen  [::]:80; \
        server_name  localhost; \
        location / { \
            root   /var/www; \
            try_files \$uri \$uri/ /index.html; \
        } \
        location /api/ {  \
            proxy_pass http://backend; \
        } \
    }" > /etc/nginx/templates/default.conf.template

COPY --from=build /app/build /var/www
