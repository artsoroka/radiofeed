FROM node:9.2.0-alpine

WORKDIR /usr/src/radiofeed

COPY . . 

# Since NPM is run as a root, an extra parameter should be added 
#https://stackoverflow.com/questions/18136746/npm-install-failed-with-cannot-run-in-wd
#https://github.com/nodejs/docker-iojs/issues/72
RUN npm install --unsafe-perm

CMD ["node", "parser.js"]
