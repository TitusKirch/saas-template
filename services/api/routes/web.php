<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'v1',
    'as' => 'v1:',
], base_path('routes/v1/routes.php'));

// routes without as to avoid conflict with internal usage of named routes
Route::group([
    'prefix' => 'v1',
], base_path('routes/v1/fortify.php'));
