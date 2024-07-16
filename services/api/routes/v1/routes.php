<?php

use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\AuthProviderController;
use App\Http\Controllers\V1\FeatureController;
use App\Http\Controllers\V1\HealthController;
use App\Http\Controllers\V1\UpController;
use App\Http\Controllers\V1\UserController;
use App\Http\Controllers\V1\UserMeController;
use App\Http\Middleware\ValidateSignature;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth',
    'as' => 'auth.',
], function () {
    Route::group([
        'middleware' => ['auth:sanctum'],
    ], function () {
        Route::post('/set-password', [AuthController::class, 'setPassword'])->name('set-password');
    });

    Route::group([
        'prefix' => 'providers',
        'as' => 'providers.',
        'middleware' => ['guest'],
    ], function () {
        Route::get('/{provider}/callback', [AuthProviderController::class, 'callback'])->name('callback');
        Route::get('/{provider}/redirect', [AuthProviderController::class, 'redirect'])->name('redirect');
    });

});

Route::group([
    'prefix' => 'features',
    'as' => 'features.',
], function () {
    Route::get('/', [FeatureController::class, 'index'])->name('index');
    Route::get('/{name}', [FeatureController::class, 'show'])->name('show');
});

Route::group([
    'prefix' => 'health',
    'as' => 'health.',
], function () {
    Route::get('/', [HealthController::class, 'index'])->name('index');
    Route::get('/json', [HealthController::class, 'json'])->name('json');
});

Route::group([
    'prefix' => 'up',
    'as' => 'up.',
], function () {
    Route::get('/', [UpController::class, 'index'])->name('index');
});

Route::group([
    'prefix' => 'users',
    'as' => 'users.',
    'middleware' => ['auth:sanctum'],
], function () {

    Route::group([
        'prefix' => 'me',
        'as' => 'me.',
    ], function () {
        Route::get('/', [UserMeController::class, 'show'])->name('show');

        Route::group([
            'prefix' => 'avatar',
            'as' => 'avatar.',
        ], function () {
            Route::get('/', [UserMeController::class, 'showAvatar'])->name('show');

            Route::post('/presigned', [UserMeController::class, 'generatePresignedUrlForAvatarUpload'])->name('presigned');
            Route::put('/', [UserMeController::class, 'updateAvatar'])
                ->middleware(ValidateSignature::class)
                ->name('update');
        });
    });

    Route::get('/{user}', [UserController::class, 'show'])->name('show');
});
