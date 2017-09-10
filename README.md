# UNDER DEVELOPMENT

Please follow the instruction on this page to setting up the API

# Prerequisite
1. node 8.2
2. mongodb 3.2
3. copy /app/config/local.example.js to /app/config/local.js, and modify the setting if needed 

# Bootstrap
1. sudo
2. npm i -g pm2
3. npm i -g gulp
4. npm i -g cross-env
5. npm i
6. npm run test
7. npm run apidoc
8. npm run start


# Docker
1. install docker
2. switch to project root directory
3. docker-compose up -d

To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
