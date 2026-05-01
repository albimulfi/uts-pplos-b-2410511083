<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index() {
        return response()->json(Donation::all());
    }

    public function store(Request $request) {
        return Donation::create($request->all());
    }
}
