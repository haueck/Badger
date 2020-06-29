FROM node:12-buster-slim

ADD client/components /client/components
ADD client/plugins /client/plugins
ADD client/images /client/images
ADD client/tests /client/tests
ADD client/html /client/html
ADD client/js /client/js
ADD client/webpack.config.js /client/
ADD client/package.json /client/
ADD client/package-lock.json /client/
ADD server/certificates/badger-sett.com /server/certificates
ADD server/tests /server/tests
ADD server/js /server/js
ADD server/package.json /server/
ADD server/package-lock.json /server/
WORKDIR /client
RUN npm install
RUN npm run-script eslint
RUN npm run build
RUN npm test
RUN npm run compress
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
