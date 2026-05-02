<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\User;

class UserController extends Controller
{
    public function storeOAuth(Request $request)
    {
        $user = User::where('github_id', $request->github_id)->first();

        if (!$user) {
            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'github_id' => $request->github_id,
                'username' => $request->username,
                'avatar' => $request->avatar,
                'password' => bcrypt('oauth_default')
            ]);

        } else {
            $user->update([
                'name' => $request->username,
                'email' => $request->email,
                'avatar' => $request->avatar
            ]);
        }

        return response()->json($user);
    }
}
