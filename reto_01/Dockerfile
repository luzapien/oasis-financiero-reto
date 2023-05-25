FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY angular-mongodb-app/ ./frontend/
RUN cd frontend && npm install @angular/cli && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY models/ ./models
COPY --from=ui-build /usr/src/app/frontend/dist ./frontend/dist
COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
