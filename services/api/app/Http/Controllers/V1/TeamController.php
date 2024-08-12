<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TeamResource;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TeamController extends Controller
{
    /**
     * Validate the incoming request.
     */
    protected function validateRequest(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string|max:1024',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): TeamResource
    {
        Gate::authorize('create', Team::class);

        $data = $this->validateRequest($request);
        $team = Team::create($data);

        $user = User::find(auth()->user()->id);
        $user->assignRole($team->ownerRole());

        return new TeamResource($team);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Team $team): TeamResource
    {
        Gate::authorize('view', $team);

        return new TeamResource($team);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team): TeamResource
    {
        Gate::authorize('update', $team);

        $data = $this->validateRequest($request);
        $team->update($data);

        return new TeamResource($team);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {}
}
