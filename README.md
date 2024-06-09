# saas-template

The saas-template is a template for building SaaS applications. It combines the capabilities of Laravel and Nuxt in a unified repository and accelerates the development of web applications. Seamlessly integrates the back-end reliability of Laravel with the front-end agility of Nuxt. Ideal for rapid prototyping and deployment.

## General

To manage the repository, it uses the pnpm package manager and turborepo.

It comes with a set of pre-configured packages and apps that can be used to build a SaaS application. The template is designed to be flexible and can be customized to suit the needs of the project.

It has the workflow jobs to build docker images and push them to the GitHub Container Registry. It also has workflow jobs to deploy the apps to the Cloudflare Pages and the services to the Laravel Forge.

## Structure

The repository is structured as follows:

- `apps` - Contains the Nuxt apps.
- `packages` - Contains the packages that will be used by the apps, services and scripts.
- `scripts` - Contains the scripts that will be used to manage the repository or other utilities.
- `services` - Contains the Laravel services.

## Prerequisites

To use the template, you need to have the following installed:

- [Node.js v20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [PHP v8+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Docker](https://www.docker.com/)

### GitHub Actions

You need to set the following secrets in the GitHub repository.

#### Actions secrets and variables

- `CLOUDFLARE_ACCOUNT_ID` - The Cloudflare account ID.
- `CLOUDFLARE_API_TOKEN` - The Cloudflare API token.
- `CLOUDFLARE_PAGES_PROJECT_NAME_APP_BLOG` - The Cloudflare Pages project name for the app-blog.
- `CLOUDFLARE_PAGES_PROJECT_NAME_APP_WEB` - The Cloudflare Pages project name for the app-web.
- `DEV_SERVICE_API_LARAVEL_FORGE_TRIGGER_URL` - The Laravel Forge trigger URL for the dev environment.
- `STAGE_SERVICE_API_LARAVEL_FORGE_TRIGGER_URL` - The Laravel Forge trigger URL for the stage environment.
- `PROD_SERVICE_API_LARAVEL_FORGE_TRIGGER_URL` - The Laravel Forge trigger URL for the prod environment.
- `NUXT_UI_PRO_LICENSE` - The Nuxt UI Pro license key (opt-out if not using Nuxt UI Pro).
- `FORMKIT_PRO_KEY` - The FormKit Pro key (opt-in if using FormKit Pro (search for `#NOTE: FORMKIT PRO` in the code)).

#### Dependabot secrets

- `NUXT_UI_PRO_LICENSE` - The Nuxt UI Pro license key (opt-out if not using Nuxt UI Pro).
- `FORMKIT_PRO_KEY` - The FormKit Pro key (opt-in if using FormKit Pro (search for `#NOTE: FORMKIT PRO` in the code)).

### Cloudflare Pages

You need to create a Cloudflare page per app and set the following environment variables.

- `NUXT_UI_PRO_LICENSE` - The Nuxt UI Pro license key (opt-out if not using Nuxt UI Pro).
- `FORMKIT_PRO_KEY` - The FormKit Pro key (opt-in if using FormKit Pro (search for `#NOTE: FORMKIT PRO` in the code)).

### Laravel Forge

You need to create a Laravel Forge site per service and environment. You must set the Web Directory in the settings to the `public` directory of the service for example `services/api/public`.

#### Deploy script

Here is a working custom deploy script for the Laravel Forge site (replace the placeholders with the actual values).

```Shell
cd /home/{USER_NAME}/{SITE_NAME}
git pull origin $FORGE_SITE_BRANCH
cd services/{SERVICE_NAME}

$FORGE_COMPOSER install --no-dev --no-interaction --prefer-dist --optimize-autoloader

if [ -f artisan ]; then
    $FORGE_PHP artisan migrate --force
    $FORGE_PHP artisan config:cache
    $FORGE_PHP artisan route:cache

    ! $FORGE_PHP artisan octane:status || $FORGE_PHP artisan octane:reload
fi
```

You also need to manually set the deamon for the Octane server.

```Shell
directory=/home/{USER_NAME}/{SITE_NAME}/services/{SERVICE_NAME}/
command=php8.2 artisan octane:start --no-interaction --server=frankenphp --port={PORT}
```

## Installation

To install the template, run the following commands after cloning the repository:

```Shell
cd saas-template

cp .env.example .env
cp apps/blog/.env.example apps/blog/.env
cp apps/web/.env.example apps/web/.env
cp packages/app-base/.env.example packages/app-base/.env
cp services/api/.env.example services/api/.env
````

Update the `.env` files with the actual values and then run the following commands:

```Shell
pnpm install

cd services/api/
composer install
php artisan key:generate
cd ../..
```

## Develop

To develop all apps and packages, run the following command:

```Shell
pnpm dev
```

### dev.docker-compose.yml

To run all needed services locally, you can use the `dev.docker-compose.yml` file. You can run the following command to start the services:

```Shell
docker-compose -f dev.docker-compose.yml up
```

Below is a list of services you can access via browser.

| Service | URL | Description |
| --- | --- | --- |
| adminer | [http://localhost:8080](http://localhost:8080) | Database management tool. |
| redis-commander | [http://localhost:8081](http://localhost:8081) | Redis management tool. |
| mailpit | [http://localhost:8085](http://localhost:8085) | A simple SMTP server for development. |

## Linting and formatting

To lint and format all apps and packages, run the following command:

```Shell
pnpm lint
pnpm format
```

And to fix the linting and formatting issues, run the following command:

```Shell
pnpm lint:fix
pnpm format:fix
```

## Update dependencies

### Node dependencies

To see all available minor updates for the node dependencies, run the following command:

```Shell
pnpm taze
```

To update the node dependencies to the latest minor version, run the following command:

```Shell
pnpm taze:w
pnpm install
```

To see all available major updates for the node dependencies, run the following command:

```Shell
pnpm taze major
```

To update the node dependencies to the latest major version, run the following command:

```Shell
pnpm taze:w major
pnpm install
```

### PHP dependencies

To update the PHP dependencies, run the following command:

```Shell
cd services/api/
composer update --no-scripts
cd ../..
```

## Scripts

### @tituskirch/script-font-awesome-pro-to-iconify

To convert the Font Awesome Pro icons to Iconify icons, you download the Font Awesome Pro icons from the Font Awesome website and extract the zip file and place the `fontawesome-pro-\d+\.\d+\.\d+-web` directory in the `scripts/font-awesome-pro-to-iconify` directory.

Then run the following command to generate the Iconify icons:

```Shell
pnpm generate
```

After that you can copy the generated icons to the `@tituskirch/font-awesome-pro-iconify` package. For this you can run the following command:

```Shell
pnpm copy
```

After that you can remove the line `icons: ['fa6-solid'],` from `packages/app-base/nuxt.config.ts` and uncomment the lines below it. You can also uninstall the package `@iconify-json/fa6-solid` from `@tituskirch/app-base`. After that you can mass replace the `fa6-solid` with `fal` in the code.

## Features

### Localization

To add a new language to the backend you can run the following command (all available languages can be found [here](https://laravel-lang.com/available-locales-list.html)):

```Shell
cd services/api/
php artisan lang:add {LANGUAGE_CODE}
cd ../..
```

To update the translations you can run the following command:

```Shell
cd services/api/
php artisan lang:update
cd ../..
```

### Organization

To disable the organization feature, you can set `teams` to `false` inside of the `services/api/config/permission.php` file. You also want to remove the migrations with organization in the name and the migration `services/api/database/migrations/2024_05_15_115605_add_is_default_and_is_owner_to_roles_table.php`. After that you should be able to user this template with the remaining Organization features. If you want to remove the organization feature completely, you can search the code for `Organization` and remove the code/files or adjust the code to your needs.
