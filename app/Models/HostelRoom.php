<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HostelRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'room_number',
        'block',
        'floor',
        'room_type',
        'capacity',
        'occupied',
        'status',
        'rent',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'floor' => 'integer',
            'capacity' => 'integer',
            'occupied' => 'integer',
            'rent' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function allocations(): HasMany
    {
        return $this->hasMany(HostelAllocation::class, 'room_id');
    }

    public function scopeForSchool($query, $schoolId)
    {
        return $query->where('school_id', $schoolId);
    }
}
