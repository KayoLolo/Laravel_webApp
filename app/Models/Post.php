<?php

namespace App\Models;

use App\Models\Post\User;
use App\Models\User as ModelsUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
    ];

    protected $appends= ['is_liked', 'likes_count'];

    protected $with = ['likedBy'];

    public  function author(): BelongsTo{
        return $this->belongsTo(ModelsUser::class, 'user_id');
    }

    // public  function likedBy(): BelongsToMany{
    //     return $this->belongsToMany(User::class, 'post_likes');
    // }

    public function likedBy():BelongsToMany{
        return $this->belongsToMany(ModelsUser::class, 'post_likes');
    }

    public function getIsLikedAttribute():bool{
        return Auth::check() && $this->likedBy()->contains('id', Auth::id());
    }

    
}
