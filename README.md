# Cash Float Visualiser for Waitrose & Partners 619
[Robyn F H Veitch](https://robynveitch.com/) © 2021 / 2022

https://lucky-melted-kettle.glitch.me/

A system to track and visualise till and repository cash levels over time for the purposes of monitoring cash flow, optimising stock levels and reducing risk. 

Not officially associated with or comissioned by Watirose & Partners.

## Installation
```
$ git clone https://github.com/Oddert/wr-float-denomination-tracker.git
$ cd wr-float-denomination-tracker
$ npm run install:all
```
## Development
```
$ npm run dev
```
## Deployment
```
$ npm build
$ npm start
```

## Scripts
| script | command | action
|--------|---------|----------|
| install:production | npm i --production | Installs NPM packages for production deployment | 
| install:all | npm run install:server && npm run install:client | Installs NPM packages for both the client development environment and the server | 
| install:server | npm i | Installs the server development packages | 
| install:client | cd client && npm i | Installs the client development packages |
| prestart | npm run build | Builds the client, deploys it and compiles the server |
| start | cd dist/js && node index.js | Starts the server for production |
| development | npm run dev | Runs the server and client development environments |
| dev | concurrently \"npm run ts:watch\" \"npm run server:auto_restart\" \"npm run client:dev\" | Runs the server and client development environments |
| test | npm run build && mocha dist/js/test/**/*.test.js --exit | Runs server-side tests |
| test:forceunlock | npm run build && npm run db:migrate:unlock && mocha dist/js/test/**/*.test.js --exit | Runs server-side tests after unlocking the migration tables |
| test:watch | npm run build && mocha -w dist/js/test/integration/routes.auth.test.js | Runs the server-side tests in watch mode |
| prebuild | tslint -c tslint.json -p tsconfig.json --fix | Runs the ts linter before building |
| build | npm run server:build && npm run client:build && npm run db:build | Runs the build scripts for the client and server |
| ts | tsc | Compiles the srever-side typescript |
| ts:watch | tsc -w | Compiles the srever-side typescript in watch mode |
| server:auto_restart | nodemon dist/js/index.js | Starts the server in watch mode to auto-restart |
| server:dev | concurrently \"npm run ts:watch\" \"npm run server:auto_restart\" | Runs the server development environment |
| server:build | npm run ts | Builds the server |
| client:dev | cd client && npm run start | Runs the client development environment |
| client:build | cd client && npm run build && cp -r build ../dist/build | Builds the client and deploys it to the server |
| db:migrate:latest | cd dist/js && knex migrate:latest | Migrates the database |
| db:migrate:rollback | cd dist/js && knex migrate:rollback | Rolls back the database |
| db:migrate:unlock | cd dist/js && knex migrate:unlock | Unlocks the database migration table |
| db:seed | cd dist/js && knex seed:run | Seeds the database |
| db:build | touch dist/js/db/wr-float-denomination-tracker.db3 && npm run db:migrate:latest && npm run db:seed" | Builds the database |

# Stack

## Front End
react, react-redux, react-router (hash router), emotion (styled components), react icons, chakra, cypress, react testing library, 

## Back End
objection, knex, docker, mysql, passport

## Both
typescript

---
# Todo
- investigate again https://reactdatepicker.com/
- investigate https://medium.com/john-lewis-software-engineering/consumer-driven-contract-testing-a-scalable-testing-strategy-for-microservices-3f2b09f99ed1
- ref https://openbase.com/js/react-vis