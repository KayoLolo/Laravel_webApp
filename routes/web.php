<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');


// Route::get('/', function () {
//     return Inertia::render('Home');
// })->name('home');

Route::get('/Dashboard', function () {
    $user = Auth::user();
    if (!$user) {
        abort(403, 'Unauthorized');
    }
    $userPosts = Post::where('user_id', $user->id)->latest()->get();

    return Inertia::render('Dashboard', [
        'userPosts' => $userPosts,
    ]);
})->middleware(['auth', 'verified'])->name('Dashboard');

Route::get('/posts/create', function () {
    return Inertia::render('Posts/Create');
})->name('posts.create');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');

    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

});


require __DIR__.'/auth.php';
