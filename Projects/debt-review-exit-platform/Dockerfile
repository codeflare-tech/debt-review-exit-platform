# ============================================================
# Dockerfile — Debt Review Exit Platform (Next.js 16)
# Standard Next.js production build for render.com web service
# ============================================================
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies (devDependencies needed for build)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy only what's needed for production
# (next start serves from .next; node_modules has production deps only)
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/prisma/migrations ./prisma
COPY --from=base /app/.next ./.next
COPY --from=base /app/next.config.ts ./
COPY --from=base /app/next-env.d.ts ./

# Create uploads directory for document storage
RUN mkdir -p uploads

# Set environment variables from Render secrets (never hardcoded)
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
ENV SESSION_SECRET=${SESSION_SECRET}
ENV CSRF_SECRET=${CSRF_SECRET}
ENV APP_ORIGIN=${APP_ORIGIN}
ENV PAYMENT_WORKFLOW_APPROVED=${PAYMENT_WORKFLOW_APPROVED}
ENV TWO_FACTOR_ENABLED=${TWO_FACTOR_ENABLED}
ENV ATOMICMAIL_EMAIL=${ATOMICMAIL_EMAIL}
ENV ATOMICMAIL_API_KEY=${ATOMICMAIL_API_KEY}
ENV MALWARE_SCANNER=${MALWARE_SCANNER}

# Render assigns $PORT dynamically — honor it
ENV PORT=${PORT:-3000}
EXPOSE $PORT

# Start the Next.js production server
CMD ["npm", "run", "start"]
