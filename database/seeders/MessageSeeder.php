<?php

namespace Database\Seeders;

use App\Models\{Message, Notification, User};
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $users = User::where('school_id', $schoolId)->get();

        $principal = User::where('email', 'principal@gurukul.com')->first();
        $admin = User::where('email', 'admin@gurukul.com')->first();
        $teachers = User::where('school_id', $schoolId)->where('role', 'teacher')->get();
        $students = User::where('school_id', $schoolId)->where('role', 'student')->take(5)->get();

        // Messages between principal and teachers
        $messages = [
            ['sender' => $principal, 'receiver' => $teachers->first(), 'subject' => 'Staff Meeting', 'body' => 'Please attend the staff meeting on Monday at 3 PM in the conference room.'],
            ['sender' => $teachers->first(), 'receiver' => $principal, 'subject' => 'Re: Staff Meeting', 'body' => 'Noted, Sir. I will be present.'],
            ['sender' => $admin, 'receiver' => $teachers->first(), 'subject' => 'Exam Schedule', 'body' => 'The half-yearly exam schedule has been uploaded. Please check the portal.'],
            ['sender' => $principal, 'receiver' => $admin, 'subject' => 'Budget Approval', 'body' => 'Please prepare the budget report for the upcoming quarter.'],
            ['sender' => $teachers->last(), 'receiver' => $principal, 'subject' => 'Leave Request', 'body' => 'I would like to request leave for 2 days next week for personal reasons.'],
            ['sender' => $principal, 'receiver' => $teachers->last(), 'subject' => 'Re: Leave Request', 'body' => 'Your leave request has been approved. Please ensure proper handover.'],
        ];

        foreach ($messages as $msg) {
            Message::create([
                'school_id' => $schoolId,
                'sender_id' => $msg['sender']->id,
                'receiver_id' => $msg['receiver']->id,
                'subject' => $msg['subject'],
                'body' => $msg['body'],
                'type' => 'inbox',
                'is_read' => rand(0, 1),
            ]);

            Message::create([
                'school_id' => $schoolId,
                'sender_id' => $msg['sender']->id,
                'receiver_id' => $msg['receiver']->id,
                'subject' => $msg['subject'],
                'body' => $msg['body'],
                'type' => 'sent',
                'is_read' => true,
            ]);
        }

        // Notifications
        $notificationTemplates = [
            ['title' => 'Exam Results Published', 'body' => 'Unit test 1 results have been published.', 'type' => 'exam'],
            ['title' => 'Fee Reminder', 'body' => 'Please pay the pending fee before the due date.', 'type' => 'fee'],
            ['title' => 'Holiday Notice', 'body' => 'School will remain closed on account of Republic Day.', 'type' => 'general'],
            ['title' => 'PTM Scheduled', 'body' => 'Parent-Teacher Meeting is scheduled for next Saturday.', 'type' => 'event'],
            ['title' => 'Assignment Reminder', 'body' => 'Math assignment is due tomorrow.', 'type' => 'academic'],
        ];

        foreach ($users->take(10) as $i => $user) {
            $template = $notificationTemplates[$i % count($notificationTemplates)];
            Notification::create([
                'school_id' => $schoolId,
                'user_id' => $user->id,
                'title' => $template['title'],
                'body' => $template['body'],
                'type' => $template['type'],
                'data' => null,
                'read_at' => rand(0, 1) ? now()->subHours(rand(1, 24)) : null,
            ]);
        }
    }
}
