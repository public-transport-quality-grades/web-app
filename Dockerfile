FROM node:10-alpine

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM node:10-alpine
RUN npm install -g serve@8.1.2
COPY --from=0 /app/build /app
WORKDIR /app 
CMD ["serve", "-l", "8080", "."]