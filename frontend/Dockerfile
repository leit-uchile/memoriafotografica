# Development Layer
FROM node:12.18.3-alpine3.12 as dev
WORKDIR /app/frontend
COPY package.json /app/frontend
RUN npm install --silent
RUN npm install env-cmd

# Temporal fix (Static URL not working cuz breaking change on css-loader 3.0)
# See https://github.com/facebook/create-react-app/issues/9870
COPY webpack.config.js /app/frontend/node_modules/react-scripts/config/webpack.config.js
# This is a secret file that gets ciphered multiple times
COPY .env-cmdrc /app/frontend/.env-cmdrc

COPY . ./
EXPOSE 3000

CMD ["npm", "run", "start"]

# Production Layers
FROM dev as prod
RUN npm run-script build

FROM nginx:stable-alpine
# Copy stuff for nginx
COPY --from=prod /app/frontend/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]