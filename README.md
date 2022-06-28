#Base project

### Configuration
Configuration files (.env) are project and package specific.

##### Project
Project configuration has the configuration for spinning up the docker dependencies.

For dev environment you can use this one:

```
DB_PORT=3306
DB_USER=db_user
DB_PASSWORD=db_password
DB_DATABASE=db_database
```

For e2e environment you can set this one:
```
DB_PORT=3306
DB_USER=db_user
DB_PASSWORD=db_password
DB_DATABASE=db_database

BACKEND_PORT=3001
```

#### Package
This configuration is related specifically to each project. It goes to the root of each package.

For backend package you can use:
```
APP_PORT=3001
APP_HOST=http://localhost
APP_JWT_KEY=secret
APP_ENCRYPTION_KEY=rPGL/acJe6f5CmCGn05bec6oS2+jmyFnHFIwZblZCgE=
APP_ENABLE_SWAGGER=1
APP_ENABLE_CORS=1

DB_HOST=db # Change this to "localhost" if you are running in dev mode (not dockerized backend)
DB_PORT=3306
DB_USER=db_user
DB_PASSWORD=db_password
DB_DATABASE=db_database
```

For frontend package you can use:
```
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_NAME=$npm_package_name
```

### Running on dev

To start the frontend and the backend packages all together
```
yarn install
yarn bootstrap
yarn start
```

### Running e2e

End to end test start backend, frontend and http proxy containers all together to simulate production environment.
Before running tests you must be sure that you have all the other containers of the project stoped by running
```
yarn docker:stop
```
Then you start the e2e environment and run the tests
```
yarn test:e2e
```


### Docker helpers

 There's a set of npm scripts that are used to interact with docker environments.

Start and stop docker containers: `yarn docker:(start|stop):(dev|prod|e2e)`

Clean docker containers with its data: `yarn docker:clean`
