<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Route extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'name',
        'start_point',
        'end_point',
        'distance_km',
        'fare',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'distance_km' => 'decimal:2',
            'fare' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function stops(): HasMany
    {
        return $this->hasMany(RouteStop::class);
    }

    public function transportAllocations(): HasMany
    {
        return $this->hasMany(TransportAllocation::class);
    }

    public function scopeForSchool($query, $schoolId)
    {
        return $query->where('school_id', $schoolId);
    }
}
