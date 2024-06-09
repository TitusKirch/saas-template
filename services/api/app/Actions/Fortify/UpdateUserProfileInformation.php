<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    use PasswordValidationRules;

    /**
     * Validate and update the given user's profile information.
     *
     * @param  array<string, string>  $input
     */
    public function update(User $user, array $input): void
    {
        Validator::make($input, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'password' => function () {
                return array_filter($this->passwordRules(), function ($rule) {
                    return is_string($rule) && $rule !== 'required';
                });
            },
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
        ])->validateWithBag('updateProfileInformation');

        if ($input['email'] !== $user->email &&
            $user instanceof MustVerifyEmail) {
            $this->updateVerifiedUser($user, $input);
        } else {
            $user->forceFill(
                $this->getUserData($input)
            )->save();
        }
    }

    /**
     * Get user data from input
     *
     * @param  array<string, string>  $input
     * @return array<string, string>
     */
    protected function getUserData(array $input): array
    {
        $userData = [
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
        ];

        if (isset($input['password'])) {
            $userData['password'] = Hash::make($input['password']);
        }

        return $userData;
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  array<string, string>  $input
     */
    protected function updateVerifiedUser(User $user, array $input): void
    {
        $user->forceFill(array_merge($this->getUserData($input), [
            'email' => $input['email'],
            'email_verified_at' => null,
        ]))->save();

        $user->sendEmailVerificationNotification();
    }
}
