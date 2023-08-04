FROM node:18-alpine

# Variables.
ARG UID
ARG GID

# Update y upgrade, además, añado paquetes.
RUN apk -U upgrade
RUN apk add neovim

# Añado directorio de trabajo.
WORKDIR /oauth

# Creo directorio y permisos.
RUN mkdir /oauth/node_modules 
RUN chown -R "${UID}":"${GID}" /oauth

# Instalo última version de npm.
RUN npm install -g npm@latest

# Instalo última versión CLI de NestJS.
RUN npm install -g @nestjs/cli@latest

# Expongo el puerto de trabajo.
EXPOSE 5000

# Defino usuario.
USER node

# Ejecuto terminal.
CMD ["/bin/sh", "-c", "tail -f /dev/null"]