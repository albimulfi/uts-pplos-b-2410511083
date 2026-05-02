<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donor;

class DonorController extends Controller
{
    public function index(Request $request)
    {
        $query = Donor::query();

        // filter
        if ($request->filled('blood_type')) {
            $query->where('blood_type', $request->blood_type);
        }

        // paging
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        
        $perPage = $request->get('per_page', 5);
        $perPage = min((int)$perPage, 50);

        $donors = $query->paginate($perPage);;

        return response()->json($donors);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'blood_type' => 'required|string|max:3'
        ]);
            
        $donor = Donor::create($validated);
            
        return response()->json($donor, 201);
    }
}