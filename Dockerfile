FROM node:16

# Create app directory
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install app dependencies
RUN npm install forever -g \
    && npm install

CMD [ "npm", "start" ]