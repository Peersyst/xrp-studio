FROM node:16.13.0
# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", ".npmrc", "./"]

RUN yarn

COPY . .

RUN ls -la
RUN cat package.json

RUN yarn build

CMD [ "./dist/src/main" ]
