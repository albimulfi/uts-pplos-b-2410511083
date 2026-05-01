<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Http\Request;

class HospitalController extends Controller
{
    public function index() {
        return response()->json(Hospital::all());
    }

    public function store(Request $request) {
        return Hospital::create($request->all());
    }
}
