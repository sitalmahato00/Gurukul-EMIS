<?php

namespace Database\Seeders;

use App\Models\SupportTicket;
use Illuminate\Database\Seeder;

class SupportTicketSeeder extends Seeder
{
    public function run(): void
    {
        $tickets = [
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Login Issues — Cannot access admin panel', 'school_name' => 'Gurukul Academy', 'category' => 'technical', 'description' => 'Admin users are unable to log in after the recent password reset. The login page redirects to a blank screen.', 'priority' => 'high', 'status' => 'open', 'assigned_to' => null, 'message_count' => 3, 'last_message' => 'Still having trouble logging in after password reset.'],
            ['school_id' => 2, 'user_id' => 2, 'subject' => 'Fee Module Error — Receipt generation failing', 'school_name' => 'Vidya Vihar School', 'category' => 'billing', 'description' => 'Error occurs when generating fee receipts for batch students. The system throws a 500 error.', 'priority' => 'high', 'status' => 'in_progress', 'assigned_to' => null, 'message_count' => 5, 'last_message' => 'Error occurs when generating fee receipts for batch students.'],
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Feature Request — Parent WhatsApp notifications', 'school_name' => 'Gurukul Academy', 'category' => 'feature_request', 'description' => 'Can you add parent WhatsApp notification feature? This would greatly improve parent engagement.', 'priority' => 'medium', 'status' => 'open', 'assigned_to' => null, 'message_count' => 1, 'last_message' => 'Can you add parent WhatsApp notification feature?'],
            ['school_id' => 2, 'user_id' => 2, 'subject' => 'Attendance Report Calculation Fix', 'school_name' => 'Vidya Vihar School', 'category' => 'technical', 'description' => 'The attendance report was calculating percentages incorrectly for half-day students.', 'priority' => 'low', 'status' => 'resolved', 'assigned_to' => null, 'message_count' => 4, 'last_message' => 'Thank you for fixing the report calculation.'],
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Transport Module Setup Assistance', 'school_name' => 'Gurukul Academy', 'category' => 'onboarding', 'description' => 'Need help setting up bus routes and stops. We have 3 buses and 12 stops to configure.', 'priority' => 'medium', 'status' => 'in_progress', 'assigned_to' => null, 'message_count' => 2, 'last_message' => 'Need help setting up bus routes and stops.'],
            ['school_id' => 3, 'user_id' => 3, 'subject' => 'Hostel room allocation not saving', 'school_name' => 'Shanti Niketan School', 'category' => 'bug', 'description' => 'When assigning students to hostel rooms, the allocation saves but disappears after refreshing the page.', 'priority' => 'high', 'status' => 'open', 'assigned_to' => null, 'message_count' => 2, 'last_message' => 'Allocation keeps resetting. This is urgent as admissions are ongoing.'],
            ['school_id' => 2, 'user_id' => 2, 'subject' => 'Library barcode scanning not working', 'school_name' => 'Vidya Vihar School', 'category' => 'technical', 'description' => 'The barcode scanner feature in the library module is not recognizing book barcodes.', 'priority' => 'medium', 'status' => 'open', 'assigned_to' => null, 'message_count' => 1, 'last_message' => 'Barcode scanner shows "no device found" error.'],
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Exam results publishing delay', 'school_name' => 'Gurukul Academy', 'category' => 'bug', 'description' => 'Published exam results are taking over 30 minutes to appear on student dashboards.', 'priority' => 'medium', 'status' => 'in_progress', 'assigned_to' => null, 'message_count' => 3, 'last_message' => 'We are investigating the caching layer causing this delay.'],
            ['school_id' => 3, 'user_id' => 3, 'subject' => 'Billing discrepancy in monthly invoice', 'school_name' => 'Shanti Niketan School', 'category' => 'billing', 'description' => 'The monthly invoice shows charges for 200 students but we only have 185 active students.', 'priority' => 'low', 'status' => 'resolved', 'assigned_to' => null, 'message_count' => 2, 'last_message' => 'Invoice corrected. Thank you for the quick resolution.'],
            ['school_id' => 2, 'user_id' => 2, 'subject' => 'Request for custom report builder', 'school_name' => 'Vidya Vihar School', 'category' => 'feature_request', 'description' => 'We need a custom report builder that allows us to create bespoke student performance reports for our board presentations.', 'priority' => 'low', 'status' => 'open', 'assigned_to' => null, 'message_count' => 1, 'last_message' => 'Would love a drag-and-drop report builder for custom analytics.'],
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Transport GPS tracking not updating', 'school_name' => 'Gurukul Academy', 'category' => 'bug', 'description' => 'The GPS tracking page shows vehicle locations from yesterday. Real-time tracking seems to be broken.', 'priority' => 'high', 'status' => 'open', 'assigned_to' => null, 'message_count' => 1, 'last_message' => 'GPS data is 24 hours stale. Parents are complaining.'],
            ['school_id' => 3, 'user_id' => 3, 'subject' => 'Training session for new teachers', 'school_name' => 'Shanti Niketan School', 'category' => 'onboarding', 'description' => 'We have 12 new teachers joining next month. Can you arrange a training session on using the homework and attendance modules?', 'priority' => 'medium', 'status' => 'open', 'assigned_to' => null, 'message_count' => 1, 'last_message' => 'Need training for 12 new teachers next month.'],
        ];

        foreach ($tickets as $index => $ticket) {
            $ticket['created_at'] = now()->subDays(count($tickets) - $index);
            $ticket['updated_at'] = now()->subDays(count($tickets) - $index);
            SupportTicket::create($ticket);
        }
    }
}
