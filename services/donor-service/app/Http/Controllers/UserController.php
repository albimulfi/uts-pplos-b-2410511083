<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\User;

class UserController extends Controller
{
    public function storeOAuth(Request $request)
    {
        $user = User::updateOrCreate(
            ['github_id' => $request->github_id],
            [
                'username' => $request->username,
                'email' => $request->email
            ]
        );

        return response()->json($user);
    }
}
