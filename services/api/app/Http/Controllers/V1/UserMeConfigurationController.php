<?php

namespace App\Http\Controllers\V1;

use App\Enums\UserConfigurationContext;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserConfigurationResource;
use App\Models\UserConfiguration;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserMeConfigurationController extends Controller
{
    /**
     * Validate the incoming request.
     */
    public function validateRequest(Request $request): array
    {
        return $request->validate([
            'context' => 'required|enum:'.UserConfigurationContext::class,
            'key' => 'required|string',
            'value' => 'required|array',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return UserConfigurationResource::collection(auth()->user()->configurations);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, UserConfiguration $userConfiguration): UserConfigurationResource
    {
        if ($request->user()->cannot('view', $userConfiguration)) {
            abort(403);
        }

        return new UserConfigurationResource($userConfiguration);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): UserConfigurationResource
    {
        $data = $this->validateRequest($request);

        $userConfiguration = new UserConfiguration($data);
        $userConfiguration->user_id = auth()->user()->id;
        $userConfiguration->save();

        return new UserConfigurationResource($userConfiguration);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserConfiguration $userConfiguration): UserConfigurationResource
    {
        if ($request->user()->cannot('update', $userConfiguration)) {
            abort(403);
        }

        $data = $this->validateRequest($request);
        $userConfiguration->update($data);

        return new UserConfigurationResource($userConfiguration);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, UserConfiguration $userConfiguration): \Illuminate\Http\Response
    {
        if ($request->user()->cannot('delete', $userConfiguration)) {
            abort(403);
        }

        $userConfiguration->delete();

        return response()->noContent();
    }

    /**
     * Set the user configuration.
     */
    public function set(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $data = $request->validate([
            '*.context' => [
                'required',
                Rule::enum(UserConfigurationContext::class),
            ],
            '*.key' => 'required|string',
            '*.value' => 'required|array',
        ]);

        $user = auth()->user();

        // remove all existing configurations that are not in the new data (match by context and key)
        $user->configurations()->whereNotIn('context', collect($data)->pluck('context'))
            ->whereNotIn('key', collect($data)->pluck('key'))
            ->delete();

        // update or create the configurations
        foreach ($data as $item) {
            $user->configurations()->updateOrCreate(
                [
                    'context' => $item['context'],
                    'key' => $item['key'],
                ],
                [
                    'value' => $item['value'],
                ]
            );
        }

        return UserConfigurationResource::collection($user->configurations);
    }
}
