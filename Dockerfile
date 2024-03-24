FROM --platform=linux/amd64 node:16-alpine as base

ARG NODE_ENV=staging
ARG APP_ENV
ARG NEXT_PUBLIC_APP_ENV=$APP_ENV
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV

WORKDIR /app
EXPOSE 3003
COPY ["./package*.json", "/app/"]

RUN yarn install --production=false --network-timeout 1000000
COPY . ./

FROM base AS development
CMD yarn dev

FROM base AS release
RUN yarn build

CMD yarn start
