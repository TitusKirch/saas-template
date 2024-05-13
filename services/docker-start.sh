#!/usr/bin/env bash
set -e

role=${CONTAINER_ROLE:-app}
env=${APP_ENV:-production}

if [ "$env" != "local" ]; then
    echo "Caching configuration..."
    php artisan config:cache & php artisan route:cache && php artisan view:cache
fi

if [ "$role" = "app" ]; then
    php artisan pulse:check & php artisan octane:frankenphp --host=127.0.0.1 --port=8000
elif [ "$role" = "scheduler" ]; then
    echo "Running the scheduler..."
    php artisan pulse:check &
    while [ true ]
    do
        php artisan schedule:run --verbose --no-interaction &
        sleep 60
    done
elif [ "$role" = "queue" ]; then
    echo "Running the queue..."
    php artisan pulse:check & php artisan queue:work --verbose --tries=3 --timeout=90
elif [ "$role" = "pulse-worker" ]; then
    echo "Running the pulse worker..."
    php artisan pulse:check & php artisan pulse:work
else
    echo "Could not match the container role \"$role\""
    exit 1
fi