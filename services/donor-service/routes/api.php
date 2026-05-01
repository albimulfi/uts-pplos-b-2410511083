<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\RequestBloodController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\UserController;

Route::get('/donors', [DonorController::class, 'index']);
Route::post('/donors', [DonorController::class, 'store']);

Route::get('/hospitals', [HospitalController::class, 'index']);
Route::post('/hospitals', [HospitalController::class, 'store']);

Route::get('/requests', [RequestBloodController::class, 'index']);
Route::post('/requests', [RequestBloodController::class, 'store']);

Route::get('/donations', [DonationController::class, 'index']);
Route::post('/donations', [DonationController::class, 'store']);

Route::post('/oauth-user', [UserController::class, 'storeOAuth']);