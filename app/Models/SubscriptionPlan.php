<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'period',
        'description',
        'max_schools',
        'max_students',
        'storage_gb',
        'features',
        'is_popular',
        'subscriber_count',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'max_schools' => 'integer',
            'max_students' => 'integer',
            'storage_gb' => 'integer',
            'features' => 'array',
            'is_popular' => 'boolean',
            'subscriber_count' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function schools(): HasMany
    {
        return $this->hasMany(School::class);
    }
}
