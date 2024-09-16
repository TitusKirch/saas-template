<?php

namespace App\Models;

use App\Enums\PermissionsEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use Laravel\Scout\Searchable;
use OwenIt\Auditing\Contracts\Auditable;

class Team extends Model implements Auditable
{
    use HasFactory, HasSnowflakePrimary, \OwenIt\Auditing\Auditable, Searchable;

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Default permissions of owner role.
     *
     * @var array
     */
    protected static $defaultOwnerRolePermissions = [
        PermissionsEnum::UPDATE_TEAM,
        PermissionsEnum::DELETE_TEAM,
        PermissionsEnum::RESTORE_TEAM,
        PermissionsEnum::FORCE_DELETE_TEAM,
    ];

    /**
     * Default permissions of member role.
     *
     * @var array
     */
    protected $defaultMemberRolePermissions = [
    ];

    /**
     * {@inheritdoc}
     */
    public function __toString(): string
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function toSearchableArray()
    {
        return array_merge($this->toArray(), [
            'id' => (string) $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at->timestamp,
            'updated_at' => $this->updated_at->timestamp,
        ]);
    }

    /**
     * Return the nr  search parameters for the model.
     */
    public function typesenseSearchParameters(): array
    {
        return [
            'query_by' => 'name',
            'infix' => 'always',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function sortableAttributes(): array
    {
        return [
            'id',
            'name',
            'description',
            'created_at',
            'updated_at',
        ];
    }

    /**
     * {@inheritDoc}
     */
    public static function naturalSortFields(): array
    {
        return [
            'name',
            'description',
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected static function boot()
    {
        parent::boot();

        self::created(function ($team) {
            $ownerRole = Role::create([
                'team_id' => $team->id,
                'name' => 'Owner',
                'is_owner' => true,
            ]);

            $ownerRole->syncPermissions(
                self::$defaultOwnerRolePermissions
            );

            $memberRole = Role::create([
                'team_id' => $team->id,
                'name' => 'Member',
                'is_default' => true,
            ]);

            // $memberRole->syncPermissions(
            //     self::$defaultMemberRolePermissions;
            // );

            // setPermissionsTeamId($team->id);
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
        return $this->roles->map(function ($role) {
            return $role->users;
        })->flatten()->unique('id');
    }
}
