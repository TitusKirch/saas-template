<?php

use Illuminate\Support\Facades\Schedule;

// health checks
Schedule::command(\Spatie\Health\Commands\DispatchQueueCheckJobsCommand::class)->everyMinute();
Schedule::command(\Spatie\Health\Commands\RunHealthChecksCommand::class)->everyMinute();
Schedule::command(\Spatie\Health\Commands\ScheduleCheckHeartbeatCommand::class)->everyMinute();

// telescope (development only)
Schedule::command('telescope:prune --hours=48')->daily();
