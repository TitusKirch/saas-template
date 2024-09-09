<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class UserConfiguration extends Model
{
    use Searchable;
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
    public function toSearchableArray()
    {
        return array_merge($this->toArray(), [
            'id' => (string) $this->id,
            'user_id' => (string) $this->user_id,
            'created_at' => $this->created_at->timestamp,
        ]);
    }

    /**
     * Return the Typesense search parameters for the model.
     */
    public function typesenseSearchParameters(): array
    {
        return [
            'query_by' => 'key',
            'infix' => 'always',
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
