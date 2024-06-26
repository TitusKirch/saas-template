<?php

namespace App\Providers;

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
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
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
