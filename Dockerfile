FROM nginx:alpine

LABEL maintainer="git@notfab.net"
EXPOSE 80

COPY dist/newdash /usr/share/nginx/html
