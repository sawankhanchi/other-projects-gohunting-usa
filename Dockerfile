FROM node:14.15.3

WORKDIR /var/www/html/gohuntingusa

COPY ./ ./

RUN npm run build

COPY ./ ./




CMD ["npm", "start"]
