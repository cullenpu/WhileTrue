FROM node:14

ARG PORT
ARG MAGIC_SECRET_KEY
ARG REACT_APP_MAGIC_PUBLISHABLE_KEY

WORKDIR /main

COPY . .

RUN npm run install-all

RUN npm run build

ENV NODE_ENV production

EXPOSE $PORT

CMD ["npm", "run", "start"]