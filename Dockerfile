FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev dependencies for tests)
RUN npm ci

# Install Playwright browsers (they might not be in the base image)
RUN npx playwright install

# Copy everything else
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]