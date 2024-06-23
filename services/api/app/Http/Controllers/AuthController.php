<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\PasswordValidationRules;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use PasswordValidationRules;

    /**
     * Set the password for the current user if not already set.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function setPassword(Request $request): \Illuminate\Http\Response
    {
        if ($request->user()->has_password) {
            return abort(403);
        }

        $request->validate([
            'password' => $this->passwordRules(),
        ]);

        $request->user()->forceFill([
            'password' => Hash::make($request->input('password')),
        ])->save();

        return response()->noContent();
    }
}
