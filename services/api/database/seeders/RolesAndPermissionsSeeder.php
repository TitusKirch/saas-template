<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $this->createPermissions();

        // Create roles and assign permissions
        $this->createRoles();
    }

    /**
     * Create all permissions for the application.
     */
    private function createPermissions(): void
    {
        // Foo permissions
        Permission::findOrCreate('create foo');
        Permission::findOrCreate('read foo');
        Permission::findOrCreate('update foo'); // or edit?
        Permission::findOrCreate('delete foo');
        Permission::findOrCreate('publish foo'); // an action
        Permission::findOrCreate('unpublish foo'); // another action

    }

    /**
     * Create all roles for the application and assign permissions.
     */
    private function createRoles(): void
    {
        // Create super admin role
        $role = Role::findOrCreate('super-admin');
        $role->syncPermissions(Permission::all());
    }
}
