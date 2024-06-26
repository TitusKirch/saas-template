<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use Laravel\Pennant\Feature;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return FeatureResource::collection(collect(Feature::all())->map(static function ($value, $key) {
            // create pseudo object
            return (object) [
                'name' => $key,
                'value' => $value,
            ];
        })->values()->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name): FeatureResource
    {
        if (! array_key_exists($name, Feature::all())) {
            abort(404);
        }

        return new FeatureResource((object) [
            'name' => $name,
            'value' => Feature::value($name),
        ]);
    }
}
