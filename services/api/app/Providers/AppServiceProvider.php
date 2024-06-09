<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // prohibit some commands in production (especially destructive ones)
        DB::prohibitDestructiveCommands(app()->isProduction());

        // guard Laravel Pulse routes
        if (! app()->isLocal()) {
            Gate::define('viewPulse', static function ($user) {
                return $user->is_admin;
            });
        }
    }
}
