<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Events\DiagnosingHealth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\View;

class UpController extends Controller
{
    /**
     * Display the up page.
     */
    public function index(): \Illuminate\Contracts\View\View
    {
        Event::dispatch(new DiagnosingHealth);

        return View::file(__DIR__.'/../../../../vendor/laravel/framework/src/Illuminate/Foundation/resources/health-up.blade.php');
    }
}
