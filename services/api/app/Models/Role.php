<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Kra8\Snowflake\HasSnowflakePrimary;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory, HasSnowflakePrimary;
}
