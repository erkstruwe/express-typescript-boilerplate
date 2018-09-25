FROM node:10
EXPOSE 3000
COPY . /app
WORKDIR /app
RUN npm install --production --unsafe-perm
CMD ["npm", "start"]
