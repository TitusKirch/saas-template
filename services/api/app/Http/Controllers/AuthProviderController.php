<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;

class AuthProviderController extends Controller
{
    /**
     * Validate the provider.
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function validateProvider(string $provider): void
    {
        $validProviders = ['github', 'google'];

        if (! in_array($provider, $validProviders)) {
            abort(404);
        }
    }

    /**
     * Redirect the user to the provider authentication page.
     */
    public function redirectToProvider(string $provider): JsonResponse
    {
        $this->validateProvider($provider);

        return response()->json([
            'redirect' => Socialite::driver($provider)->redirect()->getTargetUrl(),
        ]);
    }

    /**
     * Obtain the user information from the provider.
     */
    public function handleProviderCallback(string $provider): void
    {
        $this->validateProvider($provider);

        $user = Socialite::driver($provider)->user();

        // $user->token;
    }
}
