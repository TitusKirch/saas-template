<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PresignedUrlResource;
use App\Http\Resources\V1\UserMeResource;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display the specified user.
     */
    public function show(Request $request, User $user): UserResource
    {
        if ($request->user()->cannot('view', $user)) {
            abort(403);
        }

        return new UserResource($user);
    }

    /**
     * Display the current user.
     */
    public function showMe(): UserMeResource
    {
        // dd(auth()->user());

        return new UserMeResource(auth()->user());
    }

    /**
     * Update the avatar for the current user.
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image'],
        ]);

        $user = auth()->user();

        $presignedUrl = (string) Storage::temporaryUrl(
            'avatars/'.$user->id.'/'.$request->avatar->hashName(),
            now()->addMinutes(5),
            ['Content-Type' => $request->avatar->getMimeType()]
        );

        return new PresignedUrlResource((object) [
            'presignedUrl' => $presignedUrl,
        ]);
    }
}
