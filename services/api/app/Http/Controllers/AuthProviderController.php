<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
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
    public function handleProviderCallback(string $provider): JsonResponse
    {
        $this->validateProvider($provider);

        $providerUser = Socialite::driver($provider)->user();

        // check if user with email exists
        if ($user = User::where('email', $providerUser->email)->first()) {

            $user->update([
                $provider.'_id' => $providerUser->id,
                $provider.'_token' => $providerUser->token,
                $provider.'_refresh_token' => $providerUser->refreshToken,
            ]);

            Auth::login($user);

            return response()->json([
                'success' => true,
            ]);
        } else {
            $nameParts = explode(' ', $providerUser->getName());
            $user = User::create([
                'first_name' => $nameParts[0],
                'last_name' => implode(' ', array_slice($nameParts, 1)),
                'email' => $providerUser->getEmail(),
                $provider.'_id' => $providerUser->getId(),
                $provider.'_token' => $providerUser->token,
                $provider.'_refresh_token' => $providerUser->refreshToken,
            ]);

            Auth::login($user);

            return response()->json([
                'success' => true,
            ]);
        }
    }
}
