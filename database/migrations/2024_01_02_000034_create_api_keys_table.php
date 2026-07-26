<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('api_keys', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('key')->unique();
            $table->foreignId('school_id')->nullable()->constrained()->nullOnDelete();
            $table->string('device_type')->default('web');
            $table->integer('rate_limit')->default(1000);
            $table->enum('status', ['active', 'inactive', 'revoked'])->default('active');
            $table->text('description')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->integer('total_calls')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('api_keys');
    }
};
