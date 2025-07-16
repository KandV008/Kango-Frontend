# Use an official lightweight Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the full project
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port used by Vite preview (default is 4173)
EXPOSE 4173

# Run the preview server
CMD ["npm", "run", "preview", "--", "--host"]
