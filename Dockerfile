# Utilise l'image Node officielle
FROM node:20-alpine

# Crée le dossier de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le code
COPY . .

# Expose le port
EXPOSE 3000

# Commande pour lancer le serveur
CMD ["sh", "entrypoint.sh"]
