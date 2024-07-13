<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Health\Health;
use Spatie\Health\Http\Controllers\HealthCheckJsonResultsController;
use Spatie\Health\Http\Controllers\HealthCheckResultsController;
use Spatie\Health\ResultStores\ResultStore;

class HealthController extends Controller
{
    /**
     * Display the health page.
     */
    public function index(Request $request, ResultStore $resultStore, Health $health): \Illuminate\Http\JsonResponse|\Illuminate\View\View
    {
        return app(HealthCheckResultsController::class)($request, $resultStore, $health);
    }

    /**
     * Display the health page in json format.
     */
    public function json(Request $request, ResultStore $resultStore): \Illuminate\Http\Response
    {
        return app(HealthCheckJsonResultsController::class)($request, $resultStore);
    }
}
