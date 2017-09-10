##### UNDER DEVELOPMENT #####

Please follow the instruction on this page to setting up the API

# Prerequisite
1. node 8.2
2. mongodb 3.2

# Bootstrap
sudo
npm i -g pm2
npm i -g gulp
npm i
npm run test
npm run apidoc
npm run start


# Docker
1. install docker
2. switch to project root directory
3. docker-compose up -d

To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
