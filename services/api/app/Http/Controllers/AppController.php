<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;

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

    /**
     * Return a placeholder output for debugging purposes.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function debug()
    {
        $organization = Organization::create([
            'name' => 'Example Organization',
        ]);
        $newUser = User::factory()->create();

        $ownerRole = $organization->ownerRole();

        setPermissionsTeamId($organization->id);

        $newUser->assignRole($ownerRole);

        return response()->json([
            'organization' => $organization,
            'roles' => $organization->roles,
            'ownerRole' => $ownerRole,
            'defaultRole' => $organization->defaultRole(),
            'users' => $organization->users(),
        ]);
    }
}
