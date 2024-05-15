<?php        $teams = config('permission.teams');
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }
        if( !$teams) {
            throw new \Exception('Error: teams not enabled on config/permission.php. Enable it or remove this feature.');
        }
        if (empty($columnNames['team_foreign_key'] ?? null)) {
            throw new \Exception('Error: team_foreign_key on config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {           
        $teams = config('permission.teams');
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }
        if( !$teams) {
            throw new \Exception('Error: teams not enabled on config/permission.php. Enable it or remove this feature.');
        }
        if (empty($columnNames['team_foreign_key'] ?? null)) {
            throw new \Exception('Error: team_foreign_key on config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }


        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::table($tableNames['roles'], function (Blueprint $table) use ($teams, $columnNames) {
            $table->foreign($columnNames['team_foreign_key'])
                    ->references('id')
                    ->on('organizations')
                    ->onDelete('cascade');
            
        });
        Schema::table($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
            $table->foreign($columnNames['team_foreign_key'])
                    ->references('id')
                    ->on('organizations')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {       
        $teams = config('permission.teams');
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables and update the foreign keys manually.');
        }
        if( !$teams) {
            throw new \Exception('Error: teams not enabled on config/permission.php. Enable it or remove this feature.');
        }
        if (empty($columnNames['team_foreign_key'] ?? null)) {
            throw new \Exception('Error: team_foreign_key on config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }

        Schema::table($tableNames['roles'], function (Blueprint $table) use ($teams, $columnNames) {
            $table->dropForeign([$columnNames['team_foreign_key']]);
        });
        Schema::table($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
            $table->dropForeign([$columnNames['team_foreign_key']]);
        });

        Schema::dropIfExists('organizations');
    }
};
