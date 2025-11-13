<?php

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
   return Inertia::render('Home');
});

Route::get('/login', function () {
   return Inertia::render('Login');
});

Route::get('/register', function () {
   return Inertia::render('Register');
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/logout', [UserController::class,'logout']);
Route::post('/login', [UserController::class,'login']); 

//Blog related routes
Route::post('/create-post', [PostController::class, 'createPost']);
Route::get('/edit-post/{post}',[PostController::class, 'editPostView']);
Route::put('/edit-post/{post}',[PostController::class, 'editPost']);
Route::delete('/delete-post/{post}',[PostController::class, 'deletePost']);


Route::get('/about', function () {
   return Inertia::render('About');
});
