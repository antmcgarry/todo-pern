# Use the argument ENV_ARG with a default value of development
ARG ENV_ARG=development

# Base Image
FROM node:lts-alpine AS build


# Working Directory
WORKDIR /usr/app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the app source to the WORKDIR
COPY . .

# Compile TypeScript to JavaScript
RUN yarn run build

# Production Image
FROM node:lts-alpine

# Working Directory
WORKDIR /usr/app


# Copy compiled JavaScript from the build image
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/node_modules ./node_modules
# Copy package.json and yarn.lock from the build image
COPY --from=build /usr/app/package.json ./package.json
COPY --from=build /usr/app/yarn.lock ./yarn.lock
# Copy tsconfig.json from the build image
COPY --from=build /usr/app/tsconfig.json ./tsconfig.json 

# Expose the port that your app runs on
EXPOSE $PORT

# Set the environment from the build argument
ENV NODE_ENV=$ENV_ARG

# Command to run the application
CMD ["yarn", "start"]
