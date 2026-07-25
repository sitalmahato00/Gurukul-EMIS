<?php

namespace Database\Seeders;

use App\Models\AuditLog;
use Illuminate\Database\Seeder;

class AuditLogSeeder extends Seeder
{
    public function run(): void
    {
        AuditLog::truncate();

        $entries = [
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Created school "Gurukul Academy"', 'resource' => 'School', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Created school "Vidya Vihar School"', 'resource' => 'School', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Created subscription plan "Professional"', 'resource' => 'SubscriptionPlan', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Created subscription plan "Enterprise"', 'resource' => 'SubscriptionPlan', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Updated platform settings', 'resource' => 'PlatformSetting', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'update'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Generated API key "Production Key"', 'resource' => 'ApiKey', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Created system backup "Full Backup"', 'resource' => 'Backup', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Exported fee report', 'resource' => 'FeePayment', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'export'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Logged in', 'resource' => 'Auth', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'auth'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Added student "Aarav Kumar"', 'resource' => 'Student', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Added student "Priya Patel"', 'resource' => 'Student', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Updated class "Class 10-A" details', 'resource' => 'SchoolClass', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'update'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Deleted homework entry', 'resource' => 'Homework', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'delete'],
            ['user_id' => 5, 'user_name' => 'Priya Verma', 'action' => 'Logged in', 'resource' => 'Auth', 'ip_address' => '192.168.1.102', 'status' => 'success', 'action_type' => 'auth'],
            ['user_id' => 5, 'user_name' => 'Priya Verma', 'action' => 'Recorded attendance for Class 10-A', 'resource' => 'Attendance', 'ip_address' => '192.168.1.102', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 5, 'user_name' => 'Priya Verma', 'action' => 'Created exam "Mid-Term Mathematics"', 'resource' => 'Exam', 'ip_address' => '192.168.1.102', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 5, 'user_name' => 'Priya Verma', 'action' => 'Published marks for Class 10-A', 'resource' => 'Mark', 'ip_address' => '192.168.1.102', 'status' => 'success', 'action_type' => 'update'],
            ['user_id' => null, 'user_name' => 'System', 'action' => 'Scheduled backup completed', 'resource' => 'Backup', 'ip_address' => '127.0.0.1', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => null, 'user_name' => 'System', 'action' => 'Database optimization completed', 'resource' => 'System', 'ip_address' => '127.0.0.1', 'status' => 'success', 'action_type' => 'update'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Revoked API key "Test Key"', 'resource' => 'ApiKey', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'delete'],
            ['user_id' => 3, 'user_name' => 'Admin User', 'action' => 'Failed login attempt', 'resource' => 'Auth', 'ip_address' => '10.0.0.99', 'status' => 'failed', 'action_type' => 'auth'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Updated school "Gurukul Academy" profile', 'resource' => 'School', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'update'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Collected fee from Aarav Kumar', 'resource' => 'FeePayment', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Exported student enrollment report', 'resource' => 'Student', 'ip_address' => '192.168.1.100', 'status' => 'success', 'action_type' => 'export'],
            ['user_id' => 5, 'user_name' => 'Priya Verma', 'action' => 'Failed to record attendance', 'resource' => 'Attendance', 'ip_address' => '192.168.1.102', 'status' => 'failed', 'action_type' => 'create'],
            ['user_id' => 1, 'user_name' => 'Super Admin', 'action' => 'Created support ticket', 'resource' => 'SupportTicket', 'ip_address' => '192.168.1.100', 'status' => 'pending', 'action_type' => 'create'],
            ['user_id' => 2, 'user_name' => 'Rahul Sharma', 'action' => 'Assigned teacher to Class 10-A', 'resource' => 'SchoolClass', 'ip_address' => '192.168.1.101', 'status' => 'success', 'action_type' => 'update'],
            ['user_id' => null, 'user_name' => 'System', 'action' => 'Subscription renewal reminder sent', 'resource' => 'Notification', 'ip_address' => '127.0.0.1', 'status' => 'success', 'action_type' => 'create'],
        ];

        foreach ($entries as $index => $entry) {
            $entry['created_at'] = now()
                ->subHours(count($entries) - $index)
                ->subMinutes(rand(0, 30));
            AuditLog::create($entry);
        }
    }
}
