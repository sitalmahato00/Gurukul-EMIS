<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'price' => 499.00,
                'period' => 'monthly',
                'description' => 'For tiny schools exploring digital management',
                'max_schools' => 1,
                'max_students' => 50,
                'storage_gb' => 2,
                'features' => ['Student Management', 'Basic Attendance', 'Fee Tracking'],
                'is_popular' => false,
                'subscriber_count' => 12,
                'is_active' => true,
            ],
            [
                'name' => 'Basic',
                'price' => 999.00,
                'period' => 'monthly',
                'description' => 'Perfect for small schools getting started',
                'max_schools' => 1,
                'max_students' => 100,
                'storage_gb' => 5,
                'features' => ['Student Management', 'Teacher Management', 'Basic Attendance', 'Fee Collection', 'SMS Notifications'],
                'is_popular' => false,
                'subscriber_count' => 15,
                'is_active' => true,
            ],
            [
                'name' => 'Professional',
                'price' => 2499.00,
                'period' => 'monthly',
                'description' => 'For growing schools with advanced needs',
                'max_schools' => 3,
                'max_students' => 500,
                'storage_gb' => 25,
                'features' => ['All Basic Features', 'Exam Management', 'Library Module', 'Transport Management', 'Hostel Management', 'Reports & Analytics', 'Parent Portal'],
                'is_popular' => true,
                'subscriber_count' => 28,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'price' => 4999.00,
                'period' => 'monthly',
                'description' => 'For large institutions with unlimited needs',
                'max_schools' => 10,
                'max_students' => 2000,
                'storage_gb' => 100,
                'features' => ['All Professional Features', 'Multi-School Management', 'Custom Integrations', 'Priority Support', 'Dedicated Account Manager', 'API Access', 'White Labeling'],
                'is_popular' => false,
                'subscriber_count' => 8,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise Plus',
                'price' => 9999.00,
                'period' => 'monthly',
                'description' => 'Unlimited scale with premium SLA and compliance',
                'max_schools' => 50,
                'max_students' => 10000,
                'storage_gb' => 500,
                'features' => ['All Enterprise Features', 'Unlimited Custom Fields', 'Advanced Audit Logs', 'Compliance Reporting', '24/7 Phone Support', 'On-Premise Deployment', 'SSO Integration', 'Custom Mobile App'],
                'is_popular' => false,
                'subscriber_count' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::create($plan);
        }
    }
}
