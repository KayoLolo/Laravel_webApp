<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use App\Models\User\Post as UserPost;

class WelcomeController extends Controller
{
    public function index():Response{
        $posts= Post::with('author')->latest()->get();

        return Inertia::render('Welcome',[
            'posts' => $posts,
            'canRegister' => config('services.registration.enable', true),
        ]);
    }
}
