<?php

use App\Enums\PermissionsEnum;
use App\Models\Permission;
use App\Models\Team;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Permissions to be created.
     *
     * @var array
     */
    protected static $permissions = [
        PermissionsEnum::UPDATE_TEAM,
        PermissionsEnum::DELETE_TEAM,
        PermissionsEnum::RESTORE_TEAM,
        PermissionsEnum::FORCE_DELETE_TEAM,
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach (self::$permissions as $permission) {
            Permission::create([
                'name' => $permission->value,
            ]);
        }

        $teams = Team::all();
        if ($teams->count() === 0) {
            return;
        }

        $teams->each(function (Team $team) {
            if ($team->roles()->count() == 0) {
                return;
            }

            $ownerRole = $team->ownerRole();
            $ownerRole->givePermissionTo([
                PermissionsEnum::UPDATE_TEAM,
                PermissionsEnum::DELETE_TEAM,
                PermissionsEnum::RESTORE_TEAM,
                PermissionsEnum::FORCE_DELETE_TEAM,
            ]);

            // $memberRole = $team->defaultRole();
            // $memberRole->givePermissionTo([
            // ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (self::$permissions as $permission) {
            (Permission::findByName($permission->value))->delete();
        }
    }
};
