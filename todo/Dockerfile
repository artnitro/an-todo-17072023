FROM nginx:alpine

# Variables.
ARG UID
ARG GID

# Update y upgrade paquetes.
RUN apk -U upgrade

# Usuario y permisos.
RUN adduser -D -g 'www' www
RUN chown -R "${UID}":"${GID}" /usr/share/nginx/html \ 
  && chown -R "${UID}":"${GID}" /var/cache/nginx \
  && chown -R "${UID}":"${GID}" /var/log/nginx

# Copio ficheros de configuración y certificados.
COPY --chown="${UID}":"${GID}" ./proxy.conf /etc/nginx/proxy.conf 
COPY --chown="${UID}":"${GID}" ./nginx.conf /etc/nginx/nginx.conf
COPY --chown="${UID}":"${GID}" ./certs/. /etc/nginx/.

# Defino usuario.
USER www