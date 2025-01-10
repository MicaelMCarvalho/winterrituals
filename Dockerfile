FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --legacy-peer-deps
RUN npm install --save-dev @types/cors @types/bcrypt @types/jsonwebtoken --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --legacy-peer-deps --production
RUN npm install --save-dev @types/cors @types/bcrypt @types/jsonwebtoken --legacy-peer-deps

COPY --from=builder /app/build ./build
COPY --from=builder /app/server ./server
COPY --from=builder /app/src ./src

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
