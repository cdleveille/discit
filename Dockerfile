# syntax = docker/dockerfile:1

# use bun image for throw-away build stage
FROM oven/bun:latest AS build

WORKDIR /app

# install packages needed to build dependencies
RUN apt-get update -qq
RUN apt-get install -y build-essential pkg-config python-is-python3

# copy application code
COPY --link bun.lock package.json ./
COPY --link . .

# install dependencies, lint project, build frontend, and compile backend
RUN bun install --ignore-scripts --frozen-lockfile
RUN bun run biome ci .
RUN --mount=type=secret,id=API_KEY \
    API_KEY="$(cat /run/secrets/API_KEY)" bun run build:prod
RUN bun run compile

# minimalist final stage for app image
FROM gcr.io/distroless/base

# copy built application
COPY --from=build /app/main /app/main
COPY --from=build /app/public /app/public

WORKDIR /app

# start the server
EXPOSE 3000
ENTRYPOINT ["./main"]
