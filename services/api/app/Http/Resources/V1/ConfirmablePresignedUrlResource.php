<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConfirmablePresignedUrlResource extends JsonResource
{
    /**
     * {@inheritdoc}
     */
    public function toArray(Request $request): array
    {
        return [
            'confirmationUrl' => $this->confirmationUrl,
            'presignedUrl' => $this->presignedUrl,
        ];
    }
}
