<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('support_tickets', function (Blueprint $table) {
            $table->dropForeign(['school_id']);
            $table->foreignId('school_id')->nullable()->change();
            $table->string('school_name')->after('subject');
            $table->integer('message_count')->default(1)->after('assigned_to');
            $table->text('last_message')->nullable()->after('message_count');
        });
    }

    public function down(): void
    {
        Schema::table('support_tickets', function (Blueprint $table) {
            $table->dropColumn(['school_name', 'message_count', 'last_message']);
        });
    }
};
