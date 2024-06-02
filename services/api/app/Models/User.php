<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Kra8\Snowflake\HasSnowflakePrimary;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements Auditable, MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasRoles, HasSnowflakePrimary, Notifiable, \OwenIt\Auditing\Auditable;

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'first_name',
        'last_name',
    ];

    /**
     * {@inheritdoc}
     */
    protected $hidden = [
        'is_admin',
        'password',
        'remember_token',
    ];

    /**
     * {@inheritdoc}
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected static function boot()
    {
        parent::boot();

        self::created(function ($user) {
            $organization = Organization::create([
                'name' => $user->first_name.'\'s Organization',
            ]);

            $user->assignRole($organization->ownerRole());
        });
    }

    /**
     * Get all roles (ignore the organization)
     */
    public function rolesAll(): BelongsToMany
    {
        return $this->morphToMany(
            config('permission.models.role'),
            'model',
            config('permission.table_names.model_has_roles'),
            config('permission.column_names.model_morph_key'),
            app(PermissionRegistrar::class)->pivotRole
        );
    }

    /**
     * Get the organizations for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function organizations()
    {
        return $this->rolesAll()->with('organization')->get()->pluck('organization')->unique('id');
    }
}
