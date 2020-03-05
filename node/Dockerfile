FROM node:12.16.1-alpine

USER node

EXPOSE 4200

RUN mkdir /home/node/.npm-globaln

ENV PATH=/home/node/.npm-global/bin:$PATH

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV HOME=/home/node

WORKDIR /frontend

RUN npm i -g npm

RUN npm install -g @angular/cli && npm cache clean --force

CMD [ "node" ]