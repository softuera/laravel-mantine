<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Panel\Auth\LoginController;
use App\Http\Controllers\Panel\Auth\RegisterController;
use App\Http\Controllers\Panel\DashboardController;
use App\Http\Controllers\Panel\ProfileController;
use App\Http\Middleware\MantinePanel;

/*
|--------------------------------------------------------------------------
| Panel Routes
|--------------------------------------------------------------------------
|
| Here is where you can register panel routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'panel', 'as' => 'panel.'], function () {

    Route::middleware('guest')->group(function () {
        Route::get('/login', [LoginController::class, 'index'])->name('login');
        Route::post('/login', [LoginController::class, 'store'])->name('login.store');;

        Route::get('/register', [RegisterController::class, 'index'])->name('register');
        Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
    });

    Route::middleware([MantinePanel::class, 'auth'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
        Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');

        Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    });
});
