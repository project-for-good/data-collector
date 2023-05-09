FROM node:18

RUN apt-get update \
    && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
    libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
    libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 \
    libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation fonts-noto \
    hicolor-icon-theme \
    && rm -rf /var/lib/apt/lists/* \
    && export NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

# Install dependencies
COPY src/ ./src/
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Configura la variable de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# Instala Chromium
RUN apt-get install -yq chromium-browser

EXPOSE 80

CMD ["npm", "start"]
