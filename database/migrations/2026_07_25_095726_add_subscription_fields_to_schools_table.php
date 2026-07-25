<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->foreignId('subscription_plan_id')->nullable()->after('is_active')->constrained('subscription_plans')->nullOnDelete();
            $table->date('subscription_starts_at')->nullable()->after('subscription_plan_id');
            $table->date('subscription_ends_at')->nullable()->after('subscription_starts_at');
            $table->decimal('custom_price', 10, 2)->nullable()->after('subscription_ends_at');
        });
    }

    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropForeign(['subscription_plan_id']);
            $table->dropColumn(['subscription_plan_id', 'subscription_starts_at', 'subscription_ends_at', 'custom_price']);
        });
    }
};
