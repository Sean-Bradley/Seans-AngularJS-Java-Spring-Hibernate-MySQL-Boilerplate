FROM node:8.1.2-alpine

LABEL https://github.com/Sean-Bradley

RUN mkdir -p /nodejs
COPY . /nodejs
WORKDIR /nodejs

RUN npm install

EXPOSE 8080:8080
