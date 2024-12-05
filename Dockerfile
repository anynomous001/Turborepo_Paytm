FROM node:20

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages


# RUN npm install -g @next/swc-linux-x64-gnu
RUN npm install
RUN cd packages/db && npx prisma generate && cd ../..

RUN npm run build --filter=user-app

CMD [ "npm","run","start-user-app" ]

