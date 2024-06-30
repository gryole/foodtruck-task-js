FROM node:20-alpine3.19

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY package*.json ./
COPY yarn*.json ./
USER node
COPY --chown=node:node . .
RUN yarn install
RUN yarn run build
EXPOSE 5000
CMD ls
CMD [ "yarn", "serve_nix"]