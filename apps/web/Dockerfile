FROM node:20-alpine AS base

##############################################################
# builder                                                    #
##############################################################
FROM base AS builder
# check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune @repo/web --docker


##############################################################
# installer                                                  #
##############################################################
# add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# first install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules/ ./node_modules
RUN corepack enable
RUN pnpm install

# build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm dlx turbo run build --filter=@repo/web

##############################################################
# runner                                                     #
##############################################################
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs
COPY --from=installer /app/apps/web/.output .

CMD node server/index.mjs