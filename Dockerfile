FROM nginx:1.17.1-alpine
COPY ssl-keys/ /home/ssl-keys/
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/visitors-frontend /usr/share/nginx/html
