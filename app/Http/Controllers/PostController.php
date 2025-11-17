<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function deletePost(Post $post){
        if ($post->user_id != auth()->id()){
            return redirect('/');
        }

        $post->delete();
        return response()->json(
            [
                'status' => 'success'
            ], 200);
    }
    public function editPost(Post $post, Request $request){
        if ($post->user_id != auth()->id()){
            return redirect('/');
        }

        $incomingFields = $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);
        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['body'] = strip_tags($incomingFields['body']);
        $post->update($incomingFields);
        return redirect('/');
    }
    public function editPostView(Post $post){
        if ($post->user_id != auth()->id()){
            return redirect('/');
        }

        return view('edit-post', ['post' => $post]);
    }
    public function createPost(Request $request){
        $incomingFields = $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);
        $incomingFields['title'] = strip_tags($incomingFields['title']);
        $incomingFields['body'] = strip_tags($incomingFields['body']);
        $incomingFields['user_id'] = auth()->id();
        if(Post::create($incomingFields)){
            return response()->json(
                [
                    'status' => 'success'
                ], 201);
        }else{
            return response()->json(
                [
                    'status' => 'error'
                ], 500);
        }
        
    }
}
