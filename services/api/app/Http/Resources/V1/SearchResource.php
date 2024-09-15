<?php

namespace App\Http\Resources\V1;

use App\Models\UserConfiguration;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SearchResource extends JsonResource
{
    /**
     * Get link for a model.
     */
    protected function getLink(string $model, int $id): ?string
    {
        if ($model === UserConfiguration::class) {
            return route('v1:users.me.configurations.show', $id);
        }

        return null;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => (string) $this->resource,
            'link' => $this->getLink($this->resource->getMorphClass(), $this->id),
        ];
    }
}
