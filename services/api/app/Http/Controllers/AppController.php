<?php

namespace App\Http\Controllers;

class AppController extends Controller
{
    /**
     * Return a hello world message.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'message' => 'Hello World!',
        ]);
    }
}
