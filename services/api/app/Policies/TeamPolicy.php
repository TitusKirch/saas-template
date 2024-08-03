<?php

namespace App\Policies;

use App\Enums\PermissionsEnum;
use App\Models\Team;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TeamPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return Response::deny();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Team $team): Response
    {
        setPermissionsTeamId($team->id);

        return $team->users->contains($user) ? Response::allow() : Response::deny();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Team $team): Response
    {
        setPermissionsTeamId($team->id);

        return $user->hasPermissionTo(PermissionsEnum::UPDATE_TEAM) ? Response::allow() : Response::deny();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Team $team): Response
    {
        return Response::deny();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Team $team): Response
    {
        return Response::deny();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Team $team): Response
    {
        return Response::deny();
    }
}