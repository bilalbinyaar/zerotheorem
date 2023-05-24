FROM node:alpine3.16 as node_build
WORKDIR /app

COPY package.json .
# RUN npm install react-tradingview-widget --force

# RUN npm install lightweight-charts --force

RUN npm install --force --verbose

COPY build /app/build
# RUN npm run build

FROM nginx:1.23-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=node_build /app/build /usr/share/nginx/html
