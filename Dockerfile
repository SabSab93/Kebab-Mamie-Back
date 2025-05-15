# Utilise une image Node légère
FROM node:20-alpine

# Crée et positionne le dossier de travail
WORKDIR /app

# Copie uniquement les fichiers de dépendances, puis installe
COPY package*.json ./
RUN npm install

# Copie le code source et le schema Prisma
COPY . .

# Génère le client Prisma et compile ton TS dans /dist
RUN npx prisma generate
RUN npx tsc

# Expose le port 3000
EXPOSE 3000

# Démarre l'app compilée (build -> dist/index.js)
CMD ["node", "dist/index.js"]