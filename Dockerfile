FROM node:14-alpine

WORKDIR app

COPY . .

RUN apk add --no-cache python3 build-base git \
    && npm install

CMD ["node", "."] 
