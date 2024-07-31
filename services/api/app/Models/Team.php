<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use OwenIt\Auditing\Contracts\Auditable;

class Team extends Model implements Auditable
{
    use HasFactory, HasSnowflakePrimary, \OwenIt\Auditing\Auditable;

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'name',
    ];

    /**
     * {@inheritdoc}
     */
    protected static function boot()
    {
        parent::boot();

        self::created(function ($team) {
            Role::create([
                'team_id' => $team->id,
                'name' => 'Owner',
                'is_owner' => true,
            ]);

            Role::create([
                'team_id' => $team->id,
                'name' => 'Member',
                'is_default' => true,
            ]);

            setPermissionsTeamId($team->id);
        });
    }

    /**
     * Get the roles for the team.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function roles()
    {
        return $this->hasMany(Role::class);
    }

    /**
     * Get the owner role for the team.
     *
     * @return \App\Models\Role
     */
    public function ownerRole()
    {
        return $this->roles()->where('is_owner', true)->first();
    }

    /**
     * Get the default role for the team.
     *
     * @return \App\Models\Role
     */
    public function defaultRole()
    {
        return $this->roles()->where('is_default', true)->first();
    }

    /**
     * Get the users for the team.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function users()
    {
        return $this->roles()->with('users')->get()->flatMap(function ($role) {
            return $role->users;
        })->unique('id');
    }
}
