FROM node:lts-alpine
RUN apk add --update --no-cache \
      curl 
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

HEALTHCHECK --interval=1m --timeout=3s --start-period=15s \
  CMD curl -fs http://localhost:3000/healthcheck || exit 1

EXPOSE 3000
CMD [ "npm", "start" ]
