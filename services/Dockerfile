FROM dunglas/frankenphp AS base

##############################################################
# runner                                                     #
##############################################################
FROM base AS runner
WORKDIR /app

# install php extensions
RUN install-php-extensions \
  pcntl \
  redis \
  pdo_pgsql

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# install top
RUN apt update && apt install -y procps

# arguments
ARG SERVICE_PATH
ARG SERVICE_NAME

# copy general files
COPY /${SERVICE_PATH}/../docker-start.sh /usr/local/bin/start
RUN chmod +x /usr/local/bin/start

# copy service files
COPY .gitignore .gitignore
COPY /${SERVICE_PATH}/ .

# install dependencies
RUN composer install --prefer-dist --no-scripts --no-progress --no-interaction

# run the SERVICE
CMD ["/usr/local/bin/start"]