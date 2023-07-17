FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn bootstrap:prod

RUN yarn build --scope=client

RUN cd ./packages/client && yarn link
RUN cd ./packages/server && yarn link client

RUN yarn build --scope=server

EXPOSE 3000
