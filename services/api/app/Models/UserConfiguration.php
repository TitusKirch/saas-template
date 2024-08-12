<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserConfiguration extends Model
{
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
     * Get the user that the configuration belongs to.
     */
    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
