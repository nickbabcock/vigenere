FROM node

# Install zopfli for a better gzip
RUN apt-get update && apt-get install -y zopfli && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/vigenere
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN ./build.sh && \
  zopfli public/*.js public/*.css public/*.html

FROM nginx:stable-alpine
COPY --from=0 /usr/src/vigenere/public /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/conf.d/default.conf
