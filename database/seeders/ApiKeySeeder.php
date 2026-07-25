<?php

namespace Database\Seeders;

use App\Models\ApiKey;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ApiKeySeeder extends Seeder
{
    public function run(): void
    {
        $keys = [
            [
                'name' => 'Production API Key',
                'school_id' => 1,
                'rate_limit' => 5000,
                'status' => 'active',
                'total_calls' => 12450,
                'last_used_at' => now()->subHours(2),
            ],
            [
                'name' => 'Development API Key',
                'school_id' => 1,
                'rate_limit' => 1000,
                'status' => 'active',
                'total_calls' => 890,
                'last_used_at' => now()->subDay(),
            ],
            [
                'name' => 'Testing API Key',
                'school_id' => 2,
                'rate_limit' => 500,
                'status' => 'revoked',
                'total_calls' => 234,
                'last_used_at' => now()->subWeek(),
            ],
            [
                'name' => 'Mobile App Key',
                'school_id' => 2,
                'rate_limit' => 10000,
                'status' => 'active',
                'total_calls' => 45230,
                'last_used_at' => now()->subMinutes(30),
            ],
            [
                'name' => 'Integration Partner Key',
                'school_id' => null,
                'rate_limit' => 2000,
                'status' => 'active',
                'total_calls' => 5670,
                'last_used_at' => now()->subHours(5),
            ],
        ];

        foreach ($keys as $key) {
            $key['key'] = 'ak_' . Str::random(40);
            ApiKey::create($key);
        }
    }
}
