<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransportAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'vehicle_id',
        'route_id',
        'stop_id',
        'academic_year',
        'monthly_fee',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'monthly_fee' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function route(): BelongsTo
    {
        return $this->belongsTo(Route::class);
    }

    public function stop(): BelongsTo
    {
        return $this->belongsTo(RouteStop::class, 'stop_id');
    }
}
