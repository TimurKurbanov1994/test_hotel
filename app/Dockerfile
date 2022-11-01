FROM node:18-alpine AS production

WORKDIR ./opt/app

COPY . .

RUN npm i

COPY src .

RUN npm run build

CMD ["node", "dist/main"]
