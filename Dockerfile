FROM node:latest

ADD . /code
WORKDIR /code

RUN \
  npm install -g nodemon bower && \
  npm install

EXPOSE 3000

CMD npm run develop

