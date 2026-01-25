FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install Playwright browsers (already in the image, but ensures they are ready)
RUN npx playwright install --with-deps

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "--force"]
