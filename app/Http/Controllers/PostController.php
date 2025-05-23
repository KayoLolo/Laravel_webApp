<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use Illuminate\Support\Facades\Storage ;

class PostController extends Controller
{
    public function create():Response{
        if(!Auth::check()){
            abort(403);
        }
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request):Response{
        if(!Auth::check()){
            abort(403);
        }

        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $post = new Post();
        $post->title = $validate['title'];
        $post->description = $validate['description'];
        $post->user_id = Auth::id();
        
        if($request->hasFile('image')){
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $post->image = 'images/'.$imageName;
        }
        $post->save();

        return Inertia::render('Dashboard', [
            'success' => 'Post created successfully'
        ]);
    }

    public function show(Post $post):Response{
        return Inertia::render('Posts/Show', [
            'post' => $post->load('author'),
        ]);
    }

    public function edit(Post $post):Response{
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }
    
     public function update(Request $request, Post $post):Response{
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $post->title = $validate['title'];
        $post->description = $validate['description'];
        
        
        if($request->hasFile('image')){
            if ($post->image){
                Storage::disk('public')->delete($post->image);
            }
            $path = $request->file('image')->store('images', 'public');
            $post->image = $path;
            
        }
        $post->save();

        return Inertia::render('Dashboard', [
            'success' => 'Post created successfully'
        ]);
    }

    public function destroy(Post $post){
        if($post->image){
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();

        return redirect()->back()->with('success', 'Post deleted successfully');
    }

    public function like(Post $post){
        $user = Auth::user();
        if($post->likedBy()->where('user_id', $user->id)->exists()){
            $post->likedBy()->detach($user->id);
            $message = 'Post retiré';
        }else{
            $post->likedBy()->attach($user->id);
            $message = 'Post liké';
        }

        return redirect()->back()->with('success', $message);
    }

   
}
