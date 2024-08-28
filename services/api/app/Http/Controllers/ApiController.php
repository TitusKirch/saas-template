<?php

namespace App\Http\Controllers;

class ApiController extends AppController
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
}
