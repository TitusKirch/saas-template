<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class UserMeResource extends UserResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'has_password' => $this->has_password,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'two_factor_confirmed_at' => $this->two_factor_confirmed_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'organizations' => $this->organizations()->pluck('id'),
        ];
    }
}
