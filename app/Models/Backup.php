<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'type',
        'size',
        'status',
        'duration',
        'file_path',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Backup $backup) {
            if (empty($backup->created_at)) {
                $backup->created_at = now();
            }
        });
    }
}
