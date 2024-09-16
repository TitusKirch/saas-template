<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PermissionResource;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TeamPermissionMeController extends Controller
{
    /**
     * Display a listing of the resource for the authenticated user.
     */
    public function show(Request $request, Team $team): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('view', $team);

        return PermissionResource::collection(auth()->user()->getPermissionsViaRoles());
    }
}
