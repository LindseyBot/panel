FROM nginx:alpine

LABEL maintainer="git@notfab.net"
EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist/newdash /usr/share/nginx/html
