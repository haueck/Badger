FROM node:10-stretch

#RUN apt-get update && apt-get dist-upgrade -y && apt-get install -y vim
WORKDIR /badger
ADD src ./src
ADD package.json webpack.config.js ./
RUN npm install && npm run build
CMD [ "node", "src/js/server.js" ]
