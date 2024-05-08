FROM node:20-alpine AS base

##############################################################
# builder                                                    #
##############################################################
FROM base AS builder
# check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# arguments
ARG APP_NAME

# disable turborepo telemetry
ENV TURBO_TELEMETRY_DISABLED=1

# install turbo and prune the package
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune ${APP_NAME} --docker

##############################################################
# installer                                                  #
##############################################################
# add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# arguments
ARG APP_NAME

# first install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules/ ./node_modules
RUN corepack enable
RUN pnpm install --frozen-lockfile --recursive --prefer-offline

# build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

# disable turborepo telemetry
ENV TURBO_TELEMETRY_DISABLED=1

# mount secrets to env and build the package
RUN --mount=type=secret,id=NUXT_UI_PRO_LICENSE \
  NUXT_UI_PRO_LICENSE=$(cat /run/secrets/NUXT_UI_PRO_LICENSE) \
  pnpm dlx turbo run build --filter=${APP_NAME}

##############################################################
# runner                                                     #
##############################################################
FROM base AS runner
WORKDIR /app

# arguments
ARG APP_PATH

# add nodejs user and group (because we don't want to run as root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

# copy the built package
COPY --from=installer /app/${APP_PATH}/.output .

# run the package
CMD node server/index.mjs