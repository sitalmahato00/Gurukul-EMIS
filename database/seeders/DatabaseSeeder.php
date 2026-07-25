<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SubscriptionPlanSeeder::class,
            SchoolSeeder::class,
            ClassSubjectSeeder::class,
            UserSeeder::class,
            AttendanceSeeder::class,
            ExamMarkSeeder::class,
            FeeSeeder::class,
            LibrarySeeder::class,
            TransportSeeder::class,
            HostelSeeder::class,
            MessageSeeder::class,
            ApiKeySeeder::class,
            AuditLogSeeder::class,
            BackupSeeder::class,
            SupportTicketSeeder::class,
        ]);
    }
}
