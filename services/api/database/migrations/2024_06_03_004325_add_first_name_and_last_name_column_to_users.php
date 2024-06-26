<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable()
                ->after('email_verified_at');
            $table->string('last_name')->nullable()
                ->after('first_name');
        });

        // loop through all users and set the first name and last name by name
        $users = DB::table('users')->get();
        foreach ($users as $user) {
            $name = $user->name;
            $nameParts = explode(' ', $name);
            DB::table('users')->where('id', $user->id)->update([
                'first_name' => $nameParts[0],
                'last_name' => implode(' ', array_slice($nameParts, 1)),
            ]);
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable(false)->change();
            $table->string('last_name')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
        });
    }
};
