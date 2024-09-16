<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasSnowflakePrimary;
use Laravel\Scout\Searchable;

class UserConfiguration extends Model
{
    use HasSnowflakePrimary, Searchable, Sortable;
    // use HasFactory;

    /**
     * {@inheritdoc}
     */
    protected $fillable = [
        'user_id',
        'context',
        'key',
        'value',
    ];

    /**
     * {@inheritdoc}
     */
    protected $casts = [
        'value' => 'array',
    ];

    /**
     * {@inheritdoc}
     */
    public function __toString(): string
    {
        return $this->key;
    }

    /**
     * {@inheritdoc}
     */
    public function toSearchableArray()
    {
        return array_merge($this->toArray(), [
            'id' => (string) $this->id,
            'user_id' => (string) $this->user_id,
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
            'query_by' => 'key',
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
            'user_id',
            'key',
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
            'key',
        ];
    }

    /**
     * Get the user that the configuration belongs to.
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
