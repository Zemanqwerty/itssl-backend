FROM --platform=linux/amd64 node:18
WORKDIR /usr/app
COPY package.json .
RUN npm install
RUN rm -r node_modules
RUN npm i --save
EXPOSE 3001:3000
COPY . .