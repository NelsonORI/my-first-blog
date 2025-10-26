<?php

use App\Models\Post;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    //These are used to list all posts of the logged-in user
    $posts = auth()->user()->posts()->get();
    // $posts = Post::where('user_id',auth()->id())->get();

    //$posts = Post::all(); // This will fetch all posts from the database, regardless of the user

    return view('home', ['posts' => $posts]);
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/logout', [UserController::class,'logout']);
Route::post('/login', [UserController::class,'login']);
Route::post('/create-post', [PostController::class, 'createPost']);