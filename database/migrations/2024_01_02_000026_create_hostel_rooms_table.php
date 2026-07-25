<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hostel_rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->cascadeOnDelete();
            $table->string('room_number');
            $table->string('block')->nullable();
            $table->integer('floor')->nullable();
            $table->enum('room_type', ['single', 'double', 'triple']);
            $table->integer('capacity');
            $table->integer('occupied')->default(0);
            $table->enum('status', ['available', 'occupied', 'maintenance'])->default('available');
            $table->decimal('rent', 10, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hostel_rooms');
    }
};
