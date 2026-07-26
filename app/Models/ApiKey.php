<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ApiKey extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'key',
        'school_id',
        'device_type',
        'rate_limit',
        'status',
        'description',
        'last_used_at',
        'total_calls',
    ];

    protected function casts(): array
    {
        return [
            'last_used_at' => 'datetime',
            'rate_limit' => 'integer',
            'total_calls' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (ApiKey $apiKey) {
            if (empty($apiKey->key)) {
                $apiKey->key = 'ak_' . Str::random(40);
            }
        });
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function revoke(): void
    {
        $this->update(['status' => 'revoked']);
    }

    public function recordUsage(): void
    {
        $this->update([
            'last_used_at' => now(),
            'total_calls' => $this->total_calls + 1,
        ]);
    }
}
