<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'index']);
Route::get('/debug', [AppController::class, 'debug']);

Route::group([
    'prefix' => 'v1',
    'middleware' => ['auth:sanctum'],
], function () {
    Route::get('/users/me', [UserController::class, 'showMe']);
    Route::apiResource('/users', UserController::class);
});
