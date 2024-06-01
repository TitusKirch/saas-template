<?php

use Illuminate\Support\Facades\Schedule;

// horizon
Schedule::command('horizon:snapshot')->everyFiveMinutes();

// health checks
Schedule::command(\Spatie\Health\Commands\DispatchQueueCheckJobsCommand::class)->everyMinute();
Schedule::command(\Spatie\Health\Commands\RunHealthChecksCommand::class)->everyMinute();
Schedule::command(\Spatie\Health\Commands\ScheduleCheckHeartbeatCommand::class)->everyMinute();

// telescope (development only)
Schedule::command('telescope:prune --hours=48')->daily();
