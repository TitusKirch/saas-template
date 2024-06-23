<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthProviderController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'index'])->name('app.index');
Route::get('/debug', [AppController::class, 'debug'])->name('app.debug');
Route::get('/health', \Spatie\Health\Http\Controllers\HealthCheckResultsController::class)->name('health');
Route::get('/health/json', \Spatie\Health\Http\Controllers\HealthCheckJsonResultsController::class)->name('health.json');

Route::get('/auth/provider/{provider}', [AuthProviderController::class, 'redirectToProvider'])->name('auth.provider.redirect');
Route::get('/auth/provider/{provider}/callback', [AuthProviderController::class, 'handleProviderCallback'])->name('auth.provider.callback');

Route::group([
    'prefix' => 'v1',
], function () {

    Route::group([
        'middleware' => ['auth:sanctum'],
    ], function () {
        Route::get('/users/me', [UserController::class, 'showMe']);
        Route::apiResource('/users', UserController::class);
    });

    Route::get('/features', [FeatureController::class, 'index']);
    Route::get('/features/{name}', [FeatureController::class, 'show']);
});
