<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Kra8\Snowflake\HasSnowflakePrimary;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Pennant\Concerns\HasFeatures;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements Auditable, MustVerifyEmail
{
    use HasApiTokens, HasFactory, HasFeatures, HasRoles, HasSnowflakePrimary, Notifiable, \OwenIt\Auditing\Auditable, TwoFactorAuthenticatable;

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'first_name',
        'last_name',
        'avatar',
    ];

    /**
     * {@inheritdoc}
     */
    protected $hidden = [
        'is_admin',
        'password',
        'remember_token',
        'github_id',
        'github_token',
        'github_refresh_token',
        'google_id',
        'google_token',
        'google_refresh_token',
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
     * Get the user's avatar attribute
     */
    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return Storage::temporaryUrl(
                    $value,
                    now()->addMinutes(5)
                );
            }
        );
    }

    /**
     * Get the user's hasPassword attribute
     */
    protected function hasPassword(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => (bool) $attributes['password']
        );
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
