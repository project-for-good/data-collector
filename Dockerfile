FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

# Install dependencies
COPY src/ ./src/
COPY package*.json ./
RUN npm install

COPY . .

# Configura la variable de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH node_modules/puppeteer/chromium-browser

EXPOSE 80

CMD ["npm", "start"]
