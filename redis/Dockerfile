FROM redis:7.0-alpine

# Variables.
ARG UID
ARG GID

# Copiamos configuración de MongoDB y asignamos permisos.
COPY --chown="${UID}":"${GID}" ./redis.conf /etc/redis/redis.conf

# Defino usuario.
USER redis
