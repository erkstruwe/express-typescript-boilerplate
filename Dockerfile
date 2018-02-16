FROM node:8
ENV NPM_CONFIG_LOGLEVEL warn
EXPOSE 3000
COPY . /app
WORKDIR /app
RUN npm install --production --unsafe-perm
CMD ["npm", "start"]
