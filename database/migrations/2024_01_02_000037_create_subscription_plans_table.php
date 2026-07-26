<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->string('period')->default('monthly');
            $table->text('description')->nullable();
            $table->integer('max_schools');
            $table->integer('max_students');
            $table->integer('storage_gb');
            $table->json('features');
            $table->boolean('is_popular')->default(false);
            $table->integer('subscriber_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('schools', function (Blueprint $table) {
            $table->foreign('subscription_plan_id')->references('id')->on('subscription_plans')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropForeign(['subscription_plan_id']);
            $table->dropColumn(['subscription_plan_id', 'subscription_starts_at', 'subscription_ends_at', 'custom_price']);
        });
        Schema::dropIfExists('subscription_plans');
    }
};
