<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserConfiguration;
use Illuminate\Auth\Access\Response;

class UserConfigurationPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, UserConfiguration $userConfiguration): Response
    {
        return $user->id === $userConfiguration->user_id
            ? Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, UserConfiguration $userConfiguration): Response
    {
        return $user->id === $userConfiguration->user_id
            ? Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UserConfiguration $userConfiguration): Response
    {
        return $user->id === $userConfiguration->user_id
            ? Response::allow()
            : Response::deny();
    }
}
