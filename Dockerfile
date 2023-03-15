FROM node:alpine3.16 as build
WORKDIR /app

COPY package.json .
# RUN npm install react-tradingview-widget --force

# RUN npm install lightweight-charts --force

RUN npm install --force --verbose

COPY . .
RUN npm run build

FROM nginx:1.23-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
