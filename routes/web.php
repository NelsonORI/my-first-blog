<?php

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::middleware(['web'])->group(function () {
    //
    Route::get('/', function () {
      $posts = [];
      if($user = auth()->user()){
         $posts = $user->posts()->with('user')->get();
      }
      return Inertia::render('Home', ['posts' => $posts]);
   });

   Route::get('/login', function () {
      return Inertia::render('Login');
   });

   Route::get('/register', function () {
      return Inertia::render('Register');
   });

   Route::get('/edit-post/{post}', function(Post $post){
      if(!auth()->check() || $post->user_id !== auth()->id()){
         return abort(403, 'Unauthorized');
      }
      return Inertia::render('EditPost', ['post' => $post]);
   });

   Route::post('/register', [UserController::class, 'register']);
   Route::post('/logout', [UserController::class,'logout']);
   Route::post('/login', [UserController::class,'login']); 

   //Blog related routes
   Route::post('/create-post', [PostController::class, 'createPost']);
   Route::put('/edit-post/{post}',[PostController::class, 'editPost']);
   Route::delete('/delete-post/{post}',[PostController::class, 'deletePost']);


   Route::get('/about', function () {
      return Inertia::render('About');
   });

    
});

