FROM node:16.14.0
COPY . /messager
RUN npm i
EXPOSE 3000
CMD npm run start --prefix=/messager