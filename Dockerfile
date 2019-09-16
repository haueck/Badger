FROM node:12-buster

WORKDIR /badger
RUN apt-get update && apt-get dist-upgrade -y && apt-get install -y dumb-init
ADD src ./src
ADD scripts ./scripts
ADD images ./images
ADD package.json webpack.config.js ./
RUN npm install
RUN npm run build
RUN npm test
RUN npm run-script eslint
CMD [ "dumb-init", "node", "--experimental-modules", "src/server/main.mjs" ]
