FROM node:20-alpine AS base

##############################################################
# runner                                                       #
##############################################################
FROM base AS runner
WORKDIR /app

# arguments
ARG APP_PATH

# add nodejs user and group (because we don't want to run as root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

# copy output from builder
COPY ./${APP_PATH}/.output/ /app/

# run
CMD ["node", "server/index.mjs"]
EXPOSE 4000