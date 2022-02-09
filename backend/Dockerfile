FROM node:12
# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", ".npmrc", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "./dist/src/main" ]
