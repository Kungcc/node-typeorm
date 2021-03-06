FROM node:16.5.0-alpine3.14 AS builder

WORKDIR /app

COPY . .

RUN rm -rf package-lock.json
RUN rm -rf .vscode
RUN rm -rf node_modules
RUN rm -rf dist

RUN npm install
RUN npm run build
RUN npm prune --production

FROM node:16.5.0-alpine3.14

WORKDIR /app

RUN TZ=Asia/Taipei && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    apk add -U tzdata

COPY --from=builder /app/ .
EXPOSE 3000

CMD ["npm","run","start"]
