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

    public function update(Request $request, $id)
    {
        $donor = Donor::find($id);

        if (!$donor) {
            return response()->json([
                'message' => 'Donor tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'blood_type' => 'sometimes|string|max:3'
        ]);

        $donor->update($validated);

        return response()->json($donor, 200);
    }

    public function destroy($id)
    {
        $donor = Donor::find($id);

        if (!$donor) {
            return response()->json([
                'message' => 'Donor tidak ditemukan'
            ], 404);
        }

        $donor->delete();

        return response()->json([
            'message' => 'Donor berhasil dihapus'
        ], 200);
    }
}