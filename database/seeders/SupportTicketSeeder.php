<?php

namespace Database\Seeders;

use App\Models\SupportTicket;
use Illuminate\Database\Seeder;

class SupportTicketSeeder extends Seeder
{
    public function run(): void
    {
        $tickets = [
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Login Issues', 'school_name' => 'Gurukul Academy', 'priority' => 'high', 'status' => 'open', 'assigned_to' => null, 'message_count' => 3, 'last_message' => 'Still having trouble logging in after password reset.'],
            ['school_id' => 2, 'user_id' => 2, 'subject' => 'Fee Module Error', 'school_name' => 'Vidya Vihar School', 'priority' => 'high', 'status' => 'in_progress', 'assigned_to' => null, 'message_count' => 5, 'last_message' => 'Error occurs when generating fee receipts for batch students.'],
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Request for New Feature', 'school_name' => 'Gurukul Academy', 'priority' => 'medium', 'status' => 'open', 'assigned_to' => null, 'message_count' => 1, 'last_message' => 'Can you add parent WhatsApp notification feature?'],
            ['school_id' => 2, 'user_id' => 2, 'subject' => 'Attendance Report Issue', 'school_name' => 'Vidya Vihar School', 'priority' => 'low', 'status' => 'resolved', 'assigned_to' => null, 'message_count' => 4, 'last_message' => 'Thank you for fixing the report calculation.'],
            ['school_id' => 1, 'user_id' => 1, 'subject' => 'Transport Module Setup', 'school_name' => 'Gurukul Academy', 'priority' => 'medium', 'status' => 'in_progress', 'assigned_to' => null, 'message_count' => 2, 'last_message' => 'Need help setting up bus routes and stops.'],
        ];

        foreach ($tickets as $index => $ticket) {
            $ticket['created_at'] = now()->subDays(count($tickets) - $index);
            $ticket['updated_at'] = now()->subDays(count($tickets) - $index);
            SupportTicket::create($ticket);
        }
    }
}
