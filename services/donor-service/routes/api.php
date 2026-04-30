<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DonorController;

Route::get('/donors', [DonorController::class, 'index']);
Route::post('/donors', [DonorController::class, 'store']);