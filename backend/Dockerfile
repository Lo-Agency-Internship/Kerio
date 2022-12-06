#Base image
FROM node:16-alpine

#Create app directory
WORKDIR /usr/src/app

#A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

#Install app dependencies
RUN yarn install
RUN yarn global add typeorm ts-node

#Bundle app source
COPY . .
ENV NODE_ENV production
#Creates a "dist" folder with the production build
RUN yarn build
EXPOSE 3001

##Start the server using the production build
CMD [ "node", "dist/main.js"]
