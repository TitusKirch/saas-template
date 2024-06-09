<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test.user@example.com',
        ]);

        // Create a admin user
        User::factory([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ])->admin()->create();

        // Create 50 random users
        User::factory()
            ->count(50)
            ->create();
    }
}
