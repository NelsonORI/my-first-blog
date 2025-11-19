<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    public function login(Request $request){
        $incomingFields = $request->validate([
            'loginname' => 'required',
            'loginpassword' => 'required'
        ]);
        $user = User::where('name', $incomingFields['loginname'])->first();
        if(auth()->attempt(['name' => $incomingFields['loginname'], 'password' => $incomingFields['loginpassword']])){
            request()->session()->regenerate();

            return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user
        ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

    }

    public function logout(){
        auth()->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful'
        ], 200);
    }

    public function register(Request $request){
        $incomingFields = $request->validate([
            'name' => ['required', 'min:3', 'max:50', Rule::unique('users', 'name')],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required'
        ]);
        $incomingFields['password'] = bcrypt($incomingFields['password']);
        if(User::create($incomingFields)){
            return response()->json([
                'status' => 'success',

                'message' => 'Registration successful'
            ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed'
            ], 500);
        }
    }
}  
