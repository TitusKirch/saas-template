<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\UserMeResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user)
    {
        if ($request->user()->cannot('view', $user)) {
            abort(403);
        }

        return new UserResource($user);
    }

    /**
     * Display the current user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showMe()
    {
        return new UserMeResource(auth()->user());
    }

    /**
     * Display the organizations of the current user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function showMyOrganizations()
    {
        return OrganizationResource::collection(auth()->user()->organizations());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
