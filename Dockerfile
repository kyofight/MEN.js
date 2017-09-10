# Build:
# docker build -t pet/mean .
#
# Run:
# docker run -it pet/mean
#
# Compose:
# docker-compose up -d

FROM ubuntu:latest
MAINTAINER Kyo

EXPOSE 8080

# Set development environment as default
ENV NODE_ENV development

# Install Utilities
RUN apt-get update -q  \
 && apt-get install -yqq \
 curl \
 git \
 ssh \
 gcc \
 make \
 build-essential \
 libkrb5-dev \
 sudo \
 apt-utils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Prerequisites
RUN npm install --quiet -g gulp bower mocha pm2 cross-env

RUN mkdir -p /opt/pet
WORKDIR /opt/pet

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Install npm packages
COPY package.json /opt/pet/package.json
RUN npm install --quiet

COPY . /opt/pet

# Run pet server
CMD npm install && npm start
