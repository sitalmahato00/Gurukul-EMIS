<?php

namespace Database\Seeders;

use App\Models\Backup;
use Illuminate\Database\Seeder;

class BackupSeeder extends Seeder
{
    public function run(): void
    {
        Backup::truncate();

        $types = ['full', 'incremental'];
        $statuses = ['completed', 'completed', 'completed', 'completed', 'failed'];
        $sizes = ['12.4 MB', '3.2 MB', '15.8 MB', '4.1 MB', '2.7 MB', '18.2 MB', '5.6 MB', '11.9 MB', '3.8 MB', '14.3 MB'];
        $durations = ['2m 34s', '45s', '3m 12s', '52s', '38s', '4m 01s', '1m 15s', '2m 48s', '55s', '3m 22s'];

        for ($i = 0; $i < 10; $i++) {
            Backup::create([
                'type' => $types[$i % 2],
                'size' => $sizes[$i],
                'status' => $statuses[array_rand($statuses)],
                'duration' => $durations[$i],
                'file_path' => 'backups/' . now()->subDays(10 - $i)->format('Y-m-d_His') . '_' . $types[$i % 2] . '.sql.gz',
                'created_at' => now()->subDays(10 - $i)->subHours(rand(0, 8)),
            ]);
        }
    }
}
