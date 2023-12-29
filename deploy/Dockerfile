# Stage 1: Build the application
# Use specific version
# Use alpine for smaller base image

FROM node:20-alpine3.18 AS build


#Specify working directory for application
WORKDIR /usr/app


COPY package.json .

RUN npm i -g --ignore-scripts pnpm@8.11.0
RUN pnpm install
COPY . .

# Run your build script and generate artifacts in /usr/app/build
RUN pnpm run build


# Stage 2: Run the application
FROM node:20-alpine3.18

WORKDIR /usr/app

# set production environment
ENV NODE_ENV production


# copy build files from build stage
COPY --from=build /usr/app .

# Copy necessary files
COPY  --from=build /usr/app/package.json .
COPY --from=build /usr/app/.env .

# Use chown command to set file permissions
RUN chown -R node:node /usr/app


# Install production dependencies only
RUN npm i -g --ignore-scripts pnpm@8.11.0 && pnpm install


# Use non root user
USER node

EXPOSE 3002

CMD ["pnpm","run", "start:prod"]
