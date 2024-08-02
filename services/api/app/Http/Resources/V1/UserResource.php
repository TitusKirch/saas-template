<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'avatar' => $this->avatar,

            $this->mergeWhen($this->id === $request->user()->id, [
                'email' => $this->email,
                'email_verified_at' => $this->email_verified_at,
                'has_password' => $this->has_password,
                'two_factor_confirmed_at' => $this->two_factor_confirmed_at,
                'teams' => TeamResource::collection($this->teams()),
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ]),
        ];
    }
}
