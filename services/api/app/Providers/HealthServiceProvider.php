<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Health\Checks\Checks\CacheCheck;
use Spatie\Health\Checks\Checks\DatabaseCheck;
use Spatie\Health\Checks\Checks\DebugModeCheck;
use Spatie\Health\Checks\Checks\EnvironmentCheck;
use Spatie\Health\Checks\Checks\HorizonCheck;
use Spatie\Health\Checks\Checks\MeiliSearchCheck;
use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Checks\Checks\PingCheck;
use Spatie\Health\Checks\Checks\QueueCheck;
use Spatie\Health\Checks\Checks\RedisCheck;
use Spatie\Health\Checks\Checks\ScheduleCheck;
// use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Checks\Checks\UsedDiskSpaceCheck;
use Spatie\Health\Facades\Health;

// use Spatie\SecurityAdvisoriesHealthCheck\SecurityAdvisoriesCheck;

class HealthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        Health::checks([
            CacheCheck::new(),
            // DatabaseCheck::new()->name('database:horizon')->connectionName('horizon'),
            DatabaseCheck::new()->name('database:default'),
            DatabaseCheck::new()->name('database:pulse')->connectionName('pulse'),
            DatabaseCheck::new()->name('database:telescope')->connectionName('telescope'),
            DebugModeCheck::new(),
            EnvironmentCheck::new(),
            // HorizonCheck::new(),
            // MeiliSearchCheck::new(),
            OptimizedAppCheck::new(),
            PingCheck::new()->name('ping:cloudflare')->url('https://cloudflare.com'),
            PingCheck::new()->name('ping:google')->url('https://google.com'),
            QueueCheck::new(),
            // RedisCheck::new()->connectionName('horizon')->name('redis:horizon'),
            RedisCheck::new()->name('redis:default'),
            RedisCheck::new()->name('redis:pulse')->connectionName('pulse'),
            ScheduleCheck::new()->heartbeatMaxAgeInMinutes(2),
            UsedDiskSpaceCheck::new()->warnWhenUsedSpaceIsAbovePercentage(90)->failWhenUsedSpaceIsAbovePercentage(95),
        ]);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
