FROM amd64/node:18

# Set this new directory as our working directory for subsequent instructions
WORKDIR /app

# Copy all files in the current directory into the container
COPY . .

# Install 'serve', a static file serving package globally in the container
RUN npm install -g serve

# Install all the node modules required by the React app
RUN npm install
# Build the React app
RUN npm run build

# Serve the 'build' directory on port using 'serve'
CMD serve -s -l $PORT ./build