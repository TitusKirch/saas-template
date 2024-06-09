<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Kra8\Snowflake\HasSnowflakePrimary;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole implements Auditable
{
    use HasFactory, HasSnowflakePrimary, \OwenIt\Auditing\Auditable;

    /**
     * Get the organization that the role belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
