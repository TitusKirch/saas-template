<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UsersMeResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display the specified user.
     */
    public function show(Request $request, User $user): UserResource
    {
        if ($request->user()->cannot('view', $user)) {
            abort(403);
        }

        return new UserResource($user);
    }

    /**
     * Display the current user.
     */
    public function showMe(): UsersMeResource
    {
        return new UsersMeResource(auth()->user());
    }
}