<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donor;

class DonorController extends Controller
{
    public function index()
    {
        return response()->json(Donor::all());
    }

    public function store(Request $request)
    {
        $donor = Donor::create($request->all());
        return response()->json($donor);
    }
}