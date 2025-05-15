FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate

# compile le TS sans script
RUN npx tsc

EXPOSE 3000
CMD ["npm", "run","dev"]