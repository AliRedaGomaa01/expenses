<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
  ]);
})->name('welcome');

// Route::get('extract', [HomeController::class, 'extractBuildToPublic'])->name('extract');
// Route::get('archive', [HomeController::class, 'archiveBuild'])->name('archive');
// Route::get('test', [HomeController::class, 'test'])->name('test');

Route::middleware(['auth'])->group(function () {
  Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::delete('contacts/delete-all', [ContactController::class, 'deleteAll'])->name('contacts.delete-all');
  Route::post('contacts/seed', [ContactController::class, 'seed'])->name('contacts.seed');
  Route::resource('contacts', ContactController::class)->only('index', 'create', 'store', 'update', 'destroy');
});

require __DIR__ . '/auth.php';
