FROM node:9-alpine
COPY . /app
WORKDIR /app
RUN npm run build

FROM node:9-alpine
RUN npm install -g serve
COPY --from=0 /app/build /app
WORKDIR /app 
CMD ["serve", "-p 8080", "-s", "."]