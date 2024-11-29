<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            // $table->string('name' , 127);
            $table->string('name' , 255);
            $table->decimal('price');
            $table->unsignedBigInteger('date_id');
            $table->unsignedInteger('category_id');
            $table->timestamps();
        });

        // Schema::table('expenses', function (Blueprint $table) {
        //     $table->string('name', 255)->change();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('expenses', function (Blueprint $table) {
        //     $table->string('name', 127)->change();
        // });
        Schema::dropIfExists('expenses');
    }
};
