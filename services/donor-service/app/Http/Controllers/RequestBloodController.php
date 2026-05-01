<?php

namespace App\Http\Controllers;

use App\Models\RequestBlood;
use Illuminate\Cache\Events\RetrievingKey;
use Illuminate\Http\Request;

class RequestBloodController extends Controller
{
    public function index() {
        return response()->json(RequestBlood::all());
    }

    public function store(Request $request) {
        return RequestBlood::create($request->all());
    }
}
