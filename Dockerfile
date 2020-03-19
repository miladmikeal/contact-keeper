FROM node:12-slim

ENV NODE_ENV=production
EXPOSE 5000
WORKDIR /app
COPY package*.json ./
RUN npm config list
RUN npm ci && npm cache clean --force
RUN npm install
COPY . .
ENV PATH /app/node_modules/.bin:$PATH
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
CMD ["node", "server"]
USER node