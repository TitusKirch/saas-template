FROM dunglas/frankenphp AS base

##############################################################
# runner                                                     #
##############################################################
FROM base AS runner
WORKDIR /app

# install php extensions
RUN install-php-extensions \
  pcntl

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# arguments
ARG SERVICE_PATH
ARG SERVICE_NAME

# copy service files
COPY .gitignore .gitignore
COPY /${SERVICE_PATH}/ .

# install dependencies
RUN composer install --prefer-dist --no-scripts --no-progress --no-interaction

# run the SERVICE
ENTRYPOINT ["php", "artisan", "pulse:check", "&&", "php", "artisan", "octane:frankenphp"]