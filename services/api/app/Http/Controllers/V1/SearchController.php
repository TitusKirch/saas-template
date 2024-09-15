<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\ApiController;
use App\Http\Resources\V1\SearchResource;
use App\Models\UserConfiguration;
use Illuminate\Http\Request;

class SearchController extends ApiController
{
    /**
     * Minimum number of characters required for search.
     *
     * @var int
     */
    protected $minSearchLength = 3;

    /**
     * Item limit per search.
     *
     * @var int
     */
    protected $itemLimit = 10;

    /**
     * Item limit per searchable model.
     *
     * @var int
     */
    protected $itemLimitPerModel = 5;

    /**
     * Seachable models.
     *
     * @var array
     */
    protected $searchableModels = [
        UserConfiguration::class,
    ];

    /**
     * Search for any resource the user has access to.
     */
    public function index(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        // validate length of search query (if not valid, we return an empty array)
        if (strlen(request()->query('query')) < $this->minSearchLength) {
            return SearchResource::collection([]);
        }

        // search for resources
        $results = [];
        foreach ($this->searchableModels as $model) {
            $queryBuilder = $model::search(request()->query('query'))
                ->options([
                    'per_page' => $this->itemLimitPerModel,
                ]);

            // check for user access
            if ($model === UserConfiguration::class) {
                $queryBuilder->where('user_id', auth()->user()->id);
            } else {
                // skip to prevent unauthorized access
                continue;
            }

            // get result
            $results = array_merge($results, $queryBuilder->get()->all());
        }

        // order results by updated_at
        usort($results, function ($a, $b) {
            return $a->updated_at <=> $b->updated_at;
        });

        // limit results
        $results = array_slice($results, 0, $this->itemLimit);

        return SearchResource::collection($results);

    }
}
