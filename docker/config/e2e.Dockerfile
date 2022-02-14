FROM cypress/included:9.4.1

COPY ["package.json", "yarn.lock", ".npmrc", "./"]

RUN yarn

COPY ["cypress.json", "./"]

CMD ["cypress run" ]
