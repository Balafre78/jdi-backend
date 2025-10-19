FROM node:20-alpine

WORKDIR /app

COPY package.json tsconfig.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY ./src ./src

RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]