<?php

namespace App\Models;

use Kra8\Snowflake\HasSnowflakePrimary;
use OwenIt\Auditing\Models\Audit as OwenItAudit;

class Audit extends OwenItAudit
{
    use HasSnowflakePrimary;
}
