<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hostel_visitors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('visitor_name');
            $table->string('visitor_phone');
            $table->string('relation')->nullable();
            $table->string('purpose')->nullable();
            $table->string('id_proof')->nullable();
            $table->timestamp('check_in');
            $table->timestamp('check_out')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hostel_visitors');
    }
};
