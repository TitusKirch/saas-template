<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use OwenIt\Auditing\Contracts\Auditable;

class Organization extends Model implements Auditable
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

        self::created(function ($organization) {
            Role::create([
                'organization_id' => $organization->id,
                'name' => 'Owner',
                'is_owner' => true,
            ]);

            Role::create([
                'organization_id' => $organization->id,
                'name' => 'Member',
                'is_default' => true,
            ]);

            setPermissionsTeamId($organization->id);
        });
    }

    /**
     * Get the roles for the organization.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function roles()
    {
        return $this->hasMany(Role::class);
    }

    /**
     * Get the owner role for the organization.
     *
     * @return \App\Models\Role
     */
    public function ownerRole()
    {
        return $this->roles()->where('is_owner', true)->first();
    }

    /**
     * Get the default role for the organization.
     *
     * @return \App\Models\Role
     */
    public function defaultRole()
    {
        return $this->roles()->where('is_default', true)->first();
    }

    /**
     * Get the users for the organization.
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
