# --- Base Image (all other images are based off this one) ---------------------
FROM node:12.18.3-alpine AS base

# Set working directory.
WORKDIR /var/service

# Perform an upgrade to get all the latest security updates
RUN apk upgrade --no-cache

# --- Setup Stage (image contains NPM credentials, should not be pushed) -------
FROM base AS setup

# Install packages required for building native node modules with node-gyp and
# also add curl and bash for docker-compose.
RUN apk add --no-cache python make g++ curl bash

# Copying only required files for install command (.npmrc needed for scoped packages)
COPY package.json yarn.lock ./

# Copy over other files needed to run the service.
# COPY tsconfig.json config.default.json openapi.yml ./
COPY config.ts tsconfig.json keystone.ts schema.ts schema.graphql schema.prisma ./

# Install all dev dependencies (used to build typescript, for docker-compose, etc)
RUN yarn install --frozen-lockfile

# --- Build Stage (image contains NPM credentials, should not be pushed) -------
FROM setup AS builder

RUN yarn build

# Removing `.npmrc`, tsconfig and source files as the last step
RUN rm -rf tsconfig*.json .npmrc src

# --- Final Image --------------------------------------------------------------
FROM base

# Copy over everything we've built from the previous image.
COPY --chown=node:node --from=builder /var/service /var/service

# Switch to the `node` user.
USER node

EXPOSE 8080

# Set default execution command.
CMD yarn start

