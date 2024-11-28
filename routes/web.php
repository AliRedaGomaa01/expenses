<?php

use App\Http\Controllers\DateController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Route::get('extract', [HomeController::class, 'extractBuildToPublic'])->name('extract-build');
// Route::get('archive', [HomeController::class, 'archiveBuild'])->name('archive-build');
// Route::get('command', [HomeController::class, 'command'])->name('command');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth' , 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::delete('expenses/delete-all', [ExpensesController::class , 'deleteAll'])->name('expenses.delete-all');
    Route::post('expenses/seed', [ExpensesController::class , 'seed'])->name('expenses.seed');
    Route::resource('expenses', ExpensesController::class)->only('create', 'store', 'update' , 'destroy');
    
    Route::resource('date', DateController::class)->only('index', 'show');
});

require __DIR__.'/auth.php';
