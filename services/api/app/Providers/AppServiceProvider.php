<?php

namespace App\Providers;

use App\Pagination\SimpleLengthAwarePaginator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as LengthAwarePaginatorContract;
use Illuminate\Filesystem\AwsS3V3Adapter;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;

class AppServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function register(): void
    {
        $this->app->alias(SimpleLengthAwarePaginator::class, LengthAwarePaginator::class);
        $this->app->alias(SimpleLengthAwarePaginator::class, LengthAwarePaginatorContract::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        AwsS3V3Adapter::macro('getClient', function () {
            /** @disregard P1014 Undefined property '$client' */
            return $this->client;
        });

        $this->guardDestructiveCommands();
        $this->defineGates();

        Feature::discover();
    }

    /**
     * Guard against destructive commands.
     */
    private function guardDestructiveCommands(): void
    {
        // prohibit some commands in production (especially destructive ones)
        DB::prohibitDestructiveCommands(app()->isProduction());
    }

    /**
     * Define gates.
     */
    private function defineGates(): void
    {
        // guard Laravel Pulse routes
        if (! app()->isLocal()) {
            Gate::define('viewPulse', static function ($user) {
                return $user->is_admin;
            });
        }
    }
}
