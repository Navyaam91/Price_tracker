FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install   # ✅ installs vite and all deps

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]