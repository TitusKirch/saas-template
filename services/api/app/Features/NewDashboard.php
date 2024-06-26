<?php

namespace App\Features;

use App\Models\User;
use Illuminate\Support\Lottery;

class NewDashboard
{
    /**
     * The stored name of the feature.
     */
    public string $name = 'new-dashboard';

    /**
     * Resolve the feature's initial value.
     */
    public function resolve(User $user): mixed
    {
        return match (true) {
            $user->is_admin => true,
            default => Lottery::odds(1, 10),
        };
    }
}
