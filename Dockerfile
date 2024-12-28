FROM node:alpine AS base

ENV DIR /project

WORKDIR ${DIR}

# =======================================================
FROM base AS dev

COPY package*.json ${DIR}
COPY tsconfig*.json ${DIR}
COPY src ${DIR}/src
COPY .env ${DIR}

RUN npm install

ENV NODE_ENV=development

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

# =======================================================
FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json ${DIR}
COPY tsconfig*.json ${DIR}
COPY src ${DIR}/src
COPY .env ${DIR}

RUN npm ci
RUN npm run build && npm prune --production

# =======================================================
FROM base AS production

ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build ${DIR}/node_modules ${DIR}/node_modules
COPY --from=build ${DIR}/build ${DIR}/build
COPY --from=build ${DIR}/.env ${DIR}/.env

ENV NODE_ENV=production

EXPOSE ${PORT}

USER ${USER}

CMD ["dumb-init", "node", "build/main.js"]
