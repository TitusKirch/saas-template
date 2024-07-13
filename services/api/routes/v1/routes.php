<?php

use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\AuthProviderController;
use App\Http\Controllers\V1\FeatureController;
use App\Http\Controllers\V1\HealthController;
use App\Http\Controllers\V1\UpController;
use App\Http\Controllers\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth',
    'as' => 'auth:',
], function () {
    Route::group([
        'middleware' => ['auth:sanctum'],
    ], function () {
        Route::post('/set-password', [AuthController::class, 'setPassword'])->name('set-password');
    });

    Route::group([
        'prefix' => 'providers',
        'as' => 'providers:',
        'middleware' => ['guest'],
    ], function () {
        Route::get('/{provider}/redirect', [AuthProviderController::class, 'redirect'])->name('redirect');
        Route::get('/{provider}/callback', [AuthProviderController::class, 'callback'])->name('callback');
    });

});

Route::group([
    'prefix' => 'features',
    'as' => 'features:',
], function () {
    Route::get('/', [FeatureController::class, 'index'])->name('index');
    Route::get('/{name}', [FeatureController::class, 'show'])->name('show');
});

Route::group([
    'prefix' => 'health',
    'as' => 'health:',
], function () {
    Route::get('/', [HealthController::class, 'index'])->name('index');
    Route::get('/json', [HealthController::class, 'json'])->name('json');
});

Route::group([
    'prefix' => 'up',
    'as' => 'up:',
], function () {
    Route::get('/', [UpController::class, 'index'])->name('index');
});

Route::group([
    'prefix' => 'users',
    'as' => 'users:',
    'middleware' => ['auth:sanctum'],
], function () {
    Route::get('/me', [UserController::class, 'showMe'])->name('me');
    Route::get('/{user}', [UserController::class, 'show'])->name('show');
});
