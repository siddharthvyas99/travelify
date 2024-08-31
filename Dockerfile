# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app ./
RUN npm install --production
CMD ["npm", "start"]

EXPOSE 3000
