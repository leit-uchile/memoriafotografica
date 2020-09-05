# Development Layer
FROM node:12.18.3-alpine3.12 as dev
WORKDIR /app/frontend
COPY package.json /app/frontend
COPY .env-cmdrc /app/frontend/.env-cmdrc
RUN npm install --silent
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