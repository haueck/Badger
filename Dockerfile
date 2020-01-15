FROM node:12-buster-slim

ADD client /client
ADD server /server
WORKDIR /client
RUN npm install
RUN npm run-script eslint
RUN npm run build
RUN npm test
WORKDIR /server
RUN npm install
RUN npm run-script eslint
RUN npm test

FROM node:12-buster-slim

RUN apt-get update && apt-get dist-upgrade -y && apt-get install -y dumb-init
WORKDIR /badger
COPY --from=0 /client/dist /badger/dist
COPY --from=0 /server/node_modules /badger/node_modules
COPY --from=0 /server/certificates /badger/certificates
COPY --from=0 /server/js /badger/js
CMD [ "dumb-init", "node", "--experimental-modules", "js/main.mjs" ]
