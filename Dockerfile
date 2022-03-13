FROM node:16.14.0
COPY . /messager
ENV PORT=${PORT}
RUN npm i --prefix=/messager
EXPOSE ${PORT}
CMD npm run start --prefix=/messager 