<?php

namespace App\Http\Controllers;

abstract class ApiController extends AppController
{
    /**
     * The maximum number of items that should be returned.
     *
     * @var int|undefined
     */
    protected $paginationLimit;

    /**
     * The default number of items that should be returned.
     *
     * @var int|undefined
     */
    protected $paginationDefault;

    /**
     * The maximum number of items that should be returned.
     *
     * @var int|undefined
     */
    protected $paginationMax;

    /**
     * {@inheritDoc}
     */
    public function __construct()
    {
        if (! $this->paginationDefault) {
            $this->paginationDefault = config('app.api.pagination.default');
        }
        if (! $this->paginationMax) {
            $this->paginationMax = config('app.api.pagination.max');
        }

        $this->paginationLimit = max(1, min($this->paginationMax,
            (int) request()->query('limit', $this->paginationDefault)
        ));
    }

    /**
     * Create a searchable query builder for the given model.
     *
     * @param  string  $model  The model class name.
     * @param  array  $sortableFields  The fields that can be sorted.
     */
    protected static function createSearchableQueryBuilder(string $model, array $sortableFields = []): \Laravel\Scout\Builder|\Illuminate\Database\Eloquent\Builder
    {
        // if sortableFields is not provided, check if the model uses the Sortable trait and has sortable fields
        if (in_array('App\Traits\Sortable', class_uses($model)) && $model::hasSortableAttributes()) {
            $sortableFields = $model::sortableAttributes();
        }

        // initialize sort
        $sort = null;
        if ($sort = request()->query('sort')) {
            if (! in_array(request()->query('sort'), $sortableFields)) {
                abort(400, 'Invalid sort field');
            }
        }

        // initialize queryBuilder
        $queryBuilder = null;
        if (request()->query('query')) {
            $queryBuilder = $model::search(request()->query('query'));

            return $queryBuilder;
        } else {
            $queryBuilder = $model::query();
        }

        // apply sort
        if ($sort) {

            // check if the field uses natural sorting
            if (in_array('App\Traits\Sortable', class_uses($model)) && $model::hasSortableAttributes() && in_array($sort, $model::naturalSortFields())) {

                $queryBuilder->orderByRaw('LENGTH('.$sort.') '.(request()->query('order') === 'desc' ? 'desc' : 'asc'));
                $queryBuilder->orderByRaw($sort.' '.(request()->query('order') === 'desc' ? 'desc' : 'asc'));
            } else {
                $queryBuilder->orderBy($sort, request()->query('order', 'asc'));
            }
        }

        return $queryBuilder;
    }
}
