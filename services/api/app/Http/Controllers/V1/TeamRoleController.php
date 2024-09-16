<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\RoleResource;
use App\Models\Team;
use Illuminate\Support\Facades\Gate;

class TeamRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Team $team): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('view', $team);

        return RoleResource::collection($team->roles);
    }
}
