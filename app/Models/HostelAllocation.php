<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HostelAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'room_id',
        'academic_year',
        'allocated_date',
        'vacated_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'allocated_date' => 'date',
            'vacated_date' => 'date',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(HostelRoom::class, 'room_id');
    }
}
