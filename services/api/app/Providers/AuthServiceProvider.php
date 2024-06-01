<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // override the verify email email
        VerifyEmail::toMailUsing(function ($notifiable, $verificationUrl) {
            $verificationUrlParts = explode('/auth/email/verify/', $verificationUrl)[1];
            $verificationUrlPathAndQuery = explode('?', $verificationUrlParts);
            $verificationUrlPathIdAndQuery = explode('/', $verificationUrlPathAndQuery[0]);

            // TODO: Get url from config
            $emailVerifyUrl = config('app.app_url.auth').'/auth/email/verify?'.http_build_query([
                'id' => $verificationUrlPathIdAndQuery[0],
                'hash' => $verificationUrlPathIdAndQuery[1],
            ]).'&'.$verificationUrlPathAndQuery[1];

            return (new MailMessage)
                ->subject(Lang::get('Verify Email Address'))
                ->line(Lang::get('Please click the button below to verify your email address.'))
                ->action(Lang::get('Verify Email Address'), $emailVerifyUrl)
                ->line(Lang::get('If you did not create an account, no further action is required.'));
        });

        // override the reset password email
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            // TODO: Get url from config
            $emailResetUrl = config('app.app_url.auth').'/auth/password/reset?'.http_build_query([
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ]);

            return (new MailMessage)
                ->subject(Lang::get('Reset Password Notification'))
                ->line(Lang::get('You are receiving this email because we received a password reset request for your account.'))
                ->action(Lang::get('Reset Password'), $emailResetUrl)
                ->line(Lang::get('This password reset link will expire in :count minutes.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
                ->line(Lang::get('If you did not request a password reset, no further action is required.'));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
