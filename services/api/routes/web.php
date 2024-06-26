<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthProviderController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', \Spatie\Health\Http\Controllers\HealthCheckResultsController::class)->name('health');
Route::get('/health/json', \Spatie\Health\Http\Controllers\HealthCheckJsonResultsController::class)->name('health.json');

Route::get('/auth/provider/{provider}', [AuthProviderController::class, 'redirectToProvider'])->name('auth.provider.redirect');
Route::get('/auth/provider/{provider}/callback', [AuthProviderController::class, 'handleProviderCallback'])->name('auth.provider.callback');

Route::post('/auth/set-password', [AuthController::class, 'setPassword']);

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
