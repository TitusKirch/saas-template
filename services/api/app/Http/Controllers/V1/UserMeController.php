<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PresignedUrlResource;
use App\Http\Resources\V1\UserMeResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class UserMeController extends Controller
{
    /**
     * Display the current user.
     */
    public function show(): UserMeResource
    {
        return new UserMeResource(auth()->user());
    }

    /**
     * Generate a presigned URL for the current user's avatar.
     */
    public function generateAvatarPresignedUrl(Request $request): PresignedUrlResource
    {
        $request->validate([
            'avatar' => 'required|image',
        ]);

        $fileName = uniqid().'.'.$request->avatar->extension();
        $path = 'avatars/'.auth()->user()->id.'/'.$fileName;

        $client = Storage::getClient();
        $cmd = $client->getCommand('PutObject', [
            'Bucket' => Storage::getConfig()['bucket'],
            'Key' => $path,

        ]);
        $request = $client->createPresignedRequest($cmd, now()->addMinutes(5));

        $confirmationUrl = URL::temporarySignedRoute(
            'v1:users.me.avatar.update',
            now()->addMinutes(5),
            [
                'user' => auth()->user()->id,
                'path' => $path,
            ]
        );

        return new PresignedUrlResource((object) [
            'presignedUrl' => (string) $request->getUri(),
            'confirmationUrl' => $confirmationUrl,
        ]);
    }

    /**
     * Update the current user's avatar.
     */
    public function updateAvatar(Request $request) //: \Illuminate\Http\Response
    {
        $request->validate([
            'path' => 'required',
        ]);

        if ($user = User::find(auth()->user()->id)) {
            $oldAvatar = $user->avatar;

            $user->update([
                'avatar' => $request->path,
            ]);

            if ($oldAvatar) {
                Storage::delete($oldAvatar);
            }

            return response()->noContent();
        }

        return response()->noContent(404);
    }
}
