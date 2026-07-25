<?php

namespace Database\Seeders;

use App\Models\PlatformSetting;
use Illuminate\Database\Seeder;

class PlatformSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'platform_name', 'value' => 'Gurukul Education Platform', 'group' => 'general', 'type' => 'text'],
            ['key' => 'platform_tagline', 'value' => 'Smart School Management System', 'group' => 'general', 'type' => 'text'],
            ['key' => 'support_email', 'value' => 'support@gurukul.edu', 'group' => 'general', 'type' => 'text'],
            ['key' => 'contact_phone', 'value' => '+91-9876543210', 'group' => 'general', 'type' => 'text'],
            ['key' => 'website_url', 'value' => 'https://gurukul.edu', 'group' => 'general', 'type' => 'text'],
            ['key' => 'address', 'value' => '123 Education Lane, Knowledge Park, New Delhi 110001', 'group' => 'general', 'type' => 'text'],
            ['key' => 'platform_logo', 'value' => null, 'group' => 'general', 'type' => 'image'],
            ['key' => 'favicon', 'value' => null, 'group' => 'general', 'type' => 'image'],

            // Email / SMTP
            ['key' => 'smtp_host', 'value' => 'smtp.gmail.com', 'group' => 'email', 'type' => 'text'],
            ['key' => 'smtp_port', 'value' => '587', 'group' => 'email', 'type' => 'number'],
            ['key' => 'smtp_from_address', 'value' => 'noreply@gurukul.edu', 'group' => 'email', 'type' => 'text'],
            ['key' => 'smtp_from_name', 'value' => 'Gurukul Platform', 'group' => 'email', 'type' => 'text'],
            ['key' => 'smtp_username', 'value' => 'noreply@gurukul.edu', 'group' => 'email', 'type' => 'text'],
            ['key' => 'smtp_password', 'value' => '', 'group' => 'email', 'type' => 'password'],
            ['key' => 'smtp_encryption', 'value' => 'tls', 'group' => 'email', 'type' => 'select'],

            // Security
            ['key' => 'two_factor_auth', 'value' => 'true', 'group' => 'security', 'type' => 'boolean'],
            ['key' => 'password_min_length', 'value' => '8', 'group' => 'security', 'type' => 'number'],
            ['key' => 'password_require_uppercase', 'value' => 'true', 'group' => 'security', 'type' => 'boolean'],
            ['key' => 'password_require_numbers', 'value' => 'true', 'group' => 'security', 'type' => 'boolean'],
            ['key' => 'password_require_special', 'value' => 'false', 'group' => 'security', 'type' => 'boolean'],
            ['key' => 'session_timeout', 'value' => '30', 'group' => 'security', 'type' => 'number'],

            // Notifications
            ['key' => 'email_notifications', 'value' => 'true', 'group' => 'notifications', 'type' => 'boolean'],
            ['key' => 'sms_notifications', 'value' => 'false', 'group' => 'notifications', 'type' => 'boolean'],
            ['key' => 'push_notifications', 'value' => 'true', 'group' => 'notifications', 'type' => 'boolean'],

            // System
            ['key' => 'maintenance_mode', 'value' => 'false', 'group' => 'system', 'type' => 'boolean'],
            ['key' => 'registration_enabled', 'value' => 'true', 'group' => 'system', 'type' => 'boolean'],
            ['key' => 'max_schools', 'value' => '100', 'group' => 'system', 'type' => 'number'],
            ['key' => 'max_users_per_school', 'value' => '500', 'group' => 'system', 'type' => 'number'],
            ['key' => 'academic_year_start', 'value' => 'April', 'group' => 'system', 'type' => 'select'],
            ['key' => 'timezone', 'value' => 'Asia/Kolkata', 'group' => 'system', 'type' => 'text'],
            ['key' => 'currency', 'value' => 'INR', 'group' => 'system', 'type' => 'text'],
            ['key' => 'date_format', 'value' => 'DD/MM/YYYY', 'group' => 'system', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            PlatformSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
